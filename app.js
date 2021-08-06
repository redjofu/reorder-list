const head = document.querySelector("head");
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");

head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="../app.css" rel="stylesheet" type="text/css">`

const title = document.querySelector("title");

header.innerHTML = `<div id="header">

</div>`

main.innerHTML = `<div id="navbar"></div>
<div id="selectionbar">
    <div id="types">
        <h3>Types Desired:</h3>
        <div id="typeselection">
        </div>
    </div>
    <div id="order">
        <h3>Select Order:</h3>
        <div id="orderselection">
            <input type="radio" id="release" name="order" value="release">
            <label for="release">Release Order</label>
            <input type="radio" id="chronological" name="order" value="chronological">
            <label for="chronological">Chronological Order</label>
            <input type="radio" id="narrative" name="order" value="narrative">
            <label for="narrative">Narrative Order</label>
        </div>
    </div>
    <div id="spoilers">
        <h3>Spoiler Level:</h3>
        <div id="spoilerselection">
            <input type="checkbox" id="premisestory" name="premisestory" value="premisestory">
            <label for="premisestory">Premise Story Level</label>
            <input type="checkbox" id="basicstory" name="basicstory" value="basicstory">
            <label for="basicstory">Basic Story Level</label>
            <input type="checkbox" id="fullstory" name="fullstory" value="fullstory">
            <label for="fullstory">Full Story Level</label>
            <input type="checkbox" id="premiseseries" name="premiseseries" value="premiseseries">
            <label for="premiseseries">Premise Series Level</label>
            <input type="checkbox" id="basicseries" name="basicseries" value="basicseries">
            <label for="basicseries">Basic Series Level</label>
            <input type="checkbox" id="fullseries" name="fullseries" value="fullseries">
            <label for="fullseries">Full Series Level</label>
        </div>
    </div>
</div>
<div id="content"></div>`

const selectionBar = document.getElementById("selectionbar");