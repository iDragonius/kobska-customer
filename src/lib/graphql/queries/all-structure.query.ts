import { gql } from '@apollo/client'

export const AllStructureQuery = gql`
  query ($locale: I18NLocaleCode!) {
    structure(locale: $locale) {
      data {
        attributes {
          members {
            ... on ComponentAboutStructures {
              fullName
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
