export const formatPrice = (price: string) => {
  // Handle empty or undefined prices
  if (!price) return 'Contact for pricing';
  
  // Replace dollar signs with naira symbol and add formatting
  return price.replace(/\$(\d+)/g, '₦$1').replace(/\$/g, '₦');
};
