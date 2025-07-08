import {useEffect, useState} from "react";
import {baseUrl} from "../utils/constants.js";

const OpeningCrawl = () => {
    const [openingCrawl, setOpeningCrawl] = useState('');
    useEffect(() => {
        const episode = Math.floor(Math.random() * 6) + 1;
        fetch(`${baseUrl}/v1/films/${episode}`)
            .then(res => res.json())
            .then(data => setOpeningCrawl(data.opening_crawl));
    }, [])
    return (
        <div className="farGalaxy">{openingCrawl ? openingCrawl :
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </div>
    );
};

export default OpeningCrawl;
