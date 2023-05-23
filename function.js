// Make a Alert Function
const setAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between"><span>${msg}</span><button data-bs-dismiss="alert" class="btn-close"></button></p>`
};

// Email checker by regular expression
const emailCheck = (email) => {
    let pattern = /^[a-z0-9\._]{1,}@[a-z0-9]{1,20}\.[a-z]{2,5}$/;
    return pattern.test(email)
};

// BD phone Number checker by regular expression
const cellCheck = (cell) => {
    let pattern = /^(\+880|0|00880)[0-9]{10}$/
    return pattern.test(cell)
};

/**
 * set value LS
 * @param {*} key 
 * @param {*} value 
 */
const createLsData = (key, value) => {

    // init value
    let data = [];

    // data key exit or not
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key))
    } 
    
    // now push data to LS
    data.push(value) 
    
    // set data
    localStorage.setItem(key, JSON.stringify(data));
};

/**
 * get all LS data
 * @param {*} key 
 * @returns 
 */
const readLsData = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    }else{
        return false
    }
};

//  Update LS data 
const updateLsData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array))
}