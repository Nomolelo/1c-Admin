// in src/Dashboard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import NbNewOrders from './dashboard_components/NbNewOrders';
import Welcome from './dashboard_components/Welcome';
import NbNewAudits from './dashboard_components/NbNewAudits';
import NewUsers from './dashboard_components/NewUsers';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};


var api_host = 'http://18.202.21.32:3000'


class Dashboard extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            users:[],
            audits:[],
            questions:[]
          }
        }


    componentWillMount() {
    (async() => {
            try {
        var response = await fetch(api_host+'/questions_user');
        var data = await response.json();
        this.setState({users: data})

        var response = await fetch(api_host+'/questions_audit');
        var data = await response.json();
        this.setState({audits: data})

        var response = await fetch(api_host+'/questions_question');
        var data = await response.json();
        this.setState({questions: data})

    }

        catch (e) {
            console.log("Booo")
        }
        })()
    }

// export default () => (
    render() {
        const {
          props,
        } = this;

        console.log(this.state.users)


return (

   <div style={styles.flex}>

    <div style={styles.leftCol}>
    <div style={styles.flex}>
        <NbNewAudits value={this.state.audits.length} />
        <NbNewOrders value={this.state.questions.length} />
    </div>
    <div style={styles.singleCol}>
        <Welcome />
    </div>
    </div>

    <div style={styles.rightCol}>
        <div style={styles.flex}>
            {/* <PendingReviews
                nb={nbPendingReviews}
                reviews={pendingReviews}
                customers={pendingReviewsCustomers}
            /> */}
            <NewUsers
                nb={this.state.users.length}
                visitors={this.state.users}
            />
        </div>
    </div>

    </div>

// <Card>
    //     <CardHeader title="Welcome to the administration" />
    //     <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    // </Card>
);
}}

export default Dashboard;