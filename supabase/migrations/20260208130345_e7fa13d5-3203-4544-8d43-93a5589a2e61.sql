-- Fix: Restrict public SELECT access to orders table
-- The edge functions use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS,
-- so denying direct SELECT access does not affect order tracking functionality.

DROP POLICY IF EXISTS "View orders with order_number" ON public.orders;

CREATE POLICY "Deny direct select on orders"
  ON public.orders
  FOR SELECT
  USING (false);
