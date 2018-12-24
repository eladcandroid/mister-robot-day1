import RobotService from '../services/RobotService';
import { observable, action, computed } from 'mobx';

export default class RobotStore {
  @observable
  robots = [];

  @computed
  get robotsCount() {
    return this.robots.length;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async fetchRobots(filter) {
    this.robots = await RobotService.getRobots(filter);
  }
}
