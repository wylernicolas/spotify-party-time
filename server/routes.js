'use strict';

const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');
const express = require('express');
const router = new express.Router();
const request = require('request');
const helpers = require('./helpers');
const Playlist = require('./Playlist');
const config = require('./config');

const environment = process.env.NODE_ENV || 'development';
const _config = config[environment];

// configure the express server
const CLIENT_ID = '8d30592bf10d4e8bb00e958bfb3e6351';
const CLIENT_SECRET = 'e7fbcd556e78472c9a95757cc93c0bff';
const REDIRECT_URI = _config.redirect_uri;
const REDIRECT_APP = _config.redirect_app;
const STATE_KEY = 'spotify_auth_state';
const AUTH_CODE = 'spotify_auth_code';
// your application requests authorization
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'ugc-image-upload'
];


// configure spotify
const spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

const partyTime = new Playlist();


/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/login', (_, res) => {
  const state = generateRandomString(16);
  const redirect = spotifyApi.createAuthorizeURL(scopes, state);
  res.cookie(STATE_KEY, state);
  res.redirect(redirect);
});

router.get('/user', async (req, res) => {
  try{
    const user = await spotifyApi.getMe();
    res.json(user);
  }
  catch(error) {
    console.log(error);
  }
});

router.get('/tracks/:page', async(req, res) => {
  try{
    const page = req.params.page;
    const limit = 21;
    const db = await helpers.getDb();
    if(db.playlistId != '') partyTime.id = db.playlistId;
    partyTime.tracks = db.tracks;

    const partyTracksList = [];
    const query = await spotifyApi.search('dance', ['track'], { offset: page, limit: limit });
    const tracks = query.body.tracks.items;
    const ids = await tracks.map(val => val.id);
    const tracksData = await spotifyApi.getAudioFeaturesForTracks(ids);
    const audioFeatures = tracksData.body.audio_features;
    
    tracks.forEach((val, index) => {
      if(audioFeatures[index]){
        if(val.id === audioFeatures[index].id) {
          partyTracksList.push({...val, ...audioFeatures[index]});
        }
      } else {
        partyTracksList.push({val});
      }
    });

    res.json({
      body: {
        playlist: partyTime.body(),
        tracks: {...query.body.tracks, ...{items:partyTracksList}},
      }
    });  
    
  }
  catch(error) {
    console.log(error);
  }
})

router.post('/playlist/add', async(req, res) => {
  try{
    const {track, trackId, userId} = req.body.data;

    const db = await helpers.getDb();
    let playlist = null;
    partyTime.id = db.playlistId;
    if(db.tracks.lenght >= 1) partyTime.tracks = db.tracks;

    // Check if Playlist already exists
    // Create it or find it by id
    if(!partyTime.id) {
      playlist = await spotifyApi.createPlaylist(userId, partyTime.name, { 'public' : true });
      partyTime.id = playlist.body.id;

      helpers.saveDb(partyTime);
      // Upload playlist cover image
      await uploadCoverImage(partyTime.id);
    }
    // Add tracks to playlist
    const addedTracks = await spotifyApi.addTracksToPlaylist(userId, partyTime.id, [helpers.formatTrack(trackId)]);

    if(addedTracks.statusCode === 201) {
      partyTime.track = {id:trackId, track:track, snapshot:addedTracks.body.snapshot_id};
      helpers.saveDb(partyTime);
    }
    
    res.json(partyTime.body());
    
  }
  catch(error) {
    console.log(error);
  }
});

router.post('/playlist/remove', async(req, res) => {
  const {trackId, userId} = req.body.data;
  try{

    // Remove tracks from playlist
    const removed = await partyTime.removeTrack(trackId);
    helpers.saveDb(partyTime);
    const removedTrack = await spotifyApi.removeTracksFromPlaylist(userId, partyTime.id, [{ uri :helpers.formatTrack(removed.id) }], {snapshot_id:removed.snapshot});
    
    res.json(partyTime.body());
    
  }
  catch(error) {
    console.log(error);
  }
});

const uploadCoverImage = (playlistId) => {
    const response = request.put(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
      method: "PUT", 
      mode: "cors", 
      cache: "no-cache", 
      headers: {
        "Content-Type": "image/jpeg",
        "Authorization": `Bearer ${spotifyApi.getAccessToken()}`
      },
      body: helpers.getCover()
    })
    return response;
};

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  // first do state validation
  if (state === null || state !== storedState) {

    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      res.redirect(REDIRECT_APP);

    }).catch(err => {
      res.redirect('/#/error/invalid token');
    });
  }
});


module.exports = router;
