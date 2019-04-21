export var borrowDate;
export var returnDate;

export const getDates=()=>{
    var today = new Date();
        var newDate = new Date(today.getTime() + (10 * 24 * 60 * 60 * 1000));
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var dd1 = newDate.getDate();
        var mm1 = newDate.getMonth() + 1; //January is 0!
        var yyyy1 = newDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd1 < 10) {
            dd1 = '0' + dd1;
        }
        if (mm1 < 10) {
            mm1 = '0' + mm1;
        }
        borrowDate = dd + '/' + mm + '/' + yyyy;
        returnDate = dd1 + '/' + mm1 + '/' + yyyy1;
}