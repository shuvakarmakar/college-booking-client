import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const Admission = () => {
    const { user } = useContext(AuthContext);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const [collegesData, setCollegesData] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [candidateData, setCandidateData] = useState({
        candidateName: "",
        subject: "",
        candidateEmail: "",
        candidatePhone: "",
        address: "",
        dateOfBirth: "",
        image: "",
    });

    useEffect(() => {
        fetch("http://localhost:5000/colleges")
            .then((response) => response.json())
            .then((data) => {
                setCollegesData(data);
            })
            .catch((error) => {
                console.error("Error fetching colleges data:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setCandidateData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        } else {
            setCandidateData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: "info",
                title: "Sign In Required",
                text: "Please sign in before submitting the admission form.",
                confirmButtonText: "OK",
            });
            return;
        }

        // Upload the image to imgBB
        try {
            const formData = new FormData();
            formData.append("image", candidateData.image);

            const response = await fetch(img_hosting_url, {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Get the uploaded image URL from the response data
                const imageUrl = responseData.data.display_url;

                // Submit the admission data along with the uploaded image URL
                const {
                    candidateName,
                    subject,
                    candidateEmail,
                    candidatePhone,
                    address,
                    dateOfBirth,
                } = candidateData;

                try {
                    const response = await fetch("http://localhost:5000/admission", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            college: selectedCollege.collegeName,
                            candidateName,
                            subject,
                            candidateEmail,
                            candidatePhone,
                            address,
                            dateOfBirth,
                            image: imageUrl, // Use the uploaded image URL here
                        }),
                    });

                    if (response.ok) {
                        setCandidateData({
                            candidateName: "",
                            subject: "",
                            candidateEmail: "",
                            candidatePhone: "",
                            address: "",
                            dateOfBirth: "",
                            image: "",
                        });
                        setSelectedCollege(null);
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Admission data has been submitted successfully!",
                            confirmButtonText: "OK",
                        });
                    } else {
                        console.error("Error storing data:", response.status);
                    }
                } catch (error) {
                    console.error("Error storing data:", error);

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred while submitting admission data.",
                        confirmButtonText: "OK",
                    });
                }
            } else {
                console.error("Error uploading image:", responseData.error.message);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while uploading the image.",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error uploading image:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while uploading the image.",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">This is Admission Page</h1>
            <div>
                <h2 className="text-lg font-semibold mb-2">Select a College:</h2>
                {collegesData.map((college) => (
                    <div key={college._id}>
                        <button
                            className="text-blue-500 underline mb-2 cursor-pointer"
                            onClick={() => setSelectedCollege(college)}
                        >
                            {college.collegeName}
                        </button>
                    </div>
                ))}
            </div>
            {selectedCollege && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Candidate Name:</label>
                        <input
                            type="text"
                            name="candidateName"
                            value={candidateData.candidateName}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={candidateData.subject}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Candidate Email:</label>
                        <input
                            type="email"
                            name="candidateEmail"
                            value={candidateData.candidateEmail}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Candidate Phone Number:</label>
                        <input
                            type="tel"
                            name="candidatePhone"
                            value={candidateData.candidatePhone}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={candidateData.address}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Date of Birth:</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={candidateData.dateOfBirth}
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="px-4 py-2 rounded-md border w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default Admission;
