import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalAmount } = useCart();

  const handleCheckout = () => {
    toast.success('Order placed successfully! 🎉', {
      description: 'Your food will be ready soon.',
    });
    clearCart();
  };

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
                {items.map((item) => (
                  <motion.div key={item.id} layout>
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-semibold truncate">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <span className="font-display font-bold w-20 text-right">₹{item.price * item.quantity}</span>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeItem(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="h-fit sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-display font-bold text-lg">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                  <Button className="w-full gradient-burgundy text-lg h-12" onClick={handleCheckout}>
                    Place Order
                  </Button>
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
