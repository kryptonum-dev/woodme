import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'NumbersSection';
const title = 'Numbers Section';
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
      name: 'numbers',
      type: 'array',
      title: 'Numbers',
      description: 'Each number row consists of a value and a label ',
      of: [
        {
          type: 'object',
          name: 'numbersItem',
          fields: [
            { type: 'string', name: 'label', title: 'Label', validation: (Rule) => Rule.required() },
            { type: 'string', name: 'value', title: 'Value', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare: ({ label, value }) => ({
              title: `${label} - [${value}]`,
              media: () => '📈',
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Background',
      initialValue: '#CCDDE9',
      hidden: true,
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
