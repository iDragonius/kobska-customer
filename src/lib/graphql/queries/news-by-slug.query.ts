import { gql } from '@apollo/client'
import { NewsQueryElementType } from '@/lib/graphql/queries/news.query'
export type AssetProps = {
  url: string
  alternativeText: string
  width: number
  height: number
  mime: string
}
export type AssetsProps = {
  attributes: AssetProps
}
export type NewsProps = {
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
      data: AssetsProps[]
    }
  }
}

export interface INewsBySlugQuery {
  news: {
    data: NewsProps
  }
  newsM: {
    data: NewsQueryElementType[]
  }
}
export const NewsBySlugQuery = gql`
  query ($slug: String!, $locale: I18NLocaleCode!) {
    news(slug: $slug, locale: $locale) {
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
                width
                height
                mime
              }
            }
          }
        }
      }
    }
    newsM(
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
