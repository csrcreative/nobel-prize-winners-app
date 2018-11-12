import React from "react";

function SelectDropdown(props) {
    return (
        <React.Fragment>
            <div className="form-select-dropdown">
                <label htmlFor="sortyear">Sort by year:</label>
                <select name="sortyear" id="sortyear" onChange={props.sortPrizesByYear}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
        </React.Fragment>
    );
}

export default SelectDropdown;