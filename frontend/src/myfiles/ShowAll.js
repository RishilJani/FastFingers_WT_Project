import { useEffect, useState } from "react";

function ShowAll() {

    let us = localStorage.getItem('user');
    var apiUrl = 'http://localhost:4221/user/';

    
    const [speed, setSpeed] = useState([]);
    const [accuracy, setAccuracy] = useState([]);
    const [date,setDate] = useState([]);
    useEffect(() => {
        if(us !== null){
            us = us.substring(1, us.length - 1);
            apiUrl =apiUrl + us;
        }
        // fetch(apiUrl)
        //     .then(res => res.json())
        //     .then(res => setSpeed(res.speed));

        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                setAccuracy(res.accuracy);
                setSpeed(res.speed);
                setDate(res.currentDate);
            });
        
        }, []);
        

    var formatted = speed.map((sp, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{sp}</td>
                <td>{accuracy[index]}</td>
                <td>{date[index]}</td>
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