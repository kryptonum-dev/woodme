import { Faq_Questions_Query } from '../components/global/Faq/Faq.astro';
import sanityFetch from './sanity.fetch';

export type FaqItem = {
  question: string;
  answer: any;
};

export const fetchFaqItems = async (pageType: string) => {
  const page = await sanityFetch<{
    faqSections: {
      faqItems: FaqItem[];
    }[];
  }>({
    query: `
      *[_type == "${pageType}"][0] {
        ${Faq_Questions_Query}
      }
    `,
  });

  return page.faqSections?.filter((section) => section?.faqItems).flatMap((section) => section.faqItems) || [];
};
