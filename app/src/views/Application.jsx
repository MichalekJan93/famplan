import React, { useEffect, useState, createContext } from "react";
import Menu from "../components/MenuVertical/Menu";
import AppView from "../components/AppView/AppView";
import { apiGet } from "../utils/apiGET";
import "./Application.css"

export const DataContext = createContext();

const Application = () => {

    const [dataFromDtb, setDataFromDtb] = useState({});
    const [showComponent, setShowComponent] = useState("Dashboard");

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await apiGet("http://localhost:5000/api/userData");
                if(res.status === 200){
                    setDataFromDtb(res.data);
                }else if(res.response.status === 401){
                    window.open("http://localhost:3000/login", "_self");
                } else{
                    window.open("http://localhost:3000/login", "_self");
                }
            } catch (error) {
                console.log(error)
                window.open("http://localhost:3000/login", "_self");
            }
        }
        checkLogin();
    }, [])

    const switchComponent = (component) => {
        setShowComponent(component);
    }

    return (
        <div className="application">
            <DataContext.Provider value={dataFromDtb}>
                <Menu switchComponent = {switchComponent}/>
                <AppView showComponent={showComponent}/>
            </DataContext.Provider>
        </div>
    )
}

export default Application;