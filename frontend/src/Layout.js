import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import myImg from './myfiles/fastfingers.webp';
function Layout() {

    return (
        <>
            <div className='container'>
                {/* Navbar */}
                <div className='row justify-content-center p-4'>

                    {/* Logo here */}
                    <div className='col-2  p-2'>
                        <Logo />
                    </div>

                    <div className="col-2 d-flex justify-content-center align-items-center py-3">
                        <Title />
                    </div>
                    {/* Links */}
                    <div className='col d-flex justify-content-center align-items-center'>
                        <Link to={"/normalmode"} className='btn btn-outline-primary m-2'> Normal Mode </Link>
                        <Link to={"/timemode"} className='btn btn-outline-primary m-2'> Time Mode </Link>
                        <Link to={'/showall'} className="btn btn-outline-info m-2"> Show All</Link>
                        <Link to={'/'} className='btn btn-outline-light m-2'> Login</Link>
                        <Link to={'/signup'} className='btn btn-outline-light m-2'> Sign Up</Link>
                        <Link to={'/delete'} className="btn btn-outline-danger m-2">Delete Acc</Link>
                    </div>
                </div>


                {/* Text */}
                <div className='row d-flex justify-content-center '>
                    <div className="col m-5 Mydata">

                        <Outlet />

                    </div>
                </div>
            </div>
        </>
    );
}
function Logo() {

    return (
        <>
            <img src={myImg} alt='here' width={180} height={150} />
        </>
    );
}
function Title() {
    let mystyle = {
        fontSize : '50px',
        fontFamily : 'Gergia',
        color: 'rgb(209, 250, 27)'
    };
    return (
        <>
            <h1 style={mystyle} className=""> Fast Fingers </h1>
        </>
    );
}

export default Layout;