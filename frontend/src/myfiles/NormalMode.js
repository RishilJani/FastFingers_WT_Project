import { useEffect, useRef, useState } from "react";
import { Restart, TestNormalMode, display } from "./myFunctions";
import './main.css'
function NormalMode() {
    var un = localStorage.getItem('user');
    var apiUrl = "http://localhost:4221/user/";

    const [formatedData, setFormatedData] = useState([]);
    const myRef = useRef(null);
    useEffect(() => {
        setFormatedData(display());
        myRef.current.focus();
    }, []);

    // to check if user is loged in or not
    if(un === null){
        return (<h1> Login First...</h1>)
    }
    else{
        return (
            <>
                {/* Text Area */}
                <div className="border border-1 border-info p-4 fs-4" id="mytext" ref={myRef} onKeyDown={(e) => {
                    let obj = TestNormalMode(e);
                    if (obj !== undefined) {
                        un = un.substring(1, un.length - 1);
                        apiUrl = apiUrl + un;
                        
                        fetch(apiUrl, {
                            method: "PUT",
                            body: JSON.stringify(obj),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(res => res.json())

                    }
                }} tabIndex={0}>
                    {formatedData}

                </div >

                {/* Restart button */}
                <div className="d-flex justify-content-center m-4 p-3">
                    <button className="btn btn-outline-primary" onClick={() => {
                        Restart();
                        myRef.current.focus();
                        setFormatedData(display());
                    }}> Restart </button>
                </div>

            </>
        );
    }
}

export default NormalMode;