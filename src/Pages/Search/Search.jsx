import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
import React,{useState,useEffect} from 'react'
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search"
import CustomPagination from "../../components/Pagination/CustomPagination";
import MovieCard from "../../components/Moviecard/MovieCard";

const darkTheme=createMuiTheme({
    palette:{
        type:'dark',
        primary:{
            main:"#fff",
        }
    }
})

function Search() {
    const [type,setType]=useState(0)
    const [content,setContent]=useState([])
    const [page,setPage]=useState(1)
    const [searchText,setSearchText]=useState("")
    const [numOfPages, setNumOfPages] = useState()
    const fetchSearch= async ()=>{
        console.log("Search")
        try {
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/search/${ type? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            console.log(data.results)
            setNumOfPages(data.total_pages);
            // console.log(data);
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:"flex",margin:"15px 0px"}}>
                <TextField 
                    style={{flex:1}}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            <Button variant="contained" style={{marginLeft:10}} onClick={fetchSearch} ><SearchIcon fontSize="large" /></Button>
            </div>
            <Tabs 
                value={type} 
                indicatorColor="primary" 
                textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                  }}    
            >
                <Tab style={{ width: "50%" }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Shows" />
            </Tabs>
            </ThemeProvider>
            <div className="trending">
                {content &&
                content.map((c) => (
                    <MovieCard
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={type ? "tv" : "movie"}
                    vote_average={c.vote_average}
                    />
                ))}
                {searchText &&
                !content.length &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Search
