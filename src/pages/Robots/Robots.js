import React, { Component } from 'react';

import RobotDetails from '../RobotDetails/RobotDetails';
import RobotService from '../../services/RobotService';

import { Link } from 'react-router-dom';
import RobotFilter from '../../components/RobotFilter/RobotFilter';
import { observer, inject } from 'mobx-react';
import { observable, computed } from 'mobx';
import './Robots.scss';

@inject('store')
@observer
class Robots extends Component {
  state = { selectedRobot: null };

  store = this.props.store;
  robotStore = this.props.store.robotStore;

  @observable
  nameFilter = '';

  async componentDidMount() {
    this.store.robotStore.fetchRobots();
    // this.robots = robots;
  }

  robotSelected(selectedRobot) {
    console.log(selectedRobot);
    this.setState({ selectedRobot });
  }

  handleNameChange = async e => {
    // this.setState({ nameFilter: e.target.value });
    const {
      target: { value }
    } = e;
    this.store.robotStore.fetchRobots({ term: value });
    this.nameFilter = value;
  };

  handleActiveChange = async e => {
    console.log('isActive?', e.target.checked);
  };

  render() {
    const { selectedRobot } = this.state;

    const { robotsCount, robots } = this.robotStore;

    return (
      <div>
        <header className="typewriter">
          <h1>Robots</h1>
          <h2>Where Cats and Robots Meet</h2>
        </header>
        <RobotFilter
          value={this.nameFilter}
          onFilterNameChange={this.handleNameChange}
          onFilterActiveChange={this.handleActiveChange}
        />
        {/* {this.state.nameFilter} */}
        {!selectedRobot && (
          <section className="robot-list">
            Number of robots: {robotsCount}
            <br />
            <br />
            {robots.map(robot => (
              <div key={robot._id}>
                <Link to={`/robot/edit/${robot._id}`}>
                  <div>Edit</div>
                </Link>
                <Link to={`/robot/${robot._id}`}>
                  <h3>
                    {robot.name}
                    <span>{robot.giftsCount}</span>
                  </h3>
                  <img src={`https://robohash.org/${robot.name}.png`} />
                </Link>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default Robots;
