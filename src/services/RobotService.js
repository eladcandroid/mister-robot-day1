const robots = [
  'Bubili',
  'Shampudo',
  'Grulif',
  'Shtifas',
  'Flidar',
  'Bamkid',
  'Izmerulu',
  'Shilk'
].map(name => ({ ...getEmptyRobot(), _id: makeId(), name }));

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  });
}

function getRobots(filterBy = {}) {
  return new Promise((resolve, reject) => {
    var robotsToReturn = robots;
    const { term } = filterBy;
    if (term) {
      robotsToReturn = robots.filter(robot => {
        return robot.name.toLocaleLowerCase().includes(term);
      });
    }
    resolve(sort(robotsToReturn));
  });
}

function getRobotById(id) {
  return new Promise((resolve, reject) => {
    const robot = robots.find(robot => robot._id === id);
    robot
      ? resolve(JSON.parse(JSON.stringify(robot)))
      : reject(`Robot id ${id} not found!`);
  });
}

function deleteRobot(id) {
  return new Promise((resolve, reject) => {
    const index = robots.findIndex(robot => robot._id === id);
    if (index !== -1) {
      robots.splice(index, 1);
    }

    resolve(robots);
  });
}

function _updateRobot(robot) {
  return new Promise((resolve, reject) => {
    const index = robots.findIndex(c => robot._id === c._id);
    if (index !== -1) {
      robots[index] = robot;
    }

    resolve(robot);
  });
}

function _addRobot(robot) {
  return new Promise((resolve, reject) => {
    robot._id = makeId();
    robots.push(robot);
    resolve(robot);
  });
}

function saveRobot(robot) {
  return robot._id ? _updateRobot(robot) : _addRobot(robot);
}

function getEmptyRobot() {
  return {
    name: '',
    giftsCount: 0
  };
}

export default {
  getRobots,
  getRobotById,
  deleteRobot,
  saveRobot,
  getEmptyRobot
};

function makeId(length = 10) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
