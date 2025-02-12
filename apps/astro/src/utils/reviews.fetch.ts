import type { PortableTextValue } from '@/components/ui/portable-text';
import sanityFetch from './sanity.fetch';
import { toPlainText } from './to-plain-text';

export type Review = {
  date: string;
  name: string;
  service: string;
  review: PortableTextValue;
};

export type PlainReview = Review & {
  review: string;
};

export const fetchReviews = async (): Promise<PlainReview[]> => {
  const reviews = await sanityFetch<Review[]>({
    query: `
      *[_type == "Testimonial_Collection"] | order(date desc) {
        date,
        name,
        service,
        review
      }
    `,
  });

  return reviews.map((review) => ({
    ...review,
    review: toPlainText(review.review),
  })) as PlainReview[];
};

export const fetchSingleReview = async (components: any[]): Promise<PlainReview | null> => {
  const singleReviewComponent = components.find((component) => component._type === 'SingleTestimonialSection');
  if (!singleReviewComponent?.testimonial) return null;

  const review = {
    date: singleReviewComponent.testimonial.date,
    name: singleReviewComponent.testimonial.name,
    service: singleReviewComponent.testimonial.service,
    review: toPlainText(singleReviewComponent.testimonial.review),
  };

  return review as PlainReview;
};
