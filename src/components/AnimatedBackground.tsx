import { motion } from 'framer-motion';

interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  variant?: 'home' | 'menu' | 'cart' | 'orders' | 'default';
}

const AnimatedBackground = ({ variant = 'default' }: AnimatedBackgroundProps) => {
  // Generate random floating shapes
  const generateShapes = (count: number): FloatingShape[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05,
    }));
  };

  const shapes = generateShapes(8);

  const getGradientColors = () => {
    switch (variant) {
      case 'home':
        return {
          primary: 'from-emerald/20 via-transparent to-coral/10',
          shapes: ['bg-emerald', 'bg-coral', 'bg-saffron'],
        };
      case 'menu':
        return {
          primary: 'from-coral/15 via-transparent to-emerald/10',
          shapes: ['bg-coral', 'bg-saffron', 'bg-emerald'],
        };
      case 'cart':
        return {
          primary: 'from-saffron/15 via-transparent to-rose/10',
          shapes: ['bg-saffron', 'bg-coral', 'bg-rose'],
        };
      case 'orders':
        return {
          primary: 'from-emerald/15 via-transparent to-saffron/10',
          shapes: ['bg-emerald', 'bg-saffron', 'bg-coral'],
        };
      default:
        return {
          primary: 'from-primary/10 via-transparent to-secondary/10',
          shapes: ['bg-primary', 'bg-secondary', 'bg-accent'],
        };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Main gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.primary}`} />
      
      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, hsl(var(--emerald) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, hsl(var(--coral) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, hsl(var(--saffron) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, hsl(var(--emerald) / 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full blur-3xl ${colors.shapes[index % colors.shapes.length]}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
          }}
          animate={{
            x: [0, 100, -50, 80, 0],
            y: [0, -80, 60, -40, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating food icons for restaurant theme */}
      <div className="absolute inset-0">
        {['🍛', '🥘', '🍲', '🥗', '🍜', '☕'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Sparkle effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-coral rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Moving wave pattern at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          background: 'linear-gradient(to top, hsl(var(--emerald)), transparent)',
        }}
        animate={{
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
