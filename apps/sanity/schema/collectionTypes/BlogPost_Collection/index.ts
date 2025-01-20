import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../../utils/define-slug-for-document';
import PortableText from './portable-text';

const name = 'BlogPost_Collection';
const title = 'Blog Post Collection';
const icon = () => '📰';

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
    ...defineSlugForDocument({ source: 'name', prefix: '/blog/' }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'BlogCategory_Collection' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    PortableText,
    defineField({
      name: 'components',
      type: 'components',
      title: 'Page Components (optional)',
      description: 'Those components will be displayed after the content of the blog post.',
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
      media: 'image',
    },
    prepare: ({ name, slug, media }) => ({
      title: name,
      subtitle: slug,
      icon,
      media: media,
    }),
  },
});
