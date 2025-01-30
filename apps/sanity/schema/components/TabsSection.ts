import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'TabsSection';
const title = 'Tabs Section';
const icon = () => '🔍';

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
    defineField({
      name: 'tabs',
      type: 'array',
      title: 'Tabs',
      validation: (Rule) => Rule.required().length(2),
      description: 'Each tab consists of boxes with image with title, only one tab can be open at a time',
      of: [
        {
          type: 'object',
          name: 'tab',
          title: 'Tab',
          fields: [
            { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
            {
              name: 'boxes',
              type: 'array',
              title: 'Boxes',
              validation: (Rule) => Rule.required().length(3),
              of: [
                {
                  type: 'object',
                  name: 'box',
                  title: 'Box',
                  fields: [
                    { type: 'image', name: 'image', title: 'Image', validation: (Rule) => Rule.required() },
                    { type: 'string', name: 'title', title: 'Title', validation: (Rule) => Rule.required() },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      media: 'image',
                    },
                    prepare: ({ title, media }) => ({
                      title,
                      media,
                    }),
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare: ({ title }) => ({
              title,
              media: icon,
            }),
          },
        },
      ],
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
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon: icon() }),
    }),
  },
});
