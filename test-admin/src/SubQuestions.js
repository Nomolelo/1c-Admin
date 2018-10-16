// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
// import postgrestClient from 'aor-postgrest-client';
import { List, Datagrid, TextField, NumberField, EmailField ,
        ReferenceManyField, SingleFieldList, ChipField,
        TabbedShowLayout, Tab, Filter, ReferenceInput, SelectInput,
        ReferenceArrayInput, SelectArrayInput,
        TabbedForm, FormTab, BooleanField, SelectField
             } from 'react-admin';

import {ShowButton, EditButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput, BooleanInput,
         ArrayInput, SimpleFormIterator, LongTextInput, DeleteButton, FileField, FileInput} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';
import { parse } from "query-string";

import SubChoiceQuickCreateButton from './dashboard_components/SubChoiceQuickCreateButton';
import SubQuestionQuickCreateButton from './dashboard_components/SubQuestionQuickCreateButton';

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

const edit_redirect = (basePath, id, data) => `/questions_question/${data.question_id}/2`;

export const SubQuestionEdit = (props) => (
    <Edit {...props}  >
        <TabbedForm  redirect={edit_redirect}>
            <FormTab label="Sub Questions"  >
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


            </FormTab>


            <FormTab label="Choices">
                <ReferenceManyField
                    addLabel={false}
                    reference="questions_subchoice"
                    target="sub_question_id"
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

                <SubChoiceQuickCreateButton 
                // source="id"
                // reference="questions_subchoice"
                // target="sub_question_id"
                // allowEmpty
                />

            </FormTab>

        </TabbedForm>
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
            {/* </FormTab> */}

            {/* <FormTab label="Choices"> */}
                <ReferenceManyField reference="questions_subchoice" target="sub_question_id" addLabel={false}>
                    <ArrayInput >
                    <SimpleFormIterator>

                        <TextInput source="choice_text" />
                        <SelectInput source="compliance_status" label='Complance Status' choices={[
                            { id: '1', name: 'Compliant' },
                            { id: '2', name: 'Partially Compliant 75%' },
                            { id: '3', name: 'Partially Compliant 50%' },
                            { id: '4', name: 'Partially Compliant 25%' },
                            { id: '5', name: 'Non-Compliant' },
                            { id: '6', name: 'Not-Applicable' },
                                                        ]} />


                        <BooleanInput source="action" />
                        <BooleanInput source="comment" />  

                    </SimpleFormIterator>
                    </ArrayInput >

                </ReferenceManyField>
            </FormTab>


        </TabbedForm>
    </Create>
)};



