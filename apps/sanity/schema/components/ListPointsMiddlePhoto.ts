import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'ListPointsMiddlePhoto';
const title = 'List Points Middle Photo';
const icon = () => '📝';

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
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'List Points',
      validation: (Rule) =>
        Rule.required()
          .max(4)
          .custom((items) => {
            if (items && items.length < 4) {
              return {
                message: 'We encourage adding 4 points for optimal display',
                level: 'warning',
              };
            }
            return true;
          }),
      description: 'List points will be visible on the left and right side of the image.',
      of: [
        {
          type: 'object',
          name: 'point',
          fields: [
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Icon',
              description: 'Only SVG files are supported.',
              options: {
                accept: '.svg',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Heading',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'paragraph',
              type: 'PortableText',
              title: 'Paragraph',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
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
