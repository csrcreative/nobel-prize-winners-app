import React, { Component } from "react";
import Header from "./components/header";
import SelectDropdown from "./components/form/selectDropdown";
import RadioButtons from "./components/form/radioButtons";
import NobelPrize from "./components/nobelPrize";

import "../scss/app.scss";
import fetch from "fetch-everywhere";
import _ from "lodash";

class App extends Component {
    constructor() {
        super();

        this.api = "https://padillaco-datasets.s3.amazonaws.com/nobel.json";
        this.categories = [
            "chemistry",
            "economics",
            "literature",
            "medicine",
            "peace",
            "physics"
        ];
        this.state = {
            prizes: false,
            prizesFiltered: false,
            filters: false,
            sort: "desc"
        };

        this.sortPrizesByYear = this.sortPrizesByYear.bind(this);
        this.filterPrizesByCategory = this.filterPrizesByCategory.bind(this);
        this.showAllPrizes = this.showAllPrizes.bind(this);
    }

    componentDidMount() {
        fetch(this.api)
            .then(res => res.json())
            .then(d => {
                this.setState({ prizes: d.prizes });
            })
            .catch(err => {
                console.log(err);
            });
    }

    sortPrizesByYear(e) {
        let sort = e.target.value;
        let type = this.state.prizesFiltered ? "prizesFiltered" : "prizes";
        let data = this.state[type];

        this.setState(prevState => {
            let state = {};
            state["sort"] = sort;
            state[type] = _.orderBy(data, ["year"], [sort]);
            return state;
        });
    }

    filterPrizesByCategory(e) {
        this.setState({ prizesFiltered: false });

        let filtered = _.filter(this.state.prizes, o => {
            if (o.category === e.target.value) {
                return o;
            }
        });

        let sorted = _.orderBy(filtered, ["year"], [this.state.sort]);

        this.setState({ prizesFiltered: sorted });
    }

    showAllPrizes() {
        let sorted = _.orderBy(this.state.prizes, ["year"], [this.state.sort]);

        this.setState({ prizesFiltered: false, prizes: sorted });
    }
    render() {
        let data = this.state.prizesFiltered
            ? this.state.prizesFiltered
            : this.state.prizes;

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
                    {data.length > 0 &&
                        data.map((v, i) => {
                            return (
                                <NobelPrize
                                    key={i}
                                    category={v.category}
                                    year={v.year}
                                    laureates={v.laureates}
                                />
                            );
                        })}
                </ul>
            </div>
        );
    }
}

export default App;
