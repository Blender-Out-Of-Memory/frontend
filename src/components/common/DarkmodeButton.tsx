import { DarkModeSwitch } from 'react-toggle-dark-mode';
import {useState} from "react";

const DarkmodeButton = () => {

    var dark = false;
    if(localStorage.getItem("data-theme") != null){
        if(localStorage.getItem("data-theme") == "dark"){
            dark = true;
        }
    }

    const [isDarkMode, setDarkMode] = useState(dark);


    const toggleDarkMode = (checked: boolean) => {
        if(checked){
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("data-theme", "dark");
        }else{
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("data-theme", "light");
        }
        setDarkMode(checked);
    };

    return (
        <DarkModeSwitch
            style={{ marginBottom: '2rem' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
        />
    );
};

export default DarkmodeButton;