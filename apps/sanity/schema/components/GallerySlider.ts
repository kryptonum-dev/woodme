import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'GallerySlider';
const title = 'Gallery Slider';
const icon = () => '🖼️';

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
      name: 'galleryList',
      type: 'array',
      title: 'Gallery List',
      description:
        'Each gallery consists of images that will be displayed in a swiper. Only one gallery can be selected at a time.',
      of: [
        {
          type: 'object',
          name: 'gallery',
          title: 'Gallery',
          fields: [
            { type: 'string', name: 'heading', title: 'Heading' },
            {
              type: 'array',
              name: 'images',
              title: 'Images',
              description: 'Minimum of 6 images',
              of: [{ type: 'image' }],
              validation: (Rule) => Rule.required().min(6),
            },
          ],
          preview: {
            select: {
              heading: 'heading',
              images: 'images',
            },
            prepare: ({ heading, images }) => ({
              title: heading,
              media: images[0],
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Background',
      initialValue: '#E3DFD3',
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
      ...sectionPreview({ imgUrl: `/static/components/test.webp`, icon: icon() }),
    }),
  },
});
