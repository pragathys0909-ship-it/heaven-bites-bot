import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Package, Clock, CheckCircle2, Truck, ChefHat, MapPin, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import AnimatedBackground from '@/components/AnimatedBackground';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrderDetails {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  items: Array<{ id: string; name: string; price: number; quantity: number; isVeg: boolean }>;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  payment_method: string;
  status: string;
  estimated_delivery: string | null;
  created_at: string;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Package },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'preparing', label: 'Preparing', icon: ChefHat },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

const getStatusIndex = (status: string) => {
  const index = statusSteps.findIndex(s => s.key === status);
  return index === -1 ? 0 : index;
};

const getStatusProgress = (status: string) => {
  const index = getStatusIndex(status);
  return ((index + 1) / statusSteps.length) * 100;
};

const OrderTrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) {
      toast({
        title: 'Enter Order Number',
        description: 'Please enter your order number to track',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber.trim().toUpperCase())
        .single();

      if (error || !data) {
        setOrder(null);
        toast({
          title: 'Order Not Found',
          description: 'No order found with this order number. Please check and try again.',
          variant: 'destructive',
        });
      } else {
        const items = Array.isArray(data.items) ? data.items : [];
        setOrder({
          ...data,
          items: items as OrderDetails['items'],
        });
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch order details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground variant="orders" />
      <Header />
      
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Track Your Order</h1>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your order number (e.g., HH12345ABC)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                    className="text-lg h-12"
                  />
                </div>
                <Button 
                  onClick={handleTrackOrder} 
                  disabled={loading}
                  className="gradient-burgundy h-12 px-8"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Track Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          )}

          {/* Order Details */}
          {!loading && order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Status Card */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-primary text-xl md:text-2xl">{order.order_number}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        Ordered on {formatDate(order.created_at)}
                      </p>
                    </div>
                    <Badge 
                      className={
                        order.status === 'delivered' 
                          ? 'bg-green-500/20 text-green-600 hover:bg-green-500/30 text-base px-4 py-1' 
                          : order.status === 'out_for_delivery'
                          ? 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 text-base px-4 py-1'
                          : 'bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 text-base px-4 py-1'
                      }
                    >
                      {order.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Tracker */}
                  <div className="mb-6">
                    <Progress value={getStatusProgress(order.status)} className="h-2 mb-4" />
                    <div className="flex justify-between">
                      {statusSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        return (
                          <div 
                            key={step.key} 
                            className={`flex flex-col items-center ${index > 0 ? 'flex-1' : ''}`}
                          >
                            <div 
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                                isCompleted 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            >
                              <Icon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className={`text-xs md:text-sm text-center ${isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {order.estimated_delivery && (
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="text-lg font-display font-semibold text-primary">{order.estimated_delivery}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Items & Customer Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span>{item.name}</span>
                            <span className="text-muted-foreground">x{item.quantity}</span>
                          </div>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{order.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>{order.delivery_fee === 0 ? 'FREE' : `₹${order.delivery_fee}`}</span>
                      </div>
                      <div className="flex justify-between font-display font-bold text-lg pt-2">
                        <span>Total</span>
                        <span className="text-primary">₹{order.total_amount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Delivery Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Customer Name</p>
                        <p className="font-medium">{order.customer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{order.customer_phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{order.customer_email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Delivery Address</p>
                        <p className="font-medium">{order.delivery_address}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{order.payment_method}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* No Order Found */}
          {!loading && searched && !order && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="font-display text-xl font-semibold mb-2">Order Not Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find an order with that number. Please check and try again.
              </p>
            </motion.div>
          )}

          {/* Initial State */}
          {!loading && !searched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="font-display text-xl font-semibold mb-2">Track Your Order</h2>
              <p className="text-muted-foreground">
                Enter your order number above to see the current status
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Chatbot />
    </div>
  );
};

export default OrderTrackingPage;
