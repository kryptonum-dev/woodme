import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'Project_Collection';
const title = 'Project Collection';
const icon = () => '🏗️';

export default defineType({
  name: name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: true },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name will be displayed in breadcrumb and in schemas for Google',
      validation: (Rule) => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/realizacje/' }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectDate',
      type: 'date',
      title: 'Project Date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'ProjectCategory_Collection' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'components',
      type: 'components',
      description: "Page Components will be show after the Project's predefined Hero section",
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
    select: {
      name: 'name',
      slug: 'slug.current',
      media: 'img',
    },
    prepare: ({ name, slug, media }) => ({
      title: name,
      subtitle: slug,
      icon,
      media: media,
    }),
  },
});
