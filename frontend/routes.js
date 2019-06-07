const routes = module.exports = require('next-routes')();

routes
  .add('index', '/')
  .add('login', '/login')
  .add('profile/info', '/profile/info', 'profile/info')
  // .add('auth/login', '/auth/login', 'auth/login')
  // .add('auth/register', '/auth/register', 'auth/register');