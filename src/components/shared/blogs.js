import React from "react";
import {
    Container,
    Grid,
    LinearProgress,
    makeStyles,
    Typography
} from "@material-ui/core";
import Post from "./post";

const Blogs = ({posts, loading}) => {

    const useStyles = makeStyles(theme => {
        return {
            divider: {
                marginTop: 32,
                marginBottom: 32
            },
            container: {},
            noPostContainer: {},
            noPostText: {
                fontWeight: "bold",
                textTransform: "uppercase"
            },
            title: {
                fontWeight: "light",
                fontSize: 84,
                textTransform: "uppercase"
            }
        }
    });

    const classes = useStyles();


    return (
        <Container className={classes.container}>
            {loading ? <LinearProgress variant="query" color="primary"/> : (
                <Grid container={true} spacing={5}>
                    {!posts.length ? (
                        <Grid
                            className={classes.noPostContainer}
                            container={true}
                            justify="center"
                            alignItems="center">
                            <Grid item={true}>
                                <Typography className={classes.noPostText} variant="h6">
                                    No Posts Available
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        posts.map((post, index) => {
                            return (
                                <Grid key={index} item={true} xs={12} md={6} lg={4}>
                                    <Post post={post}/>
                                </Grid>
                            )
                        })
                    )}
                </Grid>
            )}
        </Container>
    )
}
export default Blogs;