// Build out main template elements
const head = document.querySelector("head");
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");

// Head template
head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="../app.css" rel="stylesheet" type="text/css">`

// Use custom head details
const title = document.querySelector("title");
title.innerText = pageTitle


// Header template
header.innerHTML = `<div id="header">

</div>`

// Type selection template
const typeTemplate = (function() {
    if (typeOptions) {
        // Create "typesselection" div
        const typesDiv = document.createElement("div");
        for (let i=0; i<typeOptions.length; i++) {
            // Create type input
            const typesInput = document.createElement("input");
            typesInput.type = "checkbox";
            typesInput.id = typeOptions[i][1];
            typesInput.name = typeOptions[i][1];
            typesInput.value = typeOptions[i][1];

            // Create type label (for input)
            const typesLabel = document.createElement("label");
            typesLabel.for = typeOptions[i][1];
            typesLabel.innerText = typeOptions[i][0];

            // Add input and label inside of "typesselection" div
            typesDiv.appendChild(typesInput);
            typesDiv.appendChild(typesLabel);


            // typesDiv.appendChild(`<input type="checkbox" id="${typeOptions[i][1]}" name="${typeOptions[i][1]}" value="${typeOptions[i][1]}">
            // <label for="${typeOptions[i][1]}">${typeOptions[i][0]}</label>`);
        }
        typesDiv.id = "typesselection";
        return typesDiv;
    } else {
        return '';
    }
})();

// Define selection options
const releaseInput = `<input type="radio" id="release" name="order" value="release">
<label for="release">Release Order</label>`
const chronologicalInput = `<input type="radio" id="chronological" name="order" value="chronological">
<label for="chronological">Chronological Order</label>`
const narrativeInput = `<input type="radio" id="narrative" name="order" value="narrative">
<label for="narrative">Narrative Order</label>`

// Main template
main.innerHTML = `<div id="navbar"></div>
<div id="selectionbar">
    <div id="types">
        ${typeOptions ? `<h3>Types Desired:</h3>` : ''}
    </div>
    <div id="order">
        <h3>Select Order:</h3>
        <div id="orderselection">
            ${orderOptions.release ? releaseInput : ''}
            ${orderOptions.chronological ? chronologicalInput : ''}
            ${orderOptions.narrative ? narrativeInput : ''}
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

document.getElementById("types").appendChild(typeTemplate);