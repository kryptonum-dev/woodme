import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import sectionId from '../ui/sectionId';

const name = 'TestimonialsSlider';
const title = 'Testimonials Slider';
const icon = () => '👍';

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
      name: 'testimonials',
      type: 'array',
      title: 'Testimonials',
      validation: (Rule) => Rule.required().unique().max(6).min(3),
      description: 'Testimonials will be displayed in a slider (maximum 6 testimonials allowed)',
      of: [{ type: 'reference', to: [{ type: 'Testimonial_Collection' }] }],
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
