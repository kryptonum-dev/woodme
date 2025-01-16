import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'Faq';
const title = 'FAQ';
const icon = () => '❓';

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
      name: 'faqItems',
      type: 'array',
      title: 'FAQ items',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Faq_Collection' }],
        },
      ],
      validation: (Rule) => Rule.required().min(4).max(10).unique(),
    }),
    defineField({
      name: 'contactBox',
      type: 'object',
      title: 'Contact Box',
      validation: (Rule) => Rule.required(),
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
          name: 'state',
          type: 'object',
          title: 'Form States',
          fields: [
            defineField({
              name: 'success',
              type: 'object',
              title: 'Success',
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
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'url',
                      type: 'url',
                      title: 'URL',
                      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
                    }),
                    defineField({
                      name: 'icon',
                      type: 'image',
                      title: 'Icon',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'error',
              type: 'object',
              title: 'Error',
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
              ],
            }),
          ],
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
      ...sectionPreview({ imgUrl: `/static/components/test.webp`, icon: icon() }),
    }),
  },
});
