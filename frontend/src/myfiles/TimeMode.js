import { display, getTimeValue, Restart, TestTimeMode } from "./myFunctions";
import { useEffect, useRef, useState } from "react";

function TimeMode() {
    var un = localStorage.getItem('user');

    const [formatedData, setFormatedData] = useState([]);
    const myRef = useRef(null);


    useEffect(() => {
        if(un !== null){
            document.getElementsByName('time')[0].checked = true;
            getTimeValue();
            setFormatedData(display());
            myRef.current.focus();
        }
    }, []);
    if (un === null) {
        return (<h1> Login First...</h1>)
    }
    else {
        return (
            <>
                {/* Timeing options */}
                <div className="text-center m-4">
                    <input className="form-check-input me-2" type="radio" name="time" value={30} onClick={() => {
                        Restart();
                        myRef.current.focus();
                        getTimeValue();
                        setFormatedData(display());
                    }} />
                    <label className="me-3">30 seconds</label>

                    <input className="form-check-input me-2" type="radio" name="time" value={20} onClick={() => {
                        Restart();
                        myRef.current.focus();
                        getTimeValue();
                        setFormatedData(display())
                    }} />
                    <label className="me-3">20 seconds</label>

                    <input className="form-check-input me-2" type="radio" name="time" value={10} onClick={() => {
                        Restart();
                        myRef.current.focus();
                        getTimeValue();
                        setFormatedData(display())
                    }} />
                    <label className="me-3">10 seconds</label>
                </div>

                {/* Remaining Time */}
                <div className="text-center mb-4 fs-5">
                    <span >Remaining Time :</span>
                    <span id="displayTime" onLoad={() => { getTimeValue() }}></span>
                </div>

                {/* Text Area */}
                <div className="border border-1 border-info p-4 fs-4" id="mytext" tabIndex={0} ref={myRef} onKeyDown={(e) => {
                    un = un.substring(1, un.length - 1);
                    const apiUrl = "http://localhost:4221/user/" + un;
                    let ans = TestTimeMode(e);
                    if (ans !== undefined) {
                    
                        fetch(apiUrl, {
                            method: "PUT",
                            body: JSON.stringify(ans),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(res => res.json());
                    }

                }}>
                    {formatedData}
                </div >

                {/* Restart button */}
                <div className="d-flex justify-content-center m-4 p-3">
                    <button className="btn btn-outline-primary" onClick={() => {
                        myRef.current.focus();
                        Restart();
                        setFormatedData(display());
                    }}> Restart </button>
                </div>
            </>
        );
    }
}

export default TimeMode;