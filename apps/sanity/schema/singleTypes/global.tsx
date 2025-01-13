import { defineField, defineType } from 'sanity';
import { InternalLinkableTypes } from '../../structure/internal-linkable-types';

export default defineType({
  name: 'global',
  type: 'document',
  title: 'Global',
  icon: () => '🌍',
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Phone number (optional)',
    }),
    defineField({
      name: 'openHours',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      title: 'Open hours',
      description: 'Enter time in HH:MM format',
      fields: [
        defineField({
          name: 'from',
          type: 'string',
          title: 'From',
          validation: (Rule) =>
            Rule.custom((value: any, context) => {
              if (!value) {
                return 'Time is required';
              }
              if (value && !value.match(/^\d{2}:\d{2}$/)) {
                return 'Time must be in the format HH:MM';
              }
              const [hh, mm] = value.split(':').map(Number);
              if (hh > 24 || mm > 60) {
                return 'Time must be in the format HH:MM, where HH <= 24 and MM <= 60';
              }
              return true;
            }),
          fieldset: 'openHours',
        }),
        defineField({
          name: 'to',
          type: 'string',
          title: 'To',
          validation: (Rule) =>
            Rule.custom((value: any, context) => {
              if (!value) {
                return 'Time is required';
              }
              if (value && !value.match(/^\d{2}:\d{2}$/)) {
                return 'Time must be in the format HH:MM';
              }
              const [hh, mm] = value.split(':').map(Number);
              if (hh > 24 || mm > 60) {
                return 'Time must be in the format HH:MM, where HH <= 24 and MM <= 60';
              }
              return true;
            }),
          fieldset: 'openHours',
        }),
        defineField({
          name: 'closedWeekends',
          type: 'boolean',
          title: 'Closed on weekends',
          fieldset: 'openHours',
        }),
      ],
      fieldsets: [
        {
          name: 'openHours',
          title: 'Open hours',
          options: {
            columns: 2,
          },
        },
      ],
    }),
    defineField({
      name: 'socials',
      type: 'object',
      title: 'Social media',
      options: { collapsible: true },
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
        }),
        defineField({
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
        }),
        defineField({
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
        }),
        defineField({
          name: 'tiktok',
          type: 'url',
          title: 'TikTok',
          validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
        }),
      ],
    }),
    defineField({
      name: 'googleData',
      type: 'object',
      title: 'Google Data',
      fields: [
        defineField({
          name: 'rating',
          type: 'number',
          title: 'Rating (1.0 - 5.0)',
          validation: (Rule) => Rule.required().max(5).min(1),
          fieldset: 'rating',
        }),
        defineField({
          name: 'user_ratings_total',
          type: 'number',
          title: 'Number of reviews',
          validation: (Rule) => Rule.required(),
          fieldset: 'rating',
        }),
        defineField({
          name: 'url',
          type: 'url',
          title: 'Google Business URL',
          validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
        }),
      ],
      fieldsets: [
        {
          name: 'rating',
          title: 'Rating',
          options: { columns: 2 },
        },
      ],
    }),
    defineField({
      name: 'navigation',
      type: 'object',
      title: 'Navigation',
      fields: [
        defineField({
          name: 'annotation',
          type: 'object',
          title: 'Annotation',
          fields: [
            defineField({
              name: 'visible',
              type: 'boolean',
              title: 'Annotation visible',
              validation: (Rule) => Rule.required(),
              description: 'If true, the annotation will be visible on the top of the navigation.',
            }),
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Icon',
              description: 'Only SVG files are supported.',
              options: {
                accept: '.svg',
              },
              validation: (Rule) => Rule.required(),
              hidden: ({ parent }) => !parent?.visible,
            }),
            defineField({
              name: 'text',
              type: 'string',
              title: 'Text',
              validation: (Rule) => Rule.required(),
              hidden: ({ parent }) => !parent?.visible,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      type: 'object',
      title: 'Footer',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'highlitedProjects',
          type: 'array',
          title: 'Highlited Projects',
          validation: (Rule) => Rule.max(3).unique(),
          description: 'Highlited projects that will be displayed in footer. Maximum 3 projects are allowed.',
          of: [{ type: 'reference', to: [{ type: 'Project_Collection' }] }],
        }),
        defineField({
          name: 'internalLinks',
          type: 'array',
          title: 'Internal Links',
          validation: (Rule) => Rule.min(3).required().unique(),
          description: 'Internal links that will be displayed in footer. Minimum 3 links are required.',
          of: [
            {
              name: 'internalLink',
              type: 'object',
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                }),
                defineField({
                  name: 'link',
                  type: 'reference',
                  to: InternalLinkableTypes,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                },
                prepare: ({ title }) => ({
                  title,
                  media: () => '🔗',
                }),
              },
            },
          ],
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Paragraph',
          validation: (Rule) => Rule.required(),
          description: 'Additional paragraph that will be displayed in footer.',
        }),
        defineField({
          name: 'cta',
          type: 'cta',
          title: 'Call To Action',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'Global SEO',
      fields: [
        defineField({
          name: 'img',
          type: 'image',
          title: 'Social Share Image',
          description:
            'Social Share Image is visible when sharing website on social media. The dimensions of the image should be 1200x630px. For maximum compatibility, use JPG or PNG formats, as WebP may not be supported everywhere.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'OrganizationSchema',
      type: 'object',
      title: 'Organization structured data',
      description: (
        <>
          Learn more about{' '}
          <a
            href="https://developers.google.com/search/docs/appearance/structured-data/organization?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Organization structured data
          </a>
        </>
      ),
      options: { collapsible: true },
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Name',
          description: 'Enter the name of your organization as you want it to appear in search results.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          title: 'Description',
          description: 'A brief description of your organization that will appear in search results.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Global settings',
    }),
  },
});
