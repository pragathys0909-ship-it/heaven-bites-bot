import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerDetailsFormProps {
  details: CustomerDetails;
  onChange: (details: CustomerDetails) => void;
  errors?: Partial<Record<keyof CustomerDetails, string>>;
}

const CustomerDetailsForm = ({ details, onChange, errors }: CustomerDetailsFormProps) => {
  const handleChange = (field: keyof CustomerDetails, value: string) => {
    onChange({ ...details, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-xl flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Delivery Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={details.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors?.name ? 'border-destructive' : ''}
            />
            {errors?.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={details.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors?.phone ? 'border-destructive' : ''}
            />
            {errors?.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={details.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors?.email ? 'border-destructive' : ''}
          />
          {errors?.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Delivery Address
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your full delivery address including landmark..."
            value={details.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={`min-h-[80px] ${errors?.address ? 'border-destructive' : ''}`}
          />
          {errors?.address && <p className="text-sm text-destructive">{errors.address}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsForm;
