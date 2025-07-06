export interface Client {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isReturning: boolean;
  preferences: {
    communicationMethod: "email" | "phone" | "text";
    reminderSettings: boolean;
  };
  healthInfo?: {
    conditions: string[];
    medications: string[];
    goals: string[];
  };
}

export interface Testimonial {
  id: string;
  clientName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  service: string;
  date: Date;
  featured: boolean;
  imageUrl?: string;
}