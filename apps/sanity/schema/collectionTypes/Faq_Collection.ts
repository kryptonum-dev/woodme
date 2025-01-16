import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const title = 'FAQ items Collection';
const icon = () => '❓';

export default defineType({
  name: 'Faq_Collection',
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'PortableText',
      title: 'Answer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Call To Action (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: toPlainText(subtitle),
      icon,
    }),
  },
});
