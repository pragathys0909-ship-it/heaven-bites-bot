import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { allMenus, MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import chefAvatar from '@/assets/chef-avatar.png';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  items?: MenuItem[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to Hotel Heaven! 🙏 I'm your food assistant. I can help you with:\n\n• Browse our menu (North & South Indian)\n• Check prices\n• Place orders\n• Answer your questions\n\nHow can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition error. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error('Voice recognition not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const findMenuItems = (query: string): MenuItem[] => {
    const lowerQuery = query.toLowerCase();
    const results: MenuItem[] = [];
    
    allMenus.forEach((cuisine) => {
      cuisine.categories.forEach((category) => {
        category.items.forEach((item) => {
          if (
            item.name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
          ) {
            results.push(item);
          }
        });
      });
    });
    
    return results.slice(0, 5);
  };

  const getCategoryItems = (categoryName: string, cuisineType?: string): MenuItem[] => {
    const results: MenuItem[] = [];
    const lowerCategory = categoryName.toLowerCase();
    
    allMenus.forEach((cuisine) => {
      if (cuisineType && !cuisine.id.toLowerCase().includes(cuisineType.toLowerCase())) {
        return;
      }
      cuisine.categories.forEach((category) => {
        if (category.name.toLowerCase().includes(lowerCategory)) {
          results.push(...category.items.slice(0, 4));
        }
      });
    });
    
    return results;
  };

  const processMessage = (userMessage: string): { text: string; items?: MenuItem[] } => {
    const lower = userMessage.toLowerCase();
    
    // Greetings
    if (lower.match(/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)/)) {
      return {
        text: "Namaste! 🙏 Welcome to Hotel Heaven! How can I assist you today? Would you like to see our menu or check prices?",
      };
    }
    
    // Menu requests
    if (lower.includes('menu') || lower.includes('what do you have') || lower.includes('show me')) {
      if (lower.includes('north')) {
        const items = getCategoryItems('', 'north');
        return {
          text: "Here's a taste of our North Indian specialties! 🍛 We have delicious Parathas, Dal Makhani, Butter Chicken, and much more. What would you like to try?",
          items,
        };
      }
      if (lower.includes('south')) {
        const items = getCategoryItems('', 'south');
        return {
          text: "Here's a selection from our South Indian kitchen! 🥘 We offer authentic Dosas, Idlis, Biryanis, and more. What catches your eye?",
          items,
        };
      }
      return {
        text: "We have two amazing cuisines:\n\n🍛 **North Indian** - Rich curries, parathas, biryanis, and kebabs\n\n🥘 **South Indian** - Crispy dosas, fluffy idlis, and spicy curries\n\nWhich cuisine would you like to explore?",
      };
    }
    
    // Category-specific requests
    if (lower.includes('breakfast')) {
      const cuisineType = lower.includes('north') ? 'north' : lower.includes('south') ? 'south' : undefined;
      const items = getCategoryItems('breakfast', cuisineType);
      return {
        text: `Here are our breakfast options${cuisineType ? ` from ${cuisineType} Indian cuisine` : ''}! 🌅`,
        items,
      };
    }
    
    if (lower.includes('lunch')) {
      const cuisineType = lower.includes('north') ? 'north' : lower.includes('south') ? 'south' : undefined;
      const items = getCategoryItems('lunch', cuisineType);
      return {
        text: `Check out our delicious lunch options${cuisineType ? ` from ${cuisineType} Indian cuisine` : ''}! 🍽️`,
        items,
      };
    }
    
    if (lower.includes('dinner')) {
      const cuisineType = lower.includes('north') ? 'north' : lower.includes('south') ? 'south' : undefined;
      const items = getCategoryItems('dinner', cuisineType);
      return {
        text: `Here are our dinner specialties${cuisineType ? ` from ${cuisineType} Indian cuisine` : ''}! 🌙`,
        items,
      };
    }
    
    if (lower.includes('snack')) {
      const cuisineType = lower.includes('north') ? 'north' : lower.includes('south') ? 'south' : undefined;
      const items = getCategoryItems('snacks', cuisineType);
      return {
        text: `Perfect for a quick bite! Here are our snacks${cuisineType ? ` from ${cuisineType} Indian cuisine` : ''}! 🍿`,
        items,
      };
    }
    
    // Price inquiries
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('rate')) {
      const searchTerms = lower.replace(/price|cost|how much|rate|what is|the|of|for/gi, '').trim();
      if (searchTerms.length > 2) {
        const items = findMenuItems(searchTerms);
        if (items.length > 0) {
          const priceList = items.map(item => `• ${item.name}: ₹${item.price}`).join('\n');
          return {
            text: `Here are the prices:\n\n${priceList}\n\nWould you like to add any of these to your cart?`,
            items,
          };
        }
      }
      return {
        text: "Our prices are very affordable! 💰\n\n• Breakfast items: ₹30 - ₹80\n• Lunch items: ₹70 - ₹280\n• Dinner items: ₹30 - ₹250\n• Snacks: ₹30 - ₹160\n\nWhat dish would you like to know the price of?",
      };
    }
    
    // Popular items
    if (lower.includes('popular') || lower.includes('best') || lower.includes('recommend') || lower.includes('special')) {
      const popularItems: MenuItem[] = [];
      allMenus.forEach((cuisine) => {
        cuisine.categories.forEach((category) => {
          category.items.forEach((item) => {
            if (item.isPopular) {
              popularItems.push(item);
            }
          });
        });
      });
      return {
        text: "Here are our most loved dishes! ⭐ These are customer favorites:",
        items: popularItems.slice(0, 6),
      };
    }
    
    // Vegetarian options
    if (lower.includes('veg') && !lower.includes('non')) {
      const vegItems: MenuItem[] = [];
      allMenus.forEach((cuisine) => {
        cuisine.categories.forEach((category) => {
          category.items.forEach((item) => {
            if (item.isVeg) {
              vegItems.push(item);
            }
          });
        });
      });
      return {
        text: "Here are some delicious vegetarian options! 🥬",
        items: vegItems.slice(0, 6),
      };
    }
    
    // Non-veg options
    if (lower.includes('non-veg') || lower.includes('nonveg') || lower.includes('chicken') || lower.includes('mutton') || lower.includes('fish')) {
      const nonVegItems: MenuItem[] = [];
      allMenus.forEach((cuisine) => {
        cuisine.categories.forEach((category) => {
          category.items.forEach((item) => {
            if (!item.isVeg) {
              nonVegItems.push(item);
            }
          });
        });
      });
      return {
        text: "Here are our non-vegetarian specialties! 🍗",
        items: nonVegItems.slice(0, 6),
      };
    }
    
    // Order/Cart related
    if (lower.includes('order') || lower.includes('add') || lower.includes('cart') || lower.includes('buy')) {
      return {
        text: "To place an order:\n\n1. Browse our menu\n2. Click 'Add' on items you like\n3. Go to Cart to review\n4. Complete your order\n\nYou can also tell me what you'd like to order, and I'll help you add it to your cart! 🛒",
      };
    }
    
    // Help
    if (lower.includes('help') || lower.includes('support') || lower.includes('contact')) {
      return {
        text: "I'm here to help! 🤝\n\n📞 Call us: +91 98765 43210\n🕐 Hours: 7 AM - 11 PM\n📍 Location: Hotel Heaven, Main Road\n\nYou can also ask me about:\n• Our menu & prices\n• Place orders\n• Dietary preferences",
      };
    }
    
    // Thank you
    if (lower.includes('thank') || lower.includes('thanks')) {
      return {
        text: "You're welcome! 🙏 It's my pleasure to serve you. Is there anything else I can help you with?",
      };
    }
    
    // Search for specific items
    const searchResults = findMenuItems(userMessage);
    if (searchResults.length > 0) {
      return {
        text: `I found these items matching "${userMessage}":`,
        items: searchResults,
      };
    }
    
    // Default response
    return {
      text: "I'm not sure I understood that. 🤔 You can ask me about:\n\n• Our menu (North/South Indian)\n• Food prices\n• Popular dishes\n• Veg/Non-veg options\n• How to order\n\nOr just tell me what you're craving!",
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = processMessage(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      isBot: true,
      timestamp: new Date(),
      items: response.items,
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
    
    // Speak the response (without menu items for brevity)
    const speakText = response.text.replace(/[*#]/g, '').substring(0, 200);
    speak(speakText);
  };

  const handleAddFromChat = (item: MenuItem) => {
    addItem({ ...item, cuisineId: 'chat' });
    toast.success(`${item.name} added to cart!`, {
      description: `₹${item.price}`,
    });
  };

  return (
    <>
      {/* Chat Toggle Button - Chef Avatar */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* White circular border with soft shadow */}
          <div className="w-16 h-16 rounded-full bg-white p-1 shadow-xl ring-2 ring-primary/20">
            <img 
              src={chefAvatar} 
              alt="Chef Bot" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px]"
          >
            <Card className="overflow-hidden shadow-2xl border-2 border-border">
              {/* Header */}
              <div className="gradient-burgundy p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-white p-0.5 ring-2 ring-primary-foreground/30">
                      <img 
                        src={chefAvatar} 
                        alt="Chef Bot" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-primary-foreground">Chef Bot</h3>
                    <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="h-[350px] p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.isBot
                            ? 'bg-muted text-foreground rounded-bl-sm'
                            : 'gradient-burgundy text-primary-foreground rounded-br-sm'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        
                        {message.items && message.items.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.items.map((item) => (
                              <div
                                key={item.id}
                                className="bg-background/90 rounded-lg p-2 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">₹{item.price}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => handleAddFromChat(item)}
                                  className="h-7 text-xs shrink-0"
                                >
                                  Add
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="icon"
                    onClick={toggleListening}
                    className={isListening ? 'gradient-gold animate-pulse' : ''}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isListening ? "Listening..." : "Type or speak..."}
                    className="flex-1"
                    disabled={isListening}
                  />
                  
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="gradient-burgundy"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {isListening && (
                  <p className="text-xs text-center text-muted-foreground mt-2 animate-pulse">
                    🎤 Listening... Speak now
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
