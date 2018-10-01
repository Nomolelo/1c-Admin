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

import {TabbedForm, FormTab, ReferenceManyField, ArrayInput, SimpleFormIterator,
    DisabledInput, FileInput, FileField, SelectArrayInput} from 'react-admin'
import RichTextInput from 'ra-input-rich-text';

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

class AuditQuestionLinkButton extends Component {
    state = {
        error: false,
        showDialog: false,
        questions:[]
    };



    componentWillMount() {
        (async() => {
            try {
        var response = await fetch('http://127.0.0.1:3000/questions_question');
        var data = await response.json();
        console.log(data)
        this.setState({questions: data})
    } 
    catch (e) {
        console.log("Booo")
      }
    })();
}


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
        submit('audit-question-link');
    };


    
    handleSubmit = values => {
        const { change, fetchStart, fetchEnd, showNotification } = this.props;
        console.log('test')

        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider(CREATE, 'questions_audit_question', { data: values })
            .then(({ data }) => {
                // Refresh the choices of the ReferenceInput to ensure our newly created post
                // always appear, even after selecting another post
                crudGetMatching(
                    'questions_audit',
                    'questions_audit_question@id',
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
        var start = String(path).indexOf('questions_audit/') + 'questions_audit/'.length
        // var end = String(path).indexOf('/', start)
        // console.log(end)
        var get_id = String(path).substring(start, start+1)
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
                    aria-label="Link Question"
                >
                    <DialogTitle>Link Question</DialogTitle>
                    <DialogContent>

        <TabbedForm 
        form="audit-question-link"
        resource="questions_audit_question"
        // We override the redux-form onSubmit prop to handle the submission ourselves
        onSubmit={this.handleSubmit}
        // We want no toolbar at all as we have our modal actions
        toolbar={null}
        >

            <FormTab label="">

                {/* <NumberInput source="id" /> */}
                {/* <NumberInput source="audit_id" defaultValue={get_id} disabled/> */}
                <SelectInput source="question_id" label='Question' choices={this.state.questions} 
                                    optionText="question_text"/>
            </FormTab>
        </TabbedForm>

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
    isSubmitting: isSubmitting('audit-question-link')(state)
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
    AuditQuestionLinkButton
);
