import React,{useState} from 'react'
import AlertContext from './notes/AlertContext'


const AlertState = (props) => {
    const [alert, setAlert] = useState(null)
    
    const showAlert = (message)=>{
        setAlert(message)
        setTimeout(() => {
            setAlert(null)
        }, 1000);
    }
    return (
        <AlertContext.Provider value={{showAlert,alert }}>
        {props.children}
       </AlertContext.Provider>
    )
}

export default AlertState
