import { defineField } from 'sanity';
import { InternalLinkableTypes } from '../../../structure/internal-linkable-types';
import { isValidUrl } from '../../../utils/is-valid-url';
import { toPlainText } from '../../../utils/to-plain-text';

export default defineField({
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    defineField({
      type: 'block',
      name: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        {
          title: 'Heading 2',
          value: 'h2',
          component: ({ children }) => <h2 style={{ fontSize: '1.875rem', fontWeight: 500, margin: 0 }}>{children}</h2>,
        },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
            component: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
          },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          defineField({
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: () => '🔗',
            fields: [
              defineField({
                name: 'linkType',
                type: 'string',
                title: 'Type',
                description:
                  'Choose "External" for links to websites outside your domain, or "Internal" for links to pages within your site.',
                options: {
                  list: ['external', 'internal'],
                  layout: 'radio',
                  direction: 'horizontal',
                },
                initialValue: 'external',
              }),
              defineField({
                name: 'external',
                type: 'string',
                title: 'URL',
                description: 'Specify the full URL. Ensure it starts with "https://", "mailto:" or "tel:" protocol.',
                hidden: ({ parent }) => parent?.linkType !== 'external',
                validation: (Rule) => [
                  Rule.custom((value, { parent }) => {
                    const linkType = (parent as { linkType?: string })?.linkType;
                    if (linkType === 'external') {
                      if (!value) return 'URL is required';
                      if (!value.startsWith('https://') && !value.startsWith('mailto:') && !value.startsWith('tel:')) {
                        return 'External link must start with the "https://", "mailto:" or "tel:" protocol';
                      }
                      if (!isValidUrl(value)) return 'Invalid URL';
                    }
                    return true;
                  }),
                ],
              }),
              defineField({
                name: 'internal',
                type: 'reference',
                title: 'Internal reference to page',
                description: 'Select an internal page to link to.',
                to: InternalLinkableTypes,
                options: {
                  disableNew: true,
                  filter: 'defined(slug.current)',
                },
                hidden: ({ parent }) => parent?.linkType !== 'internal',
                validation: (rule) => [
                  rule.custom((value, { parent }) => {
                    const linkType = (parent as { linkType?: string })?.linkType;
                    if (linkType === 'internal' && !value?._ref) return 'You have to choose internal page to link to.';
                    return true;
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    }),
  ],
  validation: (Rule) => Rule.required(),
});
