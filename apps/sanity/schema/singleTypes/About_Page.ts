import { defineField, defineType } from 'sanity'
import { defineSlugForDocument } from '../../utils/define-slug-for-document'

const name = 'About_Page'
const title = 'About us'
const slug = '/o-nas'
const icon = () => '👨‍🌾'

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon: icon,
  options: { documentPreview: true },
  fields: [
    ...defineSlugForDocument({ slug: slug }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Page Components',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    prepare: () => ({
      title,
      subtitle: slug,
    }),
  },
})
