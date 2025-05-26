import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Navbar from "./components/Navbar";
import ErrorModal from "./components/ErrorModal";

function App() {
    const {employeeStore} = useContext(Context)


    const [error, setError] = useState<string | null>(null);


    const checkAuth = async () => {
        await employeeStore.checkAuth()
    }

    useEffect(() => {
        checkAuth().catch(rej => {
            if (employeeStore.error === null) {
                return;
            } else {
                setError(employeeStore.error)
            }
        })
    }, []);

  return (
    <BrowserRouter>
      {employeeStore.isAuth && <Navbar/>}
      <AppRouter/>
      {error !== null && <ErrorModal message={error} onClose={() => setError(null)}/>}
    </BrowserRouter>
  );
}

export default observer(App);
