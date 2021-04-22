import React from "react";
import {Box, Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";

const Post = ({post}) => {

    const useStyles = makeStyles(theme => {
        return {
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            card: {
                transition: `all 300ms ease-out`,
                height: 500,
                '&:hover': {
                    transform: 'scale(1.1)',
                    background: theme.palette.primary.main
                },
                [theme.breakpoints.down('md')]: {
                    height: 550,
                }
            },
            image: {
                height: 250,
                objectPosition: "top",
                objectFit: "cover"
            },
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
            description: {},
            content: {
                display: "flex",
                flexDirection: "column",
                height: '100%'
            },
            descriptionContainer: {
                flexGrow: 1,
                justifySelf: "flex-end"
            }
        }
    });

    const classes = useStyles();

    const getWordsCount = (words, count) => {
        return words.split(' ').slice(0, count).join(' ');
    }

    return (
        <Card className={classes.card} variant="elevation" elevation={0}>
            <CardMedia
                className={classes.image}
                component="img"
                src={post.image}
            />
            <CardContent className={classes.content}>
                <Box>
                    <Typography
                        align="left"
                        gutterBottom={true}
                        display="inline"
                        variant="overline"
                        className={classes.source}>
                        {post.source.name}
                    </Typography>
                    <Typography
                        align="left"
                        display="inline"
                        gutterBottom={true}
                        variant="body2">
                        {new Date(post.publishedAt).toDateString()}
                    </Typography>
                    <Divider light={true} variant="fullWidth" className={classes.divider}/>
                </Box>
                <Box>
                    <Typography align="left" className={classes.title} variant="h6">
                        {getWordsCount(post.title, 5)}
                    </Typography>
                    <Divider light={true} variant="fullWidth" className={classes.divider}/>
                </Box>
                <Box className={classes.descriptionContainer}>
                    <Typography align="left" className={classes.description} variant="body1">
                        {getWordsCount(post.description, 20)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Post;