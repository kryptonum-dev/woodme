import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';
import { toPlainText } from '../../../utils/to-plain-text';

const name = 'NumberedStepsList';
const title = 'Numbered Steps List';
const icon = () => '🔢';

export default defineField({
  name: name,
  type: 'object',
  title: title,
  ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
  fields: [
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: ['text', 'list'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listBullet',
      type: 'array',
      title: 'List',
      hidden: ({ parent }) => parent?.type !== 'list',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Item',
          fields: [
            defineField({
              name: 'heading',
              type: 'Heading',
              title: 'Heading',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'itemList',
              type: 'array',
              title: 'Bullet List',
              of: [
                defineField({
                  name: 'textItem',
                  type: 'text',
                  title: 'Item',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
          preview: {
            select: {
              heading: 'heading',
              paragraph: 'paragraph',
            },
            prepare({ heading, paragraph }) {
              return {
                title: toPlainText(heading),
                subtitle: toPlainText(paragraph),
                media: () => '📃',
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((list, context: any) => {
          if (context.parent?.type === 'list' && (!list || list.length < 2)) {
            return 'List must have at least 2 items when type is "list"';
          }
          return true;
        }),
    }),
    defineField({
      name: 'listText',
      type: 'array',
      title: 'List',
      hidden: ({ parent }) => parent?.type !== 'text',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Item',
          fields: [
            defineField({
              name: 'heading',
              type: 'string',
              title: 'Heading',
              description: 'Heading and paragraph are dividen in text by " - "',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'paragraph',
              type: 'text',
              rows: 2,
              title: 'Paragraph',
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
          preview: {
            select: {
              heading: 'heading',
              paragraph: 'paragraph',
            },
            prepare({ heading, paragraph }) {
              return {
                title: heading,
                subtitle: paragraph,
                media: () => '📃',
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((list, context: any) => {
          if (context.parent?.type === 'text' && (!list || list.length < 2)) {
            return 'List must have at least 2 items when type is "text"';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: title,
        subtitle: toPlainText(heading),
        ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
      };
    },
  },
});
