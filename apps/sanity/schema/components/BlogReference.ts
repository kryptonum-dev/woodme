import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'BlogReference';
const title = 'Blog Reference';
const icon = () => '📝';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Call To Action',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedBlogPosts',
      type: 'array',
      title: 'Highlighted Blog Posts',
      validation: (Rule) => Rule.max(2).unique(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'BlogPost_Collection' }],
        },
      ],
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Background',
      initialValue: '#d2cdbf',
      hidden: true,
    }),
    ...sectionId,
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ imgUrl: `/static/components/blog.webp`, icon: icon() }),
    }),
  },
});
