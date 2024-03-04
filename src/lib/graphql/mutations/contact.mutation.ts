import { gql } from '@apollo/client'

export enum ContactEnum {
  suggestion = 'suggestion',
  complaint = 'complaint'
}

export interface IContactMutation {
  first_name: string
  last_name: string
  phone: string
  email: string
  message: string
  type: ContactEnum
}
export const ContactMutation = () =>
  gql`
    mutation (
      $phone: String!
      $email: String!
      $first_name: String!
      $last_name: String!
      $message: String!
      $type: ENUM_CONTACT_TYPE
    ) {
      createContact(
        data: {
          phone: $phone
          email: $email
          first_name: $first_name
          last_name: $last_name
          message: $message
          type: $type
        }
      ) {
        data {
          id
        }
      }
    }
  `
