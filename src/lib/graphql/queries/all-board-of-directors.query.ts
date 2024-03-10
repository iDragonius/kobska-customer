import { gql } from '@apollo/client'

export const AllBoardOfDirectorsQuery = gql`
  query ($locale: I18NLocaleCode!) {
    boardOfDirector(locale: $locale) {
      data {
        attributes {
          directors {
            ... on ComponentAboutDirector {
              name
              position
              id
              description
              year
              address
              email
              phoneNumber
              socialNetworks {
                id
                url
                name
                icon {
                  data {
                    attributes {
                      url
                      name
                      width
                      height
                    }
                  }
                }
              }
              image {
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
  }
`
