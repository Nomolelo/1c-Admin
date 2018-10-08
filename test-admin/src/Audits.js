
import React from 'react';
import { Admin, Resource } from 'react-admin';
import postgrestClient from 'aor-postgrest-client';
import {ChipField, ReferenceManyField, ReferenceField, CommentGrid,Avatar, DateField, List, Datagrid, 
        TextField, NumberField, EmailField } from 'react-admin';

import {SingleFieldList, ShowButton, EditButton, Edit, SimpleForm, DisabledInput, DateInput, 
        TextInput, NumberInput, SelectArrayInput, SelectInput, ReferenceInput, ReferenceArrayInput,
        DeleteButton, SelectField     } from 'react-admin';
import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';
import PersonIcon from '@material-ui/icons/Person';


// in src/comments.js
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import AuditQuestionLinkButton from './dashboard_components/AuditQuestionLinkButton';


var api_host = 'http://54.72.140.182:3000'
// var api_host = 'http://localhost:3000'


var images = [
    'https://images.unsplash.com/photo-1534259362708-6d0c72ccdf3e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=230ae279dbd51cf79fc5664d7033df81',
    'https://images.unsplash.com/photo-1534535091711-71b06c129856?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=87281f428e5bb02cb58585c9d66d7205',
    'https://images.unsplash.com/photo-1534683299359-d2d10dda2d3d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=1b9005722612f839d8edc32af15db814',
    'https://images.unsplash.com/photo-1534422114493-c99b74dceb37?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=30d9fedc797101b9230e3c02d972f4d6',
    'https://images.unsplash.com/photo-1534436828370-d7b0bd2a2360?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cb77019188640d612fb2777c3139f3d2',
    'https://images.unsplash.com/photo-1534841070059-fac69c75d466?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=4adbf3bc7727b2b2237e8e256102164f',
    'https://images.unsplash.com/photo-1534258698732-f4f27981a92b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=f26814d262f9b485ac72fbf7beda3a95',
    'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=6663d7c77f9c17c5382310c7bceff5fa'
]

var desc = ['EU Data Protection Regulation',
        'Anti-Financial Crime',
        'Anti-Money Laudering measures'
        ]

const cardStyle = {
    width: 300,
    height: 400,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

var audit_counter = 0

const AuditGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
    {ids.map((id, index) =>
        <Card key={id} style={cardStyle}>

            <CardHeader
                title={<TextField record={data[id]} source="audit_name" />}
                subheader={<DateField record={data[id]} source="start_date" />}
                // avatar={<Avatar icon={<PersonIcon />} />}
            />
            <CardMedia
            style={{height:140, width:'100%'}}
            //image="src/images/para.jpg"
            image={images[index]}
            title="First Compliance"
            />

            <CardContent>
                <TextField record={data[id]} source="audit_name" />
            </CardContent>
            <CardContent>
                <TextField record={data[id]} source="description" />
                {/* {desc[index]}&nbsp; */}
                {/* <ReferenceManyField reference="questions_audit_question" target="audit_id" label="Question" resource="questions_audit" record={data[id]}  basePath={basePath}>
                <SingleFieldList>
                    <ChipField source="question_id" />
                </SingleFieldList>
                </ReferenceManyField> */}
            </CardContent>
            <CardActions style={{ textAlign: 'right' }}>
                <EditButton resource="questions_audit" basePath={basePath} record={data[id]} />
                <DeleteButton resource="questions_audit" basePath={basePath} record={data[id]} />
            </CardActions> 
        </Card>
    )}
    </div>
);


AuditGrid.defaultProps = {
    data: {},
    ids: [],
};

export const AuditList = (props) => (
    <List title="Audits" {...props}>
        <AuditGrid />
    </List>
)



class AuditEdit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            questions:[]
      }
    }


    componentWillMount() {
        (async() => {
            try {
        var response = await fetch(api_host+'/questions_question', {
            headers: {
                'Content-Range': 'questions_question 0-24/319',
                'Access-Control-Expose-Headers': 'Content-Range'
            }});
        var data = await response.json();
        console.log(data)
        this.setState({questions: data})
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
  
return (

    <Edit  {...props}>

{/* // export const AuditEdit = (props) => (
//     <Edit {...props}> */}
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="audit_name" />
            <DateInput source="start_date" />
            <DateInput source="end_date" />
            <TextInput source="description" />
            <TextInput source="owner" />

            <ReferenceManyField label="" reference="questions_audit_question" source="id" target="audit_id"  >
            <Datagrid>
            <SelectField label="Questions" source="question_id" optionText="question_text" 
                                                choices={this.state.questions} />
            
            <ShowButton />
            </Datagrid>
            </ReferenceManyField>
            <AuditQuestionLinkButton/>

        </SimpleForm>
    </Edit>
);
}}
export default AuditEdit;


const create_redirect = (basePath, id, data) => `/questions_audit`;

export const AuditCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={create_redirect}>
            <NumberInput source="id" />
            <TextInput source="audit_name" />
            <DateInput source="start_date" />
            <DateInput source="end_date" />
            <TextInput source="description" />
            <TextInput source="owner" />

            {/* <ReferenceManyField reference="questions_audit_question" target="audit_id" source="id" >
                <SingleFieldList>    
                        <ChipField source="question_id" />
                </SingleFieldList>
            </ReferenceManyField> */}
        </SimpleForm>
    </Create>
);


            {/* <ReferenceArrayInput reference="questions_subchoice" source="id" target="sub_question_id" allowEmpty >
                <SelectArrayInput optionText="choice_text" />
            </ReferenceArrayInput> */}
