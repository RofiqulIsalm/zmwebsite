/**
 * Factory Sections & Production Floors Data Configuration
 * ZM Printing & Design Ltd.
 * 
 * Re-exported from the unified master content file:
 * -> src/data/websiteContent.js (websiteContent.sections)
 * 
 * Edit src/data/websiteContent.js to change any factory section data,
 * machinery details, capacities, workcraft items, or gallery images!
 */

import { websiteContent } from './websiteContent';

export const factorySectionsData = websiteContent.sections;

export const sectionCategories = [
  { id: 'all', label: 'All Factory Floors' },
  { id: 'screen-digital', label: 'Printing & Digital Floors' },
  { id: 'silicon-sonic', label: 'Silicone & Ultrasonic Floors' },
  { id: 'technical', label: 'Technical Labs & Storage' },
  { id: 'welfare', label: 'Worker Welfare Facilities' }
];

export default factorySectionsData;
