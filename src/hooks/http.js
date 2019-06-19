
import {useState, useLayoutEffect, useContext} from 'react';
import {StoreContext} from '../store/partyTimeStore';
import { LOADING } from '../store/types';

export function UseHttp(options={}, dependencies=[], onMount=false) {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useContext(StoreContext);
    
    const setLoading = isLoading => {
      setIsLoading(isLoading);
      dispatch({
        type: LOADING,
        payload: isLoading
      })
    }

    const callApi = async (options) => { 
      const url = options.url;
      const action = options.action;
      const payload = options.payload;
      const method = options.method || 'GET';
      const fetchOpts = {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },    
        method: method,
      }
      if(method === 'POST') fetchOpts.body = JSON.stringify({data:payload});
      
      setLoading(true)

      fetch(url, fetchOpts).then( response => {

        if (response.status !== 200) throw Error(response.body.message);
        return response.json();

      }).then(data => {
        
        dispatch({
          type: action,
          payload: data
        })
        setLoading(false);
        
      }).catch(err => {
        console.log(err);
      });
      
    }

    useLayoutEffect( () => {
      if(onMount){
        callApi(options);
      }

    }, dependencies);

    
    return {isLoading, state, callApi, dispatch};
}