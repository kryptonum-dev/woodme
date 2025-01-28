import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'CircleSwiper';
const title = 'Circle Swiper';
const icon = () => '🔄';

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
      name: 'swiper',
      type: 'array',
      title: 'Swiper',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'img',
              type: 'image',
              title: 'Image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              img: 'img',
            },
            prepare: ({ title, img }) => ({
              title: title,
              media: img,
            }),
          },
        },
      ],
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
      name: 'additionalParagraph',
      type: 'string',
      title: 'Additional Paragraph (optional)',
      description: 'This is additional paragraph that will be displayed on the bottom left of the container.',
    }),
    defineField({
      name: 'downloadPdf',
      type: 'object',
      title: 'Download PDF (optional)',
      fields: [
        defineField({
          name: 'downloadText',
          type: 'string',
          title: 'Download Text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pdf',
          type: 'file',
          title: 'PDF File',
          validation: (Rule) => Rule.required(),
          options: {
            accept: 'application/pdf',
          },
        }),
      ],
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
