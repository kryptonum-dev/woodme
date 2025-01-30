import { defineField } from 'sanity';
import { isValidUrl } from '../../../utils/is-valid-url';
import { sectionPreview } from '../../../utils/section-preview';

const name = 'Image';
const title = 'Image';
const icon = () => '🖼️';

export default defineField({
  name: name,
  type: 'object',
  title: title,
  icon: icon,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      type: 'object',
      title: 'Source (Optional)',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'URL',
          description: 'Specify the full URL. Ensure it starts with "https://" and is a valid URL.',
          validation: (Rule) => [
            Rule.custom((value, { parent }) => {
              if (!value) return 'URL is required';
              if (!value.startsWith('https://')) {
                return 'External link must start with the "https://" protocol';
              }
              if (!isValidUrl(value)) return 'Invalid URL';

              return true;
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      image: 'image',
      source: 'source',
    },
    prepare: ({ source }) => ({
      title: `Image${source?.name ? ` [${source.name}]` : ''}`,
      ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
    }),
  },
});
