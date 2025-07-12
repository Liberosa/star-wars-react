import {useEffect, useState} from 'react';
import {baseUrl} from "../utils/constants.js";

export const AboutMe = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const info = localStorage.getItem("info");
        if (info) {
            setUserData(JSON.parse(info));
        } else {
            fetch(`${baseUrl}/v1/peoples/1`)
                .then(res => res.json())
                .then(data => {
                    setUserData(data);
                    localStorage.setItem("info", JSON.stringify(data));
                })
        }
    }, []);

    return (<div>
        <h2>About Me</h2>
        {userData ? (<div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Birth Year:</strong> {userData.birth_year}</p>
            <p><strong>Skin Color:</strong> {userData.skin_color}</p>
            <p><strong>Hair Color:</strong> {userData.hair_color}</p>
            <p><strong>Eye Color:</strong> {userData.eye_color}</p>
            <p><strong>Height:</strong> {userData.height}</p>
            <p><strong>Mass:</strong> {userData.mass}</p>
        </div>) : (<div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>)}
    </div>);
};