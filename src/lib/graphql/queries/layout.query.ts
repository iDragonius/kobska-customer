import { gql } from '@apollo/client'

export type NavigationElementType = {
  id: string
  label: string
  path: string
  status: boolean
}
export interface INavigationElement {
  id: number
  label: string
  path: string
  status: boolean
  hasLink: boolean
  navigation_elements: NavigationElementType[]
}
export interface ILayoutQuery {
  navigationMenu: {
    data: {
      attributes: {
        navigations: INavigationElement[]
      }
    }
  }
  socialNetwork: {
    data: {
      attributes: {
        social_networks: [
          {
            id: number
            name: string
            url: string
            icon: {
              data: {
                attributes: {
                  url: string
                  alternativeText: string
                  width: number
                  height: number
                }
              }
            }
          }
        ]
      }
    }
  }
}
export const LayoutQuery = gql`
  query ($locale: I18NLocaleCode!) {
    navigationMenu(locale: $locale) {
      data {
        attributes {
          navigations {
            id
            label
            path
            hasLink
            status
            navigation_elements {
              id
              label
              path
              status
            }
          }
        }
      }
    }
    socialNetwork {
      data {
        attributes {
          social_networks {
            id
            name
            url
            icon {
              data {
                attributes {
                  url
                  alternativeText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`
