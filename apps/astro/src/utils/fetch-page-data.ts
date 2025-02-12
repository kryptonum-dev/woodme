import { Components_Query, type ComponentsProps } from '../components/Components.astro';
import { PortableTextQuery } from '../components/ui/portable-text';
import metadataFetch from './metadata.fetch';
import sanityFetch from './sanity.fetch';

export type QueryProps = {
  name: string;
  slug: string;
  footerBackground: string;
  firstItemType: string;
  components: ComponentsProps;
  faqSections: {
    faqItems: {
      question: string;
      answer: string;
    }[];
  }[];
};

export const fetchPageData = async (pageName: string, customQuery?: string, params?: Record<string, any>) => {
  const page = await sanityFetch<QueryProps>({
    query:
      customQuery ||
      `
          *[_type == "${pageName}"][0] {
            "name": name,
            "slug": slug.current,
            "footerBackground": components[-1].background,
            "firstItemType": components[0]._type,
            ${Components_Query}
            "faqSections": components[]{
              _type == "Faq" => {
                 faqItems[] -> {
                  question,
                  ${PortableTextQuery('answer')}
                }
              }
            },
          }
        `,
    params,
  });

  if (!page) return null;

  const metadata = await metadataFetch(page.slug);

  const faqItems =
    page.faqSections?.filter((section) => section?.faqItems).flatMap((section) => section.faqItems) || [];

  return {
    page,
    metadata,
    faqItems,
  };
};
