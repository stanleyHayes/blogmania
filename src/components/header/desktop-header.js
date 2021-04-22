import React, {useState} from "react";
import {Avatar, Button, Grid, TextField, Toolbar, Typography} from "@material-ui/core";
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
import {ExitToApp} from "@material-ui/icons";
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


    return (
        <Toolbar variant="regular">
            <Grid container={true} alignItems="center" justify="space-between" spacing={5}>
                <Grid item={true} lg={3} spacing={2} container={true} alignItems="center">
                    <Grid item={true}>
                        <img src="/assets/books.svg" alt="" title="" width={50} height={50}/>
                    </Grid>
                    <Grid item={true}>
                        <Typography display="inline" variant="h3">BlogMania</Typography>
                    </Grid>
                </Grid>
                {isSignedIn ? (
                    <Grid item={true} lg={7} spacing={2} container={true} justify="space-around" alignItems="center">
                        <Grid item={true} lg={10}>
                            <TextField
                                color="secondary"
                                label="Search"
                                placeholder="Search"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                fullWidth={true}
                                variant="outlined"
                                margin="dense"/>

                        </Grid>
                        <Grid item={true} lg={2}>
                            <Button
                                color="secondary"
                                variant="outlined"
                                disableElevation={true}
                                fullWidth={true}
                                size="medium"
                                onClick={handleSearchClick}>Search</Button>
                        </Grid>
                    </Grid>
                ) : null}
                <Grid item={true} lg={2} container={true} alignItems="center">
                    {isSignedIn ? (
                        <Grid container={true} spacing={2} alignItems="center" justify="flex-end">
                            <Grid item={true}>
                                {userData && userData.imageUrl ?
                                    <Avatar
                                        alt={userData.name}
                                        title={userData.name}
                                        src={userData?.imageUrl}
                                        variant="circular"/> :
                                    <Avatar
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
                                                variant="outlined"
                                                color="secondary"
                                                size="medium"
                                                disableElevation={true}
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}>
                                                Logout
                                            </Button>
                                        )
                                    }}
                                    onLogoutSuccess={logout}
                                    onFailure={logout}
                                    icon={<ExitToApp/>}
                                    isSignedIn={false}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container={true} spacing={2} alignItems="center" justify="flex-end">
                            <Grid item={true}>
                                <Avatar variant="circular" color="secondary">
                                    S
                                </Avatar>
                            </Grid>
                            <Grid item={true}>
                                <GoogleLogin
                                    clientId="1075183749424-154bc74pas8dnjbpat4a19ff2tj10ss3.apps.googleusercontent.com"
                                    render={(renderProps) => {
                                        return (
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                size="medium"
                                                disableElevation={true}
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="login__button">
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
            </Grid>
        </Toolbar>
    )
}

export default DesktopHeader;