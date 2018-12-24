import RobotStore from './RobotStore';

export default class RootStore {
  showNavBar = true;
  constructor() {
    this.robotStore = new RobotStore(this);
  }
}
