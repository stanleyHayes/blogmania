import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import Header from "./header/header";

const Layout = ({children}) => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                minHeight: '100vh',
                background: "#53900f"
            }
        }
    });

    const classes = useStyles();


    return (
        <Box className={classes.container}>
            <Box>
                <Header />
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default Layout;