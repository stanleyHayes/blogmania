import React from "react";
import {AppBar, Hidden, makeStyles} from "@material-ui/core";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";
import TabletHeader from "./tablet-header";


const Header = () => {

    const useStyles = makeStyles(theme => {
        return {
            appBar: {
                paddingTop: 8,
                paddingBottom: 8
            }
        }
    });

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} variant="elevation" elevation={0}>
            <Hidden mdDown={true}>
                <DesktopHeader />
            </Hidden>
            <Hidden mdUp={true}>
                <MobileHeader />
            </Hidden>
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                <TabletHeader />
            </Hidden>
        </AppBar>
    )
}
export default Header;