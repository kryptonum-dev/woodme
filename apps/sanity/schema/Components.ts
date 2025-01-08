import { defineType } from 'sanity';
import BlogReference from './components/BlogReference';
import CircleSwiper from './components/CircleSwiper';
import SplitContentSection from './components/SplitContentSection';
import CtaSection from './components/CtaSection';
import ExpandingImages from './components/ExpandingImages';
import GalleryLinks from './components/GalleryLinks';
import TestimonialsSlider from './components/TestimonialsSlider';
import SingleTestimonialSection from './components/SingleTestimonialSection';
import CenteredHeadingBackgroundImage from './components/CenteredHeadingBackgroundImage';
import DualColumnSection from './components/DualColumnSection';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [
    CircleSwiper,
    SplitContentSection,
    BlogReference,
    CtaSection,
    ExpandingImages,
    GalleryLinks,
    TestimonialsSlider,
    SingleTestimonialSection,
    CenteredHeadingBackgroundImage,
    DualColumnSection,
  ],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        { name: 'grid', previewImageUrl: (schemaTypeName) => `/static/${schemaTypeName}.webp` },
        { name: 'list' },
      ],
    },
  },
});
