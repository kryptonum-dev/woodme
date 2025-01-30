import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'CtaSection';
const title = 'CTA Section';
const icon = () => '📢';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'imageList',
      type: 'array',
      title: 'Image List',
      validation: (Rule) => Rule.required().min(3).max(6),
      of: [
        {
          type: 'image',
          title: 'Image',
          validation: (Rule) => Rule.required(),
        },
      ],
      initialValue: [
        {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-5ef1660983ceae1069b76a8c25774c4ab2297c90-612x814-webp',
          },
        },
        {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-8e492a8eb8e7fa3bb4e4112dcd1ca2d5eced54bd-609x726-webp',
          },
        },
        {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-272071b4c5d51a1ceee2a07ee5ae96afbeba828c-609x726-webp',
          },
        },
        {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-d397ea37bd03cf3e76f87a0213e6c2018969b276-609x726-webp',
          },
        },
        {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-af7dbc004bf773f8517059ebf582db15c0237da9-612x726-webp',
          },
        },
        {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-610b0d4eccb939e843ac33f6e8beca366f1313bd-612x814-webp', // Replace with your actual image asset reference
          },
        },
      ],
    }),
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
      name: 'background',
      type: 'string',
      title: 'Background',
      initialValue: '#5f6d62',
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
