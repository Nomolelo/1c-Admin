// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import postgrestClient from 'aor-postgrest-client';
import { List, Datagrid, TextField, NumberField, EmailField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput } from 'react-admin';
import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';

import Dashboard from './Dashboards';
import { QuestionList, QuestionEdit, QuestionCreate, QuestionShow } from './Questions';
import { SubQuestionList, SubQuestionEdit, SubQuestionCreate, SubQuestionShow } from './SubQuestions';

import { AuditList, AuditEdit, AuditCreate } from './Audits';
import { UserList } from './users';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import authProvider from './authProvider';


const App = () => (
    <Admin title="First Compliance" authProvider={authProvider} dashboard={Dashboard} dataProvider={postgrestClient('http://localhost:3000')}>
       
        <Resource  name="questions_choice"  />
        <Resource  name="questions_audit_question"  />
        <Resource  name="questions_subchoice"  />

        <Resource options={{ label: 'Audits' }} name="questions_audit" icon={MyLocationIcon} 
        // show={AuditShow} 
        create={AuditCreate} list={AuditList} edit={AuditEdit} />

        <Resource options={{ label: 'Questions' }} icon={QuestionAnswerIcon} name="questions_question" show={QuestionShow} 
        create={QuestionCreate} edit={QuestionEdit} list={QuestionList}  />
        
        <Resource options={{ label: 'SubQuestions' }} icon={QuestionAnswerIcon} name="questions_subquestion" show={SubQuestionShow} 
        create={SubQuestionCreate} edit={SubQuestionEdit} list={SubQuestionList}  />

        <Resource options={{ label: 'Users' }} name="auth_user" icon={UserIcon} list={UserList}  />


    </Admin>
);



export default App;
