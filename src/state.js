import { observable } from 'mobx';

class State {
  @observable
  shows = [];

  @observable
  episodes = [];

  @observable
  show = [];

  @observable
  users = [];

}

export default new State();
