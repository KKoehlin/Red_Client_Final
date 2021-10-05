let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
        case 'whats-on-tap-app-finalclient.herokuapp.com':
            APIURL = 'https://whats-on-tap-app-finalserver.herokuapp.com/'
}

export default APIURL; 
