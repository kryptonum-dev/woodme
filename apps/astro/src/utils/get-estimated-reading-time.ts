import type { PortableTextProps } from 'astro-portabletext/types';

export const ArticleToPlainText = (blocks: PortableTextProps['value']) => {
  function extractTextFromBlock(block: any): string {
    if (!block) return '';
    // Handle regular text blocks (most common case)
    if (block._type === 'block' && block.children) {
      return block.children.map((child: any) => child.text || '').join('');
    }
    // Skip specific types we don't want to count
    if (block._type === 'image' || block._type === 'reference') {
      return '';
    }
    // Handle arrays (for nested content)
    if (Array.isArray(block)) {
      return block.map((item) => extractTextFromBlock(item)).join(' ');
    }
    // Handle objects (for custom components and nested structures)
    if (typeof block === 'object' && block !== null) {
      // Skip internal properties and metadata
      const relevantValues = Object.entries(block)
        .filter(([key]) => !key.startsWith('_') && !['asset', 'reference'].includes(key))
        .map(([, value]) => extractTextFromBlock(value));
      return relevantValues.join(' ');
    }
    // Handle primitive values - only include strings
    return typeof block === 'string' ? block : '';
  }
  return (Array.isArray(blocks) ? blocks : [blocks])
    .map((block: any) => extractTextFromBlock(block))
    .filter((text: string) => text.trim() !== '')
    .join('\n\n');
};

export const getEstimatedReadingTime = (content: PortableTextProps['value']) => {
  const plainText = ArticleToPlainText(content);

  const readingTime = (text: string) => {
    const countWords = (text: string) => {
      const trimmedText = text.trim();
      if (trimmedText === '') return 0;
      const words = trimmedText.split(/\s+/);
      return words.length;
    };
    const words = countWords(text);
    const averageReadingSpeedWordsPerMinute = 200;
    const readingTime = Math.ceil(words / averageReadingSpeedWordsPerMinute);
    return readingTime;
  };

  const getMinuteText = (minutes: number) => {
    if (minutes === 1) return 'minuta';
    if (minutes >= 2 && minutes <= 4) return 'minuty';
    return 'minut';
  };

  return `${readingTime(plainText)} ${getMinuteText(readingTime(plainText))} czytania`;
};
