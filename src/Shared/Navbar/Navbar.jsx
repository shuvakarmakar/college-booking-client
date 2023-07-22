import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const navItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/colleges">Colleges</Link></li>
            <li><Link to="/admission">Admission</Link></li>
            <li><Link to="/mycollege">My College</Link></li>
        </>
    );

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">College Booking</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            {user ? <div className="navbar-end">
                <li className="relative inline-block">
                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out mr-2">
                        <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="" />
                    </button>
                </li>
                <span className="text-slate-900 mr-2">Welcome, {user.displayName}</span>
                <button onClick={handleLogout} className="btn btn-neutral">Logout</button>
            </div>
                : <div className="navbar-end">
                    <button className="btn"><Link to="/login">Login</Link></button>
                </div>}
        </div>
    );
};

export default Navbar;