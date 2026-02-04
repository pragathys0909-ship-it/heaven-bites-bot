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

// New unique images
import pooriSabzi from '@/assets/food/poori-sabzi.jpg';
import dalMakhani from '@/assets/food/dal-makhani.jpg';
import rajmaChawal from '@/assets/food/rajma-chawal.jpg';
import palakPaneer from '@/assets/food/palak-paneer.jpg';
import papdiChaat from '@/assets/food/papdi-chaat.jpg';
import masalaChai from '@/assets/food/masala-chai.jpg';
import gajarHalwa from '@/assets/food/gajar-halwa.jpg';
import jalebi from '@/assets/food/jalebi.jpg';
import kulfi from '@/assets/food/kulfi.jpg';
import pongal from '@/assets/food/pongal.jpg';
import upma from '@/assets/food/upma.jpg';
import ravaDosa from '@/assets/food/rava-dosa.jpg';
import appam from '@/assets/food/appam.jpg';
import malabarParotta from '@/assets/food/malabar-parotta.jpg';
import payasam from '@/assets/food/payasam.jpg';
import mysorePak from '@/assets/food/mysore-pak.jpg';
import kesariBath from '@/assets/food/kesari-bath.jpg';
import chettinadChicken from '@/assets/food/chettinad-chicken.jpg';
import kheer from '@/assets/food/kheer.jpg';
import alooTikki from '@/assets/food/aloo-tikki.jpg';

// Map of item IDs to their images
export const foodImages: Record<string, string> = {
  // North Indian Breakfast
  'nb1': alooParatha,
  'nb2': choleBhature,
  'nb3': alooParatha, // Paneer paratha similar
  'nb4': pooriSabzi,
  'nb5': choleBhature, // Bedmi aloo similar
  'nb6': mangoLassi,

  // North Indian Lunch
  'nl1': dalMakhani,
  'nl2': paneerButterMasala,
  'nl3': butterChicken,
  'nl4': chickenBiryani, // Veg biryani similar
  'nl5': chickenBiryani,
  'nl6': rajmaChawal,
  'nl7': paneerButterMasala, // Kadhai paneer similar
  'nl8': butterChicken, // Mutton rogan josh similar

  // North Indian Dinner
  'nd1': butterNaan, // Tandoori roti similar
  'nd2': butterNaan,
  'nd3': paneerButterMasala, // Shahi paneer similar
  'nd4': tandooriChicken,
  'nd5': dalMakhani, // Dal tadka similar
  'nd6': palakPaneer,
  'nd7': butterChicken, // Chicken tikka masala similar
  'nd8': paneerButterMasala, // Mixed veg similar

  // North Indian Snacks
  'ns1': samosa,
  'ns2': alooTikki,
  'ns3': papdiChaat,
  'ns4': papdiChaat, // Dahi bhalla similar
  'ns5': paneerTikka,
  'ns6': tandooriChicken, // Seekh kebab similar
  'ns7': papdiChaat, // Gol gappe similar
  'ns8': samosa, // Bread pakora similar

  // North Indian Beverages
  'nbv1': masalaChai,
  'nbv2': mangoLassi,
  'nbv3': mangoLassi, // Rose sharbat similar
  'nbv4': mangoLassi, // Thandai similar
  'nbv5': mangoLassi, // Jal jeera similar
  'nbv6': mangoLassi, // Badam milk similar

  // North Indian Desserts
  'nds1': gulabJamun,
  'nds2': rasmalai,
  'nds3': gajarHalwa,
  'nds4': kheer,
  'nds5': jalebi,
  'nds6': kulfi,

  // South Indian Breakfast
  'sb1': masalaDosa,
  'sb2': idliSambar,
  'sb3': meduVada, // Vada sambar
  'sb4': ravaDosa, // Plain dosa similar
  'sb5': ravaDosa,
  'sb6': pongal,
  'sb7': upma,
  'sb8': filterCoffee,

  // South Indian Lunch
  'sl1': idliSambar, // Thali
  'sl2': idliSambar, // Curd rice similar
  'sl3': chickenBiryani, // Lemon rice similar
  'sl4': idliSambar, // Sambar rice
  'sl5': chickenBiryani, // Veg biryani
  'sl6': chickenBiryani, // Hyderabadi chicken biryani
  'sl7': chettinadChicken, // Andhra chicken
  'sl8': butterChicken, // Kerala fish curry similar

  // South Indian Dinner
  'sd1': ravaDosa, // Set dosa similar
  'sd2': appam,
  'sd3': malabarParotta,
  'sd4': butterChicken, // Kerala chicken similar
  'sd5': chettinadChicken,
  'sd6': masalaDosa, // Mysore masala dosa
  'sd7': masalaDosa, // Ghee roast dosa
  'sd8': masalaDosa, // Uttapam similar

  // South Indian Snacks
  'ss1': meduVada,
  'ss2': meduVada, // Bonda similar
  'ss3': meduVada, // Bajji similar
  'ss4': meduVada, // Murukku similar
  'ss5': meduVada, // Masala vadai
  'ss6': meduVada, // Banana chips similar
  'ss7': chettinadChicken, // Pepper chicken
  'ss8': meduVada, // Paniyaram similar

  // South Indian Beverages
  'sbv1': filterCoffee,
  'sbv2': mangoLassi, // Buttermilk similar
  'sbv3': mangoLassi, // Coconut water similar
  'sbv4': mangoLassi, // Nannari similar
  'sbv5': mangoLassi, // Panakam similar
  'sbv6': filterCoffee, // Sukku coffee

  // South Indian Desserts
  'sds1': payasam,
  'sds2': mysorePak,
  'sds3': kesariBath,
  'sds4': kesariBath, // Banana sheera similar
  'sds5': kesariBath, // Rava kesari
  'sds6': payasam, // Double ka meetha similar
};

export const getFoodImage = (itemId: string): string | undefined => {
  return foodImages[itemId];
};
