export interface IGiphyImage {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface IPagination {
    count: number;
    offset: number;
    total_count: number;
}

export interface IMeta {
    msg: string;
    response_id: string;
    status: number;
}

export interface IGif {
    images: {
        fixed_width: IGiphyImage,
        fixed_height: IGiphyImage,
        fixed_height_small: IGiphyImage,
        original: IGiphyImage,
    };
    id: string;
    title: string;
    username: string;
    bookmarked?: boolean;
}

export interface IGifsResponse {
    data: Array<IGif>;
    pagination?: IPagination;
    meta?: IMeta;
    loadingGifs: boolean;
}

export default interface IAppState {
    gifs: IGifsResponse;
    searchFilter: string;
    savedGifs: IGif[];
}