import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Wallet, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  subOptions?: { id: string; name: string; logo: string }[];
}

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Fast & secure UPI payments',
      icon: <Smartphone className="w-5 h-5" />,
      subOptions: [
        { id: 'gpay', name: 'Google Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png' },
        { id: 'phonepe', name: 'PhonePe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png' },
        { id: 'paytm', name: 'Paytm', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Paytm_logo.png/640px-Paytm_logo.png' },
      ],
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay supported',
      icon: <CreditCard className="w-5 h-5" />,
      subOptions: [
        { id: 'visa', name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png' },
        { id: 'mastercard', name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' },
        { id: 'rupay', name: 'RuPay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1200px-RuPay.svg.png' },
      ],
    },
    {
      id: 'wallet',
      name: 'Mobile Wallet',
      description: 'Amazon Pay, Freecharge & more',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: <Banknote className="w-5 h-5" />,
    },
  ];

  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {paymentMethods.map((method) => (
        <motion.div
          key={method.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            className={`relative rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${
              value === method.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => onChange(method.id)}
          >
            {/* Main Option */}
            <div className="flex items-center gap-4 p-4">
              <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                value === method.id ? 'gradient-gold' : 'bg-muted'
              }`}>
                <div className={value === method.id ? 'text-secondary-foreground' : 'text-muted-foreground'}>
                  {method.icon}
                </div>
              </div>
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <span className="font-display font-semibold text-base">{method.name}</span>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </Label>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                value === method.id ? 'border-primary bg-primary' : 'border-muted-foreground/30'
              }`}>
                {value === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-primary-foreground"
                  />
                )}
              </div>
            </div>

            {/* Sub Options (UPI & Cards) */}
            {method.subOptions && value === method.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border bg-muted/30 px-4 py-3"
              >
                <p className="text-xs text-muted-foreground mb-2">Available options:</p>
                <div className="flex flex-wrap gap-2">
                  {method.subOptions.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-border hover:border-primary/50 transition-colors"
                    >
                      <img 
                        src={sub.logo} 
                        alt={sub.name} 
                        className="h-5 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span className="text-sm font-medium">{sub.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
