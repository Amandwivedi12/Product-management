import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("adminToken");


    const handleLogout = () => {

        localStorage.removeItem(
            "adminToken"
        );

        navigate("/");
    };


    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                Product Manager
            </Link>


            <div className="nav-links">

                <Link to="/">
                    Products
                </Link>


                {token ? (

                    <>
                        <Link to="/admin/add">
                            Add Product
                        </Link>

                        <button
                            onClick={
                                handleLogout
                            }
                        >
                            Logout
                        </button>
                    </>

                ) : (

                    <Link to="/login">
                        Admin Login
                    </Link>

                )}

            </div>

        </nav>
    );
}

export default Navbar;