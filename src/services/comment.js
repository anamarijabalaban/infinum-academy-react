import { post, del } from './api';
import { runInAction } from 'mobx';

export async function comment(state, data) {
  const comment = await post(`comments`, data);
  console.log(comment);
  runInAction(() => {
    state.comments.push(comment.data);
  });
}

export async function deleteComment(state, id) {
  await del(`comments`, id);
  runInAction(() => {
    state.comments.replace(state.comments.filter(comment => comment._id !== id));
  });
}
