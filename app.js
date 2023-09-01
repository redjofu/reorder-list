try {
    if (pageLoads) {}
} catch (error) {
    console.error(error);
    console.log("404 page");
    throw new Error("Can't find the file!");
} 

// Sitewide constants
const siteTitle = "Diverse Orders";
const siteName = `<em>${siteTitle}</em>`;

// Set variables to be ready on page load but which may be adjusted after initial page load
let isInitialPageLoad = true;
let isIndividualEntryPage = true;
const isRootPage = urlPage == 'root' ? true : false;

// Build out main template elements
const head = document.querySelector("head");
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
main.id = "main";

// Head template
const headHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<style id="extracss"></style>
<style id="sidebarcss"></style>`;

head.insertAdjacentHTML("afterbegin", headHTML);

// Use custom head details
const title = document.querySelector("title");
title.innerText = `${pageTitle} | ${siteTitle}`;

// Find and set correct screen height
const extraCSS = document.getElementById("extracss");
// Note that since dvh is works regardless of mobile browser address/tab bar size, adding this extraCSS is no longer required.
// extraCSS.innerHTML = `:root {
//     --screen-height: ${window.innerHeight - 1}px !important;
// }`

const sidebarCSS = document.getElementById("sidebarcss");

let seriesList = '';

for (let i=0; i<seriesOptions.length; i++) {
    if (seriesOptions[i][0] != pageName) {
        seriesList += `<li><a href="/${seriesOptions[i][1]}">${seriesOptions[i][0]}</a></li>`;
    }
}
// if (seriesList == '') {
//     seriesList = "<li>Coming soon!</li>";
// }


// Header template
header.innerHTML = `<div id="header">
<div id="logo"><a href="/"><img id="logodesktop" alt="${siteTitle}" src="${baseDots}/logo.png"><img id="logomobile" alt="${siteTitle} Logo" src="${baseDots}/logomini.png"></a></div>
<a href="/${urlPage != 'root' ? urlPage : ''}">
    <h1 id="pagename">
        <span id="pagenamedesktop">${pageName}</span>
        <span id="pagenamemobile">${pageNameMobile}</span>
    </h1>
</a>
<div id="sitemenu">
    <div id="sitemenubutton"><span id="sitemenuicon">+</span><span id="sitemenutext"> More Orders</span></div>
    <ul id="sitemenuoptions">${seriesList}</ul>
</div>
</div>`;

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
<label for="release">Release Order</label>`;
const chronologicalInput = `<input type="radio" id="chronological" name="order" value="chronological">
<label for="chronological">Chronological Order</label>`;
const narrativeInput = `<input type="radio" id="narrative" name="order" value="narrative">
<label for="narrative">Narrative Order</label>`;
const specialInput = `${orderOptions.special ? `<input type="radio" id="special" name="order" value="special">
<label for="special">${capitalizeFirstLetter(specialOrderName)} Order</label>` : ''}`;
const alphabeticalInput = `<input type="radio" id="alphabetical" name="order" value="name">
<label for="alphabetical">Alphabetical Order</label>`;

// Main template
main.innerHTML = `<div id="navbarcontainer"><button id="navbarbutton" ${getGlobalInfo("hasNavBarBeenClicked") ? '' : 'class="dancebutton"'} aria-label="Access List of Entries"><img src="${baseDots}/order-arrows.svg" alt=""><img class="arrowbutton" src="${baseDots}/sidebar-arrow.svg" alt=""></button><div id="navbar" class="scrollarea">
    <ol id="entrylist"></ol>
</div></div>
<div id="selectionbar">
    <button id="selectionbarbutton" ${getGlobalInfo("hasSelectionBarBeenClicked") ? '' : 'class="dancebutton"'} aria-label="Access Order and Spoiler Options"><img class="arrowbutton" src="${baseDots}/sidebar-arrow.svg" alt=""><img src="${baseDots}/checkbox-icon.svg" alt=""></button>
    <div id="selectionbarcontainer">
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
                        ${orderOptions.special ? specialInput : ''}
                        ${orderOptions.alphabetical ? alphabeticalInput : ''}
                    </div>
                </div>
                <div id="spoilers">
                    <h3>Spoiler Level:</h3>
                    <div id="spoilerselection">
                        <button id="allspoilers">Show All</button>
                        <button id="hidespoilers">Hide All</button>

                        <input type="checkbox" id="premisestory" name="premisestory" value="premisestory">
                        <label for="premisestory">Premise Story Level</label>
                        <input type="checkbox" id="basicstory" name="basicstory" value="basicstory">
                        <label for="basicstory">Basic Story Level</label>
                        <input type="checkbox" id="fullstory" name="fullstory" value="fullstory">
                        <label for="fullstory">Full Story Level</label>
                        <hr>

                        ${subseries ? `<input type="checkbox" id="premisesubseries" name="premisesubseries" value="premisesubseries">
                        <label for="premisesubseries">Premise Subseries Level</label>
                        <input type="checkbox" id="basicsubseries" name="basicsubseries" value="basicsubseries">
                        <label for="basicsubseries">Basic Subseries Level</label>
                        <input type="checkbox" id="fullsubseries" name="fullsubseries" value="fullsubseries">
                        <label for="fullsubseries">Full Subseries Level</label>
                        <hr>` : ''}

                        <input type="checkbox" id="premiseseries" name="premiseseries" value="premiseseries">
                        <label for="premiseseries">Premise Series Level</label>
                        <input type="checkbox" id="basicseries" name="basicseries" value="basicseries">
                        <label for="basicseries">Basic Series Level</label>
                        <input type="checkbox" id="fullseries" name="fullseries" value="fullseries">
                        <label for="fullseries">Full Series Level</label>
                        
                        ${otherSeriesMentions ? `<hr>
                        <input type="checkbox" id="premiseotherseries" name="premiseotherseries" value="premiseotherseries">
                        <label for="premiseotherseries">Premise Other Series Level</label>
                        <input type="checkbox" id="basicotherseries" name="basicotherseries" value="basicotherseries">
                        <label for="basicotherseries">Basic Other Series Level</label>
                        <input type="checkbox" id="fullotherseries" name="fullotherseries" value="fullotherseries">
                        <label for="fullotherseries">Full Other Series Level</label>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="content">
    <div id="preliminarycontent" class="scrollarea"></div>
    <div id="contentcontainer" class="scrollarea hid" aria-hidden="true">
        <h2 id="entrytitle"></h2>
        <p id="jumplinks"></p>
        <img id="entryimage" class="hid bst spoiler" alt="">

        <div id="quickfacts"></div>

        <h3 id="keyfactsheading"></h3>
        <ul id="keyfacts"></ul>
        <h3 id="reviewsheading"></h3>
        <div id="reviews"></div>
        <h3 id="skippabilityheading"></h3>
        <div id="skippability"></div>
        ${creditScenesExist ? `<h3 id="creditsheading"></h3>
        <div id="credits"></div>` : ''}

        <h3 id="connectionsheading"></h3>
        <div id="connections"></div>
        ${characters ? `<h3 id="notablecharactersheading"></h3>
        <div id="notablecharacters"></div>` : '' }

        <h3 id="whyplacementheading"></h3>
        <div id="whyplacement"></div>

        <h3 id="resourcesheading">Resources</h3>
        <h4 id="wheretofindheading"></h4>
        <p id="wheretofind"></p>
        <h4 id="additionalinfoheading"></h4>
        <p id="additionalinfo"></p>
        <h4 id="contentguideheading"></h4>
        <p id="contentguide"></p>

        <hr>
        <p id="entrylink"></p>

        <p id="whychron"></p>
    </div>
</div>`;

const content = document.getElementById("content");
const preliminaryContent = document.getElementById("preliminarycontent");
const contentContainer = document.getElementById("contentcontainer");

const selectionBar = document.getElementById("selectionbar");
const selectionBarContainer = document.getElementById("selectionbarcontainer");
const selectionBarButton = document.getElementById("selectionbarbutton");

// Add the type inputs below the "Types Desired" H3.
if (typeOptions) { document.getElementById("types").appendChild(typeTemplate); }

// Recommended for first time?
function firstTime(recommendation, feeling) {
    if (recommendation) {
        return `This option is ${feeling} for those ${progressiveVerb} the series for the first time.`
    } else {
        return `This option is not recommended for those ${progressiveVerb} the series for the first time.`
    }
}

// Fill out missing selectionOptionDescription keys and values.
if (!selectionOptionDescription.release) {
    selectionOptionDescription.release = `The order according to each entry's original release date.`
}
if (!selectionOptionDescription.chooseRelease) {
    selectionOptionDescription.chooseRelease = `Choose this option to experience ${seriesName} as it was by ${userType} who first enjoyed each entry in the series.`
}
if (!selectionOptionDescription.recommendRelease) {
    selectionOptionDescription.recommendRelease = orderRec.releaseRec != undefined && orderRec.releaseFeeling ? firstTime(orderRec.releaseRec, orderRec.releaseFeeling) : '';
}
selectionOptionDescription.release += " " + selectionOptionDescription.chooseRelease + " " + selectionOptionDescription.recommendRelease;

if (!selectionOptionDescription.chronological) {
    selectionOptionDescription.chronological = `The order according to when the core events for each entry occur within the overarching story.`
}
if (!selectionOptionDescription.chooseChronological) {
    selectionOptionDescription.chooseChronological = `Choose this option to experience the events of ${seriesName} in the same sequence as the characters themselves.`
}
if (!selectionOptionDescription.recommendChronological) {
    selectionOptionDescription.recommendChronological = orderRec.chronologicalRec != undefined && orderRec.chronologicalFeeling ? firstTime(orderRec.chronologicalRec, orderRec.chronologicalFeeling) : '';
}
selectionOptionDescription.chronological += " " + selectionOptionDescription.chooseChronological + " " + selectionOptionDescription.recommendChronological;

if (!selectionOptionDescription.narrative) {
    selectionOptionDescription.narrative = `The order I feel provides the best narrative structure for ${userType}, especially for those ${progressiveVerb} for the first time.`
}
if (!selectionOptionDescription.chooseNarrative) {
    selectionOptionDescription.chooseNarrative = `Choose this option to experience the events of ${seriesName} in a sequence specially crafted to enhance the overall narrative.`
}
if (!selectionOptionDescription.recommendNarrative) {
    selectionOptionDescription.recommendNarrative = orderRec.narrativeRec != undefined && orderRec.narrativeFeeling ? firstTime(orderRec.narrativeRec, orderRec.narrativeFeeling) : '';
}
selectionOptionDescription.narrative += " " + selectionOptionDescription.chooseNarrative + " " + selectionOptionDescription.recommendNarrative;

if (!selectionOptionDescription.special) {
    selectionOptionDescription.special = `A special "${orderOptions.special ? specialOrderName : ''}" order.`
}
if (!selectionOptionDescription.chooseSpecial) {
    selectionOptionDescription.chooseSpecial = `Choose this option to experience the events in a sequence specially crafted according to the ${orderOptions.special ? specialOrderName : ''} order.`
}
if (!selectionOptionDescription.recommendSpecial) {
    selectionOptionDescription.recommendSpecial = orderRec.specialRec != undefined && orderRec.specialFeeling ? firstTime(orderRec.specialRec, orderRec.specialFeeling) : '';
}
selectionOptionDescription.special += " " + selectionOptionDescription.chooseSpecial + " " + selectionOptionDescription.recommendSpecial;

if (!selectionOptionDescription.name) {
    selectionOptionDescription.name = `Alphabetical order, intended to more easily find a specific entry but <em>not</em> intended as an order for ${progressiveVerb}.`
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

if (subseries) {
    if (!selectionOptionDescription.premisesubseries) {
        selectionOptionDescription.premisesubseries = `Spoilers relating to the pitch of the subseries (e.g. all ${subseriesExample} entries). These include only the sorts of details you might find out from ${blurbVerb} from a later entry in the subseries but which might not be revealed in that particular entry. All story-level spoilers (including full story-level spoilers) of a previous subseries entry are considered premise subseries-level spoiler for subsequent entries.`
    }

    if (!selectionOptionDescription.basicsubseries) {
        selectionOptionDescription.basicsubseries = `Spoilers relating to basic events of the subseries (e.g. all ${subseriesExample} entries). These include the sorts of details a friend might tell you after ${progressiveVerb} a later entry in the subseries but which might not be revealed in that particular entry. All story-level spoilers (including full story-level spoilers) of a previous subseries entry are considered premise subseries-level spoiler for subsequent entries.`
    }
    
    if (!selectionOptionDescription.fullsubseries) {
        selectionOptionDescription.fullsubseries = `Spoilers relating to any details from any entry in the subseries (e.g. all ${subseriesExample} entries), including those typically revealed at the end. These include details typically referred to as "spoilers" and may be significantly "spoilery" since they may include crucial details from later entries.`
    }
}


if (!selectionOptionDescription.premiseseries) {
    selectionOptionDescription.premiseseries = `Spoilers relating to the pitch of ${seriesName} as a whole. These include only the sorts of details you might find out from ${blurbVerb} from a later entry in the series but which might not be revealed in that particular entry. All story-level spoilers (including full story-level spoilers) of a previous series entry are considered premise series-level spoiler for subsequent entries.`
}

if (!selectionOptionDescription.basicseries) {
    selectionOptionDescription.basicseries = `Spoilers relating to basic events of ${seriesName}. These include the sorts of details a friend might tell you after ${progressiveVerb} a later entry in the series but which might not be revealed in that particular entry. All story-level spoilers (including full story-level spoilers) of a previous series entry are considered premise series-level spoiler for subsequent entries.`
}

if (!selectionOptionDescription.fullseries) {
    selectionOptionDescription.fullseries = `Spoilers relating to any details from any entry in ${seriesName}, including those typically revealed at the end. These include details typically referred to as "spoilers" and may be significantly "spoilery" since they may include crucial details from later entries.`
}

if (otherSeriesMentions) {
    if (!selectionOptionDescription.premiseotherseries) {
        selectionOptionDescription.premiseotherseries = `Spoilers relating to the pitch of any narratives outside of ${seriesName}. These include only the sorts of details you might find out from ${blurbVerb}.`
    }
    if (!selectionOptionDescription.basicotherseries) {
        selectionOptionDescription.basicotherseries = `Spoilers relating to basic events of any narratives outside of ${seriesName}. These include the sorts of details a friend might tell you after ${progressiveVerb} themselves.`
    }
    if (!selectionOptionDescription.fullotherseries) {
        selectionOptionDescription.fullotherseries = `Spoilers relating to any details from any narratives outside of ${seriesName}, including those typically revealed at the end. These include details typically referred to as "spoilers."`
    }
}


// Make selection inputs add descriptive text to explanation paragraph.
const inputs = document.querySelectorAll("#selectionbar input");
const selectionParagraph = document.querySelector("#selectionexplanation p")

function addSelectionDescription(){
    const objectKey = this.value;
    const objectName = "selectionOptionDescription."
    selectionParagraph.innerHTML = eval(objectName+objectKey);
    setTimeout(determineScrollGradient.bind(selectionParagraph),100);
}

for (let i=0; i<inputs.length; i++) {
    inputs[i].addEventListener("click", addSelectionDescription);
}

// Prime order inputs to work with buildNavBar
const orderInputs = document.querySelectorAll("#orderselection input");

// Prepare variable to keep track of the selected order type
let selectedOrder;
let selectedOrderName;

// Mark all type checkboxes as checked -- unless they were saved in a previous visit
const typeInputs = document.querySelectorAll("#typesselection input");

for (let i=0; i<typeInputs.length; i++) {
    const showType = getInfo(typeInputs[i].id);
    if (showType == 'true' || showType == null) {
        typeInputs[i].checked=true;
    }
}



function adjustTypes() {
    hideEntriesOfUncheckedType(this);
    saveCheckboxSelection(this);
}

function hideEntriesOfUncheckedType(typeInput) {
    for (let i=0; i<entryLogos.length; i++) {
        if (entryLogos[i].classList.contains(typeInput.value) && typeInput.checked) {
            entryLogos[i].classList.remove("hid");
            entryLogos[i].removeAttribute("aria-hidden");
        } else if (entryLogos[i].classList.contains(typeInput.value) && !typeInput.checked) {
            entryLogos[i].classList.add("hid");
            entryLogos[i].setAttribute("aria-hidden",true);
        }
    }
}

function saveCheckboxSelection(checkbox) {
    if (checkbox.checked) {
        saveInfo(checkbox.id, true);
    } else {
        saveInfo(checkbox.id, false);
    }
}

for (let i=0; i<typeInputs.length; i++) {
    typeInputs[i].addEventListener("click", adjustTypes);
}

// Build nav bar
const navBar = document.getElementById("navbar");
const navBarContainer = document.getElementById("navbarcontainer");
const navBarButton = document.getElementById("navbarbutton");
const entryList = document.getElementById("entrylist");
let entryListItems;

// Prepare variable so it can be used and reused each time the nav bar is rebuilt
let entryLogos;
let sortedEntries;

function buildNavBar(selectedOrderInput) {
    // Reset navBar HTML
    entryList.innerHTML = '';
    
    // Determine order
    const orderedEntries = sortEntries(selectedOrderInput.value); // Array
    sortedEntries = orderedEntries;

    // Build HTML of navBar
    for (let i=0; i<orderedEntries.length; i++) {
        const newLI = document.createElement("li");
        newLI.id = orderedEntries[i].code;
        newLI.classList.add(orderedEntries[i].type);
        newLI.innerHTML = `<img src="logos/${orderedEntries[i].logo}" alt="${orderedEntries[i].name}">`
        if (document.querySelector(`#${orderedEntries[i].type}`).checked) {
            newLI.classList.remove("hid");
            newLI.removeAttribute("aria-hidden");
        } else {
            newLI.classList.add("hid");
            newLI.setAttribute("aria-hidden",true);
        }
        entryList.appendChild(newLI);
    }

    // Remove event listeners to prep for navbar rebuild (but only if the "entrylogos" variable has been defined)
    if (typeof entryLogos !== 'undefined') {
        removeEventListenersOnLogos();
    }

    // Prep navbar list for interactivity
    entryLogos = document.querySelectorAll("#entrylist li");
    
    // Set event listeners but only if the "entrylogos" variable has been defined
    if (typeof entryLogos !== 'undefined') {
        setEventListenersOnLogos();
    }

    entryListItems = document.querySelectorAll("#entrylist li");
    if(!isIndividualEntryPage) { setTimeout(determineScrollGradient.bind(navBar),100); }
}

function sortEntries(orderDeterminer) { // Returns array
    const entryOrder = []; // Array of the order of the main "entries" array of objects
    const entryOrderSorted = []; // Array of the entries' order, sorted
    const orderedEntries = []; // Array of the entries in correct order

    for (let i=0; i<entries.length; i++) {
        let currentEntry = eval("entries[i]."+orderDeterminer);

        if (currentEntry != undefined) { 
            // Remove "A" or "The" from entry name when sorting alphabetically
            if (orderDeterminer == "name") {
                currentEntry = currentEntry.replace(/[.-:#!?$()']/g," "); // Replace punctuation with space to ensure these characters aren't considered when sorting
                currentEntry = currentEntry.replace("&","and");
                const currentEntryArray = currentEntry.split(" ");
                currentEntry = '';

                for (let i=0; i<currentEntryArray.length; i++) {
                    if (currentEntryArray[i].toLowerCase() != 'a' && currentEntryArray[i].toLowerCase() != 'the') {
                        currentEntry += currentEntryArray[i];
                    }
                }
            }

            entryOrder.push(currentEntry); 
        } else {
            entryOrder.push(null);
        }
    }

    for (let i=0; i<entryOrder.length; i++) {
        entryOrderSorted.push(entryOrder[i]);
    }

    if (Number.isInteger(entryOrderSorted[0])) {
        entryOrderSorted.sort((a,b) => a-b); // Correctly sort numbers. Info provided by https://dmitripavlutin.com/javascript-array-sort-numbers/
    } else {
        entryOrderSorted.sort();
    }

    for (let i=0; i<entryOrder.length; i++) {
        const orderedValue = entryOrderSorted[i];
        if (orderedValue != null) {
            orderedEntries.push(entries[entryOrder.indexOf(orderedValue)]);
        }
    }

    return orderedEntries;
}

function adjustOrder() {
    reflectOrderChange(this);
    if (!isInitialPageLoad) { saveOrderInputSelection(this); }
}

function saveOrderInputSelection(orderInput) {
    for (let i = 0; i < orderInputs.length; i++) {
        if (orderInput == orderInputs[i]) {
            saveInfo(orderInputs[i].id, true);    
        } else {
            saveInfo(orderInputs[i].id, false);
        }
    }
}

function reflectOrderChange(orderInput) {
    // sortedEntries = sortEntries(selectedOrder);
    buildNavBar(orderInput);
    selectedOrder = orderInput.value;
    if (selectedOrder == "name") {
        selectedOrderName = "alphabetical";
    } else {
        selectedOrderName = selectedOrder;
    }
    if (!isInitialPageLoad) { setURLParameter("order",selectedOrderName); }
    selectedOrderName = capitalizeFirstLetter(selectedOrderName);
    adjustContent();
    
}

// Connect selection inputs to buildNavBar function
for (let i=0; i<orderInputs.length; i++) {
    orderInputs[i].addEventListener("click", adjustOrder);
}

if (!isRootPage) {
    orderInputs[0].click();
}

// Code for the scroll gradient
const selectionContent = document.getElementById("selectioncontent");
const selectionScroll = document.getElementById("selectionscroll");

// function determineScrollGradient(){
//     if ((selectionScroll.scrollHeight < selectionScroll.clientHeight) || (selectionScroll.scrollTop == 0)) {
//         selectionContent.classList.remove("scrollhidetop");
//     } else {
//         selectionContent.classList.add("scrollhidetop");
//     }

//     if ((selectionScroll.scrollHeight < selectionScroll.clientHeight) || (Math.floor(selectionScroll.scrollTop) == selectionScroll.scrollHeight - selectionScroll.clientHeight)) {
//         selectionContent.classList.remove("scrollhidebottom");
//     } else {
//         selectionContent.classList.add("scrollhidebottom");
//     }
// }
function determineScrollGradient(){
    if ((this.scrollHeight < this.clientHeight) || (this.scrollTop == 0)) {
        this.parentElement.classList.remove("scrollhidetop");
    } else {
        this.parentElement.classList.add("scrollhidetop");
    }

    if ((this.scrollHeight < this.clientHeight) || (Math.floor(this.scrollTop) == this.scrollHeight - this.clientHeight)) {
        this.parentElement.classList.remove("scrollhidebottom");
    } else {
        this.parentElement.classList.add("scrollhidebottom");
    }
}
setTimeout(determineScrollGradient.bind(selectionScroll),100);

selectionScroll.addEventListener("scroll", determineScrollGradient);
preliminaryContent.addEventListener("scroll", determineScrollGradient);
contentContainer.addEventListener("scroll", determineScrollGradient);
selectionParagraph.addEventListener("scroll", determineScrollGradient);
navBar.addEventListener("scroll", determineScrollGradient);


// Set up spoiler checkboxes so checking a higher level also selects the lower level
const spoilerInputs = document.querySelectorAll("#spoilerselection input");

const showSpoilersButton = document.getElementById("allspoilers");
const hideSpoilersButton = document.getElementById("hidespoilers");

function showAllSpoilers() {
    spoilerInputs.forEach(checkbox => checkbox.checked = true);
    setUpSpoilerCheckboxes();
}

function hideAllSpoilers() {
    spoilerInputs.forEach(checkbox => checkbox.checked = false);
    setUpSpoilerCheckboxes();
}

showSpoilersButton.addEventListener("click", showAllSpoilers);
hideSpoilersButton.addEventListener("click", hideAllSpoilers);

const pst = document.getElementById("premisestory");
const bst = document.getElementById("basicstory");
const fst = document.getElementById("fullstory");
const psu = subseries ? document.getElementById("premisesubseries") : null;
const bsu = subseries ? document.getElementById("basicsubseries") : null;
const fsu = subseries ? document.getElementById("fullsubseries") : null;
const pse = document.getElementById("premiseseries");
const bse = document.getElementById("basicseries");
const fse = document.getElementById("fullseries");
const pos = otherSeriesMentions ? document.getElementById("premiseotherseries") : null;
const bos = otherSeriesMentions ? document.getElementById("basicotherseries") : null;
const fos = otherSeriesMentions ? document.getElementById("fullotherseries") : null;

function markLowerLevelSpoilers(clickedInput) {
    if (clickedInput.checked) {
        if (fse.checked) { bse.checked = true; fst.checked = true; if (fsu) { fsu.checked = true } }
        if (bse.checked) { pse.checked = true; bst.checked = true; if (bsu) { bsu.checked = true } }
        

        if (subseries) {
            if (fsu.checked) { bsu.checked = true; fst.checked = true; }
            if (bsu.checked) { psu.checked = true; bst.checked = true; }
            if (psu.checked) { pst.checked = true }
        }

        if (fst.checked) { bst.checked = true }
        if (bst.checked) { pst.checked = true }

        if (otherSeriesMentions) {
            if (fos.checked) { bos.checked = true; }
            if (bos.checked) { pos.checked = true; }
        }

    } else {
        if (!pst.checked) { bst.checked = false; if (psu) { psu.checked = false } }
        if (!bst.checked) { fst.checked = false; bse.checked = false; if (bsu) { bsu.checked = false } }
        if (!fst.checked) { fse.checked = false; if (fsu) { fsu.checked = false } }

        if (subseries) {
            if (!psu.checked) { bsu.checked = false; bse.checked = false; }
            if (!bsu.checked) { fsu.checked = false; bse.checked = false; }
            if (!fsu.checked) { fse.checked = false; }
        }

        if (!pse.checked) { bse.checked = false }
        if (!bse.checked) { fse.checked = false }

        if (otherSeriesMentions) {
            if (!pos.checked) { bos.checked = false; }
            if (!bos.checked) { fos.checked = false; }
        }
    }
}

//  Add/remove "hiddenspoiler" class to spoiler spans as applicable
function changeAllSpoilerStyling() {
    changeSpoilerStyling("");
    replaceSpoilerTitles();
}

function changeSpoilerStyling(extraSelector) {
    const spoilerSpans = document.querySelectorAll(extraSelector + " .spoiler");
    spoilerSpans.forEach(setCorrectSpoilerStyling)
}

function setCorrectSpoilerStyling(spoilerSpan) {
    addOrRemoveHiddenSpoiler(spoilerSpan, "pst", pst);
    addOrRemoveHiddenSpoiler(spoilerSpan, "bst", bst);
    addOrRemoveHiddenSpoiler(spoilerSpan, "fst", fst);
    if (subseries) {
        addOrRemoveHiddenSpoiler(spoilerSpan, "psu", psu);
        addOrRemoveHiddenSpoiler(spoilerSpan, "bsu", bsu);
        addOrRemoveHiddenSpoiler(spoilerSpan, "fsu", fsu);
    }
    addOrRemoveHiddenSpoiler(spoilerSpan, "pse", pse);
    addOrRemoveHiddenSpoiler(spoilerSpan, "bse", bse);
    addOrRemoveHiddenSpoiler(spoilerSpan, "fse", fse);
    if (otherSeriesMentions) {
        addOrRemoveHiddenSpoiler(spoilerSpan, "pos", pos);
        addOrRemoveHiddenSpoiler(spoilerSpan, "bos", bos);
        addOrRemoveHiddenSpoiler(spoilerSpan, "fos", fos);
    }
    
}

function addOrRemoveHiddenSpoiler(spoilerSpan, className, checkboxName) {
    if (spoilerSpan.classList.contains(className)) { 
        if (checkboxName.checked) {
            removeHiddenSpoiler(spoilerSpan);
        } else {
            spoilerSpan.classList.add("hiddenspoiler");
            spoilerSpan.addEventListener("click", () => {removeHiddenSpoiler(spoilerSpan)});
        }
    }
}

function removeHiddenSpoiler(spoilerSpan) {
    spoilerSpan.classList.remove("hiddenspoiler");
    spoilerSpan.removeAttribute("title");
}

// Set spoiler checkboxes to use correct functions
function setUpSpoilerCheckboxes() {
    markLowerLevelSpoilers(this);
    saveSpoilerSelections();
    changeAllSpoilerStyling();
}

function saveSpoilerSelections() {
    for (let i=0; i<spoilerInputs.length; i++) {
        if (spoilerInputs[i].checked) {
            saveInfo(spoilerInputs[i].id, true);
        } else {
            saveInfo(spoilerInputs[i].id, false);
        }
    }
}

for (let i=0; i<spoilerInputs.length; i++) {
    spoilerInputs[i].addEventListener("click", setUpSpoilerCheckboxes);
}

// Initial content displayed to the user on the main screen. This goes away once an entry is selected.
function populateInitialContent() {
    injectCanonical(`/${urlPage}`);

    // Opening paragraph
    const initialOpening = `<h2 id="initialtitle">Welcome, ${greetingsName ? greetingsName : 'Friend'}!</h2>
    <p>If you're looking for the best order to ${infinitiveVerb} ${seriesName}, ${siteName} has you covered! The selection bar on the right allows you to customize what you want to see. The navigation bar on the left restructures itself as you pick your preferred order, and you can select individual entries for more details.</p>
    <p>${pageName} data on ${siteName} last updated: ${parseDate(timestamp[urlPage])}</p>`;

    // "Types of Entires" section
    let typeExplanations = '';

    if (typeOptions) {
        for (let i=0; i<typeOptions.length; i++) {
            typeExplanations += `<p><strong>${typeOptions[i][0]}:</strong> ${selectionOptionDescription[typeOptions[i][1]]}</p>`;
        }
    }

    // "Available Orders" section
    const orderExplanations = `${orderOptions.release ? '<p><strong>Release Order:</strong> ' + selectionOptionDescription.release + '</p>' : ''}
    ${orderOptions.chronological ? '<p><strong>Chronological Order:</strong> ' + selectionOptionDescription.chronological + '</p>' : ''}
    ${orderOptions.narrative ? '<p><strong>Narrative Order:</strong> ' + selectionOptionDescription.narrative + '</p>' : ''}
    ${orderOptions.special ? '<p><strong>' + capitalizeFirstLetter(specialOrderName) + ' Order:</strong> ' + selectionOptionDescription.special + '</p>' : ''}
    ${orderOptions.alphabetical ? '<p><strong>Alphabetical Order:</strong> ' + selectionOptionDescription.name + '</p>' : ''}`;

    // "Spoiler Settings" section
    const spoilerExplanations = `<p><strong>Premise Story Level:</strong> ${selectionOptionDescription.premisestory}</p>
    <p><strong>Basic Story Level:</strong> ${selectionOptionDescription.basicstory}</p>
    <p><strong>Full Story Level:</strong> ${selectionOptionDescription.fullstory}</p>
    <hr>
    ${subseries ? '<p><strong>Premise Subseries Level:</strong> ' + selectionOptionDescription.premisesubseries + '</p>' +
    '<p><strong>Premise Subseries Level:</strong> ' + selectionOptionDescription.basicsubseries + '</p>' +
    '<p><strong>Premise Subseries Level:</strong> ' + selectionOptionDescription.fullsubseries + '</p>' +
    '<hr>' : ''}
    <p><strong>Premise Series Level:</strong> ${selectionOptionDescription.premiseseries}</p>
    <p><strong>Basic Series Level:</strong> ${selectionOptionDescription.basicseries}</p>
    <p><strong>Full Series Level:</strong> ${selectionOptionDescription.fullseries}</p>
    ${otherSeriesMentions ? '<hr><p><strong>Premise Other Series Level:</strong> ' + selectionOptionDescription.premiseotherseries + '</p>' +
    '<p><strong>Premise Other Series Level:</strong> ' + selectionOptionDescription.basicotherseries + '</p>' +
    '<p><strong>Premise Other Series Level:</strong> ' + selectionOptionDescription.fullotherseries + '</p>' : ''}`;

    // "Individual Entry Page Links Section"
    const individualPageLinksExplanation = `<p>The preferred method of navigating the site is by clicking on the entires in the left navigation bar. However, for your convenience, links to pages for each of these individual entries is provided below. Note that these pages show all spoilers and do not have either the navigation bar or the selection bar available for use.</p>`;

    const listOfEntries = sortEntries("release");

    let pageLinks = '';

    for (let i = 0; i < listOfEntries.length; i++) {
        // pageLinks += `${i != 0 ? ' | ' : ''}<a href="/${urlPage}/${listOfEntries[i].code}">${listOfEntries[i].name}</a>`;
        pageLinks += `<li><a href="/${urlPage}/${listOfEntries[i].code}">${listOfEntries[i].name}</a></li>`;
    }

    const initialContent = `${initialOpening}
    ${typeOptions ? '<h3>Types of Entries</h3>' + typeExplanations : ''}
    <h3>Available Orders</h3>
    ${orderExplanations}
    <h3>Spoiler Settings</h3>
    ${spoilerExplanations}
    <h3>Individual Entry Page Links</h3>
    ${individualPageLinksExplanation}
    <ul>${pageLinks}</ul>`;

    preliminaryContent.innerHTML = initialContent;
}

// Set entry logos to be clickable elements to populate content area
const entryTitle = document.getElementById("entrytitle");
const entryImage = document.getElementById("entryimage");
const whereToFindHeading = document.getElementById("wheretofindheading");
const whereToFind = document.getElementById("wheretofind");
const additionalInfoHeading = document.getElementById("additionalinfoheading");
const additionalInfo = document.getElementById("additionalinfo");
const contentGuideHeading = document.getElementById("contentguideheading");
const contentGuide = document.getElementById("contentguide");

const jumpLinks = document.getElementById("jumplinks");
const quickFacts = document.getElementById("quickfacts");
const keyFactsHeading = document.getElementById("keyfactsheading");
const keyFacts = document.getElementById("keyfacts");
const skippabilityHeading = document.getElementById("skippabilityheading");
const skippability = document.getElementById("skippability");
const creditsHeading = document.getElementById("creditsheading");
const credits = document.getElementById("credits");
const reviewsHeading = document.getElementById("reviewsheading");
const reviews = document.getElementById("reviews");
const connectionsHeading = document.getElementById("connectionsheading");
const connections = document.getElementById("connections");
const notableCharactersHeading = document.getElementById("notablecharactersheading");
const notableCharacters = document.getElementById("notablecharacters");
const whyPlacementHeading = document.getElementById("whyplacementheading");
const whyPlacement = document.getElementById("whyplacement");
const whyChron = document.getElementById("whychron");
const entryLink = document.getElementById("entrylink");

// Thanks for some array/object searching help: https://stackoverflow.com/questions/7176908/how-can-i-get-the-index-of-an-object-by-its-property-in-javascript
function findEntryIndex(id, key, entryArray) {
    return entryArray.findIndex(item => item[key] === id);
}

function populateContent() {

    cleanUpPreviousContent();

    // const entryIndex = entries.findIndex(item => item.code === this.id);

    // entryTitle.textContent = entries[entryIndex].name;

    // const entry = entries[entries.findIndex(item => item.code === this.id)];

    const entry = entries[findEntryIndex(this.id, "code", entries)];

    injectCanonical(`/${urlPage}/${entry.code}`);
    if (isIndividualEntryPage) { title.innerText = `${entry.name} | ${siteTitle}`; }

    // populatePrevAndNext(entry);
    populateJumpLinks(entry);
    if (isIndividualEntryPage && entry.youtube) { populateYouTubeEmbed(entry.youtube); }
    populateQuickFacts(entry);

    populateKeyFacts(entry);
    populateSkippability(entry);
    populateReviews(entry);
    if (creditScenesExist) { populateCredits(entry); }
    populateCharacters(entry);

    populateWhyContent(entry);
    populateConnections(entry);

    populateWhereToFind(entry);
    populateAdditionalInfo(entry);
    populateContentGuide(entry);

    populateEntryLink(entry);

    replaceExtraTags();

    replaceAllSpoilerTags();
    changeAllSpoilerStyling();

    hideEmptyElements();

    setTimeout(determineScrollGradient.bind(contentContainer),100);
    preliminaryContent.classList.add("hid");
    preliminaryContent.setAttribute("aria-hidden",true);
    contentContainer.classList.remove("hid");
    contentContainer.removeAttribute("aria-hidden");
    contentContainer.scrollTo(0,0);

    if(!isIndividualEntryPage) { setURLParameter("entry",entry.code); }
}

function cleanUpPreviousContent() {
    // Remove entry tag event listeners
    const existingEntryTags = document.querySelectorAll(".entrytag");

    for (let i=0; i<existingEntryTags.length; i++) {
        existingEntryTags[i].remove();
    }
}

function injectCanonical(canonicalURL) {
    if (document.querySelector(`link[rel="canonical"]`)) {
        document.querySelector(`link[rel="canonical"]`).remove();
    }

    const canonicalTag = document.createElement("link");
    canonicalTag.setAttribute("rel","canonical");
    canonicalTag.setAttribute("href",canonicalURL);

    head.append(canonicalTag);
}

function populatePrevAndNext(entry) {
    const entryIndex = findEntryIndex(entry.code, "code", sortedEntries);
    const prevEntry = sortedEntries[entryIndex-1] ? sortedEntries[entryIndex-1] : null;
    const nextEntry = sortedEntries[entryIndex+1] ? sortedEntries[entryIndex+1] : null;

    // const divExists = document.getElementById("otherentrydiv") ? true : false;
    if (!document.getElementById("otherentrydiv")) {
        contentContainer.insertAdjacentHTML("afterbegin", '<div id="otherentrydiv"></div>');
    }

    const otherEntryDiv = document.getElementById("otherentrydiv");

    otherEntryDiv.innerHTML = `<span class="ordertype">${selectedOrderName}</span>
    <span class="preventry">Prev: (<span class="ordername">${prevEntry ? prevEntry.name : 'N/A'}</span>)</span>
    <span class="nextentry">Next: (<span class="ordername">${nextEntry ? nextEntry.name : 'N/A'}</span>)</span>`;
}

function populateJumpLinks(entry) {
    let jumpLinksList = '';

    if (isIndividualEntryPage && entry.youtube) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#quickfacts">Quick Facts</a>`; }
    if (entry.keyfacts) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#keyfactsheading">Key Facts</a>`; }
    if (entry.rottencritics || entry.rottenaudience || entry.metascore || entry.mcuserscore || entry.cinemascore || entry.mparating || entry.tvrating || entry.commonsenseage || entry.kimrating) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#reviewsheading">Reviews</a>`; }
    if (entry.skipno || entry.skpyes) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#skippabilityheading">Skippability</a>`; }
    if (entry.creditscenes) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#creditsheading">Credit Scenes</a>`; }
    if (entry.connections) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#connectionsheading">Connections</a>`; }
    if (entry.characters) { jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#notablecharactersheading">Characters</a>`; }
    jumpLinksList += `${jumpLinksList.length > 0 ? ' | ' : ''}<a href="#resourcesheading">Resources</a>`;

    jumpLinks.innerHTML = jumpLinksList;
}

function populateYouTubeEmbed(youtubeCode) {
    const youtubeEmbed = `<iframe id="youtubeembed" src="https://www.youtube-nocookie.com/embed/${youtubeCode}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

    jumpLinks.insertAdjacentHTML("afterend",youtubeEmbed);
}

// Quick facts section
function populateQuickFacts(entry) {
    entryTitle.textContent = entry.name;
    addEntryImage(entry);

    let quickFactInfo =`${entry.release ? '<p><strong>Release date:</strong> ' + parseDate(entry.release) + '</p>' : ''}
    ${entry.classification ? '<p><strong>Type:</strong> ' + entry.classification + '</p>' : ''}
    ${entry.length && entry.lengthtype ? '<p><strong>Length:</strong> ' + parseLength(entry) + '</p>' : ''}
    ${entry.phase ? '<p><strong>Phase:</strong> ' + entry.phase + '</p>' : ''}
    ${sagaNames && entry.phase ? '<p><strong>Saga:</strong> ' + sagaNames[entry.phase] + '</p>' : ''}
    ${entry.subseries.primary && subseries ? '<p><strong>Subseries:</strong> ' + `<psu>${entry.subseries.primary[0]}</psu>${entry.subseries.primary.length>1 ? " (<bsu>" + entry.subseries.primary[1] + "</bsu>)" : ''}` + '</p>' : ''}
    ${entry.subseries.secondary && subseries ? '<p><strong>Related subseries:</strong> ' + populateRelatedSubseries(entry) + '</p>' : ''}`;
    
    quickFacts.innerHTML = quickFactInfo;

    function populateRelatedSubseries(entry) {
        let relatedSubList = '';

        for (let i = 0; i < entry.subseries.secondary.length; i++) {
            const spoilerType = entry.subseries.secondary[i][2] ? entry.subseries.secondary[i][2] : false;
            relatedSubList = relatedSubList + (spoilerType ? `<${spoilerType}>` : "<pst>") + entry.subseries.secondary[i][0] + (entry.subseries.secondary[i][1] ? " (" + entry.subseries.secondary[i][1] + (spoilerType ? `</${spoilerType}>` : "</pst>") + ")" : '');
            if (entry.subseries.secondary.length > 1 && i < entry.subseries.secondary.length) {
                relatedSubList = relatedSubList + ", "
            }
        }

        return relatedSubList;
    }
}

function addEntryImage(entry) {
    if (entry.image) {
        entryImage.src = "images/" + entry.image;
        entryImage.alt = `${entry.name}${imageType ? ' ' + imageType : ''}`;
        removeSpoilerClasses();
        if (entry.imagespoiler) {
            entryImage.classList.add(entry.imagespoiler);
        }
        entryImage.classList.remove("hid");
        entryImage.removeAttribute("aria-hidden");
    } else {
        entryImage.src = "";
        entryImage.alt = "";
        entryImage.classList.add("hid");
        entryImage.setAttribute("aria-hidden",true);
    }
    
}

function removeSpoilerClasses() {
    entryImage.classList.remove("pst");
    entryImage.classList.remove("bst");
    entryImage.classList.remove("fst");
    entryImage.classList.remove("psu");
    entryImage.classList.remove("bsu");
    entryImage.classList.remove("fsu");
    entryImage.classList.remove("pse");
    entryImage.classList.remove("bse");
    entryImage.classList.remove("fse");
    entryImage.classList.remove("ose");
}

// Format date correctly
function parseDate(dateString) {
    let formattedDate = dateString;

    try {
        const dateArray = dateString.split("-");
        
        let formattedMonth;
        if (dateArray[1]) {
            if (dateArray[1] == "01") { formattedMonth = "Jan" }
            else if (dateArray[1] == "02") { formattedMonth = "Feb" }
            else if (dateArray[1] == "03") { formattedMonth = "Mar" }
            else if (dateArray[1] == "04") { formattedMonth = "Apr" }
            else if (dateArray[1] == "05") { formattedMonth = "May" }
            else if (dateArray[1] == "06") { formattedMonth = "Jun" }
            else if (dateArray[1] == "07") { formattedMonth = "Jul" }
            else if (dateArray[1] == "08") { formattedMonth = "Aug" }
            else if (dateArray[1] == "09") { formattedMonth = "Sep" }
            else if (dateArray[1] == "10") { formattedMonth = "Oct" }
            else if (dateArray[1] == "11") { formattedMonth = "Nov" }
            else if (dateArray[1] == "12") { formattedMonth = "Dec" }
            else { throw new Error("Couldn't identify entry month") }
        }
    
        if (dateArray[2] && formattedMonth) { // If there's also a month and day
            formattedDate = formattedMonth + " " + dateArray[2] + ", " + dateArray[0];
        } else if (formattedMonth) { // If there's a month but no day
            formattedDate = formattedMonth + " " + dateArray[0];
        } else {
            formattedDate = dateArray[0]; // Set date as year.
        }

    } catch (error) {
        console.error(error);
    } finally {
        return formattedDate;
    }
}

function parseLength(entry) {
    let friendlyLength;

    if (entry.lengthtype == "minutes") {
        const calcHours = Math.floor(entry.length / 60);
        const calcMinutes = entry.length - (calcHours * 60);
        const hours = calcHours > 0 ? calcHours + "h" : '';
        const minutes = calcMinutes + "m";
        friendlyLength = `${hours}${hours != '' ? ' ' : ''}${minutes}`
    } else if (entry.lengthtype == "episodes") {
        friendlyLength = `${entry.length} episodes`
    }

    return friendlyLength;
}

// "Where to Find" Section
const iconFilePath = `${baseDots}/icons/`;
const disneyPlusIcon = "disneyplus.png";
const netflixIcon = "netflix.jpeg";
const hboMaxIcon = "hbomax.jpeg";
const starzIcon = "starz.webp";
const primeVideoIcon = "primevideo.jpeg";
const vuduIcon = "vudu.jpeg";
const appleTVIcon = "appletv.png";
const googlePlayIcon = "googleplay.png";
const redboxIcon = "redbox.png";
const netflixDVDIcon = "netflixdvd.png";
const amazonIcon = "amazon.png";
const walmartIcon = "walmart.png";
const targetIcon = "target.jpeg";
const bestBuyIcon = "bestbuy.jpeg";
const ebayIcon = "ebay.png";

function populateWhereToFind(entry) {
    whereToFindHeading.textContent = `Where to ${infinitiveVerb ? capitalizeFirstLetter(infinitiveVerb) : 'Find'}`;
    whereToFind.innerHTML = `<p>Purchase, subscription, or rental required (depending on the service). Title may not be available in your region or may no longer be availabe.</p>
    <ul class="iconlist">
    ${entry.disneyplus ? '<li><a href="https://www.disneyplus.com/' + entry.disneyplus + '"><img src="' + iconFilePath + disneyPlusIcon + '" alt="Disney+"></a></li>' : ''}
    ${entry.netflixstream ? '<li><a href="https://www.netflix.com/title/' + entry.netflix + '"><img src="' + iconFilePath + netflixIcon + '" alt="Netflix"></a></li>' : ''}
    ${entry.hbomax ? '<li><a href="https://www.max.com/' + entry.hbomax + '"><img src="' + iconFilePath + hboMaxIcon + '" alt="HBO Max"></a></li>' : ''}
    ${entry.starz ? '<li><a href="https://www.starz.com/' + entry.starz + '"><img src="' + iconFilePath + starzIcon + '" alt="Starz"></a></li>' : ''}
    ${entry.primevideo ? '<li><a href="https://www.amazon.com/gp/video/detail/' + entry.primevideo + '"><img src="' + iconFilePath + primeVideoIcon + '" alt="Prime Video"></a></li>' : ''}
    ${entry.vudu ? '<li><a href="https://www.vudu.com/content/movies/details/' + entry.code + '/' + entry.vudu + '"><img src="' + iconFilePath + vuduIcon + '" alt="Vudu Fandango"></a></li>' : ''}
    ${entry.appletv ? '<li><a href="https://tv.apple.com/' + entry.appletv + '"><img src="' + iconFilePath + appleTVIcon + '" alt="Apple TV"></a></li>' : ''}
    ${entry.googleplay ? '<li><a href="https://play.google.com/store/' + entry.googleplay + '"><img src="' + iconFilePath + googlePlayIcon + '" alt="Google Play"></a></li>' : ''}
    ${entry.redbox ? '<li><a href="https://www.redbox.com/movies/' + entry.redbox + '"><img src="' + iconFilePath + redboxIcon + '" alt="Redbox"></a></li>' : ''}
    ${entry.netflixdvd ? '<li><a href="https://dvd.netflix.com/Movie/' + entry.netflix + '"><img src="' + iconFilePath + netflixDVDIcon + '" alt="DVD.com &ndash; a Netflix Company"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.amazon.com/s?k=' + prepForURL(entry.name) + '&i=movies-tv&rh=n%3A2625373011%2Cp_n_format_browse-bin%3A2650304011%7C2650305011%7C9397930011"><img src="' + iconFilePath + amazonIcon + '" alt="Search Amazon"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.walmart.com/search?q=' + prepForURL(entry.name) + '+blu-ray&catId=4096"><img src="' + iconFilePath + walmartIcon + '" alt="Search Walmart"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.target.com/s?searchTerm=' + prepForURL(entry.name) + '&category=5xsxe&facetedValue=cz41e"><img src="' + iconFilePath + targetIcon + '" alt="Search Target"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=category_facet%3DMovies%20%26%20TV%20Shows~cat02015&st=' + prepForURL(entry.name) + '"><img src="' + iconFilePath + bestBuyIcon + '" alt="Search Best Buy"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.ebay.com/sch/617/i.html?_from=R40&_nkw=' + prepForURL(entry.name) + '"><img src="' + iconFilePath + ebayIcon + '" alt="Search eBay"></a></li>' : ''}
    </ul>`;
}
// Other services to check: Hulu, Fubo, Tubi, Paramount+, Freevee, Peacock

function prepForURL(string) {
    return string.toLowerCase().replaceAll(" ","+");
}


// "Additional Info" Section
const wikipediaIcon = "wikipedia.jpeg";
const rottenTomatoesIcon = "rottentomatoes.png";
const metacriticIcon = "metacritic.png";
const imdbIcon = "imdb.jpg";
const wikiquoteIcon = "wikiquote.png";
const youtubeIcon = "youtube.jpeg";
const spotifyIcon = "spotify.png";


function populateAdditionalInfo(entry) {
    additionalInfoHeading.textContent = "Additional Information";
    additionalInfo.innerHTML = `<p>Looking for more details or reviews for <entry code="self"></entry>? Check out these resources.</p>
    <ul class="iconlist">
    ${entry.official ? '<li><a href="' + officialSite.url + entry.official + '"><img src="' + iconFilePath + officialSite.icon + '" alt="' + officialSite.description + '"></a></li>' : ''}
    ${entry.wiki ? '<li><a href="' + wiki.url + entry.wiki + '"><img src="' + iconFilePath + wiki.icon + '" alt="' + wiki.description + '"></a></li>' : ''}
    ${entry.wikipedia ? '<li><a href="https://en.wikipedia.org/wiki/' + entry.wikipedia + '"><img src="' + iconFilePath + wikipediaIcon + '" alt="Wikipedia"></a></li>' : ''}
    ${entry.rottentomatoes ? '<li><a href="https://www.rottentomatoes.com/' + entry.rottentomatoes + '"><img src="' + iconFilePath + rottenTomatoesIcon + '" alt="Rotten Tomatoes"></a></li>' : ''}
    ${entry.metacritic ? '<li><a href="https://www.metacritic.com/' + entry.metacritic + '"><img src="' + iconFilePath + metacriticIcon + '" alt="Metacritic"></a></li>' : ''}
    ${entry.imdb ? '<li><a href="https://www.imdb.com/title/' + entry.imdb + '"><img src="' + iconFilePath + imdbIcon + '" alt="IMDb"></a></li>' : ''}
    ${entry.wikiquote ? '<li><a href="https://en.wikiquote.org/wiki/' + entry.wikiquote + '"><img src="' + iconFilePath + wikiquoteIcon + '" alt="Wikiquote"></a></li>' : ''}
    ${entry.youtube ? '<li><a href="https://www.youtube.com/watch?v=' + entry.youtube + '"><img src="' + iconFilePath + youtubeIcon + '" alt="YouTube"></a></li>' : ''}
    ${entry.spotify ? '<li><a href="https://open.spotify.com/' + entry.spotify + '"><img src="' + iconFilePath + spotifyIcon + '" alt="Spotify"></a></li>' : ''}
    </ul>`;
}



// "Content Guide" Section

const commonSenseIcon = "commonsense.jpeg";
const kimIcon = "kim.jpg";
const vidAngelIcon = "vidangel.png";
const clearPlayIcon = "clearplay.jpg";

function populateContentGuide(entry) {
    let clearplayURL;
    if (entry.clearplay) {
        if (entry.clearplay == 'streaming') {
            clearplayURL = 'https://web.clearplay.com/search';
        } else {
            clearplayURL = 'https://www.clearplay.com/MovieDash.aspx?id=' + entry.clearplay;
        }
    }
    
    contentGuideHeading.textContent = "Content Guide for Parents";
    contentGuide.innerHTML = `<p>Not all content may be appropriate for children or concerned individuals. These services may help.</p>
    <ul class="iconlist">
    ${entry.commonsense ? '<li><a href="https://www.commonsensemedia.org/' + entry.commonsense + '"><img src="' + iconFilePath + commonSenseIcon + '" alt="Common Sense Media"></a></li>' : ''}
    ${entry.imdb ? '<li><a href="https://www.imdb.com/title/' + entry.imdb + '/parentalguide"><img src="' + iconFilePath + imdbIcon + '" alt="IMDb Parental Guide"></a></li>' : ''}
    ${entry.kim ? '<li><a href="https://kids-in-mind.com/' + entry.kim + '"><img src="' + iconFilePath + kimIcon + '" alt="Kids-In-Mind"></a></li>' : ''}
    ${entry.vidangel ? '<li><a href="https://www.vidangel.com/' + entry.vidangel + '"><img src="' + iconFilePath + vidAngelIcon + '" alt="VidAngel"></a></li>' : ''}
    ${entry.clearplay ? '<li><a href="' + clearplayURL + '"><img src="' + iconFilePath + clearPlayIcon + '" alt="ClearPlay"></a></li>' : ''}
    </ul>`;
}

function populateEntryLink(entry) {
    const entryLinkParagraphText = `For a less cluttered version without the nav bar or selection bar&mdash;and which has all spoilers turned on&mdash;please check out our <a href="/${urlPage}/${entry.code}"><em>${entry.name}</em> page</a>.`;

    entryLink.innerHTML = entryLinkParagraphText;
}

function populateKeyFacts(entry) {
    let keyFactsList = '';

    function buildKeyFactsList(fact) {
        keyFactsList = keyFactsList + `<li>${fact[1] ? '<' + fact[1] + '>' : ''}${fact[0]}${fact[1] ? '<' + fact[1] + '>' : ''}`;
    }

    if (entry.keyfacts && entry.keyfacts.length && typeof(entry.keyfacts) == 'object') {
        // for (let i=0; entry.keyfacts.length; i++) {

        // }
        entry.keyfacts.forEach(buildKeyFactsList);
        // spoilerInputs.forEach(checkbox => checkbox.checked = true);
    }

    keyFactsHeading.textContent = `${keyFactsList != '' ? 'Key Fact' : ''}${keyFactsList != '' && typeof(entry.keyfacts) == 'object' && entry.keyfacts.length > 1 ? 's' : ''}`;
    keyFacts.innerHTML = keyFactsList;
}

function populateSkippability(entry) {
    let skippabilityContent = '';

    if (entry.skipno && entry.skipyes) {
        skippabilityContent = `<h4>Why You Shouldn't Skip It</h4>
        <p>${entry.skipno}</p>
        <h4>Why You Might Want to Skip It</h4>
        <p>${entry.skipyes}</p>`;
    } else if (entry.skipno || entry.skipyes) {
        skippabilityContent = `<p>${entry.skipno ? entry.skipno : entry.skipyes}</p>`;
    }

    skippabilityHeading.textContent = `${skippabilityContent != '' ? 'Skippability' : ''}`;
    skippability.innerHTML = skippabilityContent;
}

function populateReviews(entry) {
    let reviewsList = '';

    if (entry.rottencritics || entry.rottenaudience) {
        reviewsList = reviewsList + `<p>${entry.rottentomatoes ? '<a href="https://www.rottentomatoes.com/' + entry.rottentomatoes + '">' : ''}
            <strong>Rotten Tomatoes:</strong> ${entry.rottencritics ? entry.rottencritics + '%<span class="reviewDescriptor"> (Tomatometer)</span>' : ''}
            ${entry.rottencritics && entry.rottenaudience ? ' | ' : ''}
            ${entry.rottenaudience ? entry.rottenaudience + '%<span class="reviewDescriptor"> (Audience Score)</span>' : ''}
            ${entry.rottentomatoes ? '</a>' : ''}</p>`;
    }
    if (entry.metascore || entry.mcuserscore) {
        reviewsList = reviewsList + `<p>${entry.metacritic ? '<a href="https://www.metacritic.com/' + entry.metacritic + '">' : ''}
            <strong>Metacritic:</strong> ${entry.metascore ? entry.metascore + '<span class="reviewDescriptor"> (Metascore)</span>' : ''}
            ${entry.metascore && entry.mcuserscore ? ' | ' : ''}
            ${entry.mcuserscore ? entry.mcuserscore.toFixed(1) + '<span class="reviewDescriptor"> (User Score)</span>' : ''}
            ${entry.metacritic ? '</a>' : ''}</p>`;
    }
    if (entry.cinemascore) {
        reviewsList = reviewsList + `<p><a href="https://www.cinemascore.com/"><strong>CinemaScore:</strong> ${entry.cinemascore}</a></p>`;
    }
    if (entry.mparating) { 
        reviewsList = reviewsList + `<p><a href="https://www.filmratings.com/Search?filmTitle=${prepForURL(entry.name)}"><strong>MPA Rating:</strong> ${entry.mparating}</a></p>`;
    }
    if (entry.tvrating) {
        reviewsList = reviewsList + `<p><a href="http://www.tvguidelines.org/ratings.html"><strong>TV Parental Guidelines:</strong> ${entry.tvrating}${entry.tvratingreason ? " (" + entry.tvratingreason + ")": ""}</a></p>`;
    }
    if (entry.commonsenseage) {
        reviewsList = reviewsList + `<p><a href="https://www.commonsensemedia.org/${entry.commonsense ? entry.commonsense : ''}"><strong>Common Sense Media <span class="reviewDescriptor">Age Recommendation</span>:</strong> ${entry.commonsenseage}+</a></p>`;
    }
    if (entry.kimrating) {
        reviewsList = reviewsList + `<p><a href="https://kids-in-mind.com/${entry.kim ? entry.kim : ""}"><strong>Kids-In-Mind Rating:</strong> ${entry.kimrating}</a></p>`;
    }

    
    reviewsHeading.textContent = `${reviewsList != '' ? 'Reviews and Ratings' : ''}`;
    reviews.innerHTML = reviewsList;
}

function populateCredits(entry) {
    const creditsExplanation = `<button id="whatiscreditscene">What is a "credit scene"?</button>
        <p class="paragraphtext hiddenelement">Credit scenes, or stingers, are placed after the core narrative is over and all major plot points resolved. They may occur either after all credits have rolled (post-credits scenes), after only some have finished (mid-credits scenes), or&mdash;rarely&mdash;after the resolution of the story but just before the credits begin.</p>
        <p class="paragraphtext hiddenelement">Credit scenes come in a few types, usually either calling back to the events of the narrative (perhaps drawing attention to an unresolved plot point) or by foreshadowing future entries in the series. (Note that in a few cases, the foreshadowed events may not actually be fulfilled in future entries if decisions were made later not to pursue those narrative threads.) The phrases "foreshadow future" and "narrative reference" are used here. Another type, "scene of future title," might indicate that the credit scene is a trailer for or a clip directly from an entry that hadn't been released at the time.</p>
        <p class="paragraphtext hiddenelement">If you are ${progressiveVerb} ${seriesName} in release order, credits scenes will convey information as the ${mediaCreators} intended. However if you are ${progressiveVerb} the series for the first time in a different order, you may get spoilers for an entry you haven't yet gotten to. For this reason, details are presented here to help you determine whether to watch the credits scenes or not if you want to avoid spoilers.</p>
        <p class="paragraphtext hiddenelement">(Note that recommendations are based on spoilers only, and no differentiation is made between premise-level spoilers or other levels. Recommendations are not based on whether watching the scene may be deemed worthwhile or not.)</p>`;
    
    let creditsHeadingText = '';
    let creditsList = '';

    if (entry.creditscenes) {
        let creditScenesLength = entry.creditscenes.length;

        for (let i=0; i<creditScenesLength; i++) {
            let sceneDetails = '';
            sceneDetails = sceneDetails + `<h4>Credit Scene ${creditScenesLength>1 ? '#' + (i+1) : ''} Details</h4>`
            if (entry.creditscenes[i].timing) { sceneDetails = sceneDetails + `<p><strong>Timing:</strong> ${entry.creditscenes[i].timing}</p>` }
            if (entry.creditscenes[i].type) { sceneDetails = sceneDetails + `<p><strong>Type:</strong> <fst>${entry.creditscenes[i].type}</fst></p>` }
            if (entry.creditscenes[i].release && (release.checked || isIndividualEntryPage)) { sceneDetails = sceneDetails + `<p><strong>Release order recommendation:</strong> ${entry.creditscenes[i].release}</p>` }
            if (entry.creditscenes[i].chron && (chronological.checked || isIndividualEntryPage)) { sceneDetails = sceneDetails + `<p><strong>Chronological order recommendation:</strong> ${entry.creditscenes[i].chron}</p>` }
            if (entry.creditscenes[i].nar && (narrative.checked || isIndividualEntryPage)) { sceneDetails = sceneDetails + `<p><strong>Narrative order recommendation:</strong> ${entry.creditscenes[i].nar}</p>` }
            if (entry.creditscenes[i].contents) { sceneDetails = sceneDetails + `<p><strong>Scene contents:</strong> <fst>${entry.creditscenes[i].contents}</fst></p>` }
            creditsList = creditsList + sceneDetails;                
        }

        creditsHeadingText = `Credit Scene${creditScenesLength>1 ? 's' : ''}`;
        creditsList = creditsExplanation + creditsList;
    }

    creditsHeading.textContent = creditsHeadingText;
    credits.innerHTML = creditsList;

    if (entry.creditscenes) {
        document.getElementById("whatiscreditscene").addEventListener("click",removeHiddenElement);
    }
}

function removeHiddenElement() {
    const parentEl = this.parentElement;
    for (let i=0; i<parentEl.children.length; i++) {
        parentEl.children[i].classList.remove("hiddenelement");
    }
    this.classList.add("hiddenelement");
}

function populateCharacters(entry) {
    if (!entry.characters) {
        notableCharactersHeading.innerHTML = "";
        notableCharacters.innerHTML = "";
        return;
    }

    notableCharactersHeading.textContent = "Notable Characters";

    function buildCharacterListItem(listOfCharacters) {
        let characterList = '';
        if (listOfCharacters) {
            characterList = characterList + '<ul>'
            for (let i=0; i<listOfCharacters.length; i++) {
                const character = listOfCharacters[i];
                const name = character[0];
                const spoilerTag = character[1];
                const otherInfo = character[2] ? character[2] : null;
                characterList = characterList + `<li>${spoilerTag ? '<' + spoilerTag + '>' : ''}${name}${otherInfo ? ' (' + otherInfo + ')' : ''}${spoilerTag ? '</' + spoilerTag + '>' : ''}</li>`
            }
            characterList = characterList + '</ul>'
        }
        return characterList;
    }

    function buildCharacterLists(characterType, listOfCharacters) {
        if (listOfCharacters) {
            return `<h4>${characterType} ${characterType != 'Cameo' ? 'Character' + (listOfCharacters.length > 1 ? 's' : '') : ''}</h4>` + buildCharacterListItem(listOfCharacters);
        }
    }
    let main = buildCharacterLists("Main", entry.characters.main);
    let major = buildCharacterLists("Major", entry.characters.major);
    let minor = buildCharacterLists("Minor", entry.characters.minor);
    let cameo = buildCharacterLists("Cameo", entry.characters.cameo);


    notableCharacters.innerHTML = `${main ? main : ''}${major ? major : ''}${minor ? minor : ''}${cameo ? cameo : ''}`
}

function populateWhyContent(entry) {
    // const noInfo = "Information not available.";
    // let whyPlacementContent = noInfo;
    let whyPlacementContent = '';
    let whyPlacementType = '';
    const invidualEntryPageInfo = `<p>You are on the individual page for <entry code="self"></entry>. See the <a href="/${urlPage}?entry=${entry.code}">primary page for ${seriesName}</a> for the full ordering functionality of ${siteName}.</p>`;

    function aggregateWhyContent(entry, orderType, entryContent) {
        if (entry[entryContent] && (orderType.checked || isIndividualEntryPage)) {
            whyPlacementContent += `${isIndividualEntryPage ? '<h4>' + capitalizeFirstLetter(orderType.value) + '</h4>' : ''}
            ${entry[entryContent] ? '<p>' + entry[entryContent] + '</p>' : ''}`;
        }
        if (entry[entryContent] && orderType.checked) {
            whyPlacementType = capitalizeFirstLetter(orderType.value);
        }
    }

    if ((!release.checked && !alphabetical.checked) || isIndividualEntryPage) {
        if (isIndividualEntryPage) { whyPlacementContent += invidualEntryPageInfo }
        if (chronological) { aggregateWhyContent(entry, chronological, "whychron"); }
        if (narrative) { aggregateWhyContent(entry, narrative, "whynar"); }
    }

    if (whyPlacementContent == '' || whyPlacementContent == invidualEntryPageInfo) {
        whyPlacementHeading.textContent = '';
        whyPlacement.innerHTML = '';
    } else {
        whyPlacementHeading.textContent = `${whyPlacementType != '' ? whyPlacementType + ' ' : ''}Order Reasoning`;
        whyPlacement.innerHTML = whyPlacementContent;
    }

    // whyChron.innerHTML = entry.whychron;
}

function populateConnections(entry) {
    if (entry.connections) {
        connectionsHeading.textContent = 'Connections to Other Titles';
        connections.innerHTML = `<p>${entry.connections}</p>`;
    } else {
        connectionsHeading.textContent = '';
        connections.innerHTML = '';
    }
}

function adjustContent() {
    if (!contentContainer.classList.contains("hid")) {
        const currentEntryTitle = entryTitle.textContent;
        // const entry = entries[entries.findIndex(item => item.name === currentEntryTitle)];
        const entry = entries[findEntryIndex(currentEntryTitle, "name", entries)];
        populateCredits(entry);
        populateWhyContent(entry);
        replaceExtraTags();
        replaceSpoilerTags("#whyplacement");
        changeSpoilerStyling("#whyplacement");
        replaceSpoilerTags("#credits");
        changeSpoilerStyling("#credits");
        replaceSpoilerTitles();
        hideEmptyElements();
    }
}

// let entryTagCount = 0;

function replaceExtraTags() {
    replaceEntryTags();
    setTimeout(addEntryTagLinks,500);
    replaceSubseriesTags();
}

function replaceEntryTags() {
    const entryTags = document.querySelectorAll("entry");
    // const entryTagId = 'entryTagId';
    entryTagCount = 0;
    let currentOrderParameter;

    if (!isIndividualEntryPage) {
        let orderParamData = window.location.search.split("order=");
        if (orderParamData.length>1) { // If there's an order parameter
            // orderParamData = orderParamData[1].split("&");
            currentOrderParameter = orderParamData[1].split("&")[0];
        }
    }

    for (let i=0; i<entryTags.length; i++) {
        const entryCode = entryTags[i].attributes.code.textContent;
        const isEm = entryTags[i].attributes.noem ? false : true;
        const isSelf = entryCode == 'self' ? true : false;
        const tagContent = entryTags[i].innerHTML;
        let entryName = '';
        let linkInfo = '';
        let endLinkInfo = '';

        if (tagContent != '') {
            entryName = tagContent;
        } else if (isSelf) {
            entryName = entryTitle.textContent;
        } else {
            // const specificEntry = entries[entries.findIndex(item => item.code === entryCode)];
            const specificEntry = entries[findEntryIndex(entryCode, "code", entries)];
            if (specificEntry) {
                entryName = specificEntry.name;
                if (isIndividualEntryPage) {
                    linkInfo = `<a href="/${urlPage}/${entryCode}">`;
                    endLinkInfo = '</a>';
                } else {
                    linkInfo = `<a name=${entryCode} class="entrytag entrytagnotself" href="/${urlPage}?${currentOrderParameter ? 'order=' + currentOrderParameter + '&' : ''}entry=${entryCode}">`;
                    endLinkInfo = '</a>';
                }
            } else {
                entryName = entryCode;
                console.error(`Trying to replace entry tag but can't find "${entryCode}"`);
            }
        }

        entryTags[i].insertAdjacentHTML("afterend", `${isEm ? '<em>' : ''}${linkInfo}${entryName}${endLinkInfo}${isEm ? '</em>' : ''}`);
        entryTags[i].remove();
    }
}

function addEntryTagLinks() {
    const entryTagsNeedingLinks = document.querySelectorAll(".entrytagnotself");

    if (entryTagsNeedingLinks) {
        for (let i=0; i<entryTagsNeedingLinks.length; i++) {
            const entryCode = entryTagsNeedingLinks[i].getAttribute("name");
            const entryIndex = findEntryIndex(entryCode, "code", sortedEntries);
            entryTagsNeedingLinks[i].addEventListener("click", function(event) {
                entryListItems[entryIndex].click();
                event.preventDefault(); // Stops entry tag link from behaving like a link while still allowing it to have the correct href
            })
        }
    }
}

function replaceSubseriesTags() {
    const subseriesTags = document.querySelectorAll("subseries");

    for (let i=0; i<subseriesTags.length; i++) {
        const subseriesCode = subseriesTags[i].attributes.code.textContent;
        const isSelf = subseriesCode == 'self' ? true : false;
        const tagContent = subseriesTags[i].innerHTML;
        let subseriesTagName = '';

        if (tagContent != '') {
            subseriesTagName = tagContent;
        } else if (isSelf) {
            // subseriesTagName = entries[entries.findIndex(item => item.name == entryTitle.textContent)].subseries.primary[0];
            subseriesTagName = entries[findEntryIndex(entryTitle.textContent, "name", entries)].subseries.primary[0];
            // const entry = entries[findEntryIndex(this.id, "code")];
        } else {
            const specificEntry = subseries[subseriesCode];
            // entries[entries.findIndex(item => item.code === subseriesCode)];
            if (specificEntry) {
                subseriesTagName = specificEntry.name;
            } else {
                subseriesTagName = subseriesCode;
                console.error(`Trying to replace subseries tag but can't find "${subseriesCode}"`);
            }
        }

        subseriesTags[i].insertAdjacentHTML("afterend", `<em>${subseriesTagName}</em>`);
        subseriesTags[i].remove();
    }
}

// Replace custom HTML spoiler tags with appropriate spans
function replaceAllSpoilerTags() {
    replaceSpoilerTags("");
}

function replaceSpoilerTags(extraSelector) {
    const spoilerTags = document.querySelectorAll(`#content ${extraSelector} *:is(pst, bst, fst, psu, bsu, fsu, pse, bse, fse, ose)`);

    for (let i=0; i<spoilerTags.length; i++) {
        const tagType = spoilerTags[i].nodeName.toLowerCase();
        spoilerTags[i].insertAdjacentHTML("afterend", `<span class="${tagType} spoiler"><span>${spoilerTags[i].innerHTML}</span></span>`);
        spoilerTags[i].remove();
    }
}

function replaceSpoilerTitles() {
    const spoilerTags = document.querySelectorAll(".hiddenspoiler");

    for (let i=0; i<spoilerTags.length; i++) {
        let tagTypeWritten;

        if (spoilerTags[i].classList.contains("pst")) {tagTypeWritten = "Premise story level"}
        else if (spoilerTags[i].classList.contains("bst")) {tagTypeWritten = "Basic story level"}
        else if (spoilerTags[i].classList.contains("fst")) {tagTypeWritten = "Full story level"}
        else if (spoilerTags[i].classList.contains("pse")) {tagTypeWritten = "Premise series level"}
        else if (spoilerTags[i].classList.contains("bse")) {tagTypeWritten = "Basic series level"}
        else if (spoilerTags[i].classList.contains("fse")) {tagTypeWritten = "Full series level"}
        else if (spoilerTags[i].classList.contains("psu")) {tagTypeWritten = "Premise subseries level"}
        else if (spoilerTags[i].classList.contains("bsu")) {tagTypeWritten = "Basic subseries level"}
        else if (spoilerTags[i].classList.contains("fsu")) {tagTypeWritten = "Full subseries level"}
        else if (spoilerTags[i].classList.contains("ose")) {tagTypeWritten = "Other series level"}

        spoilerTags[i].title = `${tagTypeWritten} spoiler`;
    }
}

function hideEmptyElements() {
    const containerElements = document.querySelectorAll("*:is(h2, h3, h4, h5, h6, p, ul, ol, #content li, div, span)");
    
    for (let i=0; i<containerElements.length; i++) {
        if (containerElements[i].innerHTML == '') {
            if (isIndividualEntryPage) {
                containerElements[i].remove();
            } else {
                containerElements[i].classList.add("hid");
                containerElements[i].setAttribute("aria-hidden",true);
            }
        } else {
            containerElements[i].classList.remove("hid");
            containerElements[i].removeAttribute("aria-hidden");
        }
    }
    if (preliminaryContent) { preliminaryContent.remove(); };
}

// Function to set or remove event listeners on logos, called when building the navbar
function setEventListenersOnLogos() {
    for (let i=0; i<entryLogos.length; i++) {
        entryLogos[i].addEventListener("click", populateContent);
    }
}

if (!isRootPage) {
    setEventListenersOnLogos();
}


function removeEventListenersOnLogos() {
    for (let i=0; i<entryLogos.length; i++) {
        entryLogos[i].removeEventListener("click", populateContent);
    }
}

// Sidebar movement on mobile
let isNavBarHidden = true;
let isSelectionBarHidden = true;
const navBarArrow = document.querySelector("#navbarbutton .arrowbutton");
const selectionBarArrow = document.querySelector("#selectionbarbutton .arrowbutton");
let hasNavBarBeenClicked = getGlobalInfo("hasNavBarBeenClicked");
let hasSelectionBarBeenClicked = getGlobalInfo("hasSelectionBarBeenClicked");

function shiftNavBar(event) {
    if (isSelectionBarHidden) {
        content.removeEventListener("click", dismissBothSidebars, true);
    }
    if (isNavBarHidden) {
        content.addEventListener("click", dismissBothSidebars, true); // True here helps stop click propagation
        event.preventDefault();
        event.stopPropagation();
        // navBarButton.addEventListener("click", shiftNavBar, true);
        navBar.removeEventListener("click", shiftNavBar, true);
        navBarContainer.style="margin-left:0;";
        navBarArrow.style="transform: rotate(-90deg);";
        isNavBarHidden = false;  
        if (window.screen.width < 481 && !isSelectionBarHidden) {
            selectionBarButton.click();
        }
    } else {
        // navBarButton.removeEventListener("click", shiftNavBar, true);
        navBar.addEventListener("click", shiftNavBar, true);
        navBarContainer.style="";
        navBarArrow.style="";
        isNavBarHidden = true;
    }
    bothSideBarsShifted();
    if (!hasNavBarBeenClicked) {
        navBarButton.classList.remove("dancebutton");
        saveGlobalInfo("hasNavBarBeenClicked",true);
    }
}

function shiftSelectionBar(event) {
    if (isNavBarHidden) {
        content.removeEventListener("click",dismissBothSidebars, true);
    }
    if (isSelectionBarHidden) {
        content.addEventListener("click",dismissBothSidebars, true); // True here helps stop click propagation
        event.preventDefault();
        event.stopPropagation();
        // selectionBarButton.addEventListener("click", shiftSelectionBar, true);
        selectionBarContainer.removeEventListener("click", shiftSelectionBar, true);
        selectionBar.style="margin-right:0";
        selectionBarArrow.style="transform: rotate(90deg);";
        isSelectionBarHidden = false;
        if (window.screen.width < 481 && !isNavBarHidden) {
            navBarButton.click();
        }
    } else {
        // selectionBarButton.removeEventListener("click", shiftSelectionBar,true);
        selectionBarContainer.addEventListener("click", shiftSelectionBar, true);
        selectionBar.style="";
        selectionBarArrow.style="";
        isSelectionBarHidden = true;
    }
    bothSideBarsShifted();
    if (!hasSelectionBarBeenClicked) {
        selectionBarButton.classList.remove("dancebutton");
        saveGlobalInfo("hasSelectionBarBeenClicked",true);
    }
}

function bothSideBarsShifted() {
    if (!isNavBarHidden && !isSelectionBarHidden) {
        if (window.screen.width > 480) {
            selectionBarButton.style="margin-top: var(--sidebar-button-size);";
        }
    } else {
        selectionBarButton.style="";
    }
    if (window.screen.width < 481 && (!isNavBarHidden || !isSelectionBarHidden)) {
        selectionBarButton.style="margin-top: var(--sidebar-button-size);";
    }
}

function dismissBothSidebars(event) {
    event.preventDefault();
    event.stopPropagation();
    isNavBarHidden = false;
    isSelectionBarHidden = false;
    shiftNavBar();
    shiftSelectionBar();
}

function adjustScreenSize() {
    const screenWidth = window.screen.width;
    if (screenWidth < 701) {
        if (isNavBarHidden) {
            navBar.addEventListener("click", shiftNavBar, true);
        } else {
            navBar.removeEventListener("click", shiftNavBar, true);
        }
        if (isSelectionBarHidden) {
            selectionBarContainer.addEventListener("click", shiftSelectionBar, true);
        } else {
            selectionBarContainer.removeEventListener("click", shiftSelectionBar, true);
        }
    } else {
        navBar.removeEventListener("click", shiftNavBar, true);
        selectionBarContainer.removeEventListener("click", shiftSelectionBar, true);
    }
}

window.addEventListener("resize", adjustScreenSize);

navBarButton.addEventListener("click", shiftNavBar);
selectionBarButton.addEventListener("click", shiftSelectionBar);

// Some cleanup functions
function reformatPageAsIndividualEntry(entryIndex) {
    isIndividualEntryPage = true;
    body.className = "individual";
    entryListItems[entryIndex].click();
    navBarContainer.remove();
    selectionBar.remove();
    entryLink.previousElementSibling.remove();
    entryLink.remove();
    // setLeftRightBorder(content, content, content);
    showAllSpoilers();
}

function setLeftRightBorder(widthToCheck, leftSide, rightSide) {
    if (widthToCheck.clientWidth < window.innerWidth) {
        leftSide.classList.add("leftedge");
        rightSide.classList.add("rightedge");
    }
}

////////////////////////////////////////////////
// Utility Functions
////////////////////////////////////////////////

// Helpful function provided here: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setURLParameter(param, value) {
    const url = new URL(location);
    url.searchParams.set(param, value);
    history.pushState({}, "", url);
}

function saveInfo(infoType, infoData) {
    localStorage.setItem(`${urlPage}-${infoType}`,infoData);
}

function getInfo(infoType) {
    return localStorage.getItem(`${urlPage}-${infoType}`);
}

function saveGlobalInfo (infoType, infoData) {
    localStorage.setItem(`${infoType}`,infoData);
}

function getGlobalInfo(infoType) {
    return localStorage.getItem(`${infoType}`);
}


/////////////////////////////////////////////////
// Upon Page Load
/////////////////////////////////////////////////
function identifyBaseOrEntryPage() {
    isInitialPageLoad = false;
    if (isDev) {
        urlPieces = ["com", "starwars", "phantom-menace-4"];
    }
    
    if (urlPieces.length > 2) {
        const entryIndex = findEntryIndex(urlPieces[2], "code", sortedEntries);
        if (entryIndex > -1) { 
            reformatPageAsIndividualEntry(entryIndex);
            return;
        }
    }
    isIndividualEntryPage = false;
    body.className = "standard";
    // setLeftRightBorder(main, navBar, selectionBar);

    for (let i=0; i<spoilerInputs.length; i++) {
        if (getInfo(spoilerInputs[i].id) == 'true') {
            spoilerInputs[i].checked = true;
        } else {
            spoilerInputs[i].checked = false;
        }
    }
    // changeAllSpoilerStyling();

    const urlParameters = new URLSearchParams(window.location.search);
    let useInitialContent = true;
    if (urlParameters) {
        if (urlParameters.get("entry")) {
            const entryParameter = urlParameters.get("entry");
            const entryIndex = findEntryIndex(entryParameter, "code", sortedEntries);
            if (entryIndex > -1) { 
                entryListItems[entryIndex].click();
                useInitialContent = false;
            }
        }
        if (urlParameters.get("order")) {
            const orderParameter = urlParameters.get("order");
            for (let i=0; i<orderInputs.length; i++) {
                if (orderInputs[i].getAttribute("id") == orderParameter) {
                    orderInputs[i].click();
                }
            }
        } else {
            for (let i=0; i<orderInputs.length; i++) {
                if (getInfo(orderInputs[i].id) == 'true') {
                    orderInputs[i].click();
                }
            }
        }
    }

    if (useInitialContent) { populateInitialContent(); }
    adjustScreenSize();
}

function loadRootPage() {
    injectCanonical("/");

    navBarContainer.remove();
    selectionBar.remove();
    contentContainer.remove();

    preliminaryContent.innerHTML = `<p>Welcome to ${siteName}! Our mission is to make it possible to structure entries in various media series into muliple orders, allowing you to enjoy their content in whichever order you wish. The best way to begin is to check out one of the series we currently have orders available for:</p><ul>${seriesList}</ul>`;
}

if (isRootPage) {
    loadRootPage();
} else {
    identifyBaseOrEntryPage();
}
