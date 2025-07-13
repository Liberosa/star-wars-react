import {useEffect, useState} from 'react';
import {baseUrl} from "../utils/constants.js";

export const AboutMe = () => {
    const [userData, setUserData] = useState(null);

    async function fetchAboutMeData() {
        try {
            const res = await fetch(`${baseUrl}/v1/peoples/1`);
            const data = await res.json();
            const timestamp = Date.now();
            const expirationTime = timestamp + 30 * 24 * 60 * 60 * 1000;

            const payload = {
                data,
                timestamp,
                expirationTime
            };

            setUserData(data);
            localStorage.setItem("aboutMe", JSON.stringify(payload));
        } catch (error) {
            console.error("About data downloading error:", error);
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem("aboutMe");
        if (storedData) {
            try {
                const stored = JSON.parse(storedData);
                const isExpired = stored.expirationTime < Date.now();

                if (isExpired) {
                    localStorage.removeItem("aboutMe");
                    fetchAboutMeData();
                } else {
                    setUserData(stored.data);
                }
            } catch (error) {
                console.error("Error parsing stored data:", error);
                localStorage.removeItem("aboutMe");
                fetchAboutMeData();
            }
        } else {
            fetchAboutMeData();
        }
    }, []);

    return (
        <div>
            <h2>About Me</h2>
            {userData ? (
                <div>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Birth Year:</strong> {userData.birth_year}</p>
                    <p><strong>Skin Color:</strong> {userData.skin_color}</p>
                    <p><strong>Hair Color:</strong> {userData.hair_color}</p>
                    <p><strong>Eye Color:</strong> {userData.eye_color}</p>
                    <p><strong>Height:</strong> {userData.height}</p>
                    <p><strong>Mass:</strong> {userData.mass}</p>
                </div>
            ) : (
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
};