/**
 * Products Page Content Configuration
 * ZM Printing & Design Ltd.
 * 
 * Re-exported from the unified master content file:
 * -> src/data/websiteContent.js (websiteContent.products)
 * 
 * Edit src/data/websiteContent.js to change product categories and header info!
 */

import { websiteContent } from './websiteContent';
import { products } from './products';

export const categories = websiteContent.products.categories;

export const productsPageContent = {
  header: websiteContent.products.header,
  categories,
  products
};

export { products };
export default productsPageContent;
