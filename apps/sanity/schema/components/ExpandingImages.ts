import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'ExpandingImages';
const title = 'Expanding Images';
const icon = () => '✨';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description: 'These images will fade in as the section appears. We recommend using 5 images for the best effect.',
      validation: (Rule) => [
        Rule.min(5).error('You must provide exactly 5 images.'),
        Rule.max(5).error('You must provide exactly 5 images.'),
        Rule.required(),
      ],
      of: [
        {
          type: 'image',
          title: 'Image',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
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
      name: 'ctas',
      type: 'array',
      title: 'CTAs',
      description: 'Up to 2 CTAs',
      of: [{ type: 'cta' }],
      validation: (Rule) => Rule.required().max(2),
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Background',
      initialValue: '#E3DFD3',
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
