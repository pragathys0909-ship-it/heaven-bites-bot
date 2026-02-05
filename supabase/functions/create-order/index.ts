 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
 import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 // Simple in-memory rate limiter (resets on function cold start)
 const rateLimiter = new Map<string, { count: number; resetTime: number }>();
 const RATE_LIMIT = 5; // 5 orders per minute per IP
 const RATE_WINDOW = 60000; // 1 minute
 
 function checkRateLimit(ip: string): boolean {
   const now = Date.now();
   const entry = rateLimiter.get(ip);
   
   if (!entry || now > entry.resetTime) {
     rateLimiter.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
     return true;
   }
   
   if (entry.count >= RATE_LIMIT) {
     return false;
   }
   
   entry.count++;
   return true;
 }
 
 // Validation schema for order creation
 const orderSchema = z.object({
   customer_name: z.string()
     .trim()
     .min(2, "Name must be at least 2 characters")
     .max(100, "Name must be less than 100 characters")
     .refine(val => !/<script|javascript:|onerror=/i.test(val), "Invalid characters in name"),
   customer_email: z.string()
     .trim()
     .email("Invalid email address")
     .max(255, "Email must be less than 255 characters"),
   customer_phone: z.string()
     .trim()
     .min(10, "Phone number must be at least 10 characters")
     .max(20, "Phone number must be less than 20 characters")
     .regex(/^[0-9+\-\(\)\s]+$/, "Invalid phone number format"),
   delivery_address: z.string()
     .trim()
     .min(10, "Address must be at least 10 characters")
     .max(500, "Address must be less than 500 characters")
     .refine(val => !/<script|javascript:|onerror=/i.test(val), "Invalid characters in address"),
   items: z.array(z.object({
     id: z.string(),
     name: z.string(),
     price: z.number().positive(),
     quantity: z.number().int().positive(),
     isVeg: z.boolean(),
   })).min(1, "At least one item is required"),
   subtotal: z.number().positive("Subtotal must be positive"),
   payment_method: z.enum(["UPI Payment", "Credit / Debit Card", "Mobile Wallet", "Cash on Delivery"]),
   honeypot: z.string().optional(),
 });
 
 Deno.serve(async (req) => {
   // Handle CORS preflight
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     // Get client IP for rate limiting
     const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                      req.headers.get('x-real-ip') || 
                      'unknown';
     
     // Check rate limit
     if (!checkRateLimit(clientIP)) {
       return new Response(
         JSON.stringify({ error: 'Too many requests. Please try again later.' }),
         { 
           status: 429, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     const body = await req.json();
     
     // Check honeypot (bot detection)
     if (body.honeypot && body.honeypot.length > 0) {
       // Silently reject bot submissions
       return new Response(
         JSON.stringify({ 
           success: true, 
           order_number: 'HH' + Date.now().toString(36).toUpperCase() 
         }),
         { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Validate input
     const validationResult = orderSchema.safeParse(body);
     if (!validationResult.success) {
       return new Response(
         JSON.stringify({ 
           error: 'Validation failed', 
           details: validationResult.error.flatten().fieldErrors 
         }),
         { 
           status: 400, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     const data = validationResult.data;
     
     // Calculate amounts server-side to prevent manipulation
     const calculatedSubtotal = data.items.reduce(
       (sum, item) => sum + (item.price * item.quantity), 
       0
     );
     
     // Verify subtotal matches
     if (Math.abs(calculatedSubtotal - data.subtotal) > 0.01) {
       return new Response(
         JSON.stringify({ error: 'Price mismatch detected' }),
         { 
           status: 400, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     const deliveryFee = calculatedSubtotal < 300 ? 30 : 0;
     const totalAmount = calculatedSubtotal + deliveryFee;
     
     // Generate order number with random component to prevent enumeration
     const randomPart = crypto.getRandomValues(new Uint8Array(4))
       .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
     const orderNumber = `HH${Date.now().toString(36).toUpperCase()}${randomPart.toUpperCase()}`;
     
     // Calculate estimated delivery
     const now = new Date();
     const minTime = new Date(now.getTime() + 30 * 60000);
     const maxTime = new Date(now.getTime() + 45 * 60000);
     const estimatedDelivery = `${minTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} - ${maxTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
 
     // Create Supabase client
     const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
     const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     // Insert order (WITHOUT payment_details - we never store sensitive payment info)
     const { data: order, error } = await supabase
       .from('orders')
       .insert({
         order_number: orderNumber,
         customer_name: data.customer_name,
         customer_email: data.customer_email,
         customer_phone: data.customer_phone,
         delivery_address: data.delivery_address,
         items: data.items,
         subtotal: calculatedSubtotal,
         delivery_fee: deliveryFee,
         total_amount: totalAmount,
         payment_method: data.payment_method,
         // SECURITY: Never store payment_details - set to null
         payment_details: null,
         estimated_delivery: estimatedDelivery,
         status: 'success',
       })
       .select()
       .single();
 
     if (error) {
       console.error('Database error:', error);
       return new Response(
         JSON.stringify({ error: 'Failed to create order' }),
         { 
           status: 500, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     return new Response(
       JSON.stringify({ 
         success: true, 
         order_number: orderNumber,
         estimated_delivery: estimatedDelivery,
         total_amount: totalAmount
       }),
       { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
 
   } catch (error) {
     console.error('Error:', error);
     return new Response(
       JSON.stringify({ error: 'Internal server error' }),
       { 
         status: 500, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       }
     );
   }
 });