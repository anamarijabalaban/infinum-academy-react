import { observable, computed } from 'mobx';

class State {
  @observable
  shows = [];

  @observable
  episodes = [];

  @observable
  show = [];

  @observable
  users = [];

  @computed
  get currentUser() {
    return localStorage.getItem('name');
  }

}

export default new State();
