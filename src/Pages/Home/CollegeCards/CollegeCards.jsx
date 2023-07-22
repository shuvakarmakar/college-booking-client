import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CollegeCards = () => {
    const [collegeData, setCollegeData] = useState([]);

    useEffect(() => {
        // Fetch college data from the backend API
        fetch("http://localhost:5000/colleges")
            .then((response) => response.json())
            .then((data) => {
                setCollegeData(data);
            })
            .catch((error) => {
                console.error("Error fetching college data:", error);
            });
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {collegeData.slice(0, 3).map((college) => (
                <div
                    key={college._id}
                    className="bg-white rounded-lg shadow-md p-4 transition duration-300 hover:shadow-lg"
                >
                    <img
                        src={college.collegeImage}
                        alt={college.collegeName}
                        className="w-full h-48 object-cover mb-4 rounded-t-lg"
                    />
                    <h2 className="text-xl font-semibold mb-2">{college.collegeName}</h2>
                    <p className="mb-2">Admission Date: {college.admissionDate}</p>
                    <div className="mb-2">
                        <h4 className="font-semibold">Events:</h4>
                        <ul className="list-disc pl-4">
                            {college.events.map((event) => (
                                <li key={event}>{event}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <h4 className="font-semibold">Research History:</h4>
                        <ul className="list-disc pl-4">
                            {college.researchHistory.map((research) => (
                                <li key={research}>{research}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <h4 className="font-semibold">Sports:</h4>
                        <ul className="list-disc pl-4">
                            {college.sportsCategory.map((sport) => (
                                <li key={sport}>{sport}</li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        to={`/colleges/${college._id}`}
                        className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CollegeCards;
