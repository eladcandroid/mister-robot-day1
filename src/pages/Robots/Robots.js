import React, { Component } from 'react';

import RobotDetails from '../RobotDetails/RobotDetails';
import RobotService from '../../services/RobotService';

import { Link } from 'react-router-dom';
import RobotFilter from '../../components/RobotFilter/RobotFilter';

import './Robots.scss';
export default class Robots extends Component {
  state = { robots: [], selectedRobot: null, nameFilter: 'example' };

  async componentDidMount() {
    const robots = await RobotService.getRobots();
    this.setState({ robots });
    // this.setState({ robots, selectedRobot: robots[0] })
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
    const robots = await RobotService.getRobots({ term: value });
    this.setState({ robots, nameFilter: value });
  };

  handleActiveChange = async e => {
    console.log('isActive?', e.target.checked);
  };

  render() {
    const { selectedRobot, robots } = this.state;

    return (
      <div>
        <header className="typewriter">
          <h1>Robots</h1>
          <h2>Where Cats and Robots Meet</h2>
        </header>
        <RobotFilter
          value={this.state.nameFilter}
          onFilterNameChange={this.handleNameChange}
          onFilterActiveChange={this.handleActiveChange}
        />
        {/* {this.state.nameFilter} */}
        {!selectedRobot && (
          <section className="robot-list">
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
