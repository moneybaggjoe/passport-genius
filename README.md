# passport-genius

OAuth 2.0 authentication strategy for the [Genius API](https://docs.genius.com).

## Install

    $ npm install passport-genius

## Usage

#### Register Application

The Genius strategy authenticates users using their Genius account.  Before
your application can make use of Genius's authentication system, you must
first [register](https://genius.com/api-clients) an API Client.  Once registered, a client ID and secret will be issued which are used
by Genius to identify your app.  You will also need to configure a redirect
URI which matches the route in your application.

#### Configure Strategy

Once you've [registered your application](#register-application), the strategy
needs to be configured with your application's client ID and secret, along with
its OAuth 2.0 redirect endpoint.

```js
const passport = require('passport');
const GeniusStrategy = require('./passport-genius');

passport.use(new GeniusStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://0.0.0.0:8080/auth/genius/callback",
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'genius'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/example',
  passport.authenticate('genius'));

app.get('/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Related Modules

- [passport-oauth2](https://github.com/jaredhanson/passport-oauth2) — OAuth 2.0 authentication strategy

## License

[The MIT License](http://opensource.org/licenses/MIT)
