import { gql } from '@apollo/client'
import { AssetsProps } from '@/lib/graphql/queries/news-by-slug.query'
import {
  IDirections,
  IDirectionsByPathQuery
} from '@/lib/graphql/queries/directions-by-path.query'

export interface DirectionBySlugQuery {
  direction: {
    data: {
      attributes: {
        title: string
        content: string
        slug: string
        publishedAt: string
        thumbnail: {
          data: {
            attributes: {
              url: string
              alternativeText: string
              width: number
              height: number
            }
          }
        }
        assets: AssetsProps
        short_description: string
      }
    }
  }
  directionType: IDirections
}
export const DirectionBySlugQuery = gql`
  query ($locale: I18NLocaleCode!, $slug: String!, $path: String!) {
    direction(locale: $locale, slug: $slug) {
      data {
        attributes {
          title
          content
          slug
          publishedAt
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
          assets {
            data {
              attributes {
                url
                width
                height
                alternativeText
                mime
              }
            }
          }
          short_description
          direction_type {
            data {
              attributes {
                name
                path
              }
            }
          }
        }
      }
    }
    directionType(locale: $locale, path: $path) {
      data {
        attributes {
          name
          path
          directions(
            sort: "position_id:asc,publishedAt:desc"
            filters: { slug: { ne: $slug } }
            pagination: { page: 1, pageSize: 3 }
          ) {
            data {
              id
              attributes {
                title
                slug
                short_description
                publishedAt
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
              }
            }
          }
        }
      }
    }
  }
`
