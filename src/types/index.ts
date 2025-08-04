// Re-export all types for convenience
export * from './service';
export * from './booking';
export * from './client';

// Common UI types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'elevated' | 'subtle' | 'soft' | 'ghost' | 'outline'; // 'outline' deprecated - use 'elevated'
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

// Commented out unused interface exports to optimize bundle size
// export interface InputProps {
//   label?: string;
//   error?: string;
//   required?: boolean;
//   type?: 'text' | 'email' | 'tel' | 'password' | 'number';
//   placeholder?: string;
//   value?: string;
//   onChange?: (value: string) => void;
//   className?: string;
// }
// 
// export interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: React.ReactNode;
//   size?: 'sm' | 'md' | 'lg' | 'xl';
// }