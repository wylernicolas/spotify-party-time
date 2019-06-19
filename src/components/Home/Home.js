import React, {useState, useLayoutEffect} from 'react';
import './Home.scss';
import Header from '../Header/Header';
import PartyTimeStore from '../../store/partyTimeStore';
import Songs from '../Songs/Songs';

import Modal from '../Modal/Modal';
import { Transition } from 'react-transition-group';
import SideMenu from '../SideMenu/SideMenu';

const Home = props => {
    const [isAnim, setIsAnim] = useState(false);
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

    useLayoutEffect(()=>{
        setTimeout(()=>{
            setIsAnim(true);
        }, 200)
    }, []);

    return(
        <Transition in={isAnim} timeout={duration}>
            {animProps => (    
                <div className="home" style={{
                    ...defaultStyle,
                    ...transitionStyles[animProps]
                }}>
                    <PartyTimeStore>
                        <SideMenu/>
                        <Header/>
                        <Songs/>
                        <Modal/>
                    </PartyTimeStore>
                </div>
            )}
        </Transition>
    ) 
};

export default Home;
