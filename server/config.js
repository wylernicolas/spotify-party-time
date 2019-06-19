
module.exports = {
    secret: 'PartyTimeSpotify',
    development: {
        config_id: 'development',
        node_port: 8000,
        redirect_uri: 'http://localhost:8000/callback',
        redirect_app: 'http://localhost:3000/home'
    },
    production: {
        config_id: 'production',
        node_port: 8080,
        redirect_uri: 'https://spotify-party-time.herokuapp.com/callback',
        redirect_app: 'https://spotify-party-time.herokuapp.com/home'
    }
}