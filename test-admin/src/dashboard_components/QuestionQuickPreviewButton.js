// in PostQuickPreviewButton.js
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, SimpleShowLayout, TextField } from 'react-admin';

const styles = theme => ({
    field: {
        // These styles will ensure our drawer don't fully cover our
        // application when teaser or title are very long
        '& span': {
            display: 'inline-block',
            maxWidth: '20em'
        }
    }
});

const QuestionPreviewView = ({ classes, ...props }) => (
    <SimpleShowLayout {...props}>
        <TextField source="id" />
        <TextField source="question_text" className={classes.field} />
        <TextField source="owner" className={classes.field} />
    </SimpleShowLayout>
);

const mapStateToProps = (state, props) => ({
    // Get the record by its id from the react-admin state.
    record: state.admin.resources[props.resource]
        ? state.admin.resources[props.resource].data[props.id]
        : null,
    version: state.admin.ui.viewVersion
});

const QuestionPreview = connect(mapStateToProps, {})(
    withStyles(styles)(QuestionPreviewView)
);

class QuestionQuickPreviewButton extends Component {
    state = { showPanel: false };

    handleClick = () => {
        this.setState({ showPanel: true });
    };

    handleCloseClick = () => {
        this.setState({ showPanel: false });
    };

    render() {
        const { showPanel } = this.state;
        const { id } = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleClick} label="ra.action.show">
                    <IconImageEye />
                </Button>
                <Drawer
                    anchor="right"
                    open={showPanel}
                    onClose={this.handleCloseClick}
                >
                    <div>
                        <Button label="Close" onClick={this.handleCloseClick}>
                            <IconKeyboardArrowRight />
                        </Button>
                    </div>
                    <QuestionPreview id={id} basePath="/posts" resource="posts" />
                </Drawer>
            </Fragment>
        );
    }
}

export default connect()(QuestionQuickPreviewButton);
