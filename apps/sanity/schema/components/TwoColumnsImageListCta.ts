import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'TwoColumnsImageListCta';
const title = 'Two Columns Image List CTA';
const icon = () => '📣';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      description: 'Word "WOODME" will be transformed into a logo icon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pointsList',
      type: 'array',
      title: 'Points List',

      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'image',
              name: 'icon',
              title: 'Icon',
              description: 'Only SVG files are supported.',
              options: {
                accept: '.svg',
              },
              validation: (Rule) => Rule.required(),
            },
            { type: 'string', name: 'text', title: 'Text', validation: (Rule) => Rule.required() },
          ],
        },
      ],
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
      name: 'background',
      type: 'string',
      title: 'Background',
      initialValue: '#e3dfd3',
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
