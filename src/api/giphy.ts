import axios from 'axios';
import {IPagination} from "../state/types/IAppState";

const client = axios.create({
    baseURL: `${process.env.REACT_APP_GIPHY_URL}`,
});

interface IFetchSearchGif {
    name: string;
    pagination?: IPagination;
}

const fetchSearchGif = ({ name, pagination }: IFetchSearchGif) => {
    return client.get(
        `/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_TOKEN}&q=${name}${pagination ? `&offset=${pagination.offset + pagination.count}` : ''}`
        )
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
            throw new Error(name !== '' ?
                'Some problem happened with the request, please consult: https://developers.giphy.com/docs/api#quick-start-guide.' :
                'You should pass a value to search to the endpoint.'
            ); 
        }); 
};

const fetchTrendingGifs = (limit = 50, offset = 10) => {
    return client.get(`/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_TOKEN}&limit=${limit}&rating=g&offset=${offset}`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
            throw new Error(
                'Some problem happened with the request, please consult: https://developers.giphy.com/docs/api#quick-start-guide.',
            );
        });
};

export { client as giphyClient, fetchSearchGif, fetchTrendingGifs };
