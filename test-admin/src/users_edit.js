// in src/users.js
import React from 'react';
import { BooleanField, DateField, List, Datagrid, EmailField, TextField, ImageField,
    Edit, SimpleForm, TextInput, DateInput, BooleanInput, NumberInput, SelectArrayInput
        } from 'react-admin';
import Avatar from '@material-ui/core/Avatar';

// { picture: { url: 'cover.jpg', title: 'Larry Cover (French pun intended)' } }
var api_host = 'http://18.202.21.32:3000'


const Username = ({ record }) => {
    return <span>{record ? `${record.first_name} ${record.last_name}` : ''}</span>;
};

const create_redirect = (basePath, id, data) => `/questions_user`;
var today = new Date();
// export const QuestionCreate = (props) => (

class UserEdit extends React.Component {
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
<Edit {...props}
    title={<Username/>}
    >
        <SimpleForm redirect={create_redirect}>
            <NumberInput source="id" disabled={true}/>
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
    </Edit>

    )}}

export default UserEdit;