// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
// import postgrestClient from 'aor-postgrest-client';
import { List, Datagrid, TextField, NumberField, EmailField ,
        ReferenceManyField, SingleFieldList, ChipField,
        TabbedShowLayout, Tab, Filter, ReferenceInput, SelectInput,
        ReferenceArrayInput, SelectArrayInput,
        TabbedForm, FormTab, BooleanField
             } from 'react-admin';

import {ShowButton, EditButton, DeleteButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput, BooleanInput,
         ArrayInput, SimpleFormIterator, LongTextInput, DateInput,
         Link, ListButton, RefreshButton, PostShowActions, RichTextfield, LongTextField,
         ReferenceField, SelectField, FileInput, ImageField, FileField, 
         CloneButton, ArrayField
        } from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';


import CardActions from '@material-ui/core/CardActions';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Button } from 'react-admin';

import ChoiceReferenceInput from './dashboard_components/ChoiceReferenceInput'
import ChoiceQuickCreateButton from './dashboard_components/ChoiceQuickCreateButton';
import SubQuestionQuickCreateButton from './dashboard_components/SubQuestionQuickCreateButton';

import { Chip } from 'material-ui';

import QuestionQuickPreviewButton from './dashboard_components/QuestionQuickPreviewButton';
import { Fragment } from 'react';
import { Field } from 'redux-form';


var api_host = 'http://54.72.140.182:3000'



const AddNewSubQuestionButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/questions_subquestion/create',
            search: `?question_id=${record.id}`
        }}
        label="Add Sub-Question"
    >
        <ChatBubbleIcon />
    </Button>
);

const QuestionShowActions = ({basePath, data  }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <RefreshButton />
        <AddNewSubQuestionButton record={data} />
    </CardActions>
);



const AddNewSubQuestionButtonCreate = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/questions_subquestion/create',
            // search: `?question_id=${record.id}`
        }}
        label="Add Sub-Question"
    >
        <ChatBubbleIcon />
    </Button>
);

const QuestionShowActionsCreate = ({basePath, data  }) => (
    <CardActions>
        {/* <ListButton basePath={basePath} /> */}
        <RefreshButton />
        {/* <AddNewSubQuestionButtonCreate record={data} /> */}
    </CardActions>
);



const QuestionTitle = ({ record }) => {
    return <span>{record ? `${record.question_text}` : ''}</span>;
};

const create_redirect = (basePath, id, data) => `/questions_question`;
var today = new Date();
// export const QuestionCreate = (props) => (

class QuestionEdit extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
                audits:[]
          }
        }
    

        componentWillMount() {
            (async() => {
                try {
            var response = await fetch(api_host+'/questions_audit');
            var data = await response.json();
            //var x = await data.map(text => text.id).sort()
            //var max = Math.max(...x)
            console.log(data)
            this.setState({audits: data})
        } 
        catch (e) {
            console.log("Booo")
          }
        })();
    }
      
        render() {
          const {
            props,
          } = this;
      
    return (

    <Edit title={<QuestionTitle/>} {...props}
    // <Edit {...props}
    actions={<QuestionShowActionsCreate />}
    >
        <TabbedForm defaultValue={{ created_at: Date() }}>
            <FormTab label="Question" >
                <DisabledInput source="id" />
                
               <SelectArrayInput label="Audit" source="audits_array2" optionText="audit_name" choices={
                                            // [
                                            // { id: '2', name: 'AML' },
                                            // { id: '3', name: 'AFC' },
                                            // { id: '5', name: 'GDPR' },
                                            // ]
                                        this.state.audits
                                        } />
 
                <SelectInput source="choice_type" label='Question Type' choices={[
                        { id: '1', name: 'Single Choice' },
                        { id: '2', name: 'Multiple Choice' },
                        { id: '3', name: 'Free Text' },
                        { id: '4', name: 'Enter Date' },
                        { id: '5', name: 'File Upload' },
                        { id: '6', name: 'Image Upload' },                        
                                                        ]} />

                <LongTextInput source="question_text" resettable style={{width:'50%'}}/>
                <LongTextInput source="information" style={{width:'50%'}}/>
                <LongTextInput source="footnote" resettable style={{width:'30%'}}/>
                <SelectInput source="weight" choices={[
                                    { id: 0, name:0},
                                    { id: 1, name:1},
                                    { id: 2, name:2},
                                    { id: 3, name:3},
                                    { id: 4, name:4},
                                    { id: 5, name:5},
                                    { id: 6, name:6},
                                    { id: 7, name:7},
                                    { id: 8, name:8},
                                    { id: 9, name:9},
                                    { id: 10, name:10}
                                ]} />

                <FileInput source="files" label="" placeholder={<p>Upload file</p>}>
                <FileField source="src" title="title" />

                </FileInput>

                <BooleanInput source="thumbnail" />

                {/* <DateInput source="created_at" />
                <TextInput source="owner_email" type="email" /> */}

            </FormTab>

            {/* <FormTab label="Choices">
                <ReferenceManyField reference="questions_choice" source="id" target="question_id" addLabel={false}>
                    <ArrayInput >
                    <SimpleFormIterator>
                        <TextInput source="choice_text" />
                        <NumberInput source="score" />
                        <TextInput source="compliance_status" />
                        <BooleanInput source="action" />
                        <BooleanInput source="comment" />  
                    </SimpleFormIterator>
                    </ArrayInput >
                </ReferenceManyField>
            </FormTab> */}

            <FormTab label="Choices">

                

                <ReferenceManyField
                    addLabel={false}
                    reference="questions_choice"
                    target="question_id"
                    sort={{ field: "id", order: "ASC" }}
                    filter={{ choice_text: "Yes" }}
                >
                {/* <List  {...props}> */}
                <Datagrid>
                        
                        <TextField source="choice_text" />


                        <SelectField source="compliance_status" label='Complance Status' choices={[
                            { id: '1', name: 'Compliant' },
                            { id: '2', name: 'Partially Compliant 75%' },
                            { id: '3', name: 'Partially Compliant 50%' },
                            { id: '4', name: 'Partially Compliant 25%' },
                            { id: '5', name: 'Non-Compliant' },
                            { id: '6', name: 'Not-Applicable' },
                                                        ]} />

                        <BooleanField source="action" />
                        <BooleanField source="comment" /> 
                        <NumberField source="score" />

                        <ShowButton />
                        <EditButton />
                        <DeleteButton redirect={create_redirect} />
                        </Datagrid>
                {/* </List> */}

                </ReferenceManyField>
                <ChoiceQuickCreateButton 
                // source="question_id"
                // reference="questions_choice"
                // allowEmpty
                />
            {/* <Field
            name="id"
            component={({ input }) =>
                input.value && <QuestionQuickPreviewButton id={input.value} />
            }
        /> */}





            </FormTab>

            <FormTab label="Sub Questions">
                <ReferenceManyField
                    addLabel={false}
                    reference="questions_subquestion"
                    target="question_id"
                    sort={{ field: "question_id", order: "ASC" }}
                >
                    <Datagrid>

                        <NumberField source="id" />

                        <SelectField source="outcome" label='Outcome' choices={[
                            { id: '1', name: 'Compliant' },
                            { id: '2', name: 'Partially Compliant 75%' },
                            { id: '3', name: 'Partially Compliant 50%' },
                            { id: '4', name: 'Partially Compliant 25%' },
                            { id: '5', name: 'Non-Compliant' },
                            { id: '6', name: 'Not-Applicable' },
                                                        ]} />
                        <TextField source="question_text" />

                        <SelectField source="choice_type" label='Question Type' choices={[
                        { id: '1', name: 'Single Choice' },
                        { id: '2', name: 'Multiple Choice' },
                        { id: '3', name: 'Free Text' },
                        { id: '4', name: 'Enter Date' },
                        { id: '5', name: 'File Upload' },
                        { id: '6', name: 'Image Upload' },                        
                                                        ]} />

                        <TextField source="owner_email" />

                        {/* <TextField source="information" />
                        <TextField source="footnote" /> */}
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>

            <SubQuestionQuickCreateButton 
                source="question_id"
                reference="questions_subquestion"
                allowEmpty
                />
            </FormTab>

        </TabbedForm>


    </Edit>
);
}}


export default QuestionEdit;