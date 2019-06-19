import React, {useState} from 'react';
import './Login.scss';
import { ReactComponent as LoadingSvg } from '../../images/loading.svg';

const Login = props => {
    const [loading, setLoading] = useState(false);
    let loginUrl = 'https://spotify-party-time.herokuapp.com/login';
    if(process.env.NODE_ENV === 'development') loginUrl = 'http://localhost:8000/login';

    const logginTriggered = (e) => {
        setLoading(true);
    }

    return (
        <div className="login">
            <div className="copy">
                <p>Create an awesome</p>
                <p className="pt"> Party playlist </p>
            </div>
            <a onClick={logginTriggered} href={loginUrl}>
                {loading ? <LoadingSvg/> : 
                    <span>
                        Login
                    </span>
                }
            </a>
            <div className="copy bottom">
                <p>Dance all night long</p>
            </div>
        </div>
    )

};

export default Login;
