import { useState } from 'react';
import '../App.css';
import icon from '../ubi.png'
const InputSearch= props=>{
    return(
        <form onSubmit={props.enviarDatos} className='inputSearch'>
            <div>
                <img src={icon} alt="icon"></img>
                <input className="cityText" type="text" name="city" placeholder="input a city" onChange={props.handleInputChange}></input>
            </div>
            <button className="searchButton" type="submit" name="searchButon">Search</button>
        </form>
    )
}

export default InputSearch;