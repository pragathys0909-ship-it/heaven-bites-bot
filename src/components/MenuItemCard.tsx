import { motion } from 'framer-motion';
import { Plus, Flame, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface MenuItemCardProps {
  item: MenuItem;
  cuisineId: string;
}

const MenuItemCard = ({ item, cuisineId }: MenuItemCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ ...item, cuisineId });
    toast.success(`${item.name} added to cart!`, {
      description: `₹${item.price}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-border/50">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
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
              </div>
              
              <h3 className="font-display font-semibold text-foreground truncate">
                {item.name}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                {item.spiceLevel && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="w-3 h-3 text-spice" />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className="font-display font-bold text-lg text-primary">
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
