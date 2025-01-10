import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'TextListWithImage';
const title = 'Text List with Image';
const icon = () => '📜';

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
      name: 'image',
      type: 'image',
      title: 'Main Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'List of single text rows',
      validation: (Rule) => Rule.required().min(3).max(10),
      of: [{ type: 'string' }],
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
      ...sectionPreview({ imgUrl: `/static/components/test.webp`, icon: icon() }),
    }),
  },
});
