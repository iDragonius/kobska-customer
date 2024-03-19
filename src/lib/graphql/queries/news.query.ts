import { gql } from '@apollo/client'

export type NewsQueryElementType = {
  id: string
  attributes: {
    title: string

    short_description: string
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

    slug: string
    type: string
    date: string
  }
}
export interface INewsQuery {
  newsM: {
    data: NewsQueryElementType[]
    meta: {
      pagination: {
        pageCount: number
        total: number
        pageSize: number
        page: number
      }
    }
  }
}

export const NewsQuery = gql`
  query (
    $locale: I18NLocaleCode!
    $pageSize: Int!
    $page: Int!
    $search: String!
  ) {
    newsM(
      sort: "position_id:asc,date:desc"
      locale: $locale
      pagination: { pageSize: $pageSize, page: $page }
      filters: { title: { containsi: $search } }
    ) {
      data {
        attributes {
          title
          content
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
          locale
          slug
          type
          assets {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          date
        }
      }
      meta {
        pagination {
          pageCount
          pageSize
          page
          total
        }
      }
    }
  }
`
