import React, { PureComponent } from 'react';

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close.js'
import "./styles.scss";

class SavedTournamentsListItem extends PureComponent{

    deleteHandler = () => this.props.deleteHandler(this.props.tournament);

    render() {
        const { tournament } = this.props;
        return (
            <Grid
                item
                xs={12}
                md={4}
            >
                <div className="saved-tournament-list-item flex horizontal">
                    <div className="flex horizontal">
                        <div className="tournament-avatar">
                            <Avatar
                                src={tournament.image}
                                alt=""
                            />
                        </div>
                        <div className="tournament-texts">
                            <Typography
                                variant="body2"
                                children={tournament.title}
                                className="tournament-description"
                            />
                            <Typography
                                variant="caption"
                                className="tournament-description"
                                children={tournament.description}
                            />
                        </div>
                    </div>
                    <div>
                        <Close
                            className="closeIcon"
                            onClick={this.deleteHandler}
                        />
                    </div>
                </div>
            </Grid>
        );
    }
}

export default SavedTournamentsListItem;
