import http from 'axios';
import getRootUrl from './getRootUrl';


http.defaults.baseURL = getRootUrl();
http.defaults.timeout = 8000;

if(typeof document === 'object'){
    http.defaults.headers.post['csrf-token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); 
}

export const httpTransport = ({ method = "get", url, data = {}, headers={} }) => {
   
    switch (method) {
        case "get":
            return http.get(url, { params: data, headers});
        case "post":
            return http.post(url, data, {headers});   
        case "put":
            return http.put(url, data, {headers});      
            
        default: return Promise.reject('Error: unknown http method');
    }

};