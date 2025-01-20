import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';
import { toPlainText } from '../../../utils/to-plain-text';

const name = 'ComparisonTable';
const title = 'Comparison Table';
const icon = () => '📊';

export default defineField({
  name: name,
  type: 'object',
  title: title,
  ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
  fields: [
    defineField({
      name: 'comparisonHeading',
      type: 'array',
      title: 'Comparison Heading',
      of: [{ type: 'string' }],
      description:
        'Enter two variables to compare. (First variable is the left column, second variable is the right column)',
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'comparisonTable',
      type: 'array',
      title: 'Comparison Table',
      of: [
        {
          type: 'object',
          name: 'item',
          title: 'Item',
          fields: [
            defineField({
              name: 'heading',
              type: 'Heading',
              title: 'Heading',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'comparisonItems',
              type: 'array',
              title: 'Comparison Items',
              of: [{ type: 'text', rows: 2 }],
              description:
                'Enter two variables to compare. (First variable is the left column, second variable is the right column)',
              validation: (Rule) => Rule.required().length(2),
            }),
          ],
          preview: {
            select: {
              heading: 'heading',
              comparisonItems: 'comparisonItems',
            },
            prepare: ({ heading }) => ({
              title: toPlainText(heading),
              media: () => '📊',
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      comparisonHeading: 'comparisonHeading',
      comparisonTable: 'comparisonTable',
    },
    prepare: ({ comparisonHeading }) => ({
      title: `Comparison Table${comparisonHeading ? ` [${comparisonHeading[0]} vs ${comparisonHeading[1]}]` : ''}`,
      media: () => '📊',
    }),
  },
});
