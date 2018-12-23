import React, { Component } from 'react';

import RobotService from '../../services/RobotService';

import './RobotDetails.scss';

import { Link } from 'react-router-dom';
export default class RobotDetails extends Component {
  state = {
    robot: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const robot = await RobotService.getRobotById(id);
    this.setState({ robot });
  }

  async sendLove() {
    const copyRobot = { ...this.state.robot };
    copyRobot.giftsCount++;
    const robot = await RobotService.saveRobot(copyRobot);
    this.setState({ robot });
  }

  //   onClose = () => {
  //     const { history } = this.props;
  //     this.props.onClose();
  //     history.push('/');
  //   };

  render() {
    const { robot } = this.state;
    const gifts = robot ? '🎁'.repeat(robot.giftsCount) : '';
    return (
      robot && (
        <section className="robot-details">
          <h1>{robot.name}</h1>
          <h2>{gifts}</h2>
          <img src={`https://robohash.org/${robot.name}.png`} />
          <Link to="/">
            <button>Back</button>
          </Link>
          <button onClick={this.sendLove.bind(this)}>&hearts;</button>
        </section>
      )
    );
  }
}
