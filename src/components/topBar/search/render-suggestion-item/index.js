import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
    static contextTypes = {
        router: PropTypes.object,
    };

    render() {
        const {
            suggestion,
            query,
            isHighlighted,
            classes,
        } = this.props;

        return (
            <MenuItem
                selected={isHighlighted}
                className={classes.menuItem}
                component="div"
                onClick={() => this.props.onClick(suggestion)}
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
