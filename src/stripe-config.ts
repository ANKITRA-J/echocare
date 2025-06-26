export interface Product {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  interval?: 'month' | 'year';
}

export const products: Product[] = [
  {
    priceId: 'price_1ReIWsE7Ed5OJSsDNWGiihLZ',
    name: 'EchoCare Premium',
    description: 'Complete AI memory companion with unlimited memories, voice cloning, and premium features for dementia care.',
    mode: 'subscription',
    price: 24.00,
    currency: 'usd',
    interval: 'month'
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};