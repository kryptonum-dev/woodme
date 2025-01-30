import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'ContactForm';
const title = 'Contact Form';
const icon = () => '📧';

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
      name: 'form',
      type: 'object',
      title: 'Form',
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
                          text: 'Odpowiemy najszybciej jak to będzie możliwe. A w międzyczasie zapraszamy na naszego Facebooka',
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
                    defineField({
                      name: 'title',
                      type: 'string',
                      title: 'Title',
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
    defineField({
      name: 'rightBox',
      type: 'object',
      title: 'Right Box',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'textColumn',
          type: 'array',
          title: 'Text Columns',
          of: [
            {
              type: 'object',
              title: 'Text Column',
              fields: [
                defineField({
                  name: 'paragraph',
                  type: 'PortableText',
                  title: 'Paragraph',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'pdfBox',
                  type: 'object',
                  title: 'PDF Box',
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
                      name: 'text',
                      type: 'string',
                      title: 'Text',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'file',
                      type: 'file',
                      title: 'File',
                      options: {
                        accept: '.pdf',
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      text: 'pdfBox',
                    },
                    prepare: ({ text }) => ({
                      title: text,
                      media: () => '📃',
                    }),
                  },
                }),
              ],
              preview: {
                select: {
                  title: 'paragraph',
                },
                prepare: ({ title }) => ({
                  title: toPlainText(title),
                  media: () => '📑',
                }),
              },
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'phoneBox',
      type: 'object',
      title: 'Phone Box',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
              children: [{ _type: 'span', text: 'Zadzwoń do nas' }],
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
              children: [{ _type: 'span', text: 'Potrzebujesz szybkiej odpowiedzi? Z przyjemnością Ci pomożemy' }],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'emailBox',
      type: 'object',
      title: 'Email Box',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
              children: [{ _type: 'span', text: 'Napisz do nas' }],
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
                { _type: 'span', text: 'Wolisz napisać? Napisz maila – odpowiemy najszybciej, jak to możliwe' },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'addressBox',
      type: 'object',
      title: 'Address Box',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
              children: [{ _type: 'span', text: 'Zobacz naszą pracownie' }],
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
              children: [{ _type: 'span', text: 'Chcesz zobaczyć jak pracujemy? Zapraszamy do naszej pracowni' }],
            },
          ],
        }),
      ],
    }),
    ...sectionId,
  ],
  preview: {
    select: {
      heading: 'form.heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon: icon() }),
    }),
  },
});
