import { gql } from "@apollo/client";

export const ANIME_DETAIL = gql`
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      bannerImage
      coverImage {
        large
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
      synonyms
      trailer {
        id
      }
      studios {
        nodes {
          name
        }
      }
      characters(role: MAIN) {
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
      recommendations(sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
          }
        }
      }
    }
  }
`;
