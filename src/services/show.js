import { get, post ,getAuth} from './api';
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
  console.log('list',list);
  list.map( async (id)=>{
    const show = await get(`shows/${id}`);
    console.log(show);
    runInAction(() =>{
      state.favorites.push(show);
    });
  });
}

export async function like(state) {
  const show = await post(`shows/${state.show._id}/like`);
  runInAction(() =>{
    state.show.likesCount = show.likesCount;
  });


}

export async function dislike(state) {
  const show = await post(`shows/${state.show._id}/dislike`);
  runInAction(() =>{
    state.show.likesCount = show.likesCount;
  });
}

export function getImage(imageName) {
  getAuth(imageName);

}
