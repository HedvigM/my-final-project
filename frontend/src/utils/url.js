const BASE_URL = 'http://localhost:8080';
/* const BASE_URL =
  'http://localhost:8080'; */
export const API_URL = (slug) => `${BASE_URL}/${slug}`;

// the sessions API with popular tunes
const SESSION_URL = 'https://thesession.org/tunes/popular?format=json&page=';
export const POPULAR_URL = (slug) => `${SESSION_URL}${slug}`;

export const FOLLOW_URL = (memberId, slug) =>
  `${BASE_URL}/member/${memberId}/following/${slug}`;
