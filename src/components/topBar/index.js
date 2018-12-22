import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SearchField from './search';
import { fetchTournamentsBySearch } from '../../reducers/tournaments';

import './styles.scss';

const mapStateToProps = state => ({
    tournaments: state.tournaments,
});

const mapDispatchToProps = {
    fetchTournamentsBySearch
};
class TopBar extends PureComponent{

    state = {
        data: []
    };

    onChange = (value) => {
        if (value.length > 1) {
            this.props.fetchTournamentsBySearch(value).then(res => res.length
                ? res[0].documents
                : res
            ).then(data => this.setState({
                data,
            }));
        } else {
            this.setState({
                data: []
            })
        }
    };

    render() {
        return (
            <div className="top-bar">
                <SearchField
                    onChange={this.onChange}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
