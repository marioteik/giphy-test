import axios from 'axios';

const client = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
});

const fetchFromUrl = <T>(url: string): Promise<T> => {
    return client.get(url)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
            throw new Error(url !== '' ?
                'Some problem happened with the request.' :
                'You should pass a url to the method.'
            ); 
        }); 
};

const getUsers = (name = '') => {
    return client.get(`/search/users?q=${name}`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
            throw new Error(name !== '' ?
                'Some problem happened with the request, please consult: https://docs.github.com/en/rest/reference/search#search-users.' :
                'You should pass a username to the endpoint.'
            ); 
        }); 
};

export { client as githubClient, getUsers, fetchFromUrl };
