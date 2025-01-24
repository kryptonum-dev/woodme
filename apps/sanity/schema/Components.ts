import { defineType } from 'sanity';
import BlogReference from './components/BlogReference';
import CenteredHeadingBackgroundImage from './components/CenteredHeadingBackgroundImage';
import ChartsSection from './components/ChartsSection';
import CircleSwiper from './components/CircleSwiper';
import CtaSection from './components/CtaSection';
import DualColumnSection from './components/DualColumnSection';
import ExpandingImages from './components/ExpandingImages';
import GalleryLinks from './components/GalleryLinks';
import SingleTestimonialSection from './components/SingleTestimonialSection';
import SplitContentSection from './components/SplitContentSection';
import TestimonialsSlider from './components/TestimonialsSlider';
import ListPointsMiddlePhoto from './components/ListPointsMiddlePhoto';
import MiddleImageCtas from './components/MiddleImageCtas';
import SingleHeadingSection from './components/SingleHeadingSection';
import ImageHeadingColumns from './components/ImageHeadingColumns';
import TextListWithImage from './components/TextListWithImage';
import HeadingRowListCta from './components/HeadingRowListCta';
import TimelineSection from './components/TimelineSection';
import TwoColumnsImageListCta from './components/TwoColumnsImageListCta';
import AnimatedProjectReferences from './components/AnimatedProjectReferences';
import ContactForm from './components/ContactForm';
import Faq from './components/Faq';
import GallerySlider from './components/GallerySlider';
import TabsSection from './components/TabsSection';
import ImageMarquee from './components/ImageMarquee';
import NumbersSection from './components/NumbersSection';
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
    ChartsSection,
    ListPointsMiddlePhoto,
    SingleHeadingSection,
    MiddleImageCtas,
    ImageHeadingColumns,
    TextListWithImage,
    HeadingRowListCta,
    TimelineSection,
    TwoColumnsImageListCta,
    AnimatedProjectReferences,
    ContactForm,
    Faq,
    GallerySlider,
    TabsSection,
    ImageMarquee,
    NumbersSection,
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
