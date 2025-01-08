import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'DualColumnSection';
const title = 'Dual Column Section';
const icon = () => '📰';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryImage',
      type: 'image',
      title: 'Secondary Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      type: 'PortableText',
      title: 'CTA Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Call To Action',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainHeading',
      type: 'Heading',
      title: 'Main Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainParagraph',
      type: 'PortableText',
      title: 'Main Paragraph',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryHeading',
      type: 'Heading',
      title: 'Secondary Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryParagraph',
      type: 'PortableText',
      title: 'Secondary Paragraph',
      validation: (Rule) => Rule.required(),
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
