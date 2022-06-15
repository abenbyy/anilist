import { gql } from "@apollo/client";

export const ALL_ANIME_PAGINATE = gql`
  query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      }
      media {
        id
        episodes
        season
        seasonYear
        studios {
          nodes {
            name
          }
        }
        coverImage {
          large
          medium
        }
        title {
          romaji
        }
        genres
      }
    }
  }
`;
