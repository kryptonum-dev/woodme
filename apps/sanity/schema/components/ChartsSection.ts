import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'ChartsSection';
const title = 'Charts Section';
const icon = () => '📊';

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
      name: 'charts',
      type: 'array',
      title: 'Charts',
      description: 'On desktop, the charts will be dispalyed from lowest (first item) to highest (last item).',
      of: [
        {
          type: 'object',
          name: 'chart',
          title: 'Chart',
          fields: [
            {
              type: 'string',
              name: 'value',
              title: 'Value',
              fieldset: 'charts',
              validation: (Rule) => Rule.required(),
            },
            { type: 'string', name: 'unit', title: 'Unit (optional)', fieldset: 'charts' },
            { type: 'Heading', name: 'heading', title: 'Heading', validation: (Rule) => Rule.required() },
            { type: 'PortableText', name: 'paragraph', title: 'Paragraph', validation: (Rule) => Rule.required() },
          ],
          fieldsets: [
            {
              name: 'charts',
              title: 'Charts',
              options: {
                columns: 2,
              },
            },
          ],
          preview: {
            select: {
              value: 'value',
              unit: 'unit',
              heading: 'heading',
            },
            prepare: ({ value, unit, heading }) => ({
              title: `${value} ${unit ? `(${unit})` : ''}`,
              subtitle: toPlainText(heading),
              media: () => '📈',
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'ctaText',
      type: 'PortableText',
      title: 'CTA Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Call To Action',
      validation: (Rule) => Rule.required(),
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
