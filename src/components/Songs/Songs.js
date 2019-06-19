import React from 'react';
import './Songs.scss';
import {UseHttp} from '../../hooks/http';
import { GET_TRACKS } from '../../store/types';
import Track from '../Track/Track';
import { Transition } from 'react-transition-group';

const Songs = () => {
    const page = 0;
    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 }
    };

    const options = {
        url: `/tracks/${page}`,
        action: GET_TRACKS,
        method: 'GET'
    }
    
    const {isLoading, state, callApi} = UseHttp(options, [], true);

    const pagination = (page) => {
        callApi({
            url: `/tracks/${page}`,
            action: GET_TRACKS,
            method: 'GET'
        })
    }

    if(!state.tracks && state.tracks == null) {
        return <div>No Tracks!!</div>
    }else {
        return (
            <div className="songs">
                <Transition in={!isLoading} timeout={duration}>
                    {animProps => (
                    <div className="animationWrapper" style={{
                        ...defaultStyle,
                        ...transitionStyles[animProps]
                    }}>
                        <ul className="tracks-list">
                            {
                                state.tracks.items.map(item => <Track key={item.id} data={item} />)
                            } 
                        </ul>
                    </div>
                    )}
                </Transition>
                <div className="pagination">
                    <div className={['btn ', 'prev ',!state.tracks.previous ? 'disabled' : ''].join('')} onClick={ ()=>{
                        if(state.tracks.previous) {
                            let page = state.tracks.offset - state.tracks.limit;
                            pagination(page)
                        }
                    }}>Previous</div>

                    <div className={['btn ', 'next ',!state.tracks.next ? 'disabled' : ''].join('')}  onClick={ ()=>{
                        if(state.tracks.next) {
                            let page = state.tracks.offset === 0 ? state.tracks.limit : state.tracks.offset + state.tracks.limit;
                            pagination(page)
                        }
                    }}>Next</div>
                </div>
            </div>
        )
    }
};

export default Songs;
