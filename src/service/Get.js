const params = (options) =>{
    let paramString = ''
    for (let i in options) {
        paramString += i + '=' + options[i] + '&'
    }
    return paramString.slice(0,-1)
}
const Get = (url,options,cb) =>{
    fetch(url+params(options))
        .then((response)=>response.json())
        .then((responseBody)=>{
            cb(responseBody)
        })
        .catch((error)=>{
            cb(error)
        })
}
export default Get