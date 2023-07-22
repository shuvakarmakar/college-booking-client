import { useEffect, useState } from "react";

const Colleges = () => {
    const [collegesData, setCollegesData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend API
        fetch("http://localhost:5000/colleges")
            .then((response) => response.json())
            .then((data) => {
                setCollegesData(data);
            })
            .catch((error) => {
                console.error("Error fetching colleges data:", error);
            });
    }, []);

    const toggleDetails = (college) => {
        college.showDetails = !college.showDetails;
        setCollegesData([...collegesData]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">All Colleges</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collegesData.map((college) => (
                    <div key={college._id} className="border p-4 rounded-lg shadow-md">
                        <img src={college.collegeImage} alt={college.collegeName} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-semibold mb-2">{college.collegeName}</h2>
                        <p className="text-gray-600 mb-2">College Rating: {college.collegeRating}</p>
                        <p className="text-gray-600 mb-4">Admission Date: {college.admissionDate}</p>
                        <p className="text-gray-600 mb-4">Number of Research: {college.researchHistory.length}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => toggleDetails(college)}
                        >
                            {college.showDetails ? "Hide Details" : "Show Details"}
                        </button>
                        {college.showDetails && (
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">Events:</h3>
                                <ul className="list-disc list-inside">
                                    {college.events.map((event, index) => (
                                        <li key={index}>{event}</li>
                                    ))}
                                </ul>
                                <h3 className="font-bold mt-4 mb-2">Sports Facilities:</h3>
                                <ul className="list-disc list-inside">
                                    {college.sportsCategory.map((sport, index) => (
                                        <li key={index}>{sport}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Colleges;
