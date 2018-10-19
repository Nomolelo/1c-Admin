import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';

import { translate } from 'react-admin';

const styles = {
    media: {
        height: '18em',
    },
};



// const mediaUrl = 'https://images.unsplash.com/photo-1534683299359-d2d10dda2d3d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=1b9005722612f839d8edc32af15db814'
const mediaUrl = 'https://source.unsplash.com/collection/2'

//     `https://marmelab.com/posters/beard-${parseInt(
//     Math.random() * 10,
//     10
// ) + 1}.jpeg`;

const Welcome = ({ classes, translate }) => (
    <Card>
        <CardMedia image={mediaUrl} className={classes.media} />
        <CardContent>
            <Typography variant="headline" component="h2">
                Welcome to First Compliance Admin
            </Typography>
            <Typography component="p">
                This is the admin portal of First Compliance. Create Audit points, add and link question layers, add and assign to your users to answer and action.
            </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button href="https://marmelab.com/react-admin">
                <HomeIcon style={{ paddingRight: '0.5em' }} />
                End-User Portal
            </Button>
            <Button href="https://github.com/marmelab/react-admin/tree/master/examples/demo">
                <CodeIcon style={{ paddingRight: '0.5em' }} />
                Help & Documentation
            </Button>
        </CardActions>
    </Card>
);

export default withStyles(styles)(translate(Welcome));