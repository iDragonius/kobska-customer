import { gql } from '@apollo/client'

export enum SuccessType {
  SUCCESS = 'success',
  CERTIFICATE = 'certificate'
}
export type SuccessProps = {
  attributes: {
    name: string
    type: SuccessType
    image: {
      data: {
        attributes: {
          url: string
          name: string
          width: number
          height: number
          alternativeText: string
        }
      }
    }
  }
  id: number
}
export interface ISuccessesAndCertificatesQuery {
  successesAndCertificates: {
    data: SuccessProps[]
  }
}
export const SuccessesAndCertificatesQuery = gql`
  query ($locale: I18NLocaleCode!) {
    successesAndCertificates(locale: $locale) {
      data {
        attributes {
          name
          type
          image {
            data {
              attributes {
                url
                name
                width
                height
                alternativeText
              }
            }
          }
        }
        id
      }
    }
  }
`
