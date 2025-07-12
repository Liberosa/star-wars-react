import {useEffect, useState} from "react";
import {baseUrl} from "../utils/constants.js";

export const Contact = () => {
    const [planetData, setPlanetData] = useState({planets: []});

    async function fetchPlanetData() {
        try {
            const res = await fetch(`${baseUrl}/v1/planets`);
            const data = await res.json();
            const timestamp = Date.now();
            const expirationTime = timestamp + 30 * 24 * 60 * 60 * 1000;
            const payload = {
                planets: data, timestamp, expirationTime
            };
            setPlanetData(payload);
            localStorage.setItem("planets", JSON.stringify(payload));
        } catch (error) {
            console.error("Ошибка загрузки данных о планетах:", error);
        }
    }


    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("planets"));
        if (stored) {
            const isExpired = stored.expirationTime && stored.timestamp < Date.now();
            if (isExpired) {
                localStorage.removeItem("planets");
                fetchPlanetData();
            } else {
                setPlanetData(stored);
            }
        } else {
            fetchPlanetData();
        }
    }, []);

    return (<div className="container">
        <form>
            <label htmlFor="fname">First Name</label>
            <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
            />

            <label htmlFor="lname">Last Name</label>
            <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name.."
            />

            <label htmlFor="planet">Planet</label>
            <select id="planet" name="planet">

                {planetData.planets.map(item => (<option key={item.id} value={item.name}>
                    {item.name}
                </option>))}
            </select>

            <label htmlFor="subject">Subject</label>
            <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
            ></textarea>

            <input type="submit" value="Submit"/>
        </form>
    </div>);
};
