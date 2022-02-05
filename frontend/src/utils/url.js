const BASE_URL = 'http://localhost:8080';
/* const BASE_URL =
  'http://localhost:8080'; */

export const API_URL = (slug) => `${BASE_URL}/${slug}`;

// the sessions API with popular tunes
const SESSION_URL = 'https://thesession.org/tunes/popular?format=json&page=';
export const POPULAR_URL = (slug) => `${SESSION_URL}${slug}`;

// the sessions api for search
export const SEARCH_TUNE = (slug) =>
  `https://thesession.org/tunes/search?q=${slug}&format=json`;

export const TUNE_URL = (slug) =>
  `https://thesession.org/tunes/${slug}?format=json`;

export const KNOW_TUNE_URL = (memberId, slug) =>
  `${BASE_URL}/member/${memberId}/tune/${slug}`;

export const LEARN_TUNE_URL = (memberId, slug) =>
  `${BASE_URL}/member/${memberId}/tune/learn/${slug}`;

export const FOLLOW_URL = (memberId, slug) =>
  `${BASE_URL}/following/${memberId}/followed/${slug}`;

export const DELETE = (memberId) => `${BASE_URL}/delete/member/${memberId}`;
