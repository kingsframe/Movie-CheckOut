import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {MainRoutePage} from "./pages/MainRoutePage";
import {CssBaseline} from "@material-ui/core";
import {SWRConfig} from 'swr';

export default function App() {
    return <SWRConfig
        value={{
            refreshInterval: 3000,
            fetcher: (url: string) => fetch(url).then(r => r.json())
        }}
    >
        <CssBaseline/>
        <Router>
            <MainRoutePage/>
        </Router>
    </SWRConfig>;
}
