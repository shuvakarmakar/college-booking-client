import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CollegeDetails = () => {
    const [collegeData, setCollegeData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://college-booking-server-blush.vercel.app/college-details/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCollegeData(data);
            })
            .catch((error) => {
                console.error('Error fetching college data:', error);
            });
    }, [id]);

    return (
        <div className="container mx-auto mt-8">
            {collegeData ? (
                <div className="card lg:card-side bg-base-100 shadow-2xl">
                    <figure>
                        <img
                            src={collegeData.collegeImage}
                            alt={collegeData.collegeName}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-semibold mb-2">
                            {collegeData.collegeName}
                        </h2>
                        <p className="mb-4">Rating: {collegeData.collegeRating}</p>

                        <h3 className="text-xl font-semibold mb-2">Admission Date:</h3>
                        <p>{collegeData.admissionDate}</p>

                        <h3 className="text-xl font-semibold my-4">Events:</h3>
                        <ul className="list-disc pl-6">
                            {collegeData.events?.map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-semibold my-4">Research History:</h3>
                        <ul className="list-disc pl-6">
                            {collegeData.researchHistory?.map((research, index) => (
                                <li key={index}>{research}</li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-semibold my-4">Sports Categories:</h3>
                        <ul className="list-disc pl-6">
                            {collegeData.sportsCategory?.map((sport, index) => (
                                <li key={index}>{sport}</li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-semibold my-4">Admission Process:</h3>
                        <p>{collegeData.admissionProcess}</p>
                    </div>
                </div>
            ) : (
                <div>Loading college data...</div>
            )}
        </div>
    );
};

export default CollegeDetails;
