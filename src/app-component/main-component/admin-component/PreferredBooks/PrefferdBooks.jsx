import React, {Component} from 'react';
// import axios from 'axios';
import './PrefferedBooks.css';
import {connect} from 'react-redux';
import EachPrefferedCard from './eachPreferredBook'
// import $ from 'jquery'; var preferredBooks = [];
let bbooks,wbooks;
class PBooks extends Component {

    constructor() {
        super();
        // alert("in pf")
        this.state = {
            storeId: "imga"
        }
        // this.getVal=this.getVal.bind(this);
    }

    // componentDidMount() {
    //             this.setState({display: window.display});
    // }
    // getVal=()=>{
    //     bbooks=storeBbooks.getState().bbooks;
    //     this.setState({
    //         books:bbooks
    //     })
    // }
    render()
    {
        // if(this.state.books.length===0){
        //     this.getVal();
        // }
        // window.display=this.props.books;
        bbooks=this.props.bbooks;
        wbooks=this.props.wbooks;
        // console.log(this.state.books.length)
        // alert("pf")
    //    let bbooks= storeBbooks.getState().bbooks;
    //    console.log("in")
    // //    console.log("in")
    //    console.log(storeBbooks.getState().bbooks)
        // console.log("val "+bbooks.length)
    //    alert(bbooks.length)
        // alert("pf")

        let s1,
            s2,
            s3,
            s4;
        if (window.display.length !== 0 && bbooks !== null && wbooks!==null) {
            let b = window.display.length;
            if(b-6>=0)
            {
            s1 = <div className="carousel-item mt-2">
                {window.display
                    .slice(b-6,b)
                    .map((r) => {
                        return (<EachPrefferedCard key={`pref${r.isbn}`} item={r} Bdata={bbooks} Wdata={wbooks}/>);
                    })}
            </div>
            }
            b = window.display.length;
            if(b-12>=0)
            {    
            s2 = <div className="carousel-item mt-2">
                {window.display
                    .slice(b-12, b-6)
                    .map((r) => {
                        return (<EachPrefferedCard key={r.isbn} item={r} Bdata={bbooks} Wdata={wbooks}/>);
                    })}
            </div>
            }
                
            b = window.display.length;
            if(b-18>=0)
            {
            s3 = <div className="carousel-item mt-2">
                {window.display
                    .slice(b-18, b-12)
                    .map((r) => {
                        return (<EachPrefferedCard key={`book${r.isbn}`} item={r} Bdata={bbooks} Wdata={wbooks}/>);
                    })}
            </div>
            }
            b = window.display.length;
            if(b-24>=0)
            {
            s4 = <div className="carousel-item mt-2">
                {window.display
                    .slice(b-24, b-18)
                    .map((r) => {
                        return (<EachPrefferedCard key={`book${r.isbn}`} item={r} Bdata={bbooks} Wdata={wbooks}/>);
                    })}
            </div>
            }
        }
        return (
            <div>
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel">

                    <div

                        className="carousel-inner"
                        role="listbox">
                        <div className="carousel-inner" role="listbox">

                            <div className="carousel-cell">
                                <div className="carousel-item active mt-2">
                                    <img
                                        className="d-block activeImage mx-auto"

                                        alt="First slide"
                                        height="208"
                                        src={require("../../../../Assets/Images/active_whats_new.png")}/>
                                </div>
                                {s1}
                                {s2}
                                {s3}
                                {s4}

                            </div>
                            <br/> {/*<br/>*/}
                            <ol className="carousel-indicators">
                                <li
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to="0"
                                    className="active"
                                    style={{
                                    color: "purple"
                                }}></li>
                                <li
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to="1"
                                    style={{
                                    color: "purple"
                                }}></li>

                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                        </div>
                    </div>
                    <div
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev">
                        <span className="arrowLeft" aria-hidden="true" style={{color : "#26a69a"}}></span>
                        <span className="sr-only" style={{color : "#26a69a"}}>Previous</span>
                    </div>
                    <div
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next">
                        <span className="arrowRight" aria-hidden="true"></span>
                        <span className="sr-only arrow">Next</span>
                    </div>
                </div>
                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        bbooks: state.bbooks,
        books: state.books,
        wbooks:state.wbooks
    };
}
export default connect(mapStateToProps)(PBooks);