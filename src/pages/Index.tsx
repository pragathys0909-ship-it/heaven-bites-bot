import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import heroRestaurant from '@/assets/hero-restaurant.jpg';
import northIndianFood from '@/assets/north-indian-food.jpg';
import southIndianFood from '@/assets/south-indian-food.jpg';

const Index = () => {
  const features = [
    { icon: Utensils, title: 'Authentic Cuisine', desc: 'North & South Indian delicacies' },
    { icon: Clock, title: 'Quick Service', desc: 'Fresh food delivered fast' },
    { icon: Star, title: 'Top Quality', desc: 'Premium ingredients always' },
    { icon: MapPin, title: 'Easy Ordering', desc: 'Order online or via chatbot' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative pt-16 md:pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroRestaurant} 
            alt="Hotel Heaven Restaurant" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to{' '}
              <span className="text-gradient-gold">Hotel Heaven</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Experience the finest North & South Indian cuisine. Order online or chat with our AI assistant for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <Button size="lg" className="gradient-burgundy text-lg px-8">
                  View Menu <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-background/50 backdrop-blur-sm">
                Call: +91 98765 43210
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center p-6 h-full border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine Preview with Images */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-gradient-gold">Cuisines</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'North Indian', desc: 'Rich curries, tandoori delights, fluffy naans & aromatic biryanis', image: northIndianFood },
              { name: 'South Indian', desc: 'Crispy dosas, fluffy idlis, spicy curries & authentic filter coffee', image: southIndianFood },
            ].map((cuisine, i) => (
              <motion.div
                key={cuisine.name}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img 
                      src={cuisine.image} 
                      alt={cuisine.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-1">{cuisine.name}</h3>
                      <p className="text-sm text-muted-foreground">{cuisine.desc}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Link to="/menu">
                      <Button className="w-full gradient-burgundy group-hover:opacity-90 transition-opacity">
                        Explore Menu <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Experience <span className="text-gradient-gold">Luxury Dining</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Step into our elegantly designed restaurant where traditional Indian hospitality meets modern comfort
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src={heroRestaurant} 
              alt="Hotel Heaven Interior" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-primary font-display font-bold">30-45 min</span>
                  <p className="text-xs text-muted-foreground">Delivery Time</p>
                </div>
                <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-primary font-display font-bold">Free</span>
                  <p className="text-xs text-muted-foreground">Delivery over ₹300</p>
                </div>
                <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-primary font-display font-bold">4.8★</span>
                  <p className="text-xs text-muted-foreground">Customer Rating</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Index;
