function fetchApi(endpoint, args) {
    args = typeof args !== 'undefined' ? args : {};
    if (!('headers' in args)) {
        args.headers = {};
    }
    args.headers['x-access-token'] = 'token'; // localStorage.getItem('user').token;
    return fetch(process.env.PUBLIC_URL + endpoint, args);
}

export default fetchApi

