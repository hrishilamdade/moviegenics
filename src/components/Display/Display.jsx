import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "../ContentModal/ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
import Reviews from "../Review/Reviews";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(45, 42, 85) ",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function Display(props) {
  const classes = useStyles();
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const {match,location}=props;
  const {id}=match.params.id;
  
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${location.query.media_type}/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${location.query.media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };
  
  useEffect(() => {
    window.scroll(0, 0);
    if(!location || !location.query){
        return <div>Loading....</div>
        }
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div class="carousel">
                      <h3 style={{margin:"5px"}}>Cast</h3>
                    <Carousel id={match.params.id} media_type={location.query.media_type} />
                  </div>

                  <Button
                    variant="contained"
                    className="button-trailer"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    style={{width:"270px"}}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
          <Reviews/>
    </>
  );
}