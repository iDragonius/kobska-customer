import { gql } from '@apollo/client'

export const MemberMutation = () =>
  gql`
    mutation (
      $phone1: String!
      $phone2: String!
      $company_phone1: String!
      $company_phone2: String!
      $email: String!
      $company_email: String!
      $first_name: String!
      $last_name: String!
      $father_name: String!
      $bdate: Date!
      $creating_date: Date!
      $country: String!
      $company_name: String!
      $field_of_activity: String!
      $employee_count: Int!
      $address: String!
    ) {
      createBecomeMember(
        data: {
          phone1: $phone1
          phone2: $phone2
          company_phone1: $company_phone1
          company_phone2: $company_phone2
          country: $country
          address: $address
          bdate: $bdate
          creating_date: $creating_date
          first_name: $first_name
          last_name: $last_name
          father_name: $father_name
          email: $email
          company_email: $company_email
          company_name: $company_name
          field_of_activity: $field_of_activity
          employee_count: $employee_count
        }
      ) {
        data {
          id
        }
      }
    }
  `
