// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import postgrestClient from 'aor-postgrest-client';
import { List, Datagrid, TextField, NumberField, EmailField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput } from 'react-admin';
import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';

import Dashboard from './Dashboards';
import { QuestionList, QuestionShow } from './Questions';
import QuestionCreate from './Questions';
import QuestionEdit from './Questions_Edit';

import { SubQuestionList, SubQuestionEdit, SubQuestionCreate, SubQuestionShow } from './SubQuestions';

import { AuditList, AuditCreate } from './Audits';
import AuditEdit from './Audits';

import { UserList } from './users';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import authProvider from './authProvider';

// var Make_ID = function () {
//     // Math.random should be unique because of its seeding algorithm.
//     // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//     // after the decimal.
//     return '_' + Math.random().toString(36).substr(2, 9);
// }

var make_id = function() {
    var id = new Date().getUTCMilliseconds();

    return id
}

console.log(make_id())

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
        
        <Resource name="questions_subquestion" 
        //options={{ label: 'SubQuestions' }} icon={QuestionAnswerIcon}  show={SubQuestionShow} 
        //create={SubQuestionCreate} list={SubQuestionList}
        edit={SubQuestionEdit}   
        />

        <Resource options={{ label: 'Users' }} name="auth_user" icon={UserIcon} list={UserList}  />


    </Admin>
);



export default App;
