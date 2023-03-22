// Build out main template elements
const head = document.querySelector("head");
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");

// Head template
head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="../app.css" rel="stylesheet" type="text/css">
<style id="extracss"></style>`;

// Use custom head details
const title = document.querySelector("title");
title.innerText = pageTitle;

// Find and set correct screen height
const extraCSS = document.getElementById("extracss");
extraCSS.textContent = `:root {
    --screen-height: ${window.innerHeight - 1}px;
}`


// Header template
header.innerHTML = `<div id="header">

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
                    <hr>

                    <input type="checkbox" id="otherseries" name="otherseries" value="otherseries">
                    <label for="otherseries">Other Series Level</label>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="content" class="hid">
    <div id="contentcontainer" class="scrollarea">
        <h2 id="entrytitle"></h2>
        <img id="entryimage" class="hid bst spoiler">

        <p><strong>Release date:</strong> <span id="releasedate"></span></p>
        <p><strong>Type:</strong> <span id="classification"></span></p>
        ${lengthExists ? '<p><strong>Length:</strong> <span id="entrylength"></span></p>' : ''}
        ${phasesExist ? '<p><strong>Phase:</strong> <span id="phasenum"></span></p>' : ''}
        ${sagaNames ? '<p><strong>Saga:</strong> <span id="saganame"></span></p>' : ''}
        ${subseries ? `<p><strong>Subseries:</strong> <span id="subseriesname"></span></p>` : ''}

        <h3 id="keyfactsheading"></h3>
        <ul id="keyfacts"></ul>
        <h3 id="reviewsheading"></h3>
        <div id="reviews"></div>
        <h3 id="skippabilityheading"></h3>
        <div id="skippability"></div>
        ${creditScenesExist ? `<h3 id="creditsheading"></h3>
        <div id="credits"></div>` : ''}

        ${characters ? `<h3 id="notablecharactersheading"></h3>
        <div id="notablecharacters"></div>` : '' }

        <h3 id="whyplacementheading"></h3>
        <p id="whyplacement"></p>

        <h3>Resources</h3>
        <h4 id="wheretofindheading"></h4>
        <p id="wheretofind"></p>
        <h4 id="additionalinfoheading"></h4>
        <p id="additionalinfo"></p>
        <h4 id="contentguideheading"></h4>
        <p id="contentguide"></p>


        <p id="whychron"></p>
    </div>
</div>`;

const content = document.getElementById("content");
const contentContainer = document.getElementById("contentcontainer");
// contentContainer

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

if (!selectionOptionDescription.otherseries) {
    selectionOptionDescription.otherseries = `Spoilers relating to any details from any narratives outside of ${seriesName}.`
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
contentContainer.addEventListener("scroll", determineScrollGradient);
selectionParagraph.addEventListener("scroll", determineScrollGradient);


// Prime order inputs to work with buildNavBar
const orderInputs = document.querySelectorAll("#orderselection input");

// Build nav bar
const navBar = document.getElementById("navbar");
const entryList = document.getElementById("entrylist");

// Prepare variable so it can be used and reused each time the nav bar is rebuilt
let entryLogos; 

function buildNavBar(selectedOrderInput) {
    // Reset navBar HTML
    entryList.innerHTML = '';
    
    // Determine order
    const entryOrder = []; // Array of the entries' order
    const entryOrderSorted = []; // Array of the entries' order, sorted
    const orderedEntries = []; // Array of the entries in correct order
    const orderDeterminer = selectedOrderInput.value; // The "value" of the order input that has been selected

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
        newLI.innerHTML = `<img src="logos/${orderedEntries[i].logo}" alt="${orderedEntries[i].name}">`
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
}

function reflectOrderChange() {
    buildNavBar(this);
    adjustContent();
}

// Connect selection inputs to buildNavBar function
for (let i=0; i<orderInputs.length; i++) {
    orderInputs[i].addEventListener("click", reflectOrderChange);
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
const ose = document.getElementById("otherseries");

function markLowerLevelSpoilers(clickedInput) {
    if (clickedInput.checked) {
        if (fse.checked) { bse.checked = true; fst.checked = true; if (fsu) { fsu.checked = true } };
        if (bse.checked) { pse.checked = true; bst.checked = true; if (bsu) { bsu.checked = true } };

        if (subseries) {
            if (fsu.checked) { bsu.checked = true; fst.checked = true; };
            if (bsu.checked) { psu.checked = true; bst.checked = true; };
            if (psu.checked) { pst.checked = true };
        }

        if (fst.checked) { bst.checked = true };
        if (bst.checked) { pst.checked = true };

    } else {
        if (!pst.checked) { bst.checked = false; if (psu) { psu.checked = false } };
        if (!bst.checked) { fst.checked = false; bse.checked = false; if (bsu) { bsu.checked = false } };
        if (!fst.checked) { fse.checked = false; if (fsu) { fsu.checked = false } }

        if (subseries) {
            if (!psu.checked) { bsu.checked = false; bse.checked = false; };
            if (!bsu.checked) { fsu.checked = false; bse.checked = false; };
            if (!fsu.checked) { fse.checked = false; }
        }

        if (!pse.checked) { bse.checked = false };
        if (!bse.checked) { fse.checked = false };

    }
}

// const markLowerLevelSpoilersBound = markLowerLevelSpoilers.bind(this);


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
    addOrRemoveHiddenSpoiler(spoilerSpan, "ose", ose);
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
    changeAllSpoilerStyling();
}

for (let i=0; i<spoilerInputs.length; i++) {
    spoilerInputs[i].addEventListener("click", setUpSpoilerCheckboxes);
}


// Set entry logos to be clickable elements to populate content area
const entryTitle = document.getElementById("entrytitle");
const entryImage = document.getElementById("entryimage");
const releaseDate = document.getElementById("releasedate");
const classification = document.getElementById("classification");
// const phaseNum = phasesExist ? document.getElementById("phasenum") : null;
const whereToFindHeading = document.getElementById("wheretofindheading");
const whereToFind = document.getElementById("wheretofind");
const additionalInfoHeading = document.getElementById("additionalinfoheading");
const additionalInfo = document.getElementById("additionalinfo");
const contentGuideHeading = document.getElementById("contentguideheading");
const contentGuide = document.getElementById("contentguide");

const keyFactsHeading = document.getElementById("keyfactsheading");
const keyFacts = document.getElementById("keyfacts");
const skippabilityHeading = document.getElementById("skippabilityheading");
const skippability = document.getElementById("skippability");
const creditsHeading = document.getElementById("creditsheading");
const credits = document.getElementById("credits");
const reviewsHeading = document.getElementById("reviewsheading");
const reviews = document.getElementById("reviews");
const notableCharactersHeading = document.getElementById("notablecharactersheading");
const notableCharacters = document.getElementById("notablecharacters");
const whyPlacementHeading = document.getElementById("whyplacementheading");
const whyPlacement = document.getElementById("whyplacement");
const whyChron = document.getElementById("whychron");


function populateContent() {
    // Thanks for some array/object searching help: https://stackoverflow.com/questions/7176908/how-can-i-get-the-index-of-an-object-by-its-property-in-javascript
    // const entryIndex = entries.findIndex(item => item.code === this.id);

    // entryTitle.textContent = entries[entryIndex].name;

    const entry = entries[entries.findIndex(item => item.code === this.id)];

    populateQuickFacts(entry);

    populateKeyFacts(entry);
    populateSkippability(entry);
    populateReviews(entry);
    if (creditScenesExist) { populateCredits(entry); }
    populateCharacters(entry);

    populateWhyContent(entry);

    populateWhereToFind(entry);
    populateAdditionalInfo(entry);
    populateContentGuide(entry);

    replaceExtraTags();

    replaceAllSpoilerTags();
    changeAllSpoilerStyling();

    hideEmptyElements();

    setTimeout(determineScrollGradient.bind(contentContainer),100);
    content.classList.remove("hid");
}

// Quick facts section
function populateQuickFacts(entry) {
    entryTitle.textContent = entry.name;
    addEntryImage(entry);
    releaseDate.textContent = parseDate(entry.release);
    classification.textContent = entry.classification;

    if (lengthExists) { document.getElementById("entrylength").textContent = entry.length ? parseLength(entry) : "?" }

    if (phasesExist) { document.getElementById("phasenum").textContent = entry.phase ? entry.phase : "?" }
    if (sagaNames) { document.getElementById("saganame").textContent = entry.phase ? sagaNames[entry.phase] : "?" }
    if (subseries) { 
        const subseriesName = document.getElementById("subseriesname");
        let relatedSubseriesName = document.getElementById("relatedsubseriesname") ? document.getElementById("relatedsubseriesname") : false;
        subseriesName.innerHTML = entry.subseries && entry.subseries.primary ? "<psu>" + entry.subseries.primary[0] + "</psu>" + (entry.subseries.primary.length>1 ? " (<bsu>" + entry.subseries.primary[1] + "</bsu>)" : "") : "?";

        if (entry.subseries && entry.subseries.secondary) {
            if (!relatedSubseriesName) {
                subseriesName.parentElement.insertAdjacentHTML("afterend", `<p><strong>Related subseries:</strong> <span id="relatedsubseriesname"></span></p>`);
                relatedSubseriesName = document.getElementById("relatedsubseriesname");
            }
            relatedSubseriesName.innerHTML = populateRelatedSubseries(entry);
        } else if (relatedSubseriesName) {
            relatedSubseriesName.parentElement.remove();
        }
    }

    function populateRelatedSubseries(entry) {
        let relatedSubList = '';

        for (let i = 0; i < entry.subseries.secondary.length; i++) {
            const spoilerType = entry.subseries.secondary[2] ? entry.subseries.secondary[2] : false;
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
    } else {
        entryImage.src = "";
        entryImage.alt = "";
        entryImage.classList.add("hid");
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
        
        formattedDate = formattedMonth + " " + dateArray[0];
    } catch (error) {
        console.error(error);
    } finally {
        return formattedDate;
    }
}

function parseLength(entry) {
    let friendlyLength;

    if (entry.lengthtype == "minutes") {
        let hours = Math.floor(entry.length / 60);
        let minutes = entry.length - (hours * 60);
        friendlyLength = `${hours}h ${minutes}m`
    }

    return friendlyLength;
}

// "Where to Find" Section
const iconFilePath = "../icons/";
const disneyPlusIcon = "disneyplus.png";
const netflixIcon = "netflix.jpeg";
const hboMaxIcon = "hbomax.jpeg";
const starzIcon = "starz.jepg";
const primeVideoIcon = "primevideo.jpeg";
const vuduIcon = "vudu.jpeg";
const appleTVIcon = "appletv.png";
const googlePlayIcon = "googleplay.png";
const amazonIcon = "amazon.png";
const walmartIcon = "walmart.png";
const targetIcon = "target.jpeg";
const bestBuyIcon = "bestbuy.jpeg";
const ebayIcon = "ebay.png";

function populateWhereToFind(entry) {
    whereToFindHeading.textContent = `Where to ${infinitiveVerb ? capitalizeFirstLetter(infinitiveVerb) : 'Find'}`;
    whereToFind.innerHTML = `<p>Purchase or subscription required. Title may not be available in your region.</p>
    <ul class="iconlist">
    ${entry.disneyplus ? '<li><a href="https://www.disneyplus.com/' + entry.disneyplus + '"><img src="' + iconFilePath + disneyPlusIcon + '" alt="Disney+"></a></li>' : ''}
    ${entry.netflix ? '<li><a href="https://www.netflix.com/title/' + entry.netflix + '"><img src="' + iconFilePath + netflixIcon + '" alt="Netflix"></a></li>' : ''}
    ${entry.hbomax ? '<li><a href="https://www.hbomax.com/' + entry.hbomax + '"><img src="' + iconFilePath + hboMaxIcon + '" alt="HBO Max"></a></li>' : ''}
    ${entry.starz ? '<li><a href="https://www.starz.com/' + entry.starz + '"><img src="' + iconFilePath + starzIcon + '" alt="Starz"></a></li>' : ''}
    ${entry.primevideo ? '<li><a href="https://www.amazon.com/gp/video/detail/' + entry.primevideo + '"><img src="' + iconFilePath + primeVideoIcon + '" alt="Prime Video"></a></li>' : ''}
    ${entry.vudu ? '<li><a href="https://www.vudu.com/content/movies/details/' + entry.code + '/' + entry.vudu + '"><img src="' + iconFilePath + vuduIcon + '" alt="Vudu Fandango"></a></li>' : ''}
    ${entry.appletv ? '<li><a href="https://tv.apple.com/' + entry.appletv + '"><img src="' + iconFilePath + appleTVIcon + '" alt="Apple TV"></a></li>' : ''}
    ${entry.googleplay ? '<li><a href="https://play.google.com/store/' + entry.googleplay + '"><img src="' + iconFilePath + googlePlayIcon + '" alt="Google Play"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.amazon.com/s?k=' + prepForURL(entry.name) + '&i=movies-tv&rh=n%3A2625373011%2Cp_n_format_browse-bin%3A2650304011%7C2650305011%7C9397930011"><img src="' + iconFilePath + amazonIcon + '" alt="Search Amazon"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.walmart.com/search?q=' + prepForURL(entry.name) + '+blu-ray&catId=4096"><img src="' + iconFilePath + walmartIcon + '" alt="Search Walmart"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.target.com/s?searchTerm=' + prepForURL(entry.name) + '&category=5xsxe&facetedValue=cz41e"><img src="' + iconFilePath + targetIcon + '" alt="Search Target"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=category_facet%3DMovies%20%26%20TV%20Shows~cat02015&st=' + prepForURL(entry.name) + '"><img src="' + iconFilePath + bestBuyIcon + '" alt="Search Best Buy"></a></li>' : ''}
    ${entry.disc ? '<li><a href="https://www.ebay.com/sch/617/i.html?_from=R40&_nkw=' + prepForURL(entry.name) + '"><img src="' + iconFilePath + ebayIcon + '" alt="Search eBay"></a></li>' : ''}
    </ul>`;
}
// Other services to check: HBO Max, Hulu, Fubo, Tubi, Paramount+, Freevee, Peacock

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


function populateAdditionalInfo(entry) {
    additionalInfoHeading.textContent = "Additional Information";
    additionalInfo.innerHTML = `<p>Looking for more details or reviews for ${entry.name}? Check out these resources.</p>
    <ul class="iconlist">
    ${entry.official ? '<li><a href="' + officialSite.url + entry.official + '"><img src="' + iconFilePath + officialSite.icon + '" alt="' + officialSite.description + '"></a></li>' : ''}
    ${entry.wiki ? '<li><a href="' + wiki.url + entry.wiki + '"><img src="' + iconFilePath + wiki.icon + '" alt="' + wiki.description + '"></a></li>' : ''}
    ${entry.wikipedia ? '<li><a href="https://en.wikipedia.org/wiki/' + entry.wikipedia + '"><img src="' + iconFilePath + wikipediaIcon + '" alt="Wikipedia"></a></li>' : ''}
    ${entry.rottentomatoes ? '<li><a href="https://www.rottentomatoes.com/' + entry.rottentomatoes + '"><img src="' + iconFilePath + rottenTomatoesIcon + '" alt="Rotten Tomatoes"></a></li>' : ''}
    ${entry.metacritic ? '<li><a href="https://www.metacritic.com/' + entry.metacritic + '"><img src="' + iconFilePath + metacriticIcon + '" alt="Metacritic"></a></li>' : ''}
    ${entry.imdb ? '<li><a href="https://www.imdb.com/title/' + entry.imdb + '"><img src="' + iconFilePath + imdbIcon + '" alt="IMDb"></a></li>' : ''}
    ${entry.wikiquote ? '<li><a href="https://en.wikiquote.org/wiki/' + entry.wikiquote + '"><img src="' + iconFilePath + wikiquoteIcon + '" alt="Wikiquote"></a></li>' : ''}
    ${entry.youtube ? '<li><a href="https://www.youtube.com/watch?v=' + entry.youtube + '"><img src="' + iconFilePath + youtubeIcon + '" alt="YouTube"></a></li>' : ''}
    </ul>`;
}



// "Content Guide" Section

const commonSenseIcon = "commonsense.jpeg";
const kimIcon = "kim.jpg";
const clearPlayIcon = "clearplay.jpg";

function populateContentGuide(entry) {
    contentGuideHeading.textContent = "Content Guide for Parents";
    contentGuide.innerHTML = `<p>Not all content may be appropriate for children or concerned individuals. These services may help.</p>
    <ul class="iconlist">
    ${entry.commonsense ? '<li><a href="https://www.commonsensemedia.org/' + entry.commonsense + '"><img src="' + iconFilePath + commonSenseIcon + '" alt="Common Sense Media"></a></li>' : ''}
    ${entry.imdb ? '<li><a href="https://www.imdb.com/title/' + entry.imdb + '/parentalguide"><img src="' + iconFilePath + imdbIcon + '" alt="IMDb Parental Guide"></a></li>' : ''}
    ${entry.kim ? '<li><a href="https://kids-in-mind.com/' + entry.kim + '"><img src="' + iconFilePath + kimIcon + '" alt="Kids-In-Mind"></a></li>' : ''}
    ${entry.clearplay ? '<li><a href="https://www.clearplay.com/MovieDash.aspx?id=' + entry.clearplay + '"><img src="' + iconFilePath + clearPlayIcon + '" alt="ClearPlay"></a></li>' : ''}
    </ul>`;
}

// Other services to check: VidAngel

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
            ${entry.mcuserscore ? entry.mcuserscore + '<span class="reviewDescriptor"> (User Score)</span>' : ''}
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
    if (entry.kimrating) {
        reviewsList = reviewsList + `<p><a href="https://kids-in-mind.com/${entry.kim ? entry.kim : ""}"><strong>Kids-In-Mind Rating:</strong> ${entry.kimrating}</a></p>`;
    }

    
    reviewsHeading.textContent = `${reviewsList != '' ? 'Reviews and Ratings' : ''}`;
    reviews.innerHTML = reviewsList;
}

function populateCredits(entry) {
    const creditsExplanation = `<button id="whatiscreditscene">What is a "credit scene"?</button>
        <p class="paragraphtext hiddenelement">Credit scenes, or stingers, are placed after the core narrative is over and all major plot points resolved. They may occur either after all credits have rolled (post-credits scenes), after only some have finished (mid-credits scenes), or&mdash;rarely&mdash;after the resolution of the story but just before the credits begin. Credit scenes come in a few types, usually either calling back to the events of the narrative (perhaps drawing attention to an unresolved plot point) or by foreshadowing future entries in the series.</p>
        <p class="paragraphtext hiddenelement">If you are ${progressiveVerb} ${seriesName} in release order, credits scenes will convey information as the ${mediaCreators} intended. However if you are ${progressiveVerb} the series for the first time in a different order, you may get spoilers for an entry you haven't yet gotten to. For this reason, details are presented here to help you determine whether to watch the credits scenes or not. (Note that recommendations are based on spoilers only, not on whether watching the scene may be deemed worthwhile or not.)</p>`;
    
    let creditsHeadingText = '';
    let creditsList = '';

    if (entry.creditscenes) {
        let creditScenesLength = entry.creditscenes.length;

        for (let i=0; i<creditScenesLength; i++) {
            let sceneDetails = '';
            sceneDetails = sceneDetails + `<h4>Credit Scene ${creditScenesLength>1 ? '#' + i+1 : ''} Details</h4>`
            if (entry.creditscenes[i].timing) { sceneDetails = sceneDetails + `<p><strong>Timing:</strong> ${entry.creditscenes[i].timing}</p>` }
            if (entry.creditscenes[i].type) { sceneDetails = sceneDetails + `<p><strong>Type:</strong> <fst>${entry.creditscenes[i].type}</fst></p>` }
            if (entry.creditscenes[i].release && release.checked) { sceneDetails = sceneDetails + `<p><strong>Release order recommendation:</strong> ${entry.creditscenes[i].release}</p>` }
            if (entry.creditscenes[i].chron && chronological.checked) { sceneDetails = sceneDetails + `<p><strong>Chronological order recommendation:</strong> ${entry.creditscenes[i].chron}</p>` }
            if (entry.creditscenes[i].nar && narrative.checked) { sceneDetails = sceneDetails + `<p><strong>Narrative order recommendation:</strong> ${entry.creditscenes[i].nar}</p>` }
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
    const noInfo = "Information not available.";
    let whyPlacementContent = noInfo;
    let setHeading = false;
    let whyPlacementType = "this";

    if (!release.checked) {
        if (chronological.checked) {
            setHeading = true;
            whyPlacementType = chronological.value;
            whyPlacementContent = entry.whychron ? entry.whychron : noInfo;
        } else if (narrative.checked) {
            setHeading = true;
            whyPlacementType = narrative.value;
            whyPlacementContent = entry.whynar ? entry.whynar : noInfo;
        }
    }

    if (release.checked) {
        whyPlacementHeading.textContent = '';
        whyPlacement.innerHTML = '';
    } else {
        whyPlacementHeading.textContent = `${capitalizeFirstLetter(whyPlacementType)} Order Reasoning`;
        whyPlacement.innerHTML = whyPlacementContent;
    }

    // whyChron.innerHTML = entry.whychron;
}

function adjustContent() {
    if (!content.classList.contains("hid")) {
        const currentEntryTitle = entryTitle.textContent;
        const entry = entries[entries.findIndex(item => item.name === currentEntryTitle)];
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

function replaceExtraTags() {
    replaceEntryTags();
    replaceSubseriesTags();
}

function replaceEntryTags() {
    const entryTags = document.querySelectorAll("entry");

    for (let i=0; i<entryTags.length; i++) {
        const entryCode = entryTags[i].attributes.code.textContent;
        const isSelf = entryCode == 'self' ? true : false;
        const tagContent = entryTags[i].innerHTML;
        let entryName = '';

        if (tagContent != '') {
            entryName = tagContent;
        } else if (isSelf) {
            entryName = entryTitle.textContent;
        } else {
            const specificEntry = entries[entries.findIndex(item => item.code === entryCode)];
            if (specificEntry) {
                entryName = specificEntry.name;
            } else {
                entryName = entryCode;
                console.error(`Trying to replace entry tag but can't find "${entryCode}"`);
            }
        }

        entryTags[i].insertAdjacentHTML("afterend", `<em>${entryName}</em>`);
        entryTags[i].remove();
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
            subseriesTagName = entries[entries.findIndex(item => item.name == entryTitle.textContent)].subseries.primary[0];
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
    const containerElements = document.querySelectorAll("*:is(h2, h3, h4, h5, h6, p, ul, ol, li, div, span");
    
    for (let i=0; i<containerElements.length; i++) {
        if (containerElements[i].innerHTML == '') {
            containerElements[i].classList.add("hid");
        } else {
            containerElements[i].classList.remove("hid");
        }
    }
}

// Function to set or remove event listeners on logos, called when building the navbar
function setEventListenersOnLogos() {
    for (let i=0; i<entryLogos.length; i++) {
        entryLogos[i].addEventListener("click", populateContent);
    }
}

setEventListenersOnLogos();

function removeEventListenersOnLogos() {
    for (let i=0; i<entryLogos.length; i++) {
        entryLogos[i].removeEventListener("click", populateContent);
    }
}


////////////////////////////////////////////////
// Utility Functions
////////////////////////////////////////////////

// Helpful function provided here: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}