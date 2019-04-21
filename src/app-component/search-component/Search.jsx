
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import './Search.css'
import store from '../../state/store/store.js'
import {changeNotify} from './SearchResults'
export var processedData = [];
var data;
export var value;
export var search = () => {
    value = store.getState().search.toLowerCase();
    processedData = []
    changeNotify();
    let value1, value2;
    value1=value
    if (value.indexOf('&') > -1) {
        value1 = value.substring(0, value.indexOf('&')-1)
        value2 = value.substring(value.indexOf('&') + 2, value.length);
    }
    else if(value.indexOf('and')>-1) {
        value1 = value.substring(0,value.indexOf('and')-1)
        value2 = value.substring(value.indexOf('and')+4,value.length)
            value1.trim();
    value2.trim();
    }
    else if(value.indexOf(',')>-1)
    {
        //console.log((',')
        value1 = value.substring(0,value.indexOf(','))
        value2 = value.substring(value.indexOf(',')+2, value.length)
            value1.trim();
    value2.trim();
    }

    if (value === "")
        window.location = '/#/';
    else {
                data = window.display;
           var datax = data.filter((data3) =>
                    (data3.title.toLowerCase().indexOf(value1) >= 0 ||
                        data3.author.toLowerCase().indexOf(value1) >= 0 ||
                        data3.publisher.toLowerCase().indexOf(value1) >= 0 ||
                        data3.category.toLowerCase().indexOf(value1) >= 0) &&
                    value1 !== '').sort((a, b) => { return (b.rating - a.rating) });
                    processedData = datax
                if (value2 !== "") {
                   var datay = data.filter((data3) =>
                        (data3.title.toLowerCase().indexOf(value2) >= 0 ||
                            data3.author.toLowerCase().indexOf(value2) >= 0 ||
                            data3.publisher.toLowerCase().indexOf(value2) >= 0 ||
                            data3.category.toLowerCase().indexOf(value2) >= 0) &&
                        value2 !== '').sort((a, b) => { return (b.rating - a.rating) });
                        // eslint-disable-next-line
                        datay.map((res)=>{
                            if(processedData.indexOf(res))
                            processedData.push(res)
                        })
                }
                datax = processedData
                store.dispatch({ type: "STORE_SORTED_DATA", payload: datax });
                window.location = `/#/search/${value}`
               
    }

}

export var sortTitle = () => {
    this.flag = !this.flag;
    let i = this.flag;
    processedData.sort(function (a, b) {
        if (a.title < b.title) {
            if (i)
                return -1;
            else
                return 1;
        }
        if (a.title > b.title) {
            if (i)
                return 1;
            else
                return -1;
        }
        return 0;
    }
    )
    window.location = `/#/search/title=${value}`    
    // document.getElementById('os').click();
}
export var sortAuthor = () => {
    this.flag = !this.flag;
    let i = this.flag;
    processedData.sort(function (a, b) {
        if (a.author < b.author) {
            if (i)
                return -1;
            else
                return 1;
        }
        if (a.author > b.author) {
            if (i)
                return 1;
            else
                return -1;
        }
        return 0;
    }
    )
    window.location = `/#/search/author=${value}`
}
export var sortPublish = () => {
    this.flag = !this.flag;
    let i = this.flag;
    processedData.sort(function (a, b) {
        if (a.publisher < b.publisher) {
            if (i)
                return -1;
            else
                return 1;
        }
        if (a.publisher > b.publisher) {
            if (i)
                return 1;
            else
                return -1;
        }
        return 0;
    }
    )
    window.location = `/#/search/publish=${value}`
}
export var sortRating = () => {
    this.flag = !this.flag;
    let i = this.flag;
    processedData.sort(function (a, b) {
        if (a.rating > b.rating) {
            if (i)
                return -1;
            else
                return 1;
        }
        if (a.rating < b.rating) {
            if (i)
                return 1;
            else
                return -1;
        }
        return 0;
    }
    )
    window.location = `/#/search/rating=${value}`
}

export var selectFilter = () => {
        if (document.getElementById("filter").value === "Filter By 5 Rated") {
            fiveRated();
        }
        else if (document.getElementById("filter").value === "Filter By 4 and above") {
            fourRated();
        }
        else if (document.getElementById("filter").value === "Filter by 3 and above") {
            threeRated();
        }
        else if (document.getElementById("filter").value === "Filter by 2 and above") {
            twoRated();
        }
        else if(document.getElementById('filter').value === "Filter By")document.getElementById('defaultSearchResults').click();
    }

    var fiveRated= () => {
        processedData = store.getState().sorted_Data
        //console.log((store.getState().sorted_Data)
        //console.log((processedData)
        let filter = processedData
        processedData=[]
        filter.filter((data) => data.rating === 5)
        .map((res)=> processedData.push(res))
        window.location = `/#/search/5_star=${value}`
    }
    var fourRated = () =>  {
        processedData = store.getState().sorted_Data
        let filter = processedData
        processedData=[]
        filter.filter((data) =>
            (data.rating <= 5) && (data.rating >= 4))
            .map((res)=> processedData.push(res))
        window.location = `/#/search/>4_star=${value}`
    
    }
    var threeRated = () => {
        processedData = store.getState().sorted_Data
        let filter = processedData
        processedData=[]
        filter.filter((data) =>
            (data.rating <= 5) && (data.rating >= 3))
            .map((res)=> processedData.push(res))
        window.location = `/#/search/>3_star=${value}`
     
    }
    var twoRated = () => {
        processedData = store.getState().sorted_Data
        let filter = processedData
        processedData=[]
        filter.filter((data) =>
            (data.rating <= 5) && (data.rating >= 2))
            .map((res)=> processedData.push(res))
   
        window.location = `/#/search/>2_star=${value}`
  
    }

