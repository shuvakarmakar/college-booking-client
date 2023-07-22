import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";


const MyCollege = () => {
    const { user } = useContext(AuthContext);
    const [college, setCollege] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/colleges/${user.email}`)
                .then((response) => response.json())
                .then((data) => {
                    setCollege(data);
                    setIsDataLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching college data:", error);
                    setIsDataLoaded(true);
                });
        } else {
            setIsDataLoaded(true);
        }
    }, [user]);


    const handleReviewSubmit = async () => {
        try {
            if (!college || !college._id) {
                console.error("College ID not available.");
                return;
            }

            const response = await fetch(`http://localhost:5000/colleges/${college._id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review,
                    rating,
                }),
            });

            if (response.ok) {
                // Success message using Swal or any other library
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Review added successfully!",
                    confirmButtonText: "OK",
                });
                // Clear review input fields after successful submission
                setReview("");
                setRating(0);
            } else {
                console.error("Error adding review:", response.status);
            }
        } catch (error) {
            console.error("Error adding review:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while adding the review.",
                confirmButtonText: "OK",
            });
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My College Details</h1>
            {isDataLoaded ? (
                college ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">College Name: {college.college}</h2>
                        {/* Display other college details here */}
                        <h2 className="text-lg font-semibold mb-2">Add a Review:</h2>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Review:</label>
                            <textarea
                                rows="4"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className="px-4 py-2 rounded-md border w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Rating:</label>
                            <input
                                type="number"
                                min="0"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                                className="px-4 py-2 rounded-md border w-full"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleReviewSubmit}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit Review
                        </button>
                    </div>
                ) : (
                    <div>No college data found for the user.</div>
                )
            ) : (
                <div>Loading college data...</div>
            )}
        </div>
    );
};

export default MyCollege;
