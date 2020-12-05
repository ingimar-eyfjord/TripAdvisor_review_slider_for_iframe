import React, { useState } from 'react'

export default function Review({ reviewInfo, number }) {
    const [more, setMore] = useState(false)
    // console.log(reviewInfo)
    let ratingArray = []
    for (let i = 0; i < reviewInfo.Review_rating; i++) {
        ratingArray.push(<span key={i} className="reviewBall"></span>)
    }
    const img = ``
    function toggleMore() {
        if (more) {
            setMore(false)
        } else {
            setMore(true)
        }
    }
    return (


        <div className="ReviewContainer">

            <div className="profileInfo">
                <div className="imgNameLocation">
                    <div className={`reviewImg ReviewImage_${number}`}>

                    </div>
                    <div className="namePlusLocation">
                        <div className="name">
                            <p className="strong reviewName">{reviewInfo.Profile_name} </p>
                            <p className="thin">Wrote a review {reviewInfo.Review_date}</p>
                        </div>
                        <div className="location">
                            <p className="locationCSSIcon">{reviewInfo.Profile_location} </p>
                            <div className="flexRow">
                                <p className="strong dotBefore">{reviewInfo.Profile_contributions} <span className="thin">contributions</span></p>
                                <p className="strong dotBefore">{reviewInfo.Profile_helpFullVotes} <span className="thin">helpful votes</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ratingPlusTitleAndText">
                    <div className='ratingContainer'>
                        {ratingArray}
                    </div>
                    <div className="title strong">{reviewInfo.Review_title}</div>
                    <div className="text">{more ? reviewInfo.Review_Text : reviewInfo.Review_Text.substring(0, 150) + "..."}<div class="strong pointer" onClick={toggleMore}>{more ? 'See less ⏶' : 'See more ⏷'}</div></div>
                </div>
                <div className="dateOfExperience strong">
                    <p>Date of experience: {reviewInfo.Review_date_of_experience}</p>
                </div>
            </div>


        </div>
    )
}

//       Profile_image: "",
//       Profile_name: "HM7",
//       Profile_location: "London, United Kingdom",
//       Profile_contributions: 49,
//       Profile_helpFullVotes: 19
//       Review_date: "Feb 2020",
//       Review_rating: 5,
//       Review_title: "A tour with character",
//       Review_ofWhatService: "3h Private walking tour, Copenhagen",
//       Review_Text: "We had a wonderful time walking around the known and not so touristy places in Copenhagen. It was nice to not have a commercial style tour and we found it friendly, funny and knowledgeable. We would even like to try the biking tour too.",
//       Review_date_of_experience: "February 2020"