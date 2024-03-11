import { gql } from '@apollo/client'
export type StructureProps = {
  fullName: string
  position: string
  id: number
  image: {
    data: {
      attributes: {
        alternativeText: string
        url: string
        width: number
        height: number
      }
    }
  }
  description: string

  socialNetworks: {
    id: string
    url: string
    name: string
    icon: {
      data: {
        attributes: {
          name: string
          url: string
          width: number
          height: number
        }
      }
    }
  }[]
}
export interface IStructureQuery {
  structure: {
    data: {
      attributes: {
        members: StructureProps[]
      }
    }
  }
}
export const StructureQuery = gql`
  query ($locale: I18NLocaleCode!, $year: Int!) {
    structure(locale: $locale) {
      data {
        attributes {
          members(filters: { year: { eq: $year } }) {
            ... on ComponentAboutStructures {
              fullName
              position
              id
              description
              year
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
