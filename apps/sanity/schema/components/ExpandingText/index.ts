import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';
import { toPlainText } from '../../../utils/to-plain-text';
import sectionId from '../../ui/sectionId';
import PortableText from './portable-text';

const name = 'ExpandingText';
const title = 'Expanding Text';
const icon = () => '🔍';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    PortableText,
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
      ...sectionPreview({ imgUrl: `/static/components/test.webp`, icon: icon() }),
    }),
  },
});
