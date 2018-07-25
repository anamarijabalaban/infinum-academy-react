import { get } from './api';
import { runInAction } from 'mobx';

export async function getById(state, id) {
  const episode = await get(`episodes/${id}`)
  runInAction(() => {
    state.episode = episode;
  });
}

export async function getAllCommentsByEpisodeId(state, id) {
  const comments = await get(`episodes/${id}/comments`);
  runInAction(() => {
    state.comments.replace(comments);
  });
}
