const routes = module.exports = require('next-routes')();

routes
  .add('index', '/')
  .add('login', '/login')
  .add('profile-info', '/profile/info/:userId', 'profile/info')
  .add('profile-picture', '/profile/picture/:userId', 'profile/picture')
  .add('profile-friend', '/profile/friend/:userId', 'profile/friend')
  .add('timeline-user', '/profile/timeline/:userId', 'profile/timeline')
  .add('my follower', '/follow/follower', 'follow')
  .add('i follow', '/follow/following', 'follow')