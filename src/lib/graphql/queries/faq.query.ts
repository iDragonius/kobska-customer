import { gql } from '@apollo/client'

export type FaqComponentProps = {
  id: number
  question: string
  answer: string
}
export interface IFaqQuery {
  faq: {
    data: {
      attributes: {
        questions: FaqComponentProps[]
      }
    }
  }
}
export const FaqQuery = gql`
  query ($locale: I18NLocaleCode!) {
    faq(locale: $locale) {
      data {
        attributes {
          questions {
            id
            question
            answer
          }
        }
      }
    }
  }
`
