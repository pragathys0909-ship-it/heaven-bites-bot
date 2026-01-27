export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: 1 | 2 | 3;
  portionSize?: 'small' | 'regular' | 'large';
  calories?: number;
  preparationTime?: number; // in minutes
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface CuisineMenu {
  id: string;
  name: string;
  description: string;
  categories: MenuCategory[];
}

export const northIndianMenu: CuisineMenu = {
  id: 'north-indian',
  name: 'North Indian',
  description: 'Rich, aromatic flavors from the heart of India',
  categories: [
    {
      id: 'north-breakfast',
      name: 'Breakfast',
      items: [
        { id: 'nb1', name: 'Aloo Paratha', description: 'Stuffed potato flatbread served with curd & pickle', price: 60, isVeg: true, isPopular: true, portionSize: 'regular', calories: 350, preparationTime: 10 },
        { id: 'nb2', name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy fried bread', price: 80, isVeg: true, isPopular: true, spiceLevel: 2, portionSize: 'large', calories: 520, preparationTime: 15 },
        { id: 'nb3', name: 'Paneer Paratha', description: 'Cottage cheese stuffed paratha with butter', price: 70, isVeg: true, portionSize: 'regular', calories: 380, preparationTime: 12 },
        { id: 'nb4', name: 'Poori Sabzi', description: 'Fried bread with potato curry', price: 55, isVeg: true, portionSize: 'regular', calories: 420, preparationTime: 10 },
        { id: 'nb5', name: 'Bedmi Aloo', description: 'Crispy lentil puri with spiced potatoes', price: 65, isVeg: true, spiceLevel: 2, isChefSpecial: true, portionSize: 'regular', calories: 450, preparationTime: 15 },
        { id: 'nb6', name: 'Lassi (Sweet/Salted)', description: 'Refreshing yogurt drink', price: 40, isVeg: true, portionSize: 'regular', calories: 180, preparationTime: 5 },
      ],
    },
    {
      id: 'north-lunch',
      name: 'Lunch',
      items: [
        { id: 'nl1', name: 'Dal Makhani Thali', description: 'Black lentils, rice, roti, salad & dessert', price: 150, isVeg: true, isPopular: true, portionSize: 'large', calories: 750, preparationTime: 20 },
        { id: 'nl2', name: 'Paneer Butter Masala', description: 'Creamy tomato curry with cottage cheese', price: 180, isVeg: true, isPopular: true, isChefSpecial: true, portionSize: 'regular', calories: 420, preparationTime: 18 },
        { id: 'nl3', name: 'Butter Chicken', description: 'Tender chicken in rich tomato gravy', price: 220, isVeg: false, isPopular: true, isChefSpecial: true, portionSize: 'regular', calories: 490, preparationTime: 20 },
        { id: 'nl4', name: 'Veg Biryani', description: 'Aromatic basmati rice with vegetables', price: 140, isVeg: true, portionSize: 'large', calories: 580, preparationTime: 25 },
        { id: 'nl5', name: 'Chicken Biryani', description: 'Fragrant rice with tender chicken pieces', price: 180, isVeg: false, isPopular: true, portionSize: 'large', calories: 650, preparationTime: 25 },
        { id: 'nl6', name: 'Rajma Chawal', description: 'Kidney beans curry with steamed rice', price: 110, isVeg: true, portionSize: 'regular', calories: 480, preparationTime: 15 },
        { id: 'nl7', name: 'Kadhai Paneer', description: 'Paneer with bell peppers in spicy gravy', price: 170, isVeg: true, spiceLevel: 2, portionSize: 'regular', calories: 380, preparationTime: 18 },
        { id: 'nl8', name: 'Mutton Rogan Josh', description: 'Kashmiri style lamb curry', price: 280, isVeg: false, spiceLevel: 2, isChefSpecial: true, portionSize: 'regular', calories: 520, preparationTime: 30 },
      ],
    },
    {
      id: 'north-dinner',
      name: 'Dinner',
      items: [
        { id: 'nd1', name: 'Tandoori Roti (2 pcs)', description: 'Clay oven baked whole wheat bread', price: 30, isVeg: true, portionSize: 'small', calories: 120, preparationTime: 8 },
        { id: 'nd2', name: 'Butter Naan (2 pcs)', description: 'Soft leavened bread with butter', price: 50, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 8 },
        { id: 'nd3', name: 'Shahi Paneer', description: 'Royal paneer in cashew cream sauce', price: 200, isVeg: true, isPopular: true, isChefSpecial: true, portionSize: 'regular', calories: 450, preparationTime: 20 },
        { id: 'nd4', name: 'Tandoori Chicken', description: 'Spiced chicken grilled in tandoor', price: 250, isVeg: false, isPopular: true, spiceLevel: 2, portionSize: 'large', calories: 380, preparationTime: 25 },
        { id: 'nd5', name: 'Dal Tadka', description: 'Yellow lentils tempered with spices', price: 120, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 12 },
        { id: 'nd6', name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy', price: 170, isVeg: true, portionSize: 'regular', calories: 350, preparationTime: 18 },
        { id: 'nd7', name: 'Chicken Tikka Masala', description: 'Grilled chicken in spiced tomato gravy', price: 240, isVeg: false, spiceLevel: 2, portionSize: 'regular', calories: 420, preparationTime: 22 },
        { id: 'nd8', name: 'Mixed Veg Curry', description: 'Seasonal vegetables in aromatic gravy', price: 130, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 15 },
      ],
    },
    {
      id: 'north-snacks',
      name: 'Snacks',
      items: [
        { id: 'ns1', name: 'Samosa (2 pcs)', description: 'Crispy pastry with spiced potato filling', price: 30, isVeg: true, isPopular: true, portionSize: 'small', calories: 250, preparationTime: 5 },
        { id: 'ns2', name: 'Aloo Tikki', description: 'Crispy potato patties with chutneys', price: 40, isVeg: true, portionSize: 'small', calories: 220, preparationTime: 8 },
        { id: 'ns3', name: 'Papdi Chaat', description: 'Crispy wafers with yogurt & chutneys', price: 50, isVeg: true, isPopular: true, portionSize: 'regular', calories: 280, preparationTime: 8 },
        { id: 'ns4', name: 'Dahi Bhalla', description: 'Lentil dumplings in creamy yogurt', price: 55, isVeg: true, portionSize: 'regular', calories: 260, preparationTime: 10 },
        { id: 'ns5', name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: 140, isVeg: true, spiceLevel: 1, isChefSpecial: true, portionSize: 'regular', calories: 320, preparationTime: 15 },
        { id: 'ns6', name: 'Chicken Seekh Kebab', description: 'Minced chicken kebabs', price: 160, isVeg: false, spiceLevel: 2, portionSize: 'regular', calories: 280, preparationTime: 18 },
        { id: 'ns7', name: 'Gol Gappe (6 pcs)', description: 'Crispy puris with tangy water', price: 35, isVeg: true, portionSize: 'small', calories: 150, preparationTime: 5 },
        { id: 'ns8', name: 'Bread Pakora', description: 'Spiced potato stuffed bread fritters', price: 45, isVeg: true, portionSize: 'small', calories: 280, preparationTime: 8 },
      ],
    },
    {
      id: 'north-beverages',
      name: 'Beverages',
      items: [
        { id: 'nbv1', name: 'Masala Chai', description: 'Aromatic spiced Indian tea', price: 25, isVeg: true, isPopular: true, portionSize: 'regular', calories: 80, preparationTime: 5 },
        { id: 'nbv2', name: 'Mango Lassi', description: 'Sweet mango yogurt smoothie', price: 50, isVeg: true, isPopular: true, portionSize: 'regular', calories: 220, preparationTime: 5 },
        { id: 'nbv3', name: 'Rose Sharbat', description: 'Refreshing rose-flavored drink', price: 35, isVeg: true, portionSize: 'regular', calories: 120, preparationTime: 3 },
        { id: 'nbv4', name: 'Thandai', description: 'Chilled milk with nuts & spices', price: 60, isVeg: true, isChefSpecial: true, portionSize: 'regular', calories: 280, preparationTime: 8 },
        { id: 'nbv5', name: 'Jal Jeera', description: 'Tangy cumin-flavored drink', price: 30, isVeg: true, portionSize: 'regular', calories: 40, preparationTime: 5 },
        { id: 'nbv6', name: 'Badam Milk', description: 'Warm almond milk with saffron', price: 55, isVeg: true, portionSize: 'regular', calories: 240, preparationTime: 8 },
      ],
    },
    {
      id: 'north-desserts',
      name: 'Desserts',
      items: [
        { id: 'nds1', name: 'Gulab Jamun (2 pcs)', description: 'Soft milk dumplings in rose syrup', price: 50, isVeg: true, isPopular: true, portionSize: 'regular', calories: 320, preparationTime: 5 },
        { id: 'nds2', name: 'Rasmalai (2 pcs)', description: 'Cottage cheese patties in saffron milk', price: 70, isVeg: true, isChefSpecial: true, portionSize: 'regular', calories: 280, preparationTime: 5 },
        { id: 'nds3', name: 'Gajar Ka Halwa', description: 'Warm carrot pudding with nuts', price: 60, isVeg: true, isPopular: true, portionSize: 'regular', calories: 350, preparationTime: 8 },
        { id: 'nds4', name: 'Kheer', description: 'Creamy rice pudding with cardamom', price: 55, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 8 },
        { id: 'nds5', name: 'Jalebi (4 pcs)', description: 'Crispy spirals in sugar syrup', price: 40, isVeg: true, portionSize: 'small', calories: 250, preparationTime: 5 },
        { id: 'nds6', name: 'Kulfi', description: 'Traditional Indian ice cream', price: 45, isVeg: true, isChefSpecial: true, portionSize: 'regular', calories: 220, preparationTime: 5 },
      ],
    },
  ],
};

export const southIndianMenu: CuisineMenu = {
  id: 'south-indian',
  name: 'South Indian',
  description: 'Light, flavorful dishes from Southern India',
  categories: [
    {
      id: 'south-breakfast',
      name: 'Breakfast',
      items: [
        { id: 'sb1', name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling', price: 70, isVeg: true, isPopular: true, isChefSpecial: true, portionSize: 'large', calories: 380, preparationTime: 12 },
        { id: 'sb2', name: 'Idli Sambar (3 pcs)', description: 'Steamed rice cakes with lentil soup', price: 50, isVeg: true, isPopular: true, portionSize: 'regular', calories: 280, preparationTime: 10 },
        { id: 'sb3', name: 'Vada Sambar (2 pcs)', description: 'Crispy lentil donuts with sambar', price: 55, isVeg: true, portionSize: 'regular', calories: 320, preparationTime: 10 },
        { id: 'sb4', name: 'Plain Dosa', description: 'Thin crispy rice crepe', price: 50, isVeg: true, portionSize: 'regular', calories: 220, preparationTime: 8 },
        { id: 'sb5', name: 'Rava Dosa', description: 'Crispy semolina crepe', price: 65, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 10 },
        { id: 'sb6', name: 'Pongal', description: 'Savory rice & lentil porridge', price: 60, isVeg: true, portionSize: 'regular', calories: 350, preparationTime: 12 },
        { id: 'sb7', name: 'Upma', description: 'Savory semolina with vegetables', price: 45, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 10 },
        { id: 'sb8', name: 'Filter Coffee', description: 'Traditional South Indian coffee', price: 30, isVeg: true, isPopular: true, portionSize: 'regular', calories: 80, preparationTime: 5 },
      ],
    },
    {
      id: 'south-lunch',
      name: 'Lunch',
      items: [
        { id: 'sl1', name: 'South Indian Thali', description: 'Rice, sambar, rasam, poriyal, curd & papad', price: 130, isVeg: true, isPopular: true, portionSize: 'large', calories: 720, preparationTime: 20 },
        { id: 'sl2', name: 'Curd Rice', description: 'Yogurt rice with tempering', price: 70, isVeg: true, portionSize: 'regular', calories: 350, preparationTime: 8 },
        { id: 'sl3', name: 'Lemon Rice', description: 'Tangy rice with peanuts & curry leaves', price: 80, isVeg: true, portionSize: 'regular', calories: 380, preparationTime: 10 },
        { id: 'sl4', name: 'Sambar Rice', description: 'Rice mixed with spiced lentil stew', price: 90, isVeg: true, portionSize: 'regular', calories: 420, preparationTime: 12 },
        { id: 'sl5', name: 'Hyderabadi Veg Biryani', description: 'Aromatic rice with vegetables & spices', price: 140, isVeg: true, portionSize: 'large', calories: 580, preparationTime: 25 },
        { id: 'sl6', name: 'Hyderabadi Chicken Biryani', description: 'Famous Hyderabadi style dum biryani', price: 180, isVeg: false, isPopular: true, isChefSpecial: true, spiceLevel: 2, portionSize: 'large', calories: 680, preparationTime: 30 },
        { id: 'sl7', name: 'Andhra Chicken Curry', description: 'Spicy Andhra style chicken', price: 200, isVeg: false, spiceLevel: 3, portionSize: 'regular', calories: 420, preparationTime: 25 },
        { id: 'sl8', name: 'Kerala Fish Curry', description: 'Tangy coconut fish curry', price: 220, isVeg: false, spiceLevel: 2, isChefSpecial: true, portionSize: 'regular', calories: 380, preparationTime: 22 },
      ],
    },
    {
      id: 'south-dinner',
      name: 'Dinner',
      items: [
        { id: 'sd1', name: 'Set Dosa (3 pcs)', description: 'Soft spongy dosas with chutney', price: 60, isVeg: true, portionSize: 'regular', calories: 320, preparationTime: 12 },
        { id: 'sd2', name: 'Appam with Stew', description: 'Lacy rice pancake with vegetable stew', price: 90, isVeg: true, isChefSpecial: true, portionSize: 'regular', calories: 380, preparationTime: 15 },
        { id: 'sd3', name: 'Malabar Parotta (2 pcs)', description: 'Flaky layered flatbread', price: 50, isVeg: true, portionSize: 'regular', calories: 350, preparationTime: 10 },
        { id: 'sd4', name: 'Kerala Chicken Curry', description: 'Coconut based chicken curry', price: 190, isVeg: false, isPopular: true, portionSize: 'regular', calories: 420, preparationTime: 22 },
        { id: 'sd5', name: 'Chettinad Chicken', description: 'Fiery South Indian chicken curry', price: 210, isVeg: false, spiceLevel: 3, isPopular: true, isChefSpecial: true, portionSize: 'regular', calories: 450, preparationTime: 25 },
        { id: 'sd6', name: 'Mysore Masala Dosa', description: 'Dosa with spicy red chutney', price: 85, isVeg: true, spiceLevel: 2, portionSize: 'large', calories: 420, preparationTime: 12 },
        { id: 'sd7', name: 'Ghee Roast Dosa', description: 'Crispy dosa roasted in ghee', price: 80, isVeg: true, portionSize: 'large', calories: 380, preparationTime: 12 },
        { id: 'sd8', name: 'Uttapam', description: 'Thick rice pancake with toppings', price: 70, isVeg: true, portionSize: 'regular', calories: 320, preparationTime: 12 },
      ],
    },
    {
      id: 'south-snacks',
      name: 'Snacks',
      items: [
        { id: 'ss1', name: 'Medu Vada (2 pcs)', description: 'Crispy lentil fritters', price: 40, isVeg: true, isPopular: true, portionSize: 'small', calories: 220, preparationTime: 8 },
        { id: 'ss2', name: 'Bonda (3 pcs)', description: 'Spiced potato fritters', price: 35, isVeg: true, portionSize: 'small', calories: 280, preparationTime: 8 },
        { id: 'ss3', name: 'Bajji (4 pcs)', description: 'Crispy vegetable fritters', price: 40, isVeg: true, portionSize: 'small', calories: 250, preparationTime: 8 },
        { id: 'ss4', name: 'Murukku', description: 'Crunchy spiral savory', price: 30, isVeg: true, portionSize: 'small', calories: 180, preparationTime: 5 },
        { id: 'ss5', name: 'Masala Vadai', description: 'Spicy lentil fritters with onion', price: 45, isVeg: true, spiceLevel: 2, portionSize: 'small', calories: 260, preparationTime: 10 },
        { id: 'ss6', name: 'Banana Chips', description: 'Crispy Kerala banana chips', price: 35, isVeg: true, portionSize: 'small', calories: 220, preparationTime: 5 },
        { id: 'ss7', name: 'Pepper Chicken Dry', description: 'Spicy dry chicken with pepper', price: 150, isVeg: false, spiceLevel: 2, isChefSpecial: true, portionSize: 'regular', calories: 320, preparationTime: 18 },
        { id: 'ss8', name: 'Paniyaram (6 pcs)', description: 'Sweet or savory rice dumplings', price: 50, isVeg: true, portionSize: 'regular', calories: 280, preparationTime: 12 },
      ],
    },
    {
      id: 'south-beverages',
      name: 'Beverages',
      items: [
        { id: 'sbv1', name: 'Filter Coffee', description: 'Strong South Indian filter coffee', price: 30, isVeg: true, isPopular: true, portionSize: 'regular', calories: 80, preparationTime: 5 },
        { id: 'sbv2', name: 'Buttermilk', description: 'Spiced chilled buttermilk', price: 25, isVeg: true, portionSize: 'regular', calories: 60, preparationTime: 3 },
        { id: 'sbv3', name: 'Coconut Water', description: 'Fresh tender coconut water', price: 40, isVeg: true, portionSize: 'regular', calories: 50, preparationTime: 2 },
        { id: 'sbv4', name: 'Nannari Sharbat', description: 'Sweet sarsaparilla root drink', price: 35, isVeg: true, portionSize: 'regular', calories: 120, preparationTime: 3 },
        { id: 'sbv5', name: 'Panakam', description: 'Traditional jaggery drink with ginger', price: 30, isVeg: true, isChefSpecial: true, portionSize: 'regular', calories: 140, preparationTime: 5 },
        { id: 'sbv6', name: 'Sukku Coffee', description: 'Medicinal dry ginger coffee', price: 35, isVeg: true, portionSize: 'regular', calories: 70, preparationTime: 5 },
      ],
    },
    {
      id: 'south-desserts',
      name: 'Desserts',
      items: [
        { id: 'sds1', name: 'Payasam', description: 'Creamy vermicelli pudding', price: 50, isVeg: true, isPopular: true, portionSize: 'regular', calories: 280, preparationTime: 8 },
        { id: 'sds2', name: 'Mysore Pak', description: 'Rich gram flour fudge with ghee', price: 45, isVeg: true, isChefSpecial: true, portionSize: 'small', calories: 320, preparationTime: 5 },
        { id: 'sds3', name: 'Kesari Bath', description: 'Saffron semolina halwa', price: 40, isVeg: true, isPopular: true, portionSize: 'regular', calories: 260, preparationTime: 8 },
        { id: 'sds4', name: 'Banana Sheera', description: 'Semolina pudding with banana', price: 45, isVeg: true, portionSize: 'regular', calories: 240, preparationTime: 8 },
        { id: 'sds5', name: 'Rava Kesari', description: 'Orange-tinted semolina sweet', price: 35, isVeg: true, portionSize: 'small', calories: 220, preparationTime: 5 },
        { id: 'sds6', name: 'Double Ka Meetha', description: 'Hyderabadi bread pudding', price: 60, isVeg: true, isChefSpecial: true, portionSize: 'regular', calories: 350, preparationTime: 10 },
      ],
    },
  ],
};

export const allMenus = [northIndianMenu, southIndianMenu];
