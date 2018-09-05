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


const mediaUrl = 'https://images.unsplash.com/photo-1534683299359-d2d10dda2d3d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=1b9005722612f839d8edc32af15db814'
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
                This is the admin of First Compliance. Create Audit points, add and link question layers, add and assign to users to answer and action.
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