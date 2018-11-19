import React, { Component } from "react";
import fetch from "fetch-everywhere";
import _ from "lodash";

import Header from "./components/header";
import SelectDropdown from "./components/form/selectDropdown";
import RadioButtons from "./components/form/radioButtons";
import NobelPrizeAlt from "./components/nobelPrizeAlt";
import "../scss/app.scss";

export default class extends Component {
    state = {
        prizes: [],
        activeFilter: null,
        sort: "desc"
    };

    categories = [
        "chemistry",
        "economics",
        "literature",
        "medicine",
        "peace",
        "physics"
    ];

    api = "https://padillaco-datasets.s3.amazonaws.com/nobel.json";

    constructor() {
        super();

        this.sortPrizesByYear = this.sortPrizesByYear.bind(this);
        this.filterPrizesByCategory = this.filterPrizesByCategory.bind(this);
        this.showAllPrizes = this.showAllPrizes.bind(this);
    }

    componentDidMount() {
        fetch(this.api)
            .then(res => res.json())
            .then(d => {
                const prizes = this.sortPrizes(d.prizes, this.state.sort);
                this.setState({ prizes });
            })
            .catch(err => {
                console.log(err);
            });
    }

    sortPrizesByYear(e) {
        const sort = e.target.value;
        const prizes = this.sortPrizes(this.state.prizes, sort);

        this.setState({ prizes, sort });
    }

    sortPrizes(prizes, direction) {
        return _.orderBy(prizes, ["year"], [direction]);
    }

    filterPrizesByCategory(e) {
        const activeFilter = e.target.value;

        this.setState({ activeFilter });
    }

    showAllPrizes() {
        this.setState({ activeFilter: null });
    }

    render() {
        const { prizes, activeFilter } = this.state;

        return (
            <div className="nobel-prizes-app">
                <Header/>
                <form className="nobel-prizes-form">
                    <SelectDropdown sortPrizesByYear={this.sortPrizesByYear} />
                    <RadioButtons
                        categories={this.categories}
                        showAllPrizes={this.showAllPrizes}
                        filterPrizesByCategory={this.filterPrizesByCategory}
                    />
                </form>

                <ul className="nobel-prizes-list">
                    {prizes.map(({ category, year, laureates }, index) => {
                          return (
                              <NobelPrizeAlt
                                  key={index}
                                  category={category}
                                  year={year}
                                  laureates={laureates}
                                  activeCategory = {activeFilter}
                              />
                          );
                      })}
                </ul>
            </div>
        );
    }
}
