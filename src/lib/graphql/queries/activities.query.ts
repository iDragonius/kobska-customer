import { gql } from '@apollo/client'
export type ActivitiesQueryElementType = {
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
export interface IActivitiesQuery {
  activities: {
    data: ActivitiesQueryElementType[]
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
export const ActivitiesQuery = gql`
  query ($locale: I18NLocaleCode!, $pageSize: Int!, $page: Int!) {
    activities(
      sort: "position_id:asc,date:desc"
      locale: $locale
      pagination: { pageSize: $pageSize, page: $page }
    ) {
      data {
        id
        attributes {
          title
          content
          short_description
          slug
          date
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
                alternativeText
                width
                height
              }
            }
          }
          type
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
