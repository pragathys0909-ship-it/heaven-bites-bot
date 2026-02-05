 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
 import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 // Rate limiter for tracking requests (more lenient than order creation)
 const rateLimiter = new Map<string, { count: number; resetTime: number }>();
 const RATE_LIMIT = 30; // 30 requests per minute per IP
 const RATE_WINDOW = 60000;
 
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
 
 // Validation schema
 const trackingSchema = z.object({
   order_number: z.string()
     .trim()
     .min(5, "Invalid order number")
     .max(30, "Invalid order number")
     .regex(/^HH[A-Z0-9]+$/i, "Invalid order number format"),
   customer_email: z.string()
     .trim()
     .email("Invalid email address")
     .optional(),
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
     
     // Validate input
     const validationResult = trackingSchema.safeParse(body);
     if (!validationResult.success) {
       return new Response(
         JSON.stringify({ 
           error: 'Invalid order number format' 
         }),
         { 
           status: 400, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     const { order_number, customer_email } = validationResult.data;
     
     // Create Supabase client
     const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
     const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     // Build query - optionally require email match for extra security
     let query = supabase
       .from('orders')
       .select('id, order_number, customer_name, customer_email, customer_phone, delivery_address, items, subtotal, delivery_fee, total_amount, payment_method, status, estimated_delivery, created_at')
       .eq('order_number', order_number.toUpperCase());
     
     // If email is provided, also match on email (optional extra security)
     if (customer_email) {
       query = query.eq('customer_email', customer_email.toLowerCase());
     }
     
     const { data: order, error } = await query.maybeSingle();
 
     if (error) {
       console.error('Database error:', error);
       return new Response(
         JSON.stringify({ error: 'Failed to fetch order' }),
         { 
           status: 500, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     if (!order) {
       return new Response(
         JSON.stringify({ error: 'Order not found' }),
         { 
           status: 404, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         }
       );
     }
 
     // Mask sensitive data for privacy
     const maskedOrder = {
       ...order,
       // Mask email: show first 2 chars + domain
       customer_email: order.customer_email.replace(/^(.{2}).*@/, '$1***@'),
       // Mask phone: show last 4 digits
       customer_phone: order.customer_phone.replace(/.(?=.{4})/g, '*'),
       // payment_details is already null (never stored)
     };
 
     return new Response(
       JSON.stringify({ success: true, order: maskedOrder }),
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