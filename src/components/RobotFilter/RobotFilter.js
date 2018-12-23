import React from 'react';
import './RobotFilter.scss';

export default props => {
  return (
    <div className="filters">
      <div>
        <label>
          <input
            style={{ float: 'left', fontSize: '20px' }}
            type="text"
            value={props.value}
            onChange={props.onFilterNameChange}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            style={{ fontSize: '50px' }}
            type="checkbox"
            onChange={props.onFilterActiveChange}
          />
          Active?
        </label>
      </div>
    </div>
  );
};
