import {useEffect, useState} from "react";
import {baseUrl} from "../utils/constants.js";

const OpeningCrawl = () => {
    const [openingCrawl, setOpeningCrawl] = useState('');
    useEffect(() => {
        const opening_crawl = sessionStorage.getItem("opening_crawl");
        if (opening_crawl) {
            setOpeningCrawl(opening_crawl);
        } else {
            const episode = Math.floor(Math.random() * 6) + 1;
            fetch(`${baseUrl}/v1/films/${episode}`)
                .then(res => res.json())
                .then(data => {
                        setOpeningCrawl(data.opening_crawl)
                        sessionStorage.setItem("opening-crawl", data.opening_crawl);
                    }
                );
        }


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
