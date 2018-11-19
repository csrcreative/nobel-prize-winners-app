import React from "react";
import Laureate from "./laureate";

export default function NobelPrize(props) {
    const { activeCategory, category, laureates, year } = props;

    if (activeCategory === null || activeCategory === category) {
      return (
          <li className="nobel-prize">
              <div className="nobel-prize-info">
                  <span className="nobel-prize-category">{category}</span>
                  <span className="nobel-prize-year">{year}</span>
              </div>
              <div className="nobel-prize-laureates">
                  <p><b>Laureates</b></p>
                  {laureates.map((laureate, index) => {
                      return (
                          <Laureate
                              key={index}
                              name={`${laureate.firstname} ${laureate.surname}`}
                              motivation={laureate.motivation}
                          />
                      );
                  })}
              </div>
          </li>
      );
    }

    return null;
}
