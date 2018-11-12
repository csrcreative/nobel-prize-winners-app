import React from "react";

function Laureate(props) {
    return (
        <div className="laureate">
            <div className="laureate-name">{props.name}</div>
            <div className="laureate-motivation"><blockquote>
                {props.motivation}
            </blockquote></div>
        </div>
    );
}

export default Laureate;