import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import MenuItemCard from '@/components/MenuItemCard';
import { northIndianMenu, southIndianMenu } from '@/data/menuData';

const MenuPage = () => {
  const [activeCuisine, setActiveCuisine] = useState('north-indian');
  const [activeCategory, setActiveCategory] = useState('breakfast');

  const currentMenu = activeCuisine === 'north-indian' ? northIndianMenu : southIndianMenu;
  const currentCategory = currentMenu.categories.find(c => c.id.includes(activeCategory));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Our <span className="text-gradient-gold">Menu</span>
            </h1>
            <p className="text-muted-foreground">Authentic flavors, affordable prices</p>
          </motion.div>

          {/* Cuisine Tabs */}
          <Tabs value={activeCuisine} onValueChange={setActiveCuisine} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="north-indian" className="font-display">🍛 North Indian</TabsTrigger>
              <TabsTrigger value="south-indian" className="font-display">🥘 South Indian</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="flex w-full max-w-lg mx-auto">
              <TabsTrigger value="breakfast" className="flex-1">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch" className="flex-1">Lunch</TabsTrigger>
              <TabsTrigger value="dinner" className="flex-1">Dinner</TabsTrigger>
              <TabsTrigger value="snacks" className="flex-1">Snacks</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Menu Items */}
          <motion.div
            key={`${activeCuisine}-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {currentCategory?.items.map((item) => (
              <MenuItemCard key={item.id} item={item} cuisineId={activeCuisine} />
            ))}
          </motion.div>
        </div>
      </main>

      <Chatbot />
    </div>
  );
};

export default MenuPage;
