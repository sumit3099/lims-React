import React from 'react';
import {Cards} from './eachbook.jsx';
export const UserBooks =(props) =>
{
return(
    <div className="row">
        {props.list.map(each =>{
            return (
                <Cards key={each.isbn +"c"} className="col-md-6 col-sm-12 col-lg-3" data={each} />
                )
        })}
        </div>

)
} 