import React from 'react';
import { createContext, useReducer } from 'react';
import { GET_USER, GET_TRACKS, LOADING, ADD_TO_PLAYLIST, TOGGLE_SIDEMENU, REMOVE_FROM_PLAYLIST, PREVIEW_SONG } from './types';
import * as actions from './actions';

export const StoreContext = createContext({});
const initialState = {
    user:null,
    tracks:null,
    playlist:{
        id:null,
        tracks:[]
    },
    isLoading: true,
    sideMenu: {
        isOpen: false
    },
    previewSongPlaying: false
}

const reducer = (state, action) => {
    console.log(' -- -- Store -- -- ');
    console.log("ACTION TYPE:", action.type)
    console.log("ACTUAL STATE:", state)
    console.log(' -- -- -- -- -- --');
    switch(action.type) {
        case GET_USER:
            state = actions.getUser(state, action.payload);
            return state;
        case GET_TRACKS:
            state = actions.getTracks(state, action.payload);
            return state;
        case ADD_TO_PLAYLIST:
            state = actions.addTrackToPlaylist(state, action.payload);
            return state;
        case REMOVE_FROM_PLAYLIST:
            state = actions.removeTrackfromPlaylist(state, action.payload);
            return state;
        case LOADING: 
            state = actions.isLoading(state, action.payload);
            return state;
        case TOGGLE_SIDEMENU: 
            state = actions.toggleSideMenu(state, action.payload);
            return state;
        case PREVIEW_SONG: 
            state = actions.previewSong(state, action.payload);
            return state;
        default:
            return state;
    }
}

const PartyTimeStore = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={[state, dispatch]} >
            {children}
        </StoreContext.Provider>
    )
}

export default PartyTimeStore;