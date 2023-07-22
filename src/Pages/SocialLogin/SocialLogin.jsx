import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext);

    // const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
    }

    return (
        <div>
            <div className="w-full text-center my-6">
                <button onClick={handleGoogleSignIn} className="btn btn-outline">
                    <FaGoogle></FaGoogle> Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;