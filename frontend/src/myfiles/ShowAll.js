import { useEffect, useState } from "react";

function ShowAll() {

    let us = localStorage.getItem('user');
    var apiUrl = 'http://localhost:4221/userdata/';

    const [userdata, setUserData] = useState([]);
    useEffect(() => {
        if (us != null) {
            us = us.substring(1, us.length - 1);
            apiUrl = apiUrl + us;
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    setUserData(res);
                }
            }); 

    }, []);
    
    var formatted = userdata.map((ud, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{ud.speed}</td>
                <td>{ud.accuracy}</td>
                <td>{ud.currentDate}</td>
            </tr>
        );
    });

    if (us === null) {
        return (<h1> Login First...</h1>)
    }
    else {
        return (
            <>
                <div className="col d-flex justify-content-center ">
                    <table className="table mx-auto table-bordered border-primary text-center">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Speed</th>
                                <th>Accuracy</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formatted}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default ShowAll;