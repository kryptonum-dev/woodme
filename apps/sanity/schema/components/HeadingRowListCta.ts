import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'HeadingRowListCta';
const title = 'Heading Row List CTA';
const icon = () => '🔗';

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
      name: 'lists',
      type: 'array',
      title: 'List of single text rows',
      validation: (Rule) => Rule.required().min(3).max(8),
      of: [
        {
          type: 'object',
          name: 'listItem',
          title: 'List Item',
          fields: [
            { type: 'string', name: 'category', title: 'List Category', validation: (Rule) => Rule.required() },
            {
              type: 'array',
              name: 'items',
              title: 'List Items',
              validation: (Rule) => Rule.required().min(3).max(8),
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: {
              category: 'category',
            },
            prepare: ({ category }) => ({
              title: category,
              media: () => '📝',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'ctaBox',
      type: 'object',
      title: 'CTA (Optional)',
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
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon: icon() }),
    }),
  },
});
