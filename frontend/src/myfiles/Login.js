// for login page
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
    const loc = useLocation();
    const path = loc.pathname.substring(1);
    const navigate = useNavigate();

    const [data, setData] = useState({});
    // console.log(localStorage);

    return (
        <>
            <div className="container m-4">
                <div className="row m-3">
                    <div className="col-5">
                        <label className="form-label">Enter Username :</label>
                    </div>
                    <div className="col-5">
                        <input type="text" id="username" className="form-control"
                            onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col-5">
                        <label className="form-label">Enter Password :</label>
                    </div>
                    <div class="col-5">
                        <input type="password" id="password" className="form-control"
                            onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                    </div>

                </div>
                <div className="row m-3">
                    <div className="col justify-content-center">
                        {/* For Login */}
                        {path === '' && <button className="btn btn-outline-info" onClick={async () => {
                            let a = await SendData(data, path);
                            if (a == null) {
                                alert("User does not Exists");
                            }
                            else if (a) {
                                localStorage.setItem('user', JSON.stringify(data.username));
                                console.log("username = " + data.username);
                                navigate('/normalmode');
                            }

                        }}>Login</button>}

                        {/* For Sign Up */}
                        {path === 'signup' && <button className="btn btn-outline-info" onClick={() => {
                            let a = SendData(data, path);
                            if (a == null) {
                                alert("User Alredy Exists");
                            }
                            else if (a) {
                                localStorage.setItem('user', JSON.stringify(data.username));
                                navigate('/normalmode');
                            }

                        }}>Sign Up</button>}

                        {/* For delete account */}
                        {path === 'delete' && <button className="btn btn-outline-danger" onClick={() => {
                            let url = 'http://localhost:4221/user/' + data.username;
                            fetch(url, { method: 'DELETE' })
                                .then(res => res.json())
                                .then(res => {
                                    console.log("deleted")
                                    localStorage.removeItem('user');
                                    document.getElementById('username').value = '';
                                    document.getElementById('password').value = '';
                                    navigate('/');
                                })
                        }}>Delete Account</button>}
                    </div>
                </div>
            </div>
        </>
    );
}
async function SendData(data, path) {

    var apiUrl = '';
    if (path === '') {
        apiUrl = 'http://localhost:4221/login';
        console.log("login in");
    } else {
        apiUrl = 'http://localhost:4221/signup';
        console.log("signin in");
    }

    var ans = false;
    await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.res == 'true') { ans = true; }
            else if (res.res == 'false') { ans = false; }
            else {
                ans = null;
            }
        });
    if (ans === false) {
        alert('Incorrect Username Or Passwrod');
    }
    return ans;

}
export default Login;