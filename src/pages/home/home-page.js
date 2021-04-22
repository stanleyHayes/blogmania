import React, {useEffect, useState} from "react";
import GoogleLogin from "react-google-login";
import {useSelector, useDispatch} from "react-redux";
import {selectSignedIn, selectUserInput, setSearchInput, setSignedIn, setUserData} from "../../features/user-slice";
import {
    Button,
    Container,
    Typography,
    Box,
    makeStyles,
    Grid,
    TextField,
    Divider,
    useMediaQuery
} from "@material-ui/core";
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
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);

    const searchInput = useSelector(selectUserInput);

    const [input, setInput] = useState(searchInput);

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 100,
                paddingBottom: 16
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
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            textField: {
                zIndex: 1,
                background: 'rgba(31,38,5,0.2)',
                overflow: "hidden"
            },
            button: {
                borderWidth: 2,
                borderColor: "white",
                borderStyle: "solid"
            }
        }
    });


    const classes = useStyles();

    useEffect(() => {
        if (input !== "" && isSignedIn) {
            dispatch(getPosts(input));
        }
    }, [dispatch, input, isSignedIn]);

    const mobile = useMediaQuery('(max-width: 1280px)');

    const handleSearchClick = e => {
        e.preventDefault();
        if (input !== "") {
            dispatch(setSearchInput(input));
            dispatch(getPosts(input));
        }
    }

    return (
        <Layout>
            <Container
                className={classes.noAuthContainer}
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
                            <Typography color="textPrimary" className={classes.title} variant="h2">A Reader's favorite place</Typography>
                            <Typography  color="textPrimary"  className={classes.subtitle} variant="body1" gutterBottom={true}>
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
                <Typography className={classes.title} variant="h1" align="center" color="textPrimary">Blog</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                {mobile ? (
                    <Container>
                        <Grid spacing={2} container={true} justify="center" alignItems="center">
                            <Grid item={true} xs={8} md={10}>
                                <TextField
                                    label="Search"
                                    placeholder="Search"
                                    value={input}
                                    className={classes.textField}
                                    onChange={e => setInput(e.target.value)}
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="dense"/>

                            </Grid>
                            <Grid item={true} xs={4} md={2}>
                                <Button
                                    className={classes.button}
                                    color="primary"
                                    variant="contained"
                                    disableElevation={true}
                                    fullWidth={true}
                                    size="medium"
                                    onClick={handleSearchClick}>Search</Button>
                            </Grid>
                        </Grid>
                        <Divider light={true} variant="fullWidth" className={classes.divider}/>
                    </Container>
                ) : null}

                <Blogs loading={loading} posts={posts}/>
            </Container>
        </Layout>
    )
}

export default HomePage;