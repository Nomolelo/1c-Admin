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
         ArrayInput, SimpleFormIterator, LongTextInput} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';
import { parse } from "query-string";

// import QuestionReferenceInput from './dashboard_components/QuestionReferenceInput'

const SubQuestionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="question_text" alwaysOn />
        <SelectInput optionText="owner_email" />
    </Filter>
);

export const SubQuestionList = (props) => (
    <List title="Questions"  {...props} filters={<SubQuestionFilter />}>
        <Datagrid >
            <NumberField source="id" />
            <TextField source="question_text" />
            <EmailField source="owner_email" />
            <ReferenceManyField reference="questions_question" target="id" source="question_id" addLabel={false}>
                    <SingleFieldList>
                        <ChipField source="id" />
                    </SingleFieldList>
            </ReferenceManyField>

            <ShowButton />
            <EditButton />

        </Datagrid>
    </List> 
);

export const SubQuestionShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="question_text" />
            <TextField source="owner_email" />
            <NumberField source="id" />

            <ReferenceManyField reference="questions_subchoice" target="sub_question_id" addLabel={false}>
                    <SingleFieldList>
                        <ChipField source="choice_text" />
                    </SingleFieldList>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

export const SubQuestionEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="question_text" />
            <NumberInput source="id" />
            {/* <ReferenceArrayInput reference="questions_subchoice" source="id" target="sub_question_id" allowEmpty >
                <SelectArrayInput optionText="choice_text" />
            </ReferenceArrayInput> */}

            {/* <QuestionReferenceInput 
                source="question_id"
                reference="questions_question"
                allowEmpty
                /> */}

        </SimpleForm>
    </Edit>
);
export const SubQuestionCreate = props => {

// Read the post_id from the location which is injected by React Router and passed to our component by react-admin automatically
const { question_id: question_id_string } = parse(props.location.search);

// ra-data-fakerest uses integers as identifiers, we need to parse the querystring
// We also must ensure we can still create a new comment without having a post_id
// from the url by returning an empty string if post_id isn't specified
const question_id = question_id_string ? parseInt(question_id_string, 10) : '';
const redirect = question_id ? `/questions_question/${question_id}/show/questions_subquestion` : 'show';
//const redirect = (basePath, id, data) => `/questions_question/${data.question_id}/show/`;

console.log('lol '+question_id)

    return (
    <Create {...props}>
        <TabbedForm defaultValue={{ question_id }} 
        //redirect={redirect}
        >
            <FormTab label="Question">
                {/* <ReferenceInput
                    source="question_id"
                    reference="questions_question"
                    allowEmpty
                    >
                    <SelectInput optionText="question_text" />
                </ReferenceInput> */}

                {/* <QuestionReferenceInput 
                source="question_id"
                reference="questions_question"
                allowEmpty
                /> */}

                <NumberInput source="id" />
                <LongTextInput source="question_text" />
                <TextInput source="owner_email" />
                <SelectInput source="choice_type" />
                <LongTextInput source="information" />
                <RichTextInput source="footnote" />
            </FormTab>

            <FormTab label="Choices">
                <ReferenceManyField reference="questions_subchoice" target="sub_question_id" addLabel={false}>
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


        </TabbedForm>
    </Create>
)};



