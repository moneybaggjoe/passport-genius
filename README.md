# passport-genius

OAuth 2.0 authentication strategy for [Genius](https://genius.com/).

## Overview

This module extends [passport-oauth2](https://www.passportjs.org/packages/passport-oauth2/). It enables users to sign into third-party websites and apps using their Genius account.

## Audience

Developers can plug this library into any Node.js application or framework that supports [Connect](https://github.com/senchalabs/connect#readme)-style middleware, including [Express](https://expressjs.com/). The Genius strategy serves as a user authentication method for [social login](https://en.wikipedia.org/wiki/Social_login), which eliminates the need for developers to manage usernames and passwords.

## Install

    $ npm install passport-genius

## Usage



#### Register Application

Before your application can make use of Genius's authentication system, you must first [register your application](https://docs.genius.com/#/getting-started-h1). Visit the Genius [API Client management page](https://genius.com/api-clients) and create an API client.

After registration, Genius will issue your client ID and secret, which are used by Genius to identify your app. You will also need to configure a redirect URI, which matches the callback route in your application.

#### Configure Strategy

Once you've [registered your application](#register-application), the strategy
needs to be configured with your application's client ID and secret, along with
its OAuth 2.0 redirect endpoint.

```js
const passport = require('passport');
const GeniusStrategy = require('passport-genius');

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
  passport.authenticate('genius', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## License

[MIT](https://github.com/moneybaggjoe/passport-genius?tab=MIT-1-ov-file)
