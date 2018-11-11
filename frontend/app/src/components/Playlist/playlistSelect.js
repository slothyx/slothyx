import React from 'react';
import slothyxService from "../../services/slothyxService";

//TODO paging
class PlaylistSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: null
        };
        this.setPlaylists = this.setPlaylists.bind(this);
        this.handleChange = this.handleChange.bind(this);
        slothyxService.getUsersPlaylists(this.setPlaylists)
    }

    setPlaylists(playlists) {
        this.setState({
            playlists: playlists
        });
        if (!!playlists && playlists.items.length > 0) {
            this.props.handleChange(playlists.items[0].id);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.handleChange(event.target.value);
    }

    render() {
        if (this.state["playlists"]) {
            let items = this.state["playlists"]["items"].map((item) => {
                return (<option key={item.id} value={item.id}>{item.name}</option>);
            });
            return (<select value={this.state.value} onChange={this.handleChange}>
                {items}
            </select>);
        } else {
            return (<span>Loading... </span>);
        }
    }
}


export default PlaylistSelect;
