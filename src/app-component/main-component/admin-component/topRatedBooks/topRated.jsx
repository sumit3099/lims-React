import React,{Component}from 'react';
import EachCategory from './eachCategory';
// import axios from 'axios';
import './topRated.css'
import {connect} from 'react-redux';
import LoadingEffect from './../../../loading-component/loading';
import  Category  from './../../../header-component/categoryView';
class TopBooks extends Component{
        constructor() {
        super();
        //this.counting=0;
        this.state={
            showTop:true,
            particularCategory:""
        }
        window.backLanding=false;

    }

    //     componentWillMount() {
    //     axios
    //         .get('https://api.myjson.com/bins/1a9rkj')
    //         .then(res => {
    //             this.setState({display: res.data.booksArray});
    //         })
    // }
    
    viewMoreClicked=(event,cate)=>
    {
        window.showDetails=false;
        window.hideCategory=false;
        this.setState({showTop:false,particularCategory:cate});
    }
    closeCategory=()=>
    {
        this.setState({showTop:true,particularCategory:""});
    }

    render()
    {
    
        let counting=0;
        let brr = [];
        let arr = window.display
  .sort((a, b) => {
                if (a.category.toUpperCase() > b.category.toUpperCase()) {
                    return 1;
                } else if (a.category.toUpperCase() < b.category.toUpperCase()) {
                    return -1;
                } else {
                    return 0;
                }
            });
            if(arr.length!==0)
            {
                brr.push(arr[0]);
            }
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i].category.toUpperCase() !== arr[i + 1].category.toUpperCase()) {

                brr.push(arr[i+1]);
            }

        }
        let k;
        if(this.props.bbooks!==null && this.props.wbooks!==null){
        k=<div style={{position:'relative',marginTop:'70px',marginBottom:'50px'}}><LoadingEffect/>
        </div>;
                if (brr.length !==0 ) {
                let b = window.display;
                 k=brr.map(result=>{
                     counting++;
                    return(
                        <EachCategory key={`ea${result.isbn}`} click={this.viewMoreClicked} category={result.category} rated={b} count={counting}/>   
                    );
                })
            }
        }
            return(
                <div>
                {(this.state.showTop)?<div className="put" style={{paddingBottom:'30px'}}>
                <h5 id="top_books_header" className="card-header yoyo" style={{ backgroundColor: "rgb(31, 30, 88)", color: "white", fontSize : "18px" }}>Top Rated Books</h5>
                {k!==undefined&&k!==null?k:<div style={{position:'relative',marginTop:'70px',marginBottom:'50px'}}><LoadingEffect/></div>}
            </div>:<div className="mt-4"><Category data={window.display} selected={this.state.particularCategory} categoryCrossClicked={this.closeCategory} isSearchClicked={false}/></div>}
            </div>
                
                
                
            )
    }
}

// function mapStateToProps(state) {
//     return {
//         bbooks: state.bbooks,
//         books: state.books
//     };
// }
function mapStateToProps(state) {
    return {
        bbooks:state.bbooks,
        books:state.books,
        wbooks:state.wbooks
    };
}
export default connect (mapStateToProps)(TopBooks);
// export default TopBooks;