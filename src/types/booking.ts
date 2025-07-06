import { z } from 'zod';
import { Service } from './service';

export interface Booking {
  id: string;
  clientId: string;
  service: Service;
  duration: number;
  packageId?: string;
  scheduledAt: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentIntentId?: string;
  notes?: string;
}

// Zod schemas for validation
export const BookingSchema = z.object({
  service: z.enum(["tesla-table", "roxiva", "consultation", "remote"]),
  duration: z.number().min(20).max(120),
  scheduledAt: z.string().datetime(),
  clientInfo: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  packagePurchase: z.boolean().optional(),
  paymentMethod: z.enum(["stripe", "apple-pay", "google-pay"]),
});

export type BookingFormData = z.infer<typeof BookingSchema>;