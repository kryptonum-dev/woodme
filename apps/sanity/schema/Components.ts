import { defineType } from 'sanity';
import BlogReference from './components/BlogReference';
import CircleSwiper from './components/CircleSwiper';
import SplitContentSection from './components/SplitContentSection';
import CtaSection from './components/CtaSection';
import ExpandingImages from './components/ExpandingImages';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [CircleSwiper, SplitContentSection, BlogReference, CtaSection, ExpandingImages],
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
