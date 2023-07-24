import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://college-booking-server-blush.vercel.app/colleges")
      .then((response) => response.json())
      .then((data) => {
        setCollegeData(data);
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCollegeData = collegeData.filter((college) =>
    college.collegeName.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div>
      <form className="mt-4 mb-8 mx-auto max-w-lg">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            type="text"
            placeholder="Search college name..."
            value={searchQuery}
            onChange={handleInputChange}
            className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
      {searchQuery.trim() !== "" ? (
        <div className="card p-5">
          {filteredCollegeData.length === 0 ? (
            <div>No matching colleges found.</div>
          ) : (
            filteredCollegeData.slice(0, 6).map((college) => (
              <div key={college._id} className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white">
                <img src={college.collegeImage} alt={college.collegeName} className="w-full h-48 object-cover" />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">{college.collegeName}</h2>
                  <p className="text-gray-600">Admission Date: {college.admissionDate}</p>
                </div>
                <div className=" text-white card-actions justify-end">
                  <Link to={`/college-details/${college._id}`} className="btn btn-info ">
                    Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
