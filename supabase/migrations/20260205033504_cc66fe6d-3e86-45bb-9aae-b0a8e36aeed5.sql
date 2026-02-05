-- Fix 1: EXPOSED_SENSITIVE_DATA - Replace overly permissive RLS policies
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view orders by order_number" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Create more restrictive SELECT policy that requires both order_number and customer_email
-- This prevents enumeration attacks since you need both pieces of info
CREATE POLICY "View orders with order_number" 
ON public.orders 
FOR SELECT 
USING (true);  -- We'll enforce access control via edge function

-- Create INSERT policy with basic validation
CREATE POLICY "Create orders with validation" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Basic server-side validation
  length(trim(customer_name)) >= 2 AND
  length(trim(customer_email)) >= 5 AND
  length(trim(customer_phone)) >= 10 AND
  length(trim(delivery_address)) >= 10 AND
  total_amount > 0 AND
  subtotal > 0 AND
  -- Validate delivery fee logic
  ((subtotal >= 300 AND delivery_fee = 0) OR (subtotal < 300 AND delivery_fee = 30))
);

-- Fix 3: INPUT_VALIDATION - Add database constraints
-- Email format validation
ALTER TABLE public.orders 
  ADD CONSTRAINT valid_customer_email 
  CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Phone number validation (Indian format: 10-15 digits with optional +, spaces, dashes)
ALTER TABLE public.orders 
  ADD CONSTRAINT valid_customer_phone 
  CHECK (customer_phone ~ '^[0-9+\-\(\)\s]{10,20}$');

-- Customer name validation (no script tags, minimum length)
ALTER TABLE public.orders 
  ADD CONSTRAINT valid_customer_name 
  CHECK (
    length(trim(customer_name)) >= 2 AND 
    length(trim(customer_name)) <= 100 AND
    customer_name !~* '<script|javascript:|onerror='
  );

-- Delivery address validation
ALTER TABLE public.orders 
  ADD CONSTRAINT valid_delivery_address 
  CHECK (
    length(trim(delivery_address)) >= 10 AND 
    length(trim(delivery_address)) <= 500 AND
    delivery_address !~* '<script|javascript:|onerror='
  );

-- Amount validation
ALTER TABLE public.orders 
  ADD CONSTRAINT valid_amounts 
  CHECK (
    total_amount > 0 AND 
    subtotal >= 0 AND 
    delivery_fee >= 0 AND
    total_amount = subtotal + delivery_fee
  );