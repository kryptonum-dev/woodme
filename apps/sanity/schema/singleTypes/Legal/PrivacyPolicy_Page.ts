import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../../utils/define-slug-for-document';
import PortableText from './portable-text';

const name = 'PrivacyPolicy_Page';
const title = 'Privacy Policy';
const slug = '/polityka-prywatnosci';
const icon = () => '📑';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon: icon,
  options: { documentPreview: true },
  fields: [
    ...defineSlugForDocument({ slug: slug }),
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
    PortableText,
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    prepare: () => ({
      title: title,
      subtitle: slug,
    }),
  },
});
