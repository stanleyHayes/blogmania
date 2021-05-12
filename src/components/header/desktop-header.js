import React, {useState} from "react";
import {Avatar, Button, Grid, makeStyles, TextField, Toolbar, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    selectSignedIn,
    selectUserData,
    selectUserInput,
    setSearchInput,
    setSignedIn,
    setUserData
} from "../../features/user-slice";
import GoogleLogin, {GoogleLogout} from "react-google-login";
import {getPosts} from "../../features/blog-slice";

const DesktopHeader = () => {

    const dispatch = useDispatch();

    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);
    const searchInput = useSelector(selectUserInput);

    const [input, setInput] = useState(searchInput);

    const login = (response) => {
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj))
    }

    const loginFail = response => {
        console.log(response)
    }
    const logout = () => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null))
    }


    const handleSearchClick = e => {
        e.preventDefault();
        if (input !== "") {
            dispatch(setSearchInput(input));
            dispatch(getPosts(input));
        }
    }

    const useStyles = makeStyles(theme => {
        return {
            textField: {
                background: 'rgba(83,144,15,0.3)'
            },
            button: {
                borderWidth: 2,
                borderColor: "white",
                borderStyle: "solid"
            },
            brand: {
                fontWeight: "bold"
            },
            avatar: {
                borderWidth: 2,
                borderColor: "white",
                borderStyle: "solid",
                background: "white",
                fontWeight: "bold"
            }
        }
    });

    const classes = useStyles();

    return (
        <Toolbar variant="regular">
            <Grid container={true} alignItems="center" justify="space-between" spacing={2}>
                <Grid item={true} lg={3} spacing={2} container={true} alignItems="flex-start">
                    <Grid item={true}>
                        <img src="/assets/books.svg" alt="" title="" width={50} height={50}/>
                    </Grid>
                    <Grid item={true}>
                        <Typography className={classes.brand} display="inline" variant="h4">BlogMania</Typography>
                    </Grid>
                </Grid>
                {isSignedIn ? (
                    <Grid item={true} lg={6} spacing={2} container={true} justify="space-around" alignItems="center">
                        <Grid item={true} lg={10}>
                            <TextField
                                color="secondary"
                                label="Search"
                                placeholder="Search"
                                value={input}
                                className={classes.textField}
                                onChange={e => setInput(e.target.value)}
                                fullWidth={true}
                                variant="outlined"
                                margin="dense"/>

                        </Grid>
                        <Grid item={true} lg={2}>
                            <Button
                                color="secondary"
                                variant="contained"
                                disableElevation={true}
                                fullWidth={true}
                                className={classes.button}
                                size="medium"
                                onClick={handleSearchClick}>Search</Button>
                        </Grid>
                    </Grid>
                ) : null}
                <Grid item={true} lg={3} container={true} alignItems="center">
                    {isSignedIn ? (
                        <Grid container={true} spacing={2} alignItems="center" justify="flex-end">
                            <Grid item={true}>
                                {userData && userData.imageUrl ?
                                    <Avatar
                                        className={classes.button}
                                        alt={userData.name}
                                        title={userData.name}
                                        src={userData?.imageUrl}
                                        variant="circular"/> :
                                    <Avatar
                                        className={classes.button}
                                        variant="circular"
                                        alt={userData?.name}
                                        title={userData?.name}>
                                        {userData?.name[0]}
                                    </Avatar>
                                }
                            </Grid>
                            <Grid item={true}>
                                <Typography display="inline" variant="h6">{userData?.givenName}</Typography>
                            </Grid>
                            <Grid item={true}>
                                <GoogleLogout
                                    clientId="1075183749424-154bc74pas8dnjbpat4a19ff2tj10ss3.apps.googleusercontent.com"
                                    render={(renderProps) => {
                                        return (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="medium"
                                                className={classes.button}
                                                disableElevation={true}
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}>
                                                Logout
                                            </Button>
                                        )
                                    }}
                                    onLogoutSuccess={logout}
                                    onFailure={loginFail}
                                    isSignedIn={false}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container={true} spacing={2} alignItems="center" justify="flex-end">
                            <Grid item={true}>
                                <Avatar className={classes.avatar} variant="circular" color="secondary">
                                    S
                                </Avatar>
                            </Grid>
                            <Grid item={true}>
                                <GoogleLogin
                                    clientId="1075183749424-154bc74pas8dnjbpat4a19ff2tj10ss3.apps.googleusercontent.com"
                                    render={(renderProps) => {
                                        return (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="medium"
                                                className={classes.button}
                                                disableElevation={true}
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}>
                                                Login
                                            </Button>
                                        )
                                    }}
                                    onSuccess={login}
                                    onFailure={login}
                                    isSignedIn={false}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;