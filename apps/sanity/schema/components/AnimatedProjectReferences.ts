import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'AnimatedProjectReferences';
const title = 'Animated Project References';
const icon = () => '🏠';

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
      name: 'cta',
      type: 'cta',
      title: 'Call To Action',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedProjects',
      type: 'array',
      title: 'Highlighted Projects',
      validation: (Rule) => Rule.required().length(2).unique(),
      description:
        'The projects references will be animated (moving from the section botton to the top - dekstop only).',
      of: [{ type: 'reference', to: [{ type: 'Project_Collection' }] }],
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
