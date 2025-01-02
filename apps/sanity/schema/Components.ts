import { defineType } from 'sanity';
import BlogReference from './components/BlogReference';
import CircleSwiper from './components/CircleSwiper';
import SplitContentSection from './components/SplitContentSection';
export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [CircleSwiper, SplitContentSection, BlogReference],
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
