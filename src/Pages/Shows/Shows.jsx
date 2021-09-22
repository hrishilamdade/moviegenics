import React, { useState,useEffect } from 'react'
import axios from 'axios'
import MovieCard from '../../components/Moviecard/MovieCard'
import CustomPagination from '../../components/Pagination/CustomPagination'

function Shows() {
    const [content,setContent]=useState([])
    const [page,setPage]=useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const fetchMovies=async ()=>{
        const {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
        console.log(data)
        setContent(data.results)
        setNumOfPages(data.total_pages);
    }
    useEffect(()=>{
        window.scroll(0, 0);
        fetchMovies();
         // eslint-disable-next-line
    },[page,])
    return (
        <div>
            <span className="pageTitle">Shows</span>
            <div className="trending">
                {
                    content && content.map((c)=>
                        <MovieCard 
                            key={c.id} 
                            id={c.id} 
                            poster={c.poster_path} 
                            title={c.title || c.name} 
                            date={c.first_air_date || c.release_date}
                            media_type="tv"
                            vote_average={c.vote_average}
                            content={content}    
                        />
                    )
                }
            </div>
            <CustomPagination setPage={setPage} noOfPages={numOfPages}/>
        </div>
    )
}

export default Shows
