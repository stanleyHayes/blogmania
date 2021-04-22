import React from "react";
import {AppBar, Hidden, makeStyles} from "@material-ui/core";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";


const Header = () => {

    const useStyles = makeStyles(theme => {
        return {
            appBar: {
                paddingTop: 16,
                paddingBottom: 16
            }
        }
    });

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} variant="elevation" elevation={0}>
            <Hidden mdDown={true}>
                <DesktopHeader />
            </Hidden>
            <Hidden lgUp={true}>
                <MobileHeader />
            </Hidden>
        </AppBar>
    )
}
export default Header;