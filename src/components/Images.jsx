import React from 'react';
import {photos} from "../utils/constants.js";

const Images = ({className}) => {
    return (<>
            {photos.map((item, index) => {
                let classes = className;


                if (index === 6) {
                    classes += ' bottomLeft';
                }
                if (index === 8) {
                    classes += ' bottomRight';
                }

                return <img key={index} src={item} className={classes} alt={`Friend ${index + 1}`}/>
            })}
        </>
    );
};

export default Images;