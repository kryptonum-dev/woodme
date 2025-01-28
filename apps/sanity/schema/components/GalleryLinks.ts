import { defineField } from 'sanity';
import { InternalLinkableTypes } from '../../structure/internal-linkable-types';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'GalleryLinks';
const title = 'Gallery Links';
const icon = () => '🖼️';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'headingArray',
      type: 'array',
      title: 'Heading',
      description: 'This heading could be split into parts, divided by horizontal lines.',
      validation: (Rule) => Rule.required().max(3),
      of: [
        defineField({
          name: 'part',
          type: 'object',
          title: 'Part',
          fields: [
            defineField({
              name: 'partHeading',
              type: 'Heading',
              title: 'Heading Part',
            }),
          ],
          preview: {
            select: {
              title: 'partHeading',
            },
            prepare: ({ title }) => ({
              title: toPlainText(title),
              media: () => '✒',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Gallery Links',
      validation: (Rule) => Rule.required().min(1).max(3),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              type: 'reference',
              title: 'Internal reference to page',
              description: 'Select an internal page to link to.',
              to: InternalLinkableTypes,
              options: {
                disableNew: true,
                filter: 'defined(slug.current)',
              },
              validation: (rule) => [
                rule.custom((value, { parent }) => {
                  const linkType = (parent as { linkType?: string })?.linkType;
                  if (linkType === 'internal' && !value?._ref) return 'You have to choose internal page to link to.';
                  return true;
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle,
              media,
            }),
          },
        },
      ],
    }),
    ...sectionId,
  ],
  preview: {
    select: {
      headingArray: 'headingArray',
    },
    prepare: ({ headingArray }) => ({
      title,
      subtitle: headingArray
        ?.map((part: any) => toPlainText(part.partHeading))
        .filter(Boolean)
        .join(' '),
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon: icon() }),
    }),
  },
});
