import { gql } from '@apollo/client'
export type AchievementType = {
  name: string
  content: string
  id: number
}
export interface IPurposeValuesDutiesGoalsQuery {
  purposeValuesDutiesGoal: {
    data: {
      attributes: {
        purpose: AchievementType[]
        values: AchievementType[]
      }
    }
  }
}
export const PurposeValuesDutiesGoalsQuery = gql`
  query ($locale: I18NLocaleCode!) {
    purposeValuesDutiesGoal(locale: $locale) {
      data {
        attributes {
          purpose {
            ... on ComponentAboutAchievement {
              content
              name
              id
            }
          }
          values {
            ... on ComponentAboutAchievement {
              content
              name
              id
            }
          }
        }
      }
    }
  }
`
