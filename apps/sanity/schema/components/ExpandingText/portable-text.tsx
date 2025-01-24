import { defineField } from 'sanity';

export default defineField({
  type: 'array',
  name: 'textContent',
  title: 'Text Content',
  description:
    'The text will initially display only the part of the content. The full content becomes visible when expanded.',
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
      lists: [],
      marks: {
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
            component: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
          },
        ],
        annotations: [],
      },
    }),
  ],
  validation: (Rule) => Rule.required(),
});
