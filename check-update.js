const timestamp = {
    base : '2023-04-04',
    css: '2023-04-04',
    marvel : '2023-04-04',
}

let pageLoads = false;
let dataLoads = false;

function loadDataJS() {
    const mainJS = document.createElement("script");
    mainJS.setAttribute("src", `${thisDots}/${urlPage}s.js?${timestamp[urlPage]}`);
    initialScript.append(mainJS);

    const dataJS = document.createElement("script");
    dataJS.setAttribute("src", `${thisDots}/data-${urlPage}.js?${timestamp[urlPage]}`);
    initialScript.append(dataJS);
}
loadDataJS();



let timesTriedToLoadAppJS = 0;
function loadAppJS() {
    if (pageLoads && dataLoads) { 
        const appJS = document.createElement("script");
        appJS.setAttribute("src", `${baseDots}/app.js?${timestamp.base}`); 
        initialScript.append(appJS); 
    } else {
        timesTriedToLoadAppJS++;
        console.log(timesTriedToLoadAppJS);
        if (timesTriedToLoadAppJS < 900) { // 900 == 3 minutes
            setTimeout(() => {
                loadAppJS();
            },200)
        } else {
            console.error(error);
            console.log("404 page");
            throw new Error("Can't find the file!");
        }
    }
}
loadAppJS();
