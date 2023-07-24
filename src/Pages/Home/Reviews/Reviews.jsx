import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/admissions-with-reviews")
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.error("Error fetching admission details with reviews:", error);
            });
    }, []);

    const formattedReviews = reviews.map((admission, index) => (
        <div key={index}>
            {admission.reviews.map((review, reviewIndex) => (
                <div key={reviewIndex}>
                    <p className="testimonial-text text-2xl text-slate-300 font-bold font-serif">{review.review}</p>
                    <div className="d-flex justify-content-center my-4">
                        <img
                            src={admission.image}
                            className="rounded-circle img-fluid"
                            style={{ maxWidth: "120px", maxHeight: "120px", borderRadius: "50%"  }}
                        />
                    </div>
                    <h4 className="font-weight-bold text-xl text-white mt-5">{admission.candidateName}</h4>
                    <div>
                        <p className="text-white my-8">Rating: {review.rating}</p>
                    </div>
                </div>
            ))}
        </div>
    ));

    return (
        <div className="container mx-auto p-10 ">
            <h1 className="text-3xl font-semibold my-8 text-center text-white">Reviews</h1>
            {reviews.length > 0 ? (
                <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000}
                    showArrows={true}
                    showStatus={false}
                    showIndicators={true}
                >
                    {formattedReviews}
                </Carousel>
            ) : (
                <div>No reviews available.</div>
            )}
        </div>
    );
};

export default Reviews;
