// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
// import postgrestClient from 'aor-postgrest-client';
import postgrestClient from './postgres_driver';

import { List, Datagrid, TextField, NumberField, EmailField } from 'react-admin';

import { ShowButton, EditButton, Edit, SimpleForm, DisabledInput, TextInput, NumberInput } from 'react-admin';
import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';

import Dashboard from './Dashboards';
import { QuestionList, QuestionShow } from './Questions';
import QuestionCreate from './Questions';
import QuestionEdit from './Questions_Edit';

import { SubQuestionList, SubQuestionEdit, SubQuestionCreate, SubQuestionShow } from './SubQuestions';

import { AuditList, AuditEdit} from './Audits';
import AuditCreate from './Audits';

import { UserList } from './users.js';
import UserCreate from './users.js';
import UserEdit from './users_edit.js'

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import authProvider from './authProvider';
// import {Layout} from 'react-admin';
import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MyLayout from './MyLayout.js';


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


const muiTheme = getMuiTheme({
    palette: {
      textColor: Colors.darkBlack,
      primary1Color: Colors.white,
      primary2Color: Colors.indigo700,
      accent1Color: Colors.redA200,
      pickerHeaderColor: Colors.darkBlack,
    },
    appBar: {
      height: 60,
    },
  });
  
var api_host = 'http://18.202.21.32:3000'
// var api_host = 'http://localhost:3000'

//test-admin andrewmcgeough$ docker run -it --rm -p 5000:5000 --name react-demo react-docker

console.log(make_id())
const Title = () => <span >Booh</span>;



class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    componentDidMount(){
        document.title = "First Compliance Admin"
      }
    
render() {
        const {
          props,
        } = this;

        console.log("Running on port: " + process.env.npm_package_config_porttest)

  
// const App = () => (
return (
<Admin title={<Title/>}
            // appLayout={Layout} 
            authProvider={authProvider} dashboard={Dashboard} 
            dataProvider={postgrestClient(api_host)}
            // appLayout={MyLayout}
            // className={styles.button}
            >

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

        <Resource options={{ label: 'Users' }} name="questions_user" icon={UserIcon} list={UserList} 
                    create={UserCreate} edit={UserEdit}
                    />


    </Admin>
);
}}


export default App;
