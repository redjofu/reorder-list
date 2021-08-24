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
main.innerHTML = `<div id="navbar">
    <ol id="entrylist"></ol>
</div>
<div id="selectionbar">
    <div id="selectionexplanation"><p>Select an option below for a description to appear here.</p></div>
    <div id="selectioncontent">
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
</div>
<div id="content">
    <h2 id="entrytitle">
</div>`

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


// Code for the scroll gradient
const selectionContent = document.getElementById("selectioncontent");
const selectionScroll = document.getElementById("selectionscroll");

function determineScrollGradient(){
    if ((selectionScroll.scrollHeight < selectionScroll.clientHeight) || (selectionScroll.scrollTop == 0)) {
        selectionContent.classList.remove("scrollhidetop");
    } else {
        selectionContent.classList.add("scrollhidetop");
    }

    if ((selectionScroll.scrollHeight < selectionScroll.clientHeight) || (Math.floor(selectionScroll.scrollTop) == selectionScroll.scrollHeight - selectionScroll.clientHeight)) {
        selectionContent.classList.remove("scrollhidebottom");
    } else {
        selectionContent.classList.add("scrollhidebottom");
    }
}
setTimeout(determineScrollGradient,100);
// determineScrollGradient()

selectionScroll.addEventListener("scroll", determineScrollGradient);


// Prime order inputs to work with buildNavBar
const orderInputs = document.querySelectorAll("#orderselection input");

// Build nav bar
const navBar = document.getElementById("navbar");
const entryList = document.getElementById("entrylist");

// Prepare variable so it can be used and reused each time the nav bar is rebuilt
let entryLogos; 

function buildNavBar() {
    // Reset navBar HTML
    entryList.innerHTML = '';
    
    // Determine order
    const entryOrder = []; // Array of the entries' order
    const entryOrderSorted = []; // Array of the entries' order, sorted
    const orderedEntries = []; // Array of the entries in correct order
    const orderDeterminer = this.value; // The "value" of the order input that has been selected

    for (let i=0; i<entries.length; i++) {
        const currentEntry = "entries[i].";
        entryOrder.push(eval(currentEntry+orderDeterminer));
    }

    for (let i=0; i<entries.length; i++) {
        entryOrderSorted.push(entryOrder[i]);
    }
    entryOrderSorted.sort();

    for (let i=0; i<entries.length; i++) {
        orderedEntries.push(entries[entryOrder.indexOf(entryOrderSorted[i])]);
    }

    // Build HTML of navBar
    for (let i=0; i<orderedEntries.length; i++) {
        const newLI = document.createElement("li");
        newLI.id = orderedEntries[i].code;
        newLI.classList.add(orderedEntries[i].type);
        newLI.innerHTML = `<img src="logos/${orderedEntries[i].image}">`
        entryList.appendChild(newLI);
    }

    // Prep navbar list for interactivity
    entryLogos = document.querySelectorAll("#entrylist li");
    
    // Set event listeners but only if the "entrylogos" variable has been defined
    if (typeof entryLogos !== 'undefined') {
        setEventListenersOnLogos();
    }
}


// Connect selection inputs to buildNavBar function
for (let i=0; i<orderInputs.length; i++) {
    orderInputs[i].addEventListener("click", buildNavBar);
}

orderInputs[0].click();



// Mark all type checkboxes as checked
const typeInputs = document.querySelectorAll("#typesselection input");

for (let i=0; i<typeInputs.length; i++) {
    typeInputs[i].checked=true;
}

function hideEntriesOfUncheckedType() {
    for (let i=0; i<entryLogos.length; i++) {
        if (entryLogos[i].classList.contains(this.value) && this.checked) {
            entryLogos[i].classList.remove("hid");
        } else if (entryLogos[i].classList.contains(this.value) && !this.checked) {
            entryLogos[i].classList.add("hid");
        }
    }

}

for (let i=0; i<typeInputs.length; i++) {
    typeInputs[i].addEventListener("click", hideEntriesOfUncheckedType);
}


// Set entry logos to be clickable elements to populate content area
const entryTitle = document.getElementById("entrytitle");

function populateContent() {
    console.log(`this.id: ${this.id}`)


}

function setEventListenersOnLogos() {
    for (let i=0; i<entryLogos.length; i++) {
        entryLogos[i].addEventListener("click", populateContent);
    }
}

setEventListenersOnLogos();