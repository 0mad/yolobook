const routes = module.exports = require('next-routes')();

routes
  .add('index', '/')
  .add('login', '/login')
  .add('profile-info', '/profile/info', 'profile/info')
  .add('profile-picture', '/profile/picture', 'profile/picture')
  .add('timeline-user', '/timeline/:userId', 'timeline')
