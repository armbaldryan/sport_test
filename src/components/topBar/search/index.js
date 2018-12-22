import React, { PureComponent } from 'react';
import lodashIsEqual from 'lodash/isEqual';

import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import { onAddTournament } from '../../../actions/tournaments';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import RenderSuggestionItem from './render-suggestion-item';
import { connect } from 'react-redux';

const styles = theme => ({
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

const mapDispatchToProps = dispatch => ({
    onAddTournament: (tournament) => onAddTournament(dispatch, tournament),
});
class SearchField extends PureComponent{

    state = {
        single: '',
        popper: '',
        suggestions: [],
        search: '',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        /**
         * We check if nextProps.data came, and it has changes than get 10 relevant results
         */
        if (!lodashIsEqual(nextProps.data, prevState.suggestions)) {
            return {
                suggestions: nextProps.data.slice(0, 10)
            }
        } else {
            return null;
        }
    }

    renderInputComponent = inputProps => (
        <TextField
            fullWidth
            variant="outlined"
            label="Search field"
            {...inputProps}
        />
    );

    getSuggestions = value => {
        const inputValue = value.toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
            ? []
            : this.props.data.slice(0, 10);
    };

    getSuggestionValue = () => '';

    getSectionSuggestions = section => {
        return section.children.map(
            (item) => ({
                ...item,
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
        /**
         * We neet to send value to parent component, to fetch new data depended on this value
         */
        this.props.onChange(newValue);
        this.setState({
            [ name ]: newValue,
        });
    };

    renderSuggestion = (
        suggestion,
        { query, isHighlighted }
    ) => (
        <RenderSuggestionItem
            suggestion={suggestion}
            query={query}
            onClick={this.clickHandler}
            isHighlighted={isHighlighted}
        />
    );

    clickHandler = tournament => {
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
            <div>
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
                    renderSuggestionsContainer={options => (
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
