import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';

export interface UpiDetails {
  upiId: string;
}

export interface CardDetails {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export interface WalletDetails {
  phone: string;
}

export type PaymentDetails = UpiDetails | CardDetails | WalletDetails | null;

interface PaymentDetailsFormProps {
  paymentMethod: string;
  onDetailsChange: (details: PaymentDetails) => void;
  errors?: Record<string, string>;
}

const PaymentDetailsForm = ({ paymentMethod, onDetailsChange, errors }: PaymentDetailsFormProps) => {
  const [upiDetails, setUpiDetails] = useState<UpiDetails>({ upiId: '' });
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [walletDetails, setWalletDetails] = useState<WalletDetails>({ phone: '' });

  const handleUpiChange = (value: string) => {
    const updated = { upiId: value };
    setUpiDetails(updated);
    onDetailsChange(updated);
  };

  const handleCardChange = (field: keyof CardDetails, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    const updated = { ...cardDetails, [field]: formattedValue };
    setCardDetails(updated);
    onDetailsChange(updated);
  };

  const handleWalletChange = (value: string) => {
    const updated = { phone: value };
    setWalletDetails(updated);
    onDetailsChange(updated);
  };

  if (paymentMethod === 'cod') {
    return null;
  }

  if (paymentMethod === 'upi') {
    return (
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            UPI Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              placeholder="yourname@paytm / 9876543210@ybl"
              value={upiDetails.upiId}
              onChange={(e) => handleUpiChange(e.target.value)}
              className={errors?.upiId ? 'border-destructive' : ''}
            />
            {errors?.upiId && <p className="text-sm text-destructive">{errors.upiId}</p>}
            <p className="text-xs text-muted-foreground">
              Enter your UPI ID linked to Google Pay, PhonePe, Paytm, etc.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentMethod === 'card') {
    return (
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Card Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={(e) => handleCardChange('cardNumber', e.target.value)}
              className={errors?.cardNumber ? 'border-destructive' : ''}
            />
            {errors?.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="JOHN DOE"
              value={cardDetails.cardName}
              onChange={(e) => handleCardChange('cardName', e.target.value.toUpperCase())}
              className={errors?.cardName ? 'border-destructive' : ''}
            />
            {errors?.cardName && <p className="text-sm text-destructive">{errors.cardName}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleCardChange('expiry', e.target.value)}
                className={errors?.expiry ? 'border-destructive' : ''}
              />
              {errors?.expiry && <p className="text-sm text-destructive">{errors.expiry}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="•••"
                value={cardDetails.cvv}
                onChange={(e) => handleCardChange('cvv', e.target.value)}
                className={errors?.cvv ? 'border-destructive' : ''}
              />
              {errors?.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Your card details are secure and encrypted
          </p>
        </CardContent>
      </Card>
    );
  }

  if (paymentMethod === 'wallet') {
    return (
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Mobile Wallet Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="walletPhone">Registered Mobile Number</Label>
            <Input
              id="walletPhone"
              type="tel"
              placeholder="+91 98765 43210"
              value={walletDetails.phone}
              onChange={(e) => handleWalletChange(e.target.value)}
              className={errors?.phone ? 'border-destructive' : ''}
            />
            {errors?.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            <p className="text-xs text-muted-foreground">
              Enter the mobile number linked to your wallet
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default PaymentDetailsForm;
