export function portableTextToHtml(blocks: any[]) {
  return blocks
    .map((block) => {
      const childText = block.children.map((child: any) => child.text).join('');
      return childText ? `<p>${childText}</p>` : '';
    })
    .join('');
}
