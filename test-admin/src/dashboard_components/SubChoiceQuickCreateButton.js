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
// import { parse } from "query-string";

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

class SubChoiceQuickCreateButton extends Component {
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
        submit('subchoice-quick-create');
    };


    
    handleSubmit = values => {
        const { change, fetchStart, fetchEnd, showNotification } = this.props;
        console.log('test')

        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider(CREATE, 'questions_subchoice', { data: values })
            .then(({ data }) => {
                // Refresh the choices of the ReferenceInput to ensure our newly created post
                // always appear, even after selecting another post
                crudGetMatching(
                    'questions_subchoice',
                    //'questions_question@question_id',
                    { page: 1, perPage: 25 },
                    { field: 'id', order: 'DESC' },
                    {}
                );

                // Update the main react-admin form (in this case, the comments creation form)
                change(REDUX_FORM_NAME, 'id', data.id);
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
        var start = String(path).indexOf('questions_subquestion/') + 'questions_subquestion/'.length
        console.log(start)
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
                    aria-label="Create Sub Choice"
                >
                    <DialogTitle>Create Sub Choice</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="subchoice-quick-create"
                            resource="questions_subchoice"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                        >

                            {/* <TextInput source="id" /> */}
                            <NumberInput source="sub_question_id" defaultValue={get_id} disabled/>

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

                            <SelectInput source="score_text" label="score" choices={[
                                    { id: '0', name:'0'},
                                    { id: '0.1', name:'0.1'},
                                    { id: '0.2', name:'0.2'},
                                    { id: '0.3', name:'0.3'},
                                    { id: '0.4', name:'0.4'},
                                    { id: '0.5', name:'0.5'},
                                    { id: '0.6', name:'0.6'},
                                    { id: '0.7', name:'0.7'},
                                    { id: '0.8', name:'0.8'},
                                    { id: '0.9', name:'0.9'},
                                    { id: '1', name:'1'}
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
    isSubmitting: isSubmitting('subchoice-quick-create')(state)
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
    SubChoiceQuickCreateButton
);
