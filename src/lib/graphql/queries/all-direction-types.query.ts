import { gql } from '@apollo/client'

export type DirectionTypeProps = {
  name: string
  path: string
  description: string
}

export interface IAllDirectionTypesQuery {
  directionTypes: {
    data: [
      {
        id: string
        attributes: DirectionTypeProps
      }
    ]
  }
}
export const AllDirectionTypesQuery = gql`
  query ($locale: I18NLocaleCode!) {
    directionTypes(locale: $locale) {
      data {
        id
        attributes {
          path
          name
          description
        }
      }
    }
  }
`
