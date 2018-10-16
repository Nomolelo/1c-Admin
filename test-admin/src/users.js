// in src/users.js
import React from 'react';
import { BooleanField, DateField, List, Datagrid, EmailField, TextField, ImageField,
    Create, SimpleForm, TextInput, DateInput, BooleanInput, NumberInput, SelectArrayInput
        } from 'react-admin';

// { picture: { url: 'cover.jpg', title: 'Larry Cover (French pun intended)' } }
var api_host = 'http://54.72.140.182:3000'

export const UserList = (props) => (
    <List title="Users" {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            {/* <DateField source="last_login" /> */}
            <TextField source="first_name" />
            <TextField source="last_name" />
            {/* <DateField source="created_at" /> */}
            <DateField source="start_date" />
            <BooleanField source="administrator" />
            <BooleanField source="is_active" />
        </Datagrid>
    </List>
);




const create_redirect = (basePath, id, data) => `/questions_user`;
var today = new Date();
// export const QuestionCreate = (props) => (

class UserCreate extends React.Component {
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
            var response = await fetch(api_host+'/questions_user');
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
<Create {...props}>
        <SimpleForm redirect={create_redirect}>
            <NumberInput source="id" defaultValue={new_id} disabled={true}/>
            <TextInput source="username" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <BooleanInput source="administrator" defaultValue={false}/>
            <BooleanInput source="is_active" defaultValue={true} />
            <DateInput source="start_date" />
            <SelectArrayInput label="Audit" source="audits_array" optionText="audit_name" choices={
                        this.state.audits
                        } />

        </SimpleForm>
    </Create>

    )}}

export default UserCreate;