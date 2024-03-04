import { gql } from '@apollo/client'
import { NewsQueryElementType } from '@/lib/graphql/queries/news.query'

export interface LogosQueryProps {
  logo: {
    id: number
    data: {
      attributes: {
        name: string
        image: {
          data: {
            attributes: {
              url: string
              alternativeText: string
              width: number
              height: number
            }
          }
        }
        news: {
          data: NewsQueryElementType[]
        }
      }
    }
  }
}
export const LogosQuery = gql`
  query ($id: ID!) {
    logo(id: $id) {
      data {
        id
        attributes {
          name
          news {
            data {
              id
              attributes {
                title
                short_description
                thumbnail {
                  data {
                    attributes {
                      url
                      alternativeText
                      width
                      height
                    }
                  }
                }
                slug
                type
                date
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
`
