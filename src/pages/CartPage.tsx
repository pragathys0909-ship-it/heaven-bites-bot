import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Clock, CheckCircle2, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import AnimatedBackground from '@/components/AnimatedBackground';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import CustomerDetailsForm, { CustomerDetails } from '@/components/CustomerDetailsForm';
import PaymentDetailsForm, { PaymentDetails, UpiDetails, CardDetails, WalletDetails } from '@/components/PaymentDetailsForm';
import { useCart, CartItem } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OrderDetails {
  items: CartItem[];
  total: number;
  paymentMethod: string;
  estimatedDelivery: string;
  orderId: string;
}

const getPaymentMethodName = (id: string): string => {
  const names: Record<string, string> = {
    upi: 'UPI Payment',
    card: 'Credit / Debit Card',
    wallet: 'Mobile Wallet',
    cod: 'Cash on Delivery',
  };
  return names[id] || 'UPI Payment';
};

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalAmount } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(null);
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  const getEstimatedDelivery = () => {
    const now = new Date();
    const minTime = new Date(now.getTime() + 30 * 60000);
    const maxTime = new Date(now.getTime() + 45 * 60000);
    return `${minTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} - ${maxTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const validateCustomerDetails = (): boolean => {
    const errors: Partial<Record<keyof CustomerDetails, string>> = {};
    
    if (!customerDetails.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!customerDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      errors.email = 'Invalid email address';
    }
    if (!customerDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\d\s+\-()]{10,}$/.test(customerDetails.phone.replace(/\s/g, ''))) {
      errors.phone = 'Invalid phone number';
    }
    if (!customerDetails.address.trim()) {
      errors.address = 'Delivery address is required';
    } else if (customerDetails.address.trim().length < 10) {
      errors.address = 'Please enter a complete address';
    }
    
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentDetails = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (paymentMethod === 'upi') {
      const details = paymentDetails as UpiDetails | null;
      if (!details?.upiId?.trim()) {
        errors.upiId = 'UPI ID is required';
      } else if (!/^[\w.-]+@[\w]+$/.test(details.upiId)) {
        errors.upiId = 'Invalid UPI ID format';
      }
    } else if (paymentMethod === 'card') {
      const details = paymentDetails as CardDetails | null;
      if (!details?.cardNumber?.replace(/\s/g, '')) {
        errors.cardNumber = 'Card number is required';
      } else if (details.cardNumber.replace(/\s/g, '').length < 16) {
        errors.cardNumber = 'Invalid card number';
      }
      if (!details?.cardName?.trim()) {
        errors.cardName = 'Cardholder name is required';
      }
      if (!details?.expiry?.trim()) {
        errors.expiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(details.expiry)) {
        errors.expiry = 'Invalid format (MM/YY)';
      }
      if (!details?.cvv?.trim()) {
        errors.cvv = 'CVV is required';
      } else if (details.cvv.length < 3) {
        errors.cvv = 'Invalid CVV';
      }
    } else if (paymentMethod === 'wallet') {
      const details = paymentDetails as WalletDetails | null;
      if (!details?.phone?.trim()) {
        errors.phone = 'Phone number is required';
      }
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    // Validate all forms
    const isCustomerValid = validateCustomerDetails();
    const isPaymentValid = validatePaymentDetails();
    
    if (!isCustomerValid || !isPaymentValid) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    const finalAmount = totalAmount < 300 ? totalAmount + 30 : totalAmount;
    const deliveryFee = totalAmount < 300 ? 30 : 0;
    const estimatedDelivery = getEstimatedDelivery();
    const paymentMethodName = getPaymentMethodName(paymentMethod);
    const orderNumber = `HH${Date.now().toString(36).toUpperCase()}`;
    
    try {
      // Save to database
      const { data, error } = await supabase.from('orders').insert([{
        order_number: orderNumber,
        customer_name: customerDetails.name.trim(),
        customer_email: customerDetails.email.trim(),
        customer_phone: customerDetails.phone.trim(),
        delivery_address: customerDetails.address.trim(),
        items: items as any,
        subtotal: totalAmount,
        delivery_fee: deliveryFee,
        total_amount: finalAmount,
        payment_method: paymentMethodName,
        payment_details: paymentMethod !== 'cod' ? paymentDetails as any : null,
        estimated_delivery: estimatedDelivery,
        status: 'success',
      }]).select().single();
      
      if (error) throw error;
      
      // Also save to local order history
      addOrder({
        items: [...items],
        amount: finalAmount,
        status: 'success',
        paymentMethod: paymentMethodName,
        estimatedDelivery,
      });
      
      const order: OrderDetails = {
        items: [...items],
        total: finalAmount,
        paymentMethod: paymentMethodName,
        estimatedDelivery,
        orderId: orderNumber,
      };
      
      setOrderPlaced(order);
      clearCart();
      
      toast.success('Order placed successfully! 🎉', {
        description: `Order ID: ${order.orderId}`,
      });
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast.error('Failed to place order', {
        description: error.message || 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Confirmation View
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <AnimatedBackground variant="cart" />
        <Header />
        
        <main className="pt-20 md:pt-24 pb-16">
          <div className="container mx-auto px-4 py-8 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-secondary-foreground" />
              </motion.div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground">Thank you for ordering from Hotel Heaven</p>
            </motion.div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-display font-bold text-lg text-primary">{orderPlaced.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{orderPlaced.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-display font-bold text-lg">{orderPlaced.estimatedDelivery}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Order Items
                </h3>
                
                <div className="space-y-3">
                  {orderPlaced.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-lg">Total Paid</span>
                  <span className="font-display font-bold text-xl text-primary">₹{orderPlaced.total}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="flex-1">
                <Button variant="outline" className="w-full">
                  Order More
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button className="w-full gradient-burgundy">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground variant="cart" />
      <Header />
      
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/menu">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Your Cart</h1>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="font-display text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some delicious items from our menu!</p>
              <Link to="/menu">
                <Button className="gradient-burgundy">Browse Menu</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Cart Items */}
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                              <div className="min-w-0">
                                <h3 className="font-display font-semibold truncate">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8" 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8" 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <span className="font-display font-bold w-20 text-right">₹{item.price * item.quantity}</span>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="text-destructive" 
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Customer Details Form */}
                <CustomerDetailsForm 
                  details={customerDetails} 
                  onChange={setCustomerDetails}
                  errors={customerErrors}
                />

                {/* Payment Methods */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-4">Select Payment Method</h2>
                    <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
                    <PaymentDetailsForm 
                      paymentMethod={paymentMethod} 
                      onDetailsChange={setPaymentDetails}
                      errors={paymentErrors}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <Card className="h-fit sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
                  
                  {/* Delivery Time */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                      <p className="font-display font-semibold">30-45 minutes</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span className={totalAmount >= 300 ? 'text-green-500' : ''}>
                        {totalAmount >= 300 ? 'Free' : '₹30'}
                      </span>
                    </div>
                    {totalAmount < 300 && (
                      <p className="text-xs text-muted-foreground">
                        Add ₹{300 - totalAmount} more for free delivery
                      </p>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-display font-bold text-lg mb-6">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{totalAmount < 300 ? totalAmount + 30 : totalAmount}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full gradient-burgundy text-lg h-12" 
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    By placing order, you agree to our terms & conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Chatbot />
    </div>
  );
};

export default CartPage;
