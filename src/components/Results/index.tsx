import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IAppState, {IGif, IGifsResponse} from '../../state/types/IAppState';
import InfiniteScroll from 'react-infinite-scroll-component';
import Gif from '../Gif';

import './Results.css';
import {fetchTrendingGifs} from "../../api/giphy";
import Loading from '../Loading';
import {fetchGifs} from "../../state/actions";

interface ISearchResults {
};

const Results: FC<ISearchResults> = () => {
    const dispatch = useDispatch();
    const {data, loadingGifs, pagination} = useSelector<IAppState, IGifsResponse>((state) => state.gifs);
    const savedGifs = useSelector<IAppState, IGif[]>((state) => state.savedGifs);
    const searchFilter = useSelector<IAppState, string>((state) => state.searchFilter);
    const [trendingData, setTrendingData] = useState<IGifsResponse | null>(null);

    const InfinityLoading = useMemo(() => <div className="card mb-3 bg-dark border-0"><Loading/></div>, []);

    const getBookmarkedData = useCallback((data: IGif[] = [], savedGifs: IGif[]) => {
        return data.map((el, index) => {
            const gifIndex = savedGifs.findIndex(gif => gif.id === el.id);

            if (gifIndex > -1) {
                return {
                    ...data[index],
                    bookmarked: !data[index].bookmarked,
                }
            }

            return el;
        })
    }, [])

    const bookmarkedData = useMemo(() => getBookmarkedData(data, savedGifs), [data, savedGifs, getBookmarkedData]);
    const bookmarkedTrendingData = useMemo(() => getBookmarkedData(trendingData?.data, savedGifs), [trendingData, savedGifs, getBookmarkedData]);

    const shouldShowTrending: boolean = useMemo(() => !!(trendingData &&
        trendingData?.data?.length > 0 &&
        (!data || data?.length === 0) &&
        !loadingGifs),
        [trendingData, data, loadingGifs]
    );

    useEffect(() => {
        if (data.length === 0 && searchFilter === '' && (trendingData === null || trendingData?.data?.length === 0)) {
            (async () => {
                fetchTrendingGifs().then((data) => {
                    setTrendingData(data);
                }).catch(console.log);
            })()
        }
    }, [data, searchFilter, trendingData]);

    const fetchNextPage = useCallback(() => {
        dispatch(fetchGifs(searchFilter, pagination));
    }, [dispatch, pagination, searchFilter]);

    return (
        <main className="user-gifs-results-container">
            {shouldShowTrending && <h2>Trending</h2>}

            {shouldShowTrending && (!trendingData?.data || trendingData?.data?.length === 0) && InfinityLoading}

            {!shouldShowTrending && data?.length > 0 && <h2>Results for {searchFilter}</h2>}

            {!shouldShowTrending && (
                <InfiniteScroll
                    dataLength={pagination?.total_count || 0} //This is important field to render the next data
                    next={fetchNextPage}
                    hasMore={true}
                    loader={InfinityLoading}
                    className="card-columns"
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <strong>Yay! You have seen it all</strong>
                        </p>
                    }
                >
                    {bookmarkedData?.map((gif: IGif, index: number) => {
                        return <Gif key={index} gif={gif}/>;
                    })}
                </InfiniteScroll>
            )}

            {shouldShowTrending && (
                <div className="card-columns">
                    {bookmarkedTrendingData.map((gif: IGif, index: number) => {
                        return (<Gif key={index} gif={gif}/>)
                    })}
                </div>
            )}
        </main>
    );
};

export default Results;