// Single Types
import About_Page from '../schema/singleTypes/About_Page';
import ArchitectsZone_Page from '../schema/singleTypes/ArchitectsZone_Page';
import Blog_Page from '../schema/singleTypes/Blog_Page';
import BusinessServices_Page from '../schema/singleTypes/BusinessServices_Page';
import Contact_Page from '../schema/singleTypes/Contact_Page';
import global from '../schema/singleTypes/global';
import Index_Page from '../schema/singleTypes/Index_Page';
import InteriorDesign_Page from '../schema/singleTypes/InteriorDesign_Page';
import PersonalizedFurniture_Page from '../schema/singleTypes/PersonalizedFurniture_Page';
import Projects_Page from '../schema/singleTypes/Projects_Page';
import redirects from '../schema/singleTypes/redirects';
import NotFound_Page from '../schema/singleTypes/NotFound_Page';
const singleTypes = [
  global,
  redirects,
  Index_Page,
  About_Page,
  Contact_Page,
  Blog_Page,
  ArchitectsZone_Page,
  InteriorDesign_Page,
  PersonalizedFurniture_Page,
  BusinessServices_Page,
  Projects_Page,
  NotFound_Page,
];

// Collections Types
import Faq_Collection from '../schema/collectionTypes/Faq_Collection';
import BlogPost_Collection from '../schema/collectionTypes/BlogPost_Collection';
import Project_Collection from '../schema/collectionTypes/Project_Collection';

const collectionTypes = [Faq_Collection, BlogPost_Collection, Project_Collection];

// Components
import Components from '../schema/Components';

const components = [Components];

// UI Components
import cta from '../schema/ui/cta';
import PortableText from '../schema/ui/PortableText';
import Heading from '../schema/ui/PortableText/Heading';
import seo from '../schema/ui/seo';

const ui = [cta, seo, PortableText, Heading];

export const schemaTypes = [...singleTypes, ...collectionTypes, ...components, ...ui];

export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
export const singletonTypes = new Set(singleTypes.map((type) => type.name as string));
