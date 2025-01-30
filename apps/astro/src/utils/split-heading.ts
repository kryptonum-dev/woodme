// This function split the PortableText Heading into an array of {text: string, marks: string[]}.

export const splitHeading = (heading: any) => {
  const newBlock = heading.map((block: any) => {
    return block.children.map((child: any) => {
      return { text: child.text, marks: child.marks };
    });
  });

  return newBlock
    .flat()
    .flatMap((block: any) => {
      const words = block.text.split(' ');
      return words.map((word: any) => ({
        text: word,
        marks: block.marks.includes('strong') ? ['strong'] : [],
      }));
    })
    .filter((item: any) => item.text !== '');
};
