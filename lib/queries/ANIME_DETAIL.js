import { gql } from "@apollo/client";

export const ANIME_DETAIL = gql`
  query($id: Int) {
    Media(id: $id) {
      id
      bannerImage
      coverImage {
        extraLarge
      }
      title {
        romaji
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
    }
  }
`;
