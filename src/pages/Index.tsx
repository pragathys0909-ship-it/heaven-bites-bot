import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, Star, MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import AnimatedBackground from '@/components/AnimatedBackground';
import HeroCarousel from '@/components/HeroCarousel';
import northIndianFood from '@/assets/north-indian-food.jpg';
import southIndianFood from '@/assets/south-indian-food.jpg';
import heroRestaurant from '@/assets/hero-restaurant.jpg';

const Index = () => {
  const features = [
    { icon: Utensils, title: 'Authentic Cuisine', desc: 'North & South Indian delicacies' },
    { icon: Clock, title: 'Quick Service', desc: 'Fresh food delivered fast' },
    { icon: Star, title: 'Top Quality', desc: 'Premium ingredients always' },
    { icon: MapPin, title: 'Easy Ordering', desc: 'Order online or via chatbot' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground variant="home" />
      <Header />
      
      {/* Hero Carousel Section */}
      <section className="relative pt-16 md:pt-20">
        <HeroCarousel />
        
        {/* CTA Buttons overlay */}
        <div className="absolute bottom-20 left-0 right-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Link to="/menu">
                <Button size="lg" className="gradient-burgundy text-lg px-8 w-full sm:w-auto">
                  View Menu <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-background/50 backdrop-blur-sm">
                Call: +91 98765 43210
              </Button>
            </div>
          </div>
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

      {/* Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Find <span className="text-gradient-gold">Us</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Visit our restaurant or order online for delivery
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-96"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31097.87654321!2d79.2833!3d12.7833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d50c6f7e9f3b7%3A0x2d1c4f8b9e7a6c5d!2sArcot%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Heaven Location"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <Card className="p-6 border-border/50">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full gradient-burgundy flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1">Our Address</h3>
                      <p className="text-muted-foreground">
                        15 Main Road, Near Bus Stand<br />
                        Arcot, Ranipet District<br />
                        Tamil Nadu 632503<br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 11:00 AM - 11:00 PM<br />
                        Saturday - Sunday: 10:00 AM - 12:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full gradient-burgundy flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1">Call Us</h3>
                      <p className="text-muted-foreground">
                        +91 98765 43210<br />
                        +91 80 4567 8900
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Contact <span className="text-gradient-gold">Us</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 md:p-8 border-border/50">
                <CardContent className="p-0">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Your Name
                        </label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Your Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us what's on your mind..." 
                        rows={5}
                        className="bg-background resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-burgundy text-lg">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                  <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-6 justify-center">
                    <a 
                      href="mailto:info@hotelheaven.com" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      info@hotelheaven.com
                    </a>
                    <a 
                      href="tel:+919876543210" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      +91 98765 43210
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Index;
