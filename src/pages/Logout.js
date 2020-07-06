import React, {useState, useEffect} from 'react';
import {Auth} from "aws-amplify";
import {Redirect} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeUserData } from '../store/actions/user.action';

export default function Logout () {
    
    const [logged_out, setLogged_out] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        Auth.signOut()
        .then(response => {
            setLogged_out(true);
            dispatch(removeUserData());      
        })
        .catch(error => {
            console.log("Erro fazendo logout: ", error)
            setLogged_out(true)
        })
        // eslint-disable-next-line
    },[]) 

   return logged_out ? <Redirect to="/"/> : <h1>Saindo...</h1>

}
