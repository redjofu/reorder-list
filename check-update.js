const timestamp = {
    base : '2023-04-04',
    css: '2023-04-04',
    marvel : '2023-04-04',
}

const mainJS = document.createElement("script");
mainJS.setAttribute("src", `${thisDots}/${urlPage}.js?${timestamp[urlPage]}`);
initialScript.append(mainJS);

const dataJS = document.createElement("script");
dataJS.setAttribute("src", `${thisDots}/data-${urlPage}.js?${timestamp[urlPage]}`);
initialScript.append(dataJS);

const appJS = document.createElement("script");
appJS.setAttribute("src", `${baseDots}/app.js?${timestamp.base}`);
initialScript.append(appJS);