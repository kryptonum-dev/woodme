import { defineField } from 'sanity';
import { toPlainText } from '../../../utils/to-plain-text';
import { sectionPreview } from '../../../utils/section-preview';

const name = 'ImageCta';
const title = 'Image CTA';
const icon = () => '🌟';

export default defineField({
  name: name,
  type: 'object',
  title: title,
  ...sectionPreview({ imgUrl: `/static/BlogPost_Collection/${name}.webp`, icon: icon() }),
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: ['Single Image', 'Triple Image'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Single Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      hidden: ({ parent }) => parent?.type !== 'Single Image',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'Single Image' && !value) {
            return 'Image is required for Single Image type';
          }
          return true;
        }),
    }),
    defineField({
      name: 'imageList',
      type: 'array',
      title: 'Image List',
      hidden: ({ parent }) => parent?.type !== 'Triple Image',
      of: [
        defineField({
          name: 'item',
          type: 'image',
          title: 'Image',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.type === 'Triple Image' && (!value || value.length !== 3)) {
            return 'Triple Image type requires exactly 3 images';
          }
          return true;
        }),
    }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctas',
      type: 'array',
      title: 'CTAs',
      description: 'Up to 2 CTAs',
      of: [{ type: 'cta' }],
      validation: (Rule) => Rule.required().max(2),
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
