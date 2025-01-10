import { defineField } from 'sanity';
import { InternalLinkableTypes } from '../../structure/internal-linkable-types';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'TimelineSection';
const title = 'Timeline Section';
const icon = () => '🕒';

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
      name: 'backgroundImages',
      type: 'array',
      title: 'Background Images',
      description: 'The background images will displayed side by side.',
      of: [{ type: 'image' }],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'ctaBox',
      type: 'object',
      title: 'CTA Box',
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
      name: 'timeline',
      type: 'array',
      title: 'Timeline',
      of: [
        {
          type: 'object',
          fields: [
            { type: 'string', name: 'title', title: 'Title', validation: (Rule) => Rule.required() },
            {
              name: 'description',
              type: 'PortableText',
              title: 'Description',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare: ({ title }) => {
              return {
                title,
                media: () => '📌',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    ...sectionId,
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ imgUrl: `/static/components/test.webp`, icon: icon() }),
    }),
  },
});
