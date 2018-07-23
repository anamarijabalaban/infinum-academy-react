import { get, post } from './api';

export function getAll(state) {
  get('shows')
    .then((response) => state.shows.replace(response));
}

export function getById(state, id) {
  get(`shows/${id}`)
    .then((response) => state.show = response);
}
export function getAllEpisodesByShowId(state, id) {
  get(`shows/${id}/episodes`)
    .then((response) => state.episodes.replace(response));
}

export function getAllFavorites(state, list){
  list.map((id)=>get(`shows/${id}`).then((response) => state.favorites.push(response)));
}

export function like(state, id) {
  console.log('like');
  post(`shows/${id}/like`, '');
}

export function dislike(state, id) {
  post(`shows/${id}/dislike`, '');
}
