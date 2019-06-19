
export const getUser = (state, payload) => {
    const user = payload.body;
    return state = {...state, user:user}; 
}

export const getTracks = (state, payload) => {
    console.log('PLAYLIST ==> ', payload.body.playlist);
    const tracks = payload.body.tracks;
    return state = {...state, tracks:tracks, playlist:payload.body.playlist, previewSongPlaying:false}; 
}

export const isLoading = (state, payload) => {
    console.log('isLoading ==> ', state);
    return {...state, isLoading:payload}; 
}

export const addTrackToPlaylist = (state, payload) => {
    console.log('isLoading ==> ', state);
    console.log('payload.track ==> ', payload);
    // const tracks = [...state.playlist.tracks, ...payload.track];
    return {...state, playlist:{id:payload.id, tracks:payload.tracks}};
}; 

export const removeTrackfromPlaylist = (state, payload) => {
    return {...state, playlist:{id:payload.id, tracks:payload.tracks}};
}; 

export const toggleSideMenu = (state, payload) => {
    return {...state, sideMenu:{isOpen:payload}};
}; 

export const previewSong = (state, payload) => {
    return {...state, previewSongPlaying:payload};
}; 

