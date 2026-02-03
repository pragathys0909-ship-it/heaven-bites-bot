// Food image imports - map item IDs to their images
import alooParatha from '@/assets/food/aloo-paratha.jpg';
import choleBhature from '@/assets/food/chole-bhature.jpg';
import butterChicken from '@/assets/food/butter-chicken.jpg';
import paneerButterMasala from '@/assets/food/paneer-butter-masala.jpg';
import masalaDosa from '@/assets/food/masala-dosa.jpg';
import idliSambar from '@/assets/food/idli-sambar.jpg';
import chickenBiryani from '@/assets/food/chicken-biryani.jpg';
import tandooriChicken from '@/assets/food/tandoori-chicken.jpg';
import samosa from '@/assets/food/samosa.jpg';
import gulabJamun from '@/assets/food/gulab-jamun.jpg';
import mangoLassi from '@/assets/food/mango-lassi.jpg';
import filterCoffee from '@/assets/food/filter-coffee.jpg';
import meduVada from '@/assets/food/medu-vada.jpg';
import rasmalai from '@/assets/food/rasmalai.jpg';
import butterNaan from '@/assets/food/butter-naan.jpg';
import paneerTikka from '@/assets/food/paneer-tikka.jpg';

// Map of item IDs to their images
export const foodImages: Record<string, string> = {
  // North Indian Breakfast
  'nb1': alooParatha,
  'nb2': choleBhature,
  'nb3': alooParatha, // Paneer paratha uses similar image
  'nb4': choleBhature, // Poori sabzi similar
  'nb5': choleBhature, // Bedmi aloo similar
  'nb6': mangoLassi,

  // North Indian Lunch
  'nl1': paneerButterMasala, // Dal Makhani Thali
  'nl2': paneerButterMasala,
  'nl3': butterChicken,
  'nl4': chickenBiryani, // Veg biryani similar
  'nl5': chickenBiryani,
  'nl6': paneerButterMasala, // Rajma chawal
  'nl7': paneerButterMasala, // Kadhai paneer
  'nl8': butterChicken, // Mutton rogan josh

  // North Indian Dinner
  'nd1': butterNaan, // Tandoori roti
  'nd2': butterNaan,
  'nd3': paneerButterMasala, // Shahi paneer
  'nd4': tandooriChicken,
  'nd5': paneerButterMasala, // Dal tadka
  'nd6': paneerButterMasala, // Palak paneer
  'nd7': butterChicken, // Chicken tikka masala
  'nd8': paneerButterMasala, // Mixed veg

  // North Indian Snacks
  'ns1': samosa,
  'ns2': samosa, // Aloo tikki similar
  'ns3': samosa, // Papdi chaat
  'ns4': samosa, // Dahi bhalla
  'ns5': paneerTikka,
  'ns6': tandooriChicken, // Seekh kebab
  'ns7': samosa, // Gol gappe
  'ns8': samosa, // Bread pakora

  // North Indian Beverages
  'nbv1': filterCoffee, // Masala chai
  'nbv2': mangoLassi,
  'nbv3': mangoLassi, // Rose sharbat
  'nbv4': mangoLassi, // Thandai
  'nbv5': mangoLassi, // Jal jeera
  'nbv6': mangoLassi, // Badam milk

  // North Indian Desserts
  'nds1': gulabJamun,
  'nds2': rasmalai,
  'nds3': gulabJamun, // Gajar halwa
  'nds4': rasmalai, // Kheer
  'nds5': gulabJamun, // Jalebi
  'nds6': rasmalai, // Kulfi

  // South Indian Breakfast
  'sb1': masalaDosa,
  'sb2': idliSambar,
  'sb3': meduVada, // Vada sambar
  'sb4': masalaDosa, // Plain dosa
  'sb5': masalaDosa, // Rava dosa
  'sb6': idliSambar, // Pongal
  'sb7': idliSambar, // Upma
  'sb8': filterCoffee,

  // South Indian Lunch
  'sl1': idliSambar, // Thali
  'sl2': idliSambar, // Curd rice
  'sl3': chickenBiryani, // Lemon rice
  'sl4': idliSambar, // Sambar rice
  'sl5': chickenBiryani, // Veg biryani
  'sl6': chickenBiryani, // Hyderabadi chicken biryani
  'sl7': butterChicken, // Andhra chicken
  'sl8': butterChicken, // Kerala fish curry

  // South Indian Dinner
  'sd1': masalaDosa, // Set dosa
  'sd2': masalaDosa, // Appam
  'sd3': butterNaan, // Malabar parotta
  'sd4': butterChicken, // Kerala chicken
  'sd5': butterChicken, // Chettinad chicken
  'sd6': masalaDosa, // Mysore masala dosa
  'sd7': masalaDosa, // Ghee roast dosa
  'sd8': masalaDosa, // Uttapam

  // South Indian Snacks
  'ss1': meduVada,
  'ss2': meduVada, // Bonda
  'ss3': meduVada, // Bajji
  'ss4': meduVada, // Murukku
  'ss5': meduVada, // Masala vadai
  'ss6': meduVada, // Banana chips
  'ss7': tandooriChicken, // Pepper chicken
  'ss8': meduVada, // Paniyaram

  // South Indian Beverages
  'sbv1': filterCoffee,
  'sbv2': mangoLassi, // Buttermilk
  'sbv3': mangoLassi, // Coconut water
  'sbv4': mangoLassi, // Nannari
  'sbv5': mangoLassi, // Panakam
  'sbv6': filterCoffee, // Sukku coffee

  // South Indian Desserts
  'sds1': rasmalai, // Payasam
  'sds2': gulabJamun, // Mysore pak
  'sds3': gulabJamun, // Kesari bath
  'sds4': gulabJamun, // Banana sheera
  'sds5': gulabJamun, // Rava kesari
  'sds6': rasmalai, // Double ka meetha
};

export const getFoodImage = (itemId: string): string | undefined => {
  return foodImages[itemId];
};
