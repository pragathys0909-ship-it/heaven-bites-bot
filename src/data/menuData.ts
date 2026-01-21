export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
  spiceLevel?: 1 | 2 | 3;
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
        { id: 'nb1', name: 'Aloo Paratha', description: 'Stuffed potato flatbread served with curd & pickle', price: 60, isVeg: true, isPopular: true },
        { id: 'nb2', name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy fried bread', price: 80, isVeg: true, isPopular: true, spiceLevel: 2 },
        { id: 'nb3', name: 'Paneer Paratha', description: 'Cottage cheese stuffed paratha with butter', price: 70, isVeg: true },
        { id: 'nb4', name: 'Poori Sabzi', description: 'Fried bread with potato curry', price: 55, isVeg: true },
        { id: 'nb5', name: 'Bedmi Aloo', description: 'Crispy lentil puri with spiced potatoes', price: 65, isVeg: true, spiceLevel: 2 },
        { id: 'nb6', name: 'Lassi (Sweet/Salted)', description: 'Refreshing yogurt drink', price: 40, isVeg: true },
      ],
    },
    {
      id: 'north-lunch',
      name: 'Lunch',
      items: [
        { id: 'nl1', name: 'Dal Makhani Thali', description: 'Black lentils, rice, roti, salad & dessert', price: 150, isVeg: true, isPopular: true },
        { id: 'nl2', name: 'Paneer Butter Masala', description: 'Creamy tomato curry with cottage cheese', price: 180, isVeg: true, isPopular: true },
        { id: 'nl3', name: 'Butter Chicken', description: 'Tender chicken in rich tomato gravy', price: 220, isVeg: false, isPopular: true },
        { id: 'nl4', name: 'Veg Biryani', description: 'Aromatic basmati rice with vegetables', price: 140, isVeg: true },
        { id: 'nl5', name: 'Chicken Biryani', description: 'Fragrant rice with tender chicken pieces', price: 180, isVeg: false, isPopular: true },
        { id: 'nl6', name: 'Rajma Chawal', description: 'Kidney beans curry with steamed rice', price: 110, isVeg: true },
        { id: 'nl7', name: 'Kadhai Paneer', description: 'Paneer with bell peppers in spicy gravy', price: 170, isVeg: true, spiceLevel: 2 },
        { id: 'nl8', name: 'Mutton Rogan Josh', description: 'Kashmiri style lamb curry', price: 280, isVeg: false, spiceLevel: 2 },
      ],
    },
    {
      id: 'north-dinner',
      name: 'Dinner',
      items: [
        { id: 'nd1', name: 'Tandoori Roti (2 pcs)', description: 'Clay oven baked whole wheat bread', price: 30, isVeg: true },
        { id: 'nd2', name: 'Butter Naan (2 pcs)', description: 'Soft leavened bread with butter', price: 50, isVeg: true },
        { id: 'nd3', name: 'Shahi Paneer', description: 'Royal paneer in cashew cream sauce', price: 200, isVeg: true, isPopular: true },
        { id: 'nd4', name: 'Tandoori Chicken', description: 'Spiced chicken grilled in tandoor', price: 250, isVeg: false, isPopular: true, spiceLevel: 2 },
        { id: 'nd5', name: 'Dal Tadka', description: 'Yellow lentils tempered with spices', price: 120, isVeg: true },
        { id: 'nd6', name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy', price: 170, isVeg: true },
        { id: 'nd7', name: 'Chicken Tikka Masala', description: 'Grilled chicken in spiced tomato gravy', price: 240, isVeg: false, spiceLevel: 2 },
        { id: 'nd8', name: 'Mixed Veg Curry', description: 'Seasonal vegetables in aromatic gravy', price: 130, isVeg: true },
      ],
    },
    {
      id: 'north-snacks',
      name: 'Snacks',
      items: [
        { id: 'ns1', name: 'Samosa (2 pcs)', description: 'Crispy pastry with spiced potato filling', price: 30, isVeg: true, isPopular: true },
        { id: 'ns2', name: 'Aloo Tikki', description: 'Crispy potato patties with chutneys', price: 40, isVeg: true },
        { id: 'ns3', name: 'Papdi Chaat', description: 'Crispy wafers with yogurt & chutneys', price: 50, isVeg: true, isPopular: true },
        { id: 'ns4', name: 'Dahi Bhalla', description: 'Lentil dumplings in creamy yogurt', price: 55, isVeg: true },
        { id: 'ns5', name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: 140, isVeg: true, spiceLevel: 1 },
        { id: 'ns6', name: 'Chicken Seekh Kebab', description: 'Minced chicken kebabs', price: 160, isVeg: false, spiceLevel: 2 },
        { id: 'ns7', name: 'Gol Gappe (6 pcs)', description: 'Crispy puris with tangy water', price: 35, isVeg: true },
        { id: 'ns8', name: 'Bread Pakora', description: 'Spiced potato stuffed bread fritters', price: 45, isVeg: true },
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
        { id: 'sb1', name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling', price: 70, isVeg: true, isPopular: true },
        { id: 'sb2', name: 'Idli Sambar (3 pcs)', description: 'Steamed rice cakes with lentil soup', price: 50, isVeg: true, isPopular: true },
        { id: 'sb3', name: 'Vada Sambar (2 pcs)', description: 'Crispy lentil donuts with sambar', price: 55, isVeg: true },
        { id: 'sb4', name: 'Plain Dosa', description: 'Thin crispy rice crepe', price: 50, isVeg: true },
        { id: 'sb5', name: 'Rava Dosa', description: 'Crispy semolina crepe', price: 65, isVeg: true },
        { id: 'sb6', name: 'Pongal', description: 'Savory rice & lentil porridge', price: 60, isVeg: true },
        { id: 'sb7', name: 'Upma', description: 'Savory semolina with vegetables', price: 45, isVeg: true },
        { id: 'sb8', name: 'Filter Coffee', description: 'Traditional South Indian coffee', price: 30, isVeg: true, isPopular: true },
      ],
    },
    {
      id: 'south-lunch',
      name: 'Lunch',
      items: [
        { id: 'sl1', name: 'South Indian Thali', description: 'Rice, sambar, rasam, poriyal, curd & papad', price: 130, isVeg: true, isPopular: true },
        { id: 'sl2', name: 'Curd Rice', description: 'Yogurt rice with tempering', price: 70, isVeg: true },
        { id: 'sl3', name: 'Lemon Rice', description: 'Tangy rice with peanuts & curry leaves', price: 80, isVeg: true },
        { id: 'sl4', name: 'Sambar Rice', description: 'Rice mixed with spiced lentil stew', price: 90, isVeg: true },
        { id: 'sl5', name: 'Hyderabadi Veg Biryani', description: 'Aromatic rice with vegetables & spices', price: 140, isVeg: true },
        { id: 'sl6', name: 'Hyderabadi Chicken Biryani', description: 'Famous Hyderabadi style dum biryani', price: 180, isVeg: false, isPopular: true, spiceLevel: 2 },
        { id: 'sl7', name: 'Andhra Chicken Curry', description: 'Spicy Andhra style chicken', price: 200, isVeg: false, spiceLevel: 3 },
        { id: 'sl8', name: 'Kerala Fish Curry', description: 'Tangy coconut fish curry', price: 220, isVeg: false, spiceLevel: 2 },
      ],
    },
    {
      id: 'south-dinner',
      name: 'Dinner',
      items: [
        { id: 'sd1', name: 'Set Dosa (3 pcs)', description: 'Soft spongy dosas with chutney', price: 60, isVeg: true },
        { id: 'sd2', name: 'Appam with Stew', description: 'Lacy rice pancake with vegetable stew', price: 90, isVeg: true },
        { id: 'sd3', name: 'Malabar Parotta (2 pcs)', description: 'Flaky layered flatbread', price: 50, isVeg: true },
        { id: 'sd4', name: 'Kerala Chicken Curry', description: 'Coconut based chicken curry', price: 190, isVeg: false, isPopular: true },
        { id: 'sd5', name: 'Chettinad Chicken', description: 'Fiery South Indian chicken curry', price: 210, isVeg: false, spiceLevel: 3, isPopular: true },
        { id: 'sd6', name: 'Mysore Masala Dosa', description: 'Dosa with spicy red chutney', price: 85, isVeg: true, spiceLevel: 2 },
        { id: 'sd7', name: 'Ghee Roast Dosa', description: 'Crispy dosa roasted in ghee', price: 80, isVeg: true },
        { id: 'sd8', name: 'Uttapam', description: 'Thick rice pancake with toppings', price: 70, isVeg: true },
      ],
    },
    {
      id: 'south-snacks',
      name: 'Snacks',
      items: [
        { id: 'ss1', name: 'Medu Vada (2 pcs)', description: 'Crispy lentil fritters', price: 40, isVeg: true, isPopular: true },
        { id: 'ss2', name: 'Bonda (3 pcs)', description: 'Spiced potato fritters', price: 35, isVeg: true },
        { id: 'ss3', name: 'Bajji (4 pcs)', description: 'Crispy vegetable fritters', price: 40, isVeg: true },
        { id: 'ss4', name: 'Murukku', description: 'Crunchy spiral savory', price: 30, isVeg: true },
        { id: 'ss5', name: 'Masala Vadai', description: 'Spicy lentil fritters with onion', price: 45, isVeg: true, spiceLevel: 2 },
        { id: 'ss6', name: 'Banana Chips', description: 'Crispy Kerala banana chips', price: 35, isVeg: true },
        { id: 'ss7', name: 'Pepper Chicken Dry', description: 'Spicy dry chicken with pepper', price: 150, isVeg: false, spiceLevel: 2 },
        { id: 'ss8', name: 'Paniyaram (6 pcs)', description: 'Sweet or savory rice dumplings', price: 50, isVeg: true },
      ],
    },
  ],
};

export const allMenus = [northIndianMenu, southIndianMenu];
