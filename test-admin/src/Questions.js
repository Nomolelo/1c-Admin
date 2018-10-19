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
         CloneButton, ArrayField, ReferenceArrayField
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



var api_host = 'http://54.72.140.182:3000'
// var api_host = 'http://localhost:3000'


const QuestionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search Question" source="question_text" alwaysOn />
        <TextInput label="Search Footnote" source="footnote" alwaysOn/>
        <TextInput source="information" allowEmpty/>

        {/* <ReferenceInput label="Owner" source="id" reference="questions_question" allowEmpty>
            <SelectInput optionText="owner_email" />
        </ReferenceInput> */}
    </Filter>
);

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



export const QuestionList = (props) => (
    <List title="Questions"  {...props} filters={<QuestionFilter />}>
        <Datagrid >
            <NumberField source="id" />
            <TextField source="question_text" />

            <ReferenceArrayField label="Audits" reference="questions_audit" source="audits_array2">
                <SingleFieldList>
                    <ChipField source="audit_name" />
                </SingleFieldList>
            </ReferenceArrayField>

            {/* <EmailField source="owner_email" /> */}
            <ShowButton />
            <EditButton />
            <CloneButton />
            {/* <DeleteButton /> */}

        </Datagrid>
    </List>
);

const QuestionTitle = ({ record }) => {
    return <span>{record ? `${record.question_text}` : ''}</span>;
};

export const QuestionShow = (props) => (
    <Show {...props}
    title = {< QuestionTitle/>}
    actions={<QuestionShowActions />}
    >
        <SimpleShowLayout>
        {/* <TabbedShowLayout>
        <Tab label="summary"> */}
            <TextField source="question_text" />
            <TextField source="owner_email" />
            <NumberField source="id" />
        {/* </Tab> */}

        {/* <Tab label="choices" path="questions_choice"> */}
            <ReferenceManyField reference="questions_choice" target="question_id" addLabel={false}>
                    {/* <Datagrid> */}
                    <SingleFieldList>
                        <ChipField source="choice_text" />
                        {/* <DateField source="created_at" /> */}
                        {/* <EditButton /> */}
                    {/* </Datagrid> */}
                    </SingleFieldList>
            </ReferenceManyField>
        {/* </Tab> */}
        </SimpleShowLayout>
        {/* </TabbedShowLayout> */}

    </Show>
);






const create_redirect = (basePath, id, data) => `/questions_question`;
var today = new Date();
// export const QuestionCreate = (props) => (

class QuestionCreate extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
              max_id:'',
              questions:[],
              audits:[]
          }
        }
    

        componentWillMount() {
            (async() => {
                try {
            var response = await fetch(api_host+'/questions_question');
            var data = await response.json();
            var x = await data.map(text => text.id).sort()
            var max = Math.max(...x)
            this.setState({max_id: max})

            var response2 = await fetch(api_host+'/questions_audit');
            var audit_data = await response2.json();
            console.log(audit_data)
            this.setState({audits: audit_data})

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

          console.log(this.state.max_id)
          var new_id = this.state.max_id+1
      
    return (

    <Create  {...props}
    // actions={<QuestionShowActionsCreate />}
    >
        {/* <TabbedForm 
        //defaultValue={{ created_at: Date() }}
        > */}
            <SimpleForm label="Question" redirect={create_redirect} >

                {/* <NumberInput source="id" defaultValue={new_id} /> */}
                <DisabledInput source="id" defaultValue={new_id} />

                <SelectArrayInput label="Audit" source="audits_array2" optionText="audit_name" choices={
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
                {/* <NumberInput source="weight" step={1} defaultValue={1} max={10}/> */}
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

                <BooleanInput source="thumbnail" defaultValue={false} />
            
            </SimpleForm>

            {/* <FormTab label="Choices">
                <ReferenceManyField reference="questions_choice" target="question_id" addLabel={false}>
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


        {/* </TabbedForm> */}
    </Create>
);

}}

export default QuestionCreate;
