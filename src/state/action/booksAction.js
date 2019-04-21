export const storeBooks = (books) => {
    return{
        type : 'STORE_BOOKS',
        payload : books
    }
};