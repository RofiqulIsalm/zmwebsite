/**
 * Manufacturing & Factory Sections Content Configuration
 * ZM Printing & Design Ltd.
 * 
 * Re-exports all 14 factory production floors, technical capabilities,
 * machine inventory, and floor plans.
 */

import { factorySectionsData } from './factorySections';
import { factoryFacility } from './factory';
import { divisions, workflowSteps } from './capabilities';

export const manufacturingPageContent = {
  header: {
    badge: "30,000 SQFT Complete Plant Infrastructure",
    title: "14 Specialized Production Floors & Pre-Press Laboratories",
    subtitle: "A transparent look inside our 4-level plant complex in Ashulia, Savar, equipped with automatic carousels, ultrasonic welders, and climate-controlled labs."
  },
  sections: factorySectionsData,
  facility: factoryFacility,
  divisions,
  workflowSteps
};

export { factorySectionsData, factoryFacility, divisions, workflowSteps };
export default manufacturingPageContent;
