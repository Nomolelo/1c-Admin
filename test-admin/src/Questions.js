// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import postgrestClient from 'aor-postgrest-client';
import { List, Datagrid, TextField, NumberField, EmailField ,
        ReferenceManyField, SingleFieldList, ChipField,
        TabbedShowLayout, Tab, Filter, ReferenceInput, SelectInput,
        ReferenceArrayInput, SelectArrayInput,
        TabbedForm, FormTab, BooleanField
             } from 'react-admin';

import {ShowButton, EditButton, DeleteButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput, BooleanInput,
         ArrayInput, SimpleFormIterator, LongTextInput, DateInput,
         Link, ListButton, RefreshButton, PostShowActions, RichTextfield, LongTextField,
         ReferenceField, SelectField, FileInput, ImageField, FileField
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



const QuestionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="question_text" alwaysOn />
        <ReferenceInput label="Owner" source="id" reference="questions_question" allowEmpty>
            <SelectInput optionText="owner_email" />
        </ReferenceInput>
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
            <EmailField source="owner_email" />
            <ShowButton />
            <EditButton />
            <DeleteButton />

        </Datagrid>
    </List>
);

export const QuestionShow = (props) => (
    <Show {...props}
    title = 'Show Questions'
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



export const QuestionEdit = (props) => (
    <Edit {...props}
    actions={<QuestionShowActionsCreate />}
    title = 'Edit Questions'
    >
        <TabbedForm defaultValue={{ created_at: Date() }}>
            <FormTab label="Question" >
                <DisabledInput source="id" />
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
                >
                    <Datagrid>
                        <ChipField source="choice_text" />
                        {/* <NumberField source="score" /> */}
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
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>

                <ChoiceQuickCreateButton 
                // source="question_id"
                // reference="questions_choice"
                // allowEmpty
                />

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



const create_redirect = (basePath, id, data) => `/questions_question`;
var today = new Date();
export const QuestionCreate = (props) => (
    <Create  {...props}
    // actions={<QuestionShowActionsCreate />}
    >
        {/* <TabbedForm 
        //defaultValue={{ created_at: Date() }}
        > */}
            <SimpleForm label="Question" redirect={create_redirect}>

                <NumberInput source="id" />
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

                <FileInput source="files" label="" placeholder={<p>Upload file</p>}>
                <FileField source="src" title="title" />
                </FileInput>

                <BooleanInput source="thumbnail" />
            
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



