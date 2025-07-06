export interface Service {
  id: string;
  name: "tesla-table" | "roxiva" | "consultation" | "remote";
  displayName: string;
  description: string;
  benefits: string[];
  durations: ServiceDuration[];
  packages: Package[];
  imageUrl: string;
  category: "in-person" | "remote";
}

export interface ServiceDuration {
  minutes: number;
  price: number;
  description?: string;
  isPopular?: boolean;
}

export interface Package {
  id: string;
  sessionCount: 4 | 8 | 10;
  discountPercent: number;
  expirationDays: 90 | 180 | 365;
  totalPrice: number;
  savings: number;
}