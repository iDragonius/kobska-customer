import { gql } from '@apollo/client'
export type ProcedureProps = {
  id: string
  label: string
  content: string
}
export interface IRulesOfProcedureQuery {
  rulesOfProcedure: {
    data: {
      attributes: {
        title: string
        description: string
        procedures: ProcedureProps[]
      }
    }
  }
}
export const RulesOfProcedureQuery = gql`
  query ($locale: I18NLocaleCode!) {
    rulesOfProcedure(locale: $locale) {
      data {
        attributes {
          title
          description
          procedures {
            ... on ComponentMembershipProcedure {
              id
              label
              content
            }
          }
        }
      }
    }
  }
`
