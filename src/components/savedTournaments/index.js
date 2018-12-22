import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import lodashIsEqual from 'lodash/isEqual';
import SavedTournamentsListItem from './tournamentListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {onDeleteTournament} from "../../actions/tournaments";

import "./styles.scss";

const mapStateToProps = state => ({
    savedTournaments: state.savedTournaments,
});

const mapDispatchToProps = dispatch => ({
    onDeleteTournament: (tournament) => onDeleteTournament(dispatch, tournament),
});
class SavedTournaments extends PureComponent{
    constructor(props) {
        super(props);
        this.state={
            isDialogOpen: false,
        };
        this.tournaments = props.savedTournaments.status === 2
            ? this.generateTournaments(props.savedTournaments.payload)
            : []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.savedTournaments && nextProps.savedTournaments.payload &&
            !lodashIsEqual(this.props.savedTournaments, nextProps.savedTournaments
        )) {
            /**
             * Here we check if nextProps saved tournaments payload is
             * not undefined and it is not equal to previous payload then
             * regenerate tournaments, and set them to localStorage
             */
            this.tournaments = this.generateTournaments(nextProps.savedTournaments.payload);
            window.localStorage.setItem('tournaments', JSON.stringify(nextProps.savedTournaments.payload));
        }
    };

    generateTournaments = tournaments => tournaments.map(tournament => (
        <SavedTournamentsListItem
            key={tournament.id}
            tournament={tournament}
            deleteHandler={this.deleteHandler}
        />
    ));

    deleteHandler = tournament => this.handleDialogToggle(tournament);

    confirmHandler = () => {
        this.props.onDeleteTournament(this.state.selectedTournament);
        this.setState({
            isDialogOpen: false,
        });
    };

    handleDialogToggle = tournament => this.setState(prevState => ({
        isDialogOpen: !prevState.isDialogOpen,
        selectedTournament: tournament
    }));

    render() {
        return (
            <div className="saved-tournaments">
                <Typography
                    variant="headline"
                    className="tCenter"
                >
                    Saved Tournaments
                </Typography>
                <Grid
                    className="saved-tournaments-grid"
                    container
                    spacing={24}
                >
                {
                   this.tournaments
                }
                </Grid>
                <Dialog
                    open={this.state.isDialogOpen}
                    onClose={this.handleDialogToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        children="Do you want to remove selected tournament?"
                    />
                    <DialogActions>
                        <Button
                            onClick={this.handleDialogToggle}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.confirmHandler}
                            color="primary"
                            autoFocus
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedTournaments)
