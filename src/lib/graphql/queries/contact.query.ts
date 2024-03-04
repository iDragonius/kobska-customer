import { gql } from '@apollo/client'

export interface IContactQuery {
  contactInfo: {
    data: {
      attributes: {
        phone: string
        address: string
        email: string
      }
    }
  }
}
export const ContactQuery = gql`
  query ($locale: I18NLocaleCode!) {
    contactInfo(locale: $locale) {
      data {
        attributes {
          phone
          address
          email
        }
      }
    }
  }
`
