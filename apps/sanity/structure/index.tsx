import type { StructureResolver } from 'sanity/structure';
import { createCollection } from '../utils/create-collection';
import { createSingleton } from '../utils/create-singleton';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      createSingleton(S, 'global'),
      createSingleton(S, 'redirects'),
      S.divider(),
      createSingleton(S, 'Index_Page'),
      createSingleton(S, 'About_Page'),
      createSingleton(S, 'Contact_Page'),
      createSingleton(S, 'ArchitectsZone_Page'),
      createSingleton(S, 'InteriorDesign_Page'),
      createSingleton(S, 'PersonalizedFurniture_Page'),
      createSingleton(S, 'BusinessServices_Page'),
      createSingleton(S, 'NotFound_Page'),
      createSingleton(S, 'PrivacyPolicy_Page'),
      S.divider(),
      createSingleton(S, 'Projects_Page'),
      createCollection(S, 'Project_Collection'),
      createCollection(S, 'ProjectCategory_Collection'),
      S.divider(),
      createSingleton(S, 'Blog_Page'),
      createCollection(S, 'BlogPost_Collection'),
      createCollection(S, 'BlogCategory_Collection'),
      S.divider(),
      createCollection(S, 'Testimonial_Collection'),
      createCollection(S, 'Faq_Collection'),
    ]);
