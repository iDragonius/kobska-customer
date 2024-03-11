import { gql } from '@apollo/client'

export interface IAboutAssociationQuery {
  aboutAssociation: {
    data: {
      id: number
      attributes: {
        content: string
        pdf: {
          data: {
            attributes: {
              url: string
              name: string
            }
          }
        }
        background: {
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
    }
  }
}
export const AboutAssociationQuery = gql`
  query ($locale: I18NLocaleCode!) {
    aboutAssociation(locale: $locale) {
      data {
        id
        attributes {
          content
          pdf {
            data {
              attributes {
                url
                name
              }
            }
          }
          background {
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
`
