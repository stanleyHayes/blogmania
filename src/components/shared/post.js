import React from "react";
import {Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";

const Post = ({post}) => {

    const useStyles = makeStyles(theme => {
        return {
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            card: {
                transition: `all 300ms ease-out`,
                height: 600,
                '&:hover': {
                    transform: 'scale(1.1)',
                    background: theme.palette.primary.main
                }
            },
            image: {},
            source: {
                background: theme.palette.secondary.main,
                fontWeight: "bold",
                padding: 8,
                marginRight: 18
            },
            link: {
                textDecoration: "none",
                color: "white"
            },
            title: {},
            description: {}
        }
    });

    const classes = useStyles();

    return (
        <Card className={classes.card} variant="elevation" elevation={0}>
            <CardMedia
                className={classes.image}
                component="img"
                src={post.image}
            />
            <CardContent>
                <Typography
                    noWrap={true}
                    gutterBottom={true}
                    display="inline"
                    variant="overline"
                    className={classes.source}>
                    {post.source.name}
                </Typography>
                <Typography
                    display="inline"
                    gutterBottom={true}
                    variant="body2">
                    {new Date(post.publishedAt).toDateString()}
                </Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                <Typography className={classes.title} variant="h6">{post.title}</Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                <Typography className={classes.description} variant="body2">{post.description}</Typography>
                <Divider light={true} variant="fullWidth" className={classes.divider}/>
                <Typography inputMode="url" variant="button">
                    <a className={classes.link} href={post.url}>View Post</a>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Post;