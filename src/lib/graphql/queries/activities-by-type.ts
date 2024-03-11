import { gql } from '@apollo/client'

export const ActivitiesByTypeQuery = gql`
  query ($locale: I18NLocaleCode!, $activity: String!) {
    newsM(
      sort: "position_id:asc,date:desc"
      locale: $locale
      pagination: { pageSize: 100, page: 1 }
      filters: { activity: { eq: $activity } }
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
export const ActivitiesByTypeAndYearQuery = gql`
  query ($locale: I18NLocaleCode!, $activity: String!, $year: Int!) {
    newsM(
      sort: "position_id:asc,date:desc"
      locale: $locale
      pagination: { pageSize: 100, page: 1 }
      filters: { activity: { eq: $activity }, year: { eq: $year } }
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
