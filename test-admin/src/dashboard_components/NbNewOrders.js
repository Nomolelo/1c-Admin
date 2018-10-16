import React from 'react';
import Card from '@material-ui/core/Card';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';
import Button from '@material-ui/core/Button';

var api_host = 'http://54.72.140.182:3000'

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
    <Button style={{width:'400px'}} href={api_host+'/#/questions_question'} >
    <div className={classes.main}>
        <CardIcon Icon={QuestionAnswerIcon} bgColor="#ff9800" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {/* {translate('pos.dashboard.new_orders')} */}
                New Questions
            </Typography>
            <Typography variant="headline" component="h2">
                {value}
            </Typography>
        </Card>
    </div>
    </Button>
);

export default translate(withStyles(styles)(NbNewOrders));
