import { gql } from '@apollo/client'
export enum KivQueryEnum {
  ComponentKivVideoClip = 'ComponentKivVideoClip',
  ComponentKivBranding = 'ComponentKivBranding',
  ComponentKivImage = 'ComponentKivImage'
}
export type ComponentKivVideoClipProps = {
  __typename: string
  video_thumb: {
    data: {
      attributes: {
        url: string
        name: string
        mime: string
        size: number
        height: number
        width: number
        alternativeText: string
      }
    }
  }
  url: string
}
export type ComponentKivImageProps = {
  __typename: string
  image: {
    data: {
      attributes: {
        url: string
        alternativeText: string
        width: number
        height: number
        name: string
      }
    }
  }
}
export type ComponentKivBrandingProps = {
  __typename: string
  title: string
  description: string
  file: {
    data: {
      attributes: {
        url: string
        name: string
      }
    }
  }
}
export type ComponentProps = ComponentKivBrandingProps &
  ComponentKivImageProps &
  ComponentKivVideoClipProps
export interface IKivQuery {
  kivs: {
    data: [
      {
        id: string
        attributes: {
          attachment: [ComponentProps]
        }
      }
    ]
  }
}
export const KivQuery = gql`
  query ($locale: I18NLocaleCode!) {
    kivs(locale: $locale) {
      data {
        id
        attributes {
          attachment {
            __typename
            ... on ComponentKivImage {
              image {
                data {
                  attributes {
                    url
                    alternativeText
                    width
                    height
                    name
                  }
                }
              }
            }

            ... on ComponentKivBranding {
              file {
                data {
                  attributes {
                    url
                    name
                  }
                }
              }
              title
              description
            }

            ... on ComponentKivVideoClip {
              video_thumb {
                data {
                  attributes {
                    url
                    alternativeText
                    width
                    height
                  }
                }
              }
              url
            }
          }
        }
      }
    }
  }
`
