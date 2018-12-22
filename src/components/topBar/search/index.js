// @flow

import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import lodashIsEqual from 'lodash/isEqual';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import { onAddTournament } from '../../../actions/tournaments';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import RenderSuggestionItem from './render-suggestion-item';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

const mapDispatchToProps = (dispatch) => ({
    onAddTournament: (tournament) => onAddTournament(dispatch, tournament),
});
class SearchField extends PureComponent{
    static contextTypes = {
        router: PropTypes.object,
    };

    state = {
        single: '',
        popper: '',
        suggestions: [],
        search: '',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!lodashIsEqual(nextProps.data, prevState.suggestions)) {
            return {
                suggestions: nextProps.data.slice(0, 10)
            }
        } else {
            return null;
        }
    }
    renderInputComponent = (inputProps) => {

        return (
            <TextField
                fullWidth
                variant="outlined"
                label="Search field"
                {...inputProps}
            />
        );
    };

    getSuggestions = (value) => {
        const inputValue = value.toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
            ? []
            : this.props.data.slice(0, 10);
    };

    getSuggestionValue = () => '';

    getSectionSuggestions = (section) => {
        return section.children.map(
            (item) => ({
                ...item,
                parentName: section.name,
            }),
        );
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (name = 'single') => (
        event,
        { newValue },
    ) => {
        this.props.onChange(newValue);
        this.setState({
            [ name ]: newValue,
        });
    };

    renderSuggestion = (
        suggestion,
        { query, isHighlighted }
    ) => {
        return (
            <RenderSuggestionItem
                suggestion={suggestion}
                query={query}
                onClick={this.clickHandler}
                isHighlighted={isHighlighted}
            />
        );
    };

    clickHandler = (tournament) => {
        this.props.onAddTournament(tournament);
    };

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
            getSectionSuggestions: this.getSectionSuggestions,
        };

        return (
            <div className="root">
                <Autosuggest
                    focusInputOnSuggestionClick={false}
                    {...autosuggestProps}
                    inputProps={{
                        value: this.state.single,
                        onChange: this.handleChange('single'),
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={(options) => (
                        <Paper
                            {...options.containerProps}
                            square
                        >
                            {options.children}
                        </Paper>
                    )}
                />
                <div className={classes.divider}/>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SearchField));

