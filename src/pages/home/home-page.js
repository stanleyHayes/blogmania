import React, {useEffect} from "react";
import GoogleLogin from "react-google-login";
import {useSelector, useDispatch} from "react-redux";
import {selectSignedIn, selectUserInput, setSignedIn, setUserData} from "../../features/user-slice";
import {Button, Container, Typography, Box, makeStyles} from "@material-ui/core";
import Layout from "../../components/layout";
import Blogs from "../../components/shared/blogs";
import {getPosts, selectLoading, selectPosts} from "../../features/blog-slice";

const HomePage = () => {

    const dispatch = useDispatch();

    const login = (response) => {
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn);
    const input = useSelector(selectUserInput);
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 100,
                paddingBottom: 16
            },
            button: {

            },
            logo: {
                marginBottom: 16,
                width: 100,
                height: 100
            },
            title: {
                marginBottom: 16
            },
            subtitle: {
                marginBottom: 16
            },
            noAuthContainer: {
                minHeight: '100vh',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        }
    });

    const classes = useStyles();

    useEffect(() => {
        if (input !== "" && isSignedIn) {
            dispatch(getPosts(input));
        }
    }, [dispatch, input, isSignedIn]);

    return (
        <Layout>
            <Container
                className={classes.container}
                style={{display: isSignedIn ? "none" : null}}>
                {
                    !isSignedIn ? (
                        <Box>
                            <img
                                className={classes.logo}
                                width={50}
                                height={50}
                                title=""
                                alt=""
                                src="/assets/books.svg"/>
                            <Typography className={classes.title} variant="h1">A Reader's favorite place</Typography>
                            <Typography className={classes.subtitle} variant="body1" gutterBottom={true}>
                                We provide high quality online resource for reading blogs. Just sign up and start
                                reading
                                some
                                quality blogs.
                            </Typography>
                            <GoogleLogin
                                clientId="1075183749424-154bc74pas8dnjbpat4a19ff2tj10ss3.apps.googleusercontent.com"
                                render={(renderProps) => {
                                    return (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disableElevation={true}
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            className={classes.button}>
                                            Login with Google
                                        </Button>
                                    )
                                }}
                                onSuccess={login}
                                onFailure={login}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </Box>
                    ) : null
                }
            </Container>
            <Container className={classes.container} style={{display: !isSignedIn ? "none" : null}}>
                    <Blogs loading={loading}  posts={posts} />
            </Container>
        </Layout>
    )
}

export default HomePage;