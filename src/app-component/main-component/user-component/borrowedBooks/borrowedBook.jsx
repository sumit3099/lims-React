import React from 'react';
import Card from './eachBook'
import './css/isssuedSlider.css'
export const UserBooks = (props) => {
    return (

        <div className="row mb-5">
            {props
                .list
                .map(each => {
                    return (
                        <div key={`div${each.isbn}`} className="col-md-3 col-sm-12 col-lg-3 mt-1">
                            <Card key={each.isbn} data={each}/>
                        </div>
                    );

                })}
        </div>
    );
}