import { get, post } from './api';
import { runInAction } from 'mobx';

export async function getAll(state) {
  const shows = await get('shows');
  runInAction(() => {
    state.shows.replace(shows);
  });
}

export async function getById(state, id) {
  const show = await get(`shows/${id}`)
  runInAction(() => {
    state.show = show;
  });
}

export async function getAllEpisodesByShowId(state, id) {
  const episodes = await get(`shows/${id}/episodes`);
  runInAction(() => {
    state.episodes.replace(episodes);
  });
}

export async function getAllFavorites(state, list){
  list.map( async (id)=>{
    const show = await get(`shows/${id}`);
    runInAction(() =>{
      state.favorites.push(show);
    });
  });
}

export function like(state, id) {
  post(`shows/${id}/like`, '');

}

export function dislike(state, id) {
  post(`shows/${id}/dislike`, '');

}
