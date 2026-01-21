import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';

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
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-burgundy opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to{' '}
              <span className="text-gradient-gold">Hotel Heaven</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Experience the finest North & South Indian cuisine. Order online or chat with our AI assistant for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg" className="gradient-burgundy text-lg px-8">
                  View Menu <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
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

      {/* Cuisine Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-gradient-gold">Cuisines</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'North Indian', desc: 'Rich curries, tandoori delights, fluffy naans & aromatic biryanis', emoji: '🍛' },
              { name: 'South Indian', desc: 'Crispy dosas, fluffy idlis, spicy curries & authentic filter coffee', emoji: '🥘' },
            ].map((cuisine, i) => (
              <motion.div
                key={cuisine.name}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className="text-6xl">{cuisine.emoji}</div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">{cuisine.name}</h3>
                      <p className="text-muted-foreground mb-4">{cuisine.desc}</p>
                      <Link to="/menu">
                        <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Explore Menu <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Index;
