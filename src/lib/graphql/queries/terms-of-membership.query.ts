import { gql } from '@apollo/client'
import { AchievementType } from '@/lib/graphql/queries/purpose-values-duties-goals'

export interface ITermsOfMembershipQuery {
  termsOfMembership: {
    data: {
      attributes: {
        purpose: AchievementType[]
        values: AchievementType[]
      }
    }
  }
}
export const TermsOfMembershipQuery = gql`
  query ($locale: I18NLocaleCode!) {
    termsOfMembership(locale: $locale) {
      data {
        attributes {
          values {
            ... on ComponentMembershipTerms {
              id
              name
              content
            }
          }
          purpose {
            ... on ComponentMembershipTerms {
              id
              name
              content
            }
          }
        }
      }
    }
  }
`
