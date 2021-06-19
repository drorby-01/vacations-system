let dataMap = new Map();
function get(key) {
    return dataMap.get(key);
}

function set(key, value) {
    console.log(value)
    dataMap.set(key, value);
}

// This function should be in a separate module, because many resources will use it
const extractUserDataFromCache = (request) => {
    let authorizationString = request.headers['authorization'];
    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring('Bearer '.length);
    // console.log(token)
    let userData = dataMap.get(token);
    
    return userData;
  };

const deleteFromCache = (request)=>{
    let authorizationString = request.headers['authorization'];
    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring('Bearer '.length)
    
    dataMap.delete(token)
}

module.exports = {
    set,
    get,
    deleteFromCache,
    extractUserDataFromCache,
}