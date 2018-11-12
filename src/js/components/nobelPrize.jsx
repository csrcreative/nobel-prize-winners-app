import React from "react";
import Laureate from "./laureate";

function NobelPrize(props) {
    return (
        <li className="nobel-prize">
            <div className="nobel-prize-info">
                <span className="nobel-prize-category">{props.category}</span>
                <span className="nobel-prize-year">{props.year}</span>
            </div>
            <div className="nobel-prize-laureates">
                <p><b>Laureates</b></p>
                {props.laureates.map((v, i) => {
                    return (
                        <Laureate
                            key={i}
                            name={`${v.firstname} ${v.surname}`}
                            motivation={v.motivation}
                        />
                    );
                })}
            </div>
        </li>
    );
}

export default NobelPrize;