import React from 'react';
import slothyxService from "../../services/slothyxService";

class SearchArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: null,
            searchString: ''
        };
        this.searchResultUpdate = this.searchResultUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    searchResultUpdate(searchResult) {
        this.setState({searchResult: searchResult});
        console.log(searchResult);
    }

    handleChange(event) {
        this.setState({searchString: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        slothyxService.searchTracks(this.state.searchString, this.searchResultUpdate);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default SearchArea;