import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
    menuItem: {
        height: 50,
        borderBottom: '1px solid lightGrey',
    },
    menuItemContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    texts: {
        marginLeft: 15
    },
};

class RenderSuggestionItem extends React.PureComponent {

    clickHandler = () => this.props.onClick(this.props.suggestion);

    render() {
        const {
            suggestion,
            classes,
        } = this.props;

        return (
            <MenuItem
                className={classes.menuItem}
                component="div"
                onClick={this.clickHandler}
            >
                <div className={classes.menuItemContent}>
                    <div className={classes.avatar}>
                        <Avatar
                            src={suggestion.image}
                            alt=""
                        />
                    </div>
                    <div className={classes.texts}>
                        <Typography
                            variant="body2"
                            children={suggestion.title}
                        />
                        <Typography
                            variant="caption"
                            className={classes.description}
                            children={suggestion.description}
                        />
                    </div>
                </div>
            </MenuItem>
        );
    }
}

export default withStyles(styles)(RenderSuggestionItem);
