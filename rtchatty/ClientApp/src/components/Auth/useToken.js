import { useState } from 'react';


export default function useToken() {
    //retrieve the token with getItem
    //takes a key as an argument and returns the string value.
    //Convert the string to an object using JSON.parse, then return the value of token
    const getToken = () =>{
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
    };
    //This will fetch the token and set it as the initial state:
    const [token, setToken] = useState(getToken());
  
    //saves token to localStorage, save token to state by setToken
    const saveToken = userToken =>{
          // stores token, converts from an object to a string 
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };
    //return an object that contains the token
    // saveToken set to setToken property name, gives component same interface
    return {
        setToken: saveToken,
        token
    }
 }