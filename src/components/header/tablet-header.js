import React from "react";
import {Avatar, Button, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import GoogleLogin, {GoogleLogout} from "react-google-login";
import {useDispatch, useSelector} from "react-redux";
import {
    selectSignedIn,
    selectUserData,
    setSignedIn,
    setUserData
} from "../../features/user-slice";

const TabletHeader = () => {

    const dispatch = useDispatch();

    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);


    const login = (response) => {
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj))
    }

    const logout = () => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null))
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
        <Toolbar>
            <Grid container={true} alignItems="center" justify="space-between">
                <Grid md={6} spacing={2} item={true} container={true} justify="flex-start">
                    <Grid item={true}>
                        <img src="/assets/books.svg" alt="" title="" width={50} height={50}/>
                    </Grid>
                    <Grid item={true}>
                        <Typography className={classes.brand} display="inline" variant="h4">BlogMania</Typography>
                    </Grid>
                </Grid>

                {isSignedIn ? (
                    <Grid md={6} container={true} spacing={2} alignItems="center" justify="flex-end">
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
                                onFailure={logout}
                                isSignedIn={false}
                                cookiePolicy={"single_host_origin"}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid md={6} container={true} spacing={2} alignItems="center" justify="flex-end">
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
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Toolbar>
    )
}

export default TabletHeader;