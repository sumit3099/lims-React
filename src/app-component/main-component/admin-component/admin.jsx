import React, {Component}from 'react';
import Header from './../../header-component/header';
import Footer from '../../footer-component/footer.jsx';
import Pbooks from '../admin-component/PreferredBooks/PrefferdBooks.jsx';
import { BorrowedSlider } from '../user-component/borrowedBooks/borrowedSlider';
// import SearchResults from './SearchResults'

export default class Admin extends Component
{
    
    render()
    {
        return(
            <div>
            <Header/>
            <Pbooks/>
            <BorrowedSlider/>
            <Footer />
            </div>
        );
    }
}
