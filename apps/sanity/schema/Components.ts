import { defineType } from 'sanity'
import CircleSwiper from './components/CircleSwiper'

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [CircleSwiper],
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
})
