import { gql } from '@apollo/client'

export type ImageProps = {
  id: string
  attributes: {
    url: string
    mime: string
    alternativeText: string
    width: number
    height: number
  }
}
export type DirectionElementProps = {
  id: string
  direction_type: {
    data: {
      attributes: {
        name: string
        path: string
        description: string
      }
    }
  }
  name: string
  short_description: string
}

export type OpportunityElementProps = {
  name: string
  value: string
}
export type HomeInfoProps = {
  id: string
  attributes: {
    main_title: string
    main_description: string
    main_background: {
      data: ImageProps
    }
    direction_slider: [
      {
        image: {
          data: ImageProps
        }
        link: string
        expiration_date: string
      }
    ]
    directions: DirectionElementProps[]
    opportunities: OpportunityElementProps[]
    video_title: string
    video_description: string
    video_url: string
    video: {
      data: ImageProps[]
    }
  }
}

export type NewsProps = {
  id: string
  attributes: {
    title: string
    short_description: string
    type: string
    slug: string
    date: string
    thumbnail: {
      data: ImageProps
    }
  }
}
export type ActivityProps = {
  id: string
  attributes: {
    title: string
    short_description: string
    type: string
    slug: string
    date: string
    publishedAt: string
    thumbnail: {
      data: ImageProps
    }
  }
}
export type PartnerType = {
  id: string
  attributes: {
    name: string
    url: string
    image: {
      data: ImageProps
    }
  }
}

export interface LogosProps {
  id: number

  attributes: {
    name: string
    image: {
      data: {
        id: number
        attributes: {
          url: string
          alternativeText: string
          width: number
          height: number
          name: string
        }
      }
    }
  }
}
export interface IHomeQuery {
  homeInfo: {
    data: HomeInfoProps
  }
  newsM: {
    data: NewsProps[]
  }
  activities: {
    data: ActivityProps[]
  }
  partners: {
    data: PartnerType[]
  }
  logos: {
    data: LogosProps[]
  }
}

export const HomeQuery = gql`
  query ($locale: I18NLocaleCode!) {
    homeInfo(locale: $locale) {
      data {
        id
        attributes {
          main_title
          main_description
          main_background {
            data {
              id
              attributes {
                url
                mime
                alternativeText
                width
                height
              }
            }
          }
          direction_slider {
            image {
              data {
                attributes {
                  url
                  mime
                  alternativeText
                  width
                  height
                }
              }
            }
            link
            expiration_date
          }
          directions {
            id
            direction_type {
              data {
                attributes {
                  name
                  path
                  description
                }
              }
            }
            name
            short_description
          }
          opportunities {
            name
            value
          }
          video {
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
          video_title
          video_description
          video_url
        }
      }
    }
    newsM(
      locale: $locale
      sort: "position_id:asc,date:desc"
      pagination: { page: 1, pageSize: 3 }
    ) {
      data {
        id
        attributes {
          title
          short_description
          type
          slug
          date
          thumbnail {
            data {
              attributes {
                url
                mime
                alternativeText
                width
                height
              }
            }
          }
        }
      }
    }
    activities(
      locale: $locale
      sort: "position_id:asc,publishedAt:desc"
      pagination: { page: 1, pageSize: 4 }
    ) {
      data {
        id
        attributes {
          title
          short_description
          type
          slug
          date
          publishedAt
          thumbnail {
            data {
              attributes {
                url
                mime
                alternativeText
                width
                height
              }
            }
          }
        }
      }
    }
    partners {
      data {
        id
        attributes {
          name
          image {
            data {
              id
              attributes {
                url
                mime
                alternativeText
                width
                height
              }
            }
          }
          url
        }
      }
    }
    logos {
      data {
        id
        attributes {
          name
          image {
            data {
              id
              attributes {
                url
                alternativeText
                width
                height
                name
              }
            }
          }
        }
      }
    }
  }
`
