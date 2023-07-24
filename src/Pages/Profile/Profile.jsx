import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        college: "",
        address: "",
    });

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:5000/api/profile?email=${user.email}`)
            .then((response) => response.json())
            .then((data) => {
                setProfileData(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    college: data.college,
                    address: data.address,
                });
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    }, [user]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        fetch(`http://localhost:5000/api/user?email=${user.email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User profile updated:", data);
                fetch(`http://localhost:5000/api/profile?email=${formData.email}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setProfileData(data);
                        setFormData({
                            name: data.name,
                            email: data.email,
                            college: data.college,
                            address: data.address,
                        });
                        setEditMode(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching updated user profile:", error);
                        setEditMode(false);
                    });
            })
            .catch((error) => {
                console.error("Error updating user profile:", error);
                setEditMode(false);
            });

        // Update user profile data in the backend API
        fetch(`http://localhost:5000/api/admission?email=${user.email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                candidateName: formData.name,
                candidateEmail: formData.email,
                college: formData.college,
                address: formData.address,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Admission data updated:", data);
                // Fetch the updated profile data after saving changes
                fetch(`http://localhost:5000/api/profile?email=${formData.email}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setProfileData(data);
                        setFormData({
                            name: data.name,
                            email: data.email,
                            college: data.college,
                            address: data.address,
                        });
                        setEditMode(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching updated user profile:", error);
                        setEditMode(false);
                    });
            })
            .catch((error) => {
                console.error("Error updating admission data:", error);
                setEditMode(false); 
            });
    };


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                {profileData && !editMode ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Profile</h1>
                        <p className="font-semibold">Name:</p>
                        <p>{profileData.name}</p>
                        <p className="font-semibold">Email:</p>
                        <p>{profileData.email}</p>
                        <p className="font-semibold">College:</p>
                        <p>{profileData.college}</p>
                        <p className="font-semibold">Address:</p>
                        <p>{profileData.address}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={handleEditClick}
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">College:</label>
                                <select
                                    name="college"
                                    value={formData.college}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <option value="">Select a college</option>
                                    <option value="Dhaka College">Dhaka College</option>
                                    <option value="Notre Dame College">Notre Dame College</option>
                                    <option value="Holy Cross College">Holy Cross College</option>
                                    <option value="Rajshahi College">Rajshahi College</option>
                                    <option value="Chittagong College">Chittagong College</option>
                                    <option value="Khulna College">Khulna College</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </form>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
