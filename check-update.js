const timestamp = {
    base: '2023-08-26',
    css: '2023-06-03',
    root: '2023-06-03',
    marvel: '2023-06-03',
    starwars: '2023-06-03',
    lotr: '2023-08-31',
}

const seriesOptions = [
    ['Marvel Cinematic Universe', 'marvel'],
    ['Star Wars', 'starwars']
]

let pageLoads = false;
let dataLoads = false;

// Test root page
let isTest = false;
// isTest = true;

if (isTest) {
    urlPage = 'root';
}

function loadDataJS() {
    let cssFile = '';
    
    if (!isDev) {
        cssFile = `<link href="/app.css?${timestamp.css}" rel="stylesheet" type="text/css">`;
    } else {
        cssFile = `<link href="${baseDots}/app.css?${timestamp.css}" rel="stylesheet" type="text/css">`;
    }

    document.querySelector("head").insertAdjacentHTML("afterbegin", cssFile);
    
    if (urlPage != 'root') {
        const mainJS = document.createElement("script");
        if (!isDev) {
            mainJS.setAttribute("src", `/${urlPage}/${urlPage}.js?${timestamp[urlPage]}`);
        } else {
            mainJS.setAttribute("src", `${baseDots}/${urlPage}/${urlPage}.js?${timestamp[urlPage]}`);
        }
        
        initialScript.append(mainJS);
    
        const dataJS = document.createElement("script");
        if (!isDev) {
            dataJS.setAttribute("src", `/${urlPage}/data-${urlPage}.js?${timestamp[urlPage]}`);
        } else {
            dataJS.setAttribute("src", `${baseDots}/${urlPage}/data-${urlPage}.js?${timestamp[urlPage]}`);
        }
    
        initialScript.append(dataJS);
    } else {
        const rootJS = document.createElement("script");
        if (!isTest) {
            rootJS.setAttribute("src", `/${urlPage}.js?${timestamp[urlPage]}`);
        } else {
            rootJS.setAttribute("src", `${baseDots}/${urlPage}.js?${timestamp[urlPage]}`); // For testing purposes
        }
        
        initialScript.append(rootJS);
    }

}
loadDataJS();



let timesTriedToLoadAppJS = 0;
function loadAppJS() {
    if (pageLoads && dataLoads) { 
        const appJS = document.createElement("script");
        if (!isDev) {
            appJS.setAttribute("src", `/app.js?${timestamp.base}`); 
        } else {
            appJS.setAttribute("src", `${baseDots}/app.js?${timestamp.base}`); 
        }
        
        initialScript.append(appJS); 
    } else {
        timesTriedToLoadAppJS++;
        if (timesTriedToLoadAppJS < 900) { // 900 == 3 minutes
            setTimeout(() => {
                loadAppJS();
            },200)
        } else {
            console.log("404 page");
            throw new Error("Can't find the file!");
        }
    }
}
loadAppJS();
