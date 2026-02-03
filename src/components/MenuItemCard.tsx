import { motion } from 'framer-motion';
import { Plus, Flame, Clock, ChefHat, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { getFoodImage } from '@/data/foodImages';

interface MenuItemCardProps {
  item: MenuItem;
  cuisineId: string;
}

const MenuItemCard = ({ item, cuisineId }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const foodImage = getFoodImage(item.id);

  const handleAddToCart = () => {
    addItem({ ...item, cuisineId });
    toast.success(`${item.name} added to cart!`, {
      description: `₹${item.price}`,
    });
  };

  const getPortionLabel = (size?: string) => {
    switch (size) {
      case 'small': return 'S';
      case 'large': return 'L';
      default: return 'R';
    }
  };

  const getPortionColor = (size?: string) => {
    switch (size) {
      case 'small': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'large': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 relative">
        {/* Chef's Special Ribbon */}
        {item.isChefSpecial && (
          <div className="absolute top-0 right-0 z-10">
            <div className="gradient-gold text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-md">
              <ChefHat className="w-3 h-3" />
              Chef's Special
            </div>
          </div>
        )}

        {/* Food Image */}
        {foodImage && (
          <div className="relative h-36 md:h-40 overflow-hidden">
            <img
              src={foodImage}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              {/* Veg/Non-veg indicator + badges row */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center shrink-0 ${
                  item.isVeg ? 'border-green-600' : 'border-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    item.isVeg ? 'bg-green-600' : 'bg-red-600'
                  }`} />
                </div>
                
                {item.isPopular && (
                  <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">
                    Popular
                  </Badge>
                )}

                {item.portionSize && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPortionColor(item.portionSize)}`}>
                    {getPortionLabel(item.portionSize)}
                  </span>
                )}
              </div>
              
              <h3 className="font-display font-bold text-lg md:text-xl text-foreground leading-tight pr-2">
                {item.name}
              </h3>
              
              <p className="text-base text-muted-foreground line-clamp-2 mt-1.5">
                {item.description}
              </p>
              
              {/* Meta info row */}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {item.spiceLevel && (
                  <div className="flex items-center gap-0.5" title={`Spice Level: ${item.spiceLevel}/3`}>
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="w-3 h-3 text-spice" />
                    ))}
                  </div>
                )}

                {item.preparationTime && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {item.preparationTime}m
                  </div>
                )}

                {item.calories && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Utensils className="w-3 h-3" />
                    {item.calories}cal
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="font-display font-bold text-xl md:text-2xl text-primary">
                ₹{item.price}
              </span>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="gradient-burgundy hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MenuItemCard;
