import { post } from './api';
import { runInAction } from 'mobx';

export async function uploadFile(state, data) {
  const result = await post('media', data)
  console.log(result.data);
  runInAction(() => {
    state.uploadedImage = result.data.path;
    state.mediaId = result.data._id;
    state.loading = false;
  });
}
