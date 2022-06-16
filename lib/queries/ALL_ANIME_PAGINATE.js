import { gql } from "@apollo/client";

export const ALL_ANIME_PAGINATE = gql`
  query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      }
      media(type: ANIME, sort: TRENDING_DESC) {
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
        }
        title {
          romaji
        }
      }
    }
  }
`;
