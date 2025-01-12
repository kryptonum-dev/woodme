import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'ProjectCategory_Collection';
const title = 'Project Category Collection';
const icon = () => '🏠';

export default defineType({
  name: name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/realizacje/kategoria/' }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      description:
        'In that page the H1 tag will not be visible, so you can use this field to define the main heading of the page.',
      validation: (Rule) => Rule.required(),
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
    select: {
      name: 'name',
      slug: 'slug.current',
    },
    prepare: ({ name, slug }) => ({
      title: name,
      subtitle: slug,
      icon,
    }),
  },
});
