import React, { useState } from 'react'
import "./Reviews.css"
import {
    Button,
    createMuiTheme,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";

const darkTheme=createMuiTheme({
    palette:{
        type:'dark',
        primary:{
            main:"#fff",
        }
    }
})

function Reviews() {
    const [reviews,setReviews]=useState(["This is awesome","This is wonderful"])
    const [currReview, setCurrReview] = useState("")


    const handleSubmit=()=>{
        setReviews([...reviews,currReview])
        setCurrReview("")
    }
    console.log(reviews)
    console.log(currReview)
    return (
        <div className="review-section">
            <h2>Reviews</h2>
            <ThemeProvider theme={darkTheme}>
            <div className="input">
                <TextField
                    className="review-input"
                    id="outlined-textarea"
                    label="Write a review"
                    placeholder=""
                    value={currReview}
                    multiline
                    variant="outlined"
                    onChange={(e)=> setCurrReview(e.target.value)}
                />
                <div style={{margin:"10px 2px"}}>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            </ThemeProvider>
            <h3>User Reviews</h3>
            <div className="user-reviews">
                {reviews.map((review)=>
                    <div id={review} className="review">
                        <span className="username">Username</span>
                        <div className="review-text">{review}</div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Reviews
