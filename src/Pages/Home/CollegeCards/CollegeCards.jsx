import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const CollegeCards = () => {
  const [collegeData, setCollegeData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
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
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
      {collegeData.slice(0, 3).map((college) => (
        <div key={college._id} className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white">
          <img
            src={college.collegeImage}
            alt={college.collegeName}
            className="w-full h-48 object-cover"
          />
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{college.collegeName}</h2>
            <p className="text-gray-600">Admission Date: {college.admissionDate}</p>
            <div className="my-4">
              <h4 className="font-semibold">Events:</h4>
              <ul className="list-disc pl-4">
                {college.events.map((event) => (
                  <li key={event}>{event}</li>
                ))}
              </ul>
            </div>
            <div className="my-4">
              <h4 className="font-semibold">Research History:</h4>
              <ul className="list-disc pl-4">
                {college.researchHistory.map((research) => (
                  <li key={research}>{research}</li>
                ))}
              </ul>
            </div>
            <div className="my-4">
              <h4 className="font-semibold">Sports:</h4>
              <ul className="list-disc pl-4">
                {college.sportsCategory.map((sport) => (
                  <li key={sport}>{sport}</li>
                ))}
              </ul>
            </div>
          </div>
          {user ? (
            <div className="px-6 py-2 bg-blue-500 text-white">
              <Link to={`/college-details/${college._id}`} className="block">
                Details
              </Link>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CollegeCards;
