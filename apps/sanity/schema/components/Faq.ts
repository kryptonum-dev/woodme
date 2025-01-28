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
      initialValue: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Masz pytanie? My mamy odpowiedzi. ' }],
        },
      ],
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph',
      validation: (Rule) => Rule.required(),
      initialValue: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Sprawdź najczęściej zadawane pytania' }],
        },
      ],
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
          initialValue: [
            {
              _type: 'block',
              style: 'normal',
              children: [{ _type: 'span', text: 'Masz inne pytanie?' }],
            },
          ],
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Paragraph',
          validation: (Rule) => Rule.required(),
          initialValue: [
            {
              _type: 'block',
              style: 'normal',
              children: [{ _type: 'span', text: 'Z przyjemnością pomożemy' }],
            },
          ],
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
                  initialValue: [
                    {
                      _type: 'block',
                      style: 'normal',
                      children: [{ _type: 'span', text: 'Pomyślnie wysłano wiadomość' }],
                    },
                  ],
                }),
                defineField({
                  name: 'paragraph',
                  type: 'PortableText',
                  title: 'Paragraph',
                  validation: (Rule) => Rule.required(),
                  initialValue: [
                    {
                      _type: 'block',
                      style: 'normal',
                      children: [
                        {
                          _type: 'span',
                          text: 'Odpowiemy najszybciej jak to będzie możliwe. A w międzyczasie zapraszamy na naszego Facebooka  ',
                        },
                      ],
                    },
                  ],
                }),
                defineField({
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  validation: (Rule) => Rule.required(),
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
                      description: 'Only SVG files are supported.',
                      options: {
                        accept: '.svg',
                      },
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
                  initialValue: [
                    {
                      _type: 'block',
                      style: 'normal',
                      children: [{ _type: 'span', text: 'Wiadomość nie została wysłana' }],
                    },
                  ],
                }),
                defineField({
                  name: 'paragraph',
                  type: 'PortableText',
                  title: 'Paragraph',
                  validation: (Rule) => Rule.required(),
                  initialValue: [
                    {
                      _type: 'block',
                      style: 'normal',
                      children: [{ _type: 'span', text: 'Spróbuj ponownie lub skontaktuj się z nami telefonicznie.' }],
                    },
                  ],
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
