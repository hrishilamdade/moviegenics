import { Badge } from "@material-ui/core"
import { img_300, unavailable } from "../../config/config"
import './MovieCard.css'
const MovieCard = ({id,poster,title,date,media_type,vote_average}) => {
    return (
        <div className="media">
            <Badge badgeContent={vote_average} color={vote_average>6?"primary":"secondary"} />
            <img className="poster" src={poster?`${img_300}/${poster}`:unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type==='tv'?'TV Show':'Movie'}
                <span className="subTitle">{date}</span>
            </span>
        </div>
    )
}

export default MovieCard
