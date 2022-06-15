import { gql } from "@apollo/client";

export const ANIME_DETAIL = gql`
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      bannerImage
      coverImage {
        extraLarge
      }
      title {
        romaji
        english
        native
      }
      season
      seasonYear
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      description
      genres
      averageScore
      popularity
      status
      episodes
      duration
      studios {
        nodes {
          name
        }
      }
      characters {
        edges {
          node {
            name {
              full
            }
            image {
              medium
            }
          }
          voiceActors {
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }
    }
  }
`;
