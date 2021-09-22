import { Badge } from "@material-ui/core"
import { Link } from "react-router-dom"
import { img_300, unavailable } from "../../config/config"
import ContentModal from "../ContentModal/ContentModal"
import './MovieCard.css'
const MovieCard = ({id,poster,title,date,media_type,vote_average}) => {
    return (
        <Link to={{pathname:`item/${id}`,query:{media_type:`${media_type}`}}} style={{ textDecoration: 'none' }}>
            <div className="media">
            <Badge badgeContent={vote_average} color={vote_average>6?"primary":"secondary"} />
            <img className="poster" src={poster?`${img_300}/${poster}`:unavailable} alt={title} />
            <p className="title">{title}</p>
            <span className="subTitle">
                {media_type==='tv'?'TV Show':'Movie'}
                <span className="subTitle">{date}</span>
            </span>
            </div>
        </Link>
    )
}

export default MovieCard
