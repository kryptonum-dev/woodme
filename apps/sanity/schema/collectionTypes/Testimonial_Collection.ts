import { defineField, defineType } from 'sanity';

const name = 'Testimonial_Collection';
const title = 'Testimonial Collection';
const icon = () => '👍';

export default defineType({
  name: name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      fieldset: 'media',
    }),
    defineField({
      name: 'video',
      type: 'mux.video',
      description: 'When added, video will replace the review text',
      title: 'Video',
      fieldset: 'media',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      type: 'string',
      title: 'Service',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'review',
      type: 'Heading',
      title: 'Review',
      validation: (Rule) => Rule.required(),
    }),
  ],
  fieldsets: [
    {
      name: 'media',
      title: 'Media (optional)',
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      name: 'name',
      service: 'service',
      image: 'image',
    },
    prepare: ({ name, service, image }) => ({
      title: name,
      subtitle: service,
      media: image,
    }),
  },
});
