export type SizeOption = 'Classic' | 'Voluminous' | 'Large';
export type BoxColor = 'Blush Pink' | 'Warm White' | 'Black';

export interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  sizes: SizeOption[];
  boxColors: BoxColor[];
  featured?: boolean;
  /** used for masonry height variation */
  aspectClass?: 'tall' | 'standard' | 'wide';
}

export interface CartItem {
  product: Product;
  size: SizeOption;
  boxColor: BoxColor;
  deliveryDate: string;
  quantity: number;
}

export interface HintFormData {
  recipientFirstName: string;
  recipientEmail: string;
  senderFirstName: string;
  senderEmail: string;
}
