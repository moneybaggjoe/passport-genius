const OAuth2Strategy = require('passport-oauth2');
const { check_scope } = require("../common/utils");

class GeniusStrategy extends OAuth2Strategy {
    constructor({ scope, clientID, clientSecret, callbackURL }, verify) {
        if(scope) check_scope(scope);
        super({
            authorizationURL: 'https://api.genius.com/oauth/authorize',
            tokenURL: 'https://api.genius.com/oauth/token',
            scope: scope || 'me',
            clientID, clientSecret, callbackURL
        }, verify);
        this.name = 'genius';
    }
    userProfile(accessToken, done){
        return fetch('https://api.genius.com/account', {
            headers:{
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(async res => {
            const result = await res.json();
            if(res.ok){
                const profile = result.response.user;
                return done(null, profile);
            } else {
                if(res.status == 403){
                    result.support = [
                        scope_docs,
                        "https://www.passportjs.org/concepts/authentication/oauth/#:~:text=%27/login%27%20%7D))%3B-,Scope,-When%20requesting%20access"
                    ]
                }
                done(JSON.stringify(result));
            }
        }).catch(done)
    }
}

module.exports = GeniusStrategy