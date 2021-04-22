import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./app/store";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Quicksand, sans-serif"
    },
    palette: {
        primary: {
            main: "#1f2605"
        },
        secondary: {
            main: "#53900f"
        },
        action: {
            active: "#ffffff",
            focus: "#ffffff",
            selected: "#ffffff",
            hover: "#ffffff"
        },
        background: {
            paper: "#1f6521",
            default: "#53900f"
        },
        type: "dark",
    },
    shape: {
        borderRadius: 2
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
