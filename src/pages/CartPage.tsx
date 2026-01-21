import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, CreditCard, Wallet, Banknote, Clock, CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import { useCart, CartItem } from '@/context/CartContext';
import { toast } from 'sonner';

interface OrderDetails {
  items: CartItem[];
  total: number;
  paymentMethod: string;
  estimatedDelivery: string;
  orderId: string;
}

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalAmount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState<OrderDetails | null>(null);

  const paymentMethods = [
    { id: 'upi', name: 'UPI / Google Pay / PhonePe', icon: Wallet, desc: 'Pay instantly via UPI' },
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
  ];

  const getEstimatedDelivery = () => {
    const now = new Date();
    const minTime = new Date(now.getTime() + 30 * 60000);
    const maxTime = new Date(now.getTime() + 45 * 60000);
    return `${minTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} - ${maxTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const generateOrderId = () => {
    return `HH${Date.now().toString(36).toUpperCase()}`;
  };

  const handleCheckout = () => {
    const order: OrderDetails = {
      items: [...items],
      total: totalAmount,
      paymentMethod: paymentMethods.find(p => p.id === paymentMethod)?.name || 'UPI',
      estimatedDelivery: getEstimatedDelivery(),
      orderId: generateOrderId(),
    };
    
    setOrderPlaced(order);
    clearCart();
    
    toast.success('Order placed successfully! 🎉', {
      description: `Order ID: ${order.orderId}`,
    });
  };

  // Order Confirmation View
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
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
              <div className="lg:col-span-2 space-y-4">
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

                {/* Payment Methods */}
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Method
                    </h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            paymentMethod === method.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <method.icon className="w-5 h-5 text-primary" />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <span className="font-medium">{method.name}</span>
                            <p className="text-sm text-muted-foreground">{method.desc}</p>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
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
                  >
                    Place Order
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
