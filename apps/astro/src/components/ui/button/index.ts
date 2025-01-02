export type { Props as ButtonDataProps } from './Button.tsx'
export { default } from './Button.astro'

export const ButtonDataQuery = (name: string) => `
  ${name} {
    text,
    theme,
    linkType,
    "href": select(linkType == "internal" => internal -> slug.current, linkType == "external" => external, "#"),
  },
`
