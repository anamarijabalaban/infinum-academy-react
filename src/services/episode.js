import { get, postJSON } from './api';
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

export async function comment(state, data) {
  const comment = await postJSON(`comments`, data);
  runInAction(() => {
    state.comments.push(comment.data);
  });
}

export async function add(state, data) {
  const episode = await postJSON(`episodes`, data);
  runInAction(() => {
    state.episodes.push(episode.data);
  });
}
