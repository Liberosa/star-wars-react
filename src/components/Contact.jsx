import {useEffect, useState} from "react";
import {baseUrl} from "../utils/constants.js";

export const Contact = () => {
    const [planetData, setPlanetData] = useState([]);

    async function fetchPlanetData() {
        const res = await fetch(`${baseUrl}/v1/planets`)
        const data = await res.json();
        setPlanetData(data)

    }

    useEffect(() => {
        fetchPlanetData();
    }, []);
    return (<div className="container">
        <form>

            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

            <label htmlFor="planet">Planet</label>
            <select id="planet" name="planet">

                {planetData.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}

            </select>

            <label htmlFor="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="Write something.."></textarea>

            <input type="submit" value="Submit"/>

        </form>
    </div>)
}