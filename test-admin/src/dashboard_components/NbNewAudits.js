import React from 'react';
import Card from '@material-ui/core/Card';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const styles = {
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 20,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const NbNewOrders = ({ value, translate, classes }) => (
    <Button style={{width:'300px'}} href='#/questions_audit' >

    <div className={classes.main}>
        <CardIcon Icon={MyLocationIcon} bgColor="#ff9800" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {/* {translate('pos.dashboard.new_orders')} */}
                New Audits
            </Typography>
            <Typography variant="headline" component="h2">
                {value}
            </Typography>

        </Card>

    </div>
    </Button >


);

export default translate(withStyles(styles)(NbNewOrders));
