// in PostQuickCreateButton.js
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';

import {
    fetchEnd,
    fetchStart,
    required,
    showNotification,
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    LongTextInput,
    CREATE,
    REDUX_FORM_NAME,
    crudGetMatching,

    NumberInput,
    BooleanInput,
    SelectInput,
    ReferenceInput
} from 'react-admin';

import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import dataProvider from '../dataProvider';
import { parse } from "query-string";

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

const create_redirect = (basePath, id, data) => `/questions_question`;

class ChoiceQuickCreateButton extends Component {
    state = {
        error: false,
        showDialog: false
    };

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleSaveClick = () => {
        const { submit } = this.props;
        console.log('test')
        this.setState({ showDialog: false });

        // Trigger a submit of our custom quick create form
        // This is needed because our modal action buttons are oustide the form
        submit('choice-quick-create');
    };


    
    handleSubmit = values => {
        const { change, fetchStart, fetchEnd, showNotification ,crudGetMatching, REDUX_FORM_NAME} = this.props;
        console.log('test')

        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider(CREATE, 'questions_choice', { data: values })
            .then(({ data }) => {
                // Refresh the choices of the ReferenceInput to ensure our newly created post
                // always appear, even after selecting another post
                crudGetMatching(
                    'questions_question',
                    'questions_choice@id',
                    { page: 1, perPage: 25 },
                    { field: 'id', order: 'DESC' },
                    {}
                );

                // Update the main react-admin form (in this case, the comments creation form)
                change(REDUX_FORM_NAME, 'question_id', data.id);
                this.setState({ showDialog: false });
            })
            .catch(error => {
                // showNotification(error.message, 'error');
                showNotification('Created Successfully. Refresh to view.', 'error');
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                fetchEnd();
            });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting } = this.props;

        var path = getLocation(window.location.href)
        console.log(String(path))
        var start = String(path).indexOf('questions_question/') + 'questions_question/'.length
        var end = String(path).indexOf('/', start)
        console.log(end)
        var get_id = String(path).substring(start, end)
        console.log(get_id)

        return (
            <Fragment>
                <Button onClick={this.handleClick} label="ra.action.create">
                    <IconContentAdd />
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="Create Choice"
                >
                    <DialogTitle>Create Choice</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="choice-quick-create"
                            resource="questions_choice"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                            redirect='http://localhost:3001/#/questions_question/4'
                        >

                            {/* <TextInput source="id" /> */}
                            {/* <NumberInput source='id' /> */}
                            <NumberInput source="question_id" defaultValue={get_id} disabled/>

                            <TextInput source="choice_text" validate={required()} />
                            {/* <NumberInput source="score" /> */}
                            <SelectInput source="compliance_status" label='Complance Status' choices={[
                            { id: '1', name: 'Compliant' },
                            { id: '2', name: 'Partially Compliant 75%' },
                            { id: '3', name: 'Partially Compliant 50%' },
                            { id: '4', name: 'Partially Compliant 25%' },
                            { id: '5', name: 'Non-Compliant' },
                            { id: '6', name: 'Not-Applicable' },
                                                        ]} />

                            <BooleanInput source="action" defaultValue={false} />
                            <BooleanInput source="comment" defaultValue={false} />  

                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <SaveButton
                            saving={isSubmitting}
                            onClick={this.handleSaveClick}
                        />
                        <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <IconCancel />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isSubmitting: isSubmitting('choice-quick-create')(state)
});

const mapDispatchToProps = {
    change,
    fetchEnd,
    fetchStart,
    showNotification,
    submit,
    crudGetMatching
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ChoiceQuickCreateButton
);
