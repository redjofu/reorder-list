// Build out main template elements
const head = document.querySelector("head");
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");

// Head template
head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="../app.css" rel="stylesheet" type="text/css">
<style id="extracss"></style>`

// Use custom head details
const title = document.querySelector("title");
title.innerText = pageTitle

// Find and set correct screen height
const extraCSS = document.getElementById("extracss");
extraCSS.textContent = `:root {
    --screen-height: ${window.innerHeight - 1}px;
}`


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
            typesLabel.setAttribute("for", typeOptions[i][1]);
            typesLabel.innerText = typeOptions[i][0];

            // Add input and label inside of "typesselection" div
            typesDiv.appendChild(typesInput);
            typesDiv.appendChild(typesLabel);
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
    <div id="selectionexplanation"><p>Select an option below for a description to appear here.</p></div>
    <div id="selectionscroll">
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
</div>
<div id="content"></div>`

const selectionBar = document.getElementById("selectionbar");

// Add the type inputs below the "Types Desired" H3.
document.getElementById("types").appendChild(typeTemplate);

// Fill out missing selectionOptionDescription keys and values.
if (!selectionOptionDescription.release) {
    selectionOptionDescription.release = `The order according to each entry's original release date.`
}

if (!selectionOptionDescription.chronological) {
    selectionOptionDescription.chronological = `The order according to when the core events for each entry occur within the overarching story.`
}

if (!selectionOptionDescription.narrative) {
    selectionOptionDescription.narrative = `The order I feel provides the best narrative structure for ${userType}, especially for those ${progressiveVerb} for the first time.`
}

if (!selectionOptionDescription.premisestory) {
    selectionOptionDescription.premisestory = `Spoilers relating to the pitch of the that entry's story. These include only the sorts of details you might find out from ${blurbVerb}.`
}

if (!selectionOptionDescription.basicstory) {
    selectionOptionDescription.basicstory = `Spoilers relating to basic events of the entry's story usually revealed early on. These include the sorts of details a friend might tell you after ${progressiveVerb} themselves.`
}

if (!selectionOptionDescription.fullstory) {
    selectionOptionDescription.fullstory = `Spoilers relating to any details from the entry's story, including those typically revealed at the end. These include details typically referred to as "spoilers."`
}

if (!selectionOptionDescription.premiseseries) {
    selectionOptionDescription.premiseseries = `Spoilers relating to the pitch of the series as a whole. These include only the sorts of details you might find out from ${blurbVerb} from a later entry in the series but which might not be revealed in that particular entry.`
}

if (!selectionOptionDescription.basicseries) {
    selectionOptionDescription.basicseries = `Spoilers relating to basic events of the series. These include the sorts of details a friend might tell you after ${progressiveVerb} a later entry in the series but which might not be revealed in that particular entry.`
}

if (!selectionOptionDescription.fullseries) {
    selectionOptionDescription.fullseries = `Spoilers relating to any details from any entry in the series, including those typically revealed at the end. These include details typically referred to as "spoilers" and may be significantly "spoilery" since they may include crucial details from later entries.`
}

// Make selection inputs add descriptive text to explanation paragraph.
const inputs = document.querySelectorAll("#selectionbar input");
const selectionParagraph = document.querySelector("#selectionexplanation p")

function addSelectionDescription(){
    const objectKey = this.value;
    const objectName = "selectionOptionDescription."
    selectionParagraph.innerHTML = eval(objectName+objectKey);
}

for (let i=0; i<inputs.length; i++) {
    inputs[i].addEventListener("click", addSelectionDescription);
}