import React, { Component } from 'react';

import RobotService from '../../services/RobotService';

// import './RobotDetails.scss';

import { Link } from 'react-router-dom';
export default class RobotEdit extends Component {
  
    state = {
    robot: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const robot = await RobotService.getRobotById(id);
    this.setState({ robot });
  }

  handleChange = e => {
    this.setState({ robot: {...this.state.robot, name: e.target.value} });
  };

  handleSubmit = async e => {
      e.preventDefault();      
      await RobotService.saveRobot(this.state.robot);
      const {history} = this.props;
      history.push('/');
  };

  render() {
      const {robot} = this.state;
    return (
      robot && (<div className="robot-edit">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.robot.name}
          />
          <button>Save</button>
        </form>
      </div>)
    );
  }
}
