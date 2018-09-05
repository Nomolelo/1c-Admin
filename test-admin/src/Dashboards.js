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


const users = [
    {id: 46, first_name: "Andrew", last_name: "McGeough", avatar:"https://robohash.org/07abceb5780ffcdd2e6e03daec43055d.png"},
    
    {id: 295, first_name: "Paul", last_name: "Griffin", avatar:"https://robohash.org/5138424bc2fc3422be7077589bba59f9.png"},
    
    {id: 497, first_name: "Victoria", last_name: "Nestor", avatar:"https://robohash.org/76316d6f3488c67fe74f915aee4bf326.png"},
    
    {id: 413, first_name: "Lee", last_name: "Dickinson", avatar:"https://robohash.org/bd9f0a5b34232b8a126282ed425c3fb8.png"},
    
    {id: 374, first_name: "Bradley", last_name: "Peters", avatar:"https://robohash.org/7b04144073398ce6ae48151ae4c3aa16.png"}
    ]

export default () => (
    <div style={styles.flex}>

    <div style={styles.leftCol}>
    <div style={styles.flex}>
        <NbNewAudits value='2' />
        <NbNewOrders value='12' />
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
                nb='1'
                visitors={users}
            />
        </div>
    </div>

    </div>

// <Card>
    //     <CardHeader title="Welcome to the administration" />
    //     <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    // </Card>
);
