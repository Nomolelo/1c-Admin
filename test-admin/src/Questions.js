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

import {ShowButton, EditButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput, BooleanInput,
         ArrayInput, SimpleFormIterator, LongTextInput, DateInput,
         Link, ListButton, RefreshButton, PostShowActions, RichTextfield, LongTextField,
         ReferenceField
        } from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';


import CardActions from '@material-ui/core/CardActions';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Button } from 'react-admin';

import ChoiceReferenceInput from './dashboard_components/ChoiceReferenceInput'

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
        <ListButton basePath={basePath} />
        <RefreshButton />
        <AddNewSubQuestionButtonCreate record={data} />
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
                <LongTextInput source="question_text" />
                <DateInput source="created_at" />
                <TextInput source="owner_email" />
                <SelectInput source="choice_type" />
                <LongTextInput source="information" />
                <RichTextInput source="footnote" />
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
                        <TextField source="choice_text" />
                        <NumberField source="score" />
                        <TextField source="compliance_status" />
                        <BooleanField source="action" />
                        <BooleanField source="comment" />  

                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
                <ChoiceReferenceInput 
                source="question_id"
                reference="questions_choice"
                allowEmpty
                />

                {/* <AddNewCommentButton /> */}
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
                        <NumberField source="outcome" />
                {/* <ReferenceManyField
                        reference='questions_choice'
                        target="compliance_status"
                        source="outcome"
                    >   
                        <SingleFieldList>
                            <ChipField source="choice_text" />
                        </SingleFieldList>
                </ReferenceManyField> */}

                        <TextField source="question_text" />
                        <TextField source="owner_email" />
                        <NumberField source="choice_type" />
                        <TextField source="information" />
                        <TextField source="footnote" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
                {/* <AddNewCommentButton /> */}
            </FormTab>


            {/* <FormTab label="SubQuestions">
                <ReferenceManyField reference="questions_subquestion" target="question_id" addLabel={false}>
                    <ArrayInput >
                    <SimpleFormIterator>

                        <LongTextInput source="question_text" />
                        <TextInput source="owner_email" />
                        <SelectInput source="choice_type" />
                        <NumberInput source="weight" />

                    </SimpleFormIterator>
                    
                    </ArrayInput >
                </ReferenceManyField>

            </FormTab> */}


        </TabbedForm>


    </Edit>
);




var today = new Date();
export const QuestionCreate = (props) => (
    <Create  {...props}
    actions={<QuestionShowActionsCreate />}
    >
        <TabbedForm defaultValue={{ created_at: Date() }}>
            <FormTab label="Question" >
                <NumberInput source="id" />
                <LongTextInput source="question_text" />
                <DateInput source="created_at" />
                <TextInput source="owner_email" />
                <SelectInput source="choice_type" />
                <LongTextInput source="information" />
                <RichTextInput source="footnote" />
            </FormTab>

            <FormTab label="Choices">
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
            </FormTab>


            {/* <FormTab label="SubQuestions">
                <ReferenceManyField reference="questions_subquestion" target="question_id" addLabel={false}>
                    <ArrayInput >
                    <SimpleFormIterator>

                        <LongTextInput source="question_text" />
                        <TextInput source="owner_email" />
                        <SelectInput source="choice_type" />
                        <NumberInput source="weight" />

                    </SimpleFormIterator>
                    
                    </ArrayInput >
                </ReferenceManyField>

            </FormTab> */}


        </TabbedForm>
    </Create>
);



