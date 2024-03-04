import { gql } from '@apollo/client'
import { ActivitiesQueryElementType } from '@/lib/graphql/queries/activities.query'
export type ActivityProps = {
  attributes: {
    title: string
    content: string
    short_description: string
    date: string
    slug: string
    type: string
    thumbnail: {
      data: {
        attributes: {
          url: string
          alternativeText: string
          width: number
          height: number
          mime: string
        }
      }
    }
    assets: {
      data: [
        {
          attributes: {
            url: string
            alternativeText: string
            width: number
            height: number
            mime: string
          }
        }
      ]
    }
  }
}
export interface IActivityBySlugQuery {
  activity: {
    data: ActivityProps
  }
  activities: {
    data: ActivitiesQueryElementType[]
  }
}
export const ActivityBySlugQuery = gql`
  query ($slug: String!, $locale: I18NLocaleCode!) {
    activity(slug: $slug, locale: $locale) {
      data {
        attributes {
          title
          content
          short_description
          date
          slug
          type
          thumbnail {
            data {
              attributes {
                url
                alternativeText
                width
                height
                mime
              }
            }
          }
          assets {
            data {
              attributes {
                url
                alternativeText
                previewUrl
                width
                height
                mime
              }
            }
          }
        }
      }
    }
    activities(
      sort: "position_id:asc,date:desc"
      locale: $locale
      filters: { slug: { ne: $slug } }
      pagination: { page: 1, pageSize: 3 }
    ) {
      data {
        attributes {
          title
          slug
          short_description
          date
          type
          thumbnail {
            data {
              attributes {
                url
                alternativeText
                width
                height
                mime
              }
            }
          }
        }
      }
    }
  }
`
