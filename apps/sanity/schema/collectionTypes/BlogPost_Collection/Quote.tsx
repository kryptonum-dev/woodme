import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';

const name = 'Quote';
const title = 'Quote';
const icon = () => '💬';

export default defineField({
  name: name,
  type: 'object',
  title: title,
  ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Quote by itself, will be in italics and wrapped in quotes.',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'object',
      title: 'Author',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
    },
    prepare: ({ quote, author }) => ({
      title: `${quote}`,
      subtitle: `${author.name}, ${author.title}`,
      ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
    }),
  },
});
