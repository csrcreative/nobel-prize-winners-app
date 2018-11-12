import React from "react";

function RadioButtons(props) {
    return (
        <React.Fragment>
            <fieldset className="form-radio-buttons">
                <legend>Filter by category</legend>
                <label>
                    Show All
                    <input
                        type="radio"
                        value="all"
                        name="categories"
                        defaultChecked
                        onClick={props.showAllPrizes}
                    />
                </label>
                {props.categories.map((v, i) => {
                    return (
                        <label key={i}>
                            {v}
                            <input
                                type="radio"
                                value={v}
                                name="categories"
                                onClick={props.filterPrizesByCategory}
                            />
                        </label>
                    );
                })}
            </fieldset>
        </React.Fragment>
    );
}

export default RadioButtons;