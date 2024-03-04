import { gql } from '@apollo/client'

export interface IAboutAssociationQuery {
  aboutAssociation: {
    data: {
      id: number
      attributes: {
        content: string
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
