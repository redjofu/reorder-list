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

// Subseries spoiler checkboxes
const subseriesCheckboxes = `<input type="checkbox" id="premisesubseries" name="premisesubseries" value="premisesubseries">
<label for="premisesubseries">Premise Subseries Level</label>
<input type="checkbox" id="basicsubseries" name="basicsubseries" value="basicsubseries">
<label for="basicsubseries">Basic Subseries Level</label>
<input type="checkbox" id="fullsubseries" name="fullsubseries" value="fullsubseries">
<label for="fullsubseries">Full Subseries Level</label>`;

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
                    ${subseriesExist ? subseriesCheckboxes : ''}
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
<div id="content" class="hid">
    <h2 id="entrytitle"></h2>
    <p>Release date: <span id="releasedate"></span></p>
    ${phasesExist ? '<p>Phase: <span id="phasenum"></span></p>' : ''}
    ${sagaNames ? '<p>Saga: <span id="saganame"></span></p>' : ''}
    ${subseriesExist ? '<p>Subseries: <span id="subseriesname"></span></p>' : ''}
    <h3 id="wheretofindheading"></h3>
    <p id="wheretofind"></p>
    <h3 id="contentguideheading"></h3>
    <p id="contentguide"></p>
    <h3 id="whyplacementheading"></h3>
    <p id="whyplacement"></p>
    <p id="whychron"></p>
</div>`;

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

if (subseriesExist) {
    if (!selectionOptionDescription.premisesubseries) {
        selectionOptionDescription.premisesubseries = `Spoilers relating to the pitch of the subseries (e.g. all ${subseriesExample} entries). These include only the sorts of details you might find out from ${blurbVerb} from a later entry in the subseries but which might not be revealed in that particular entry.`
    }

    if (!selectionOptionDescription.basicsubseries) {
        selectionOptionDescription.basicsubseries = `Spoilers relating to basic events of the subseries (e.g. all ${subseriesExample} entries). These include the sorts of details a friend might tell you after ${progressiveVerb} a later entry in the subseries but which might not be revealed in that particular entry.`
    }
    
    if (!selectionOptionDescription.fullsubseries) {
        selectionOptionDescription.fullsubseries = `Spoilers relating to any details from any entry in the subseries (e.g. all ${subseriesExample} entries), including those typically revealed at the end. These include details typically referred to as "spoilers" and may be significantly "spoilery" since they may include crucial details from later entries.`
    }
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
        newLI.innerHTML = `<img src="logos/${orderedEntries[i].image}" alt="${orderedEntries[i].name}">`
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
    adjustWhyContent();
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
const psu = subseriesExist ? document.getElementById("premisesubseries") : null;
const bsu = subseriesExist ? document.getElementById("basicsubseries") : null;
const fsu = subseriesExist ? document.getElementById("fullsubseries") : null;
const pse = document.getElementById("premiseseries");
const bse = document.getElementById("basicseries");
const fse = document.getElementById("fullseries");

function markLowerLevelSpoilers(clickedInput) {
    if (clickedInput.checked) {
        if (fse.checked) { bse.checked = true; fst.checked = true; if (fsu) { fsu.checked = true } };
        if (bse.checked) { pse.checked = true; bst.checked = true; if (bsu) { bsu.checked = true } };

        if (subseriesExist) {
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

        if (subseriesExist) {
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
function changeSpoilerStyling() {
    const spoilerSpans = document.querySelectorAll(".spoiler");
    spoilerSpans.forEach(setCorrectSpoilerStyling)
}

function setCorrectSpoilerStyling(spoilerSpan) {
    addOrRemoveHiddenSpoiler(spoilerSpan, "pst", pst);
    addOrRemoveHiddenSpoiler(spoilerSpan, "bst", bst);
    addOrRemoveHiddenSpoiler(spoilerSpan, "fst", fst);
    if (subseriesExist) {
        addOrRemoveHiddenSpoiler(spoilerSpan, "psu", psu);
        addOrRemoveHiddenSpoiler(spoilerSpan, "bsu", bsu);
        addOrRemoveHiddenSpoiler(spoilerSpan, "fsu", fsu);
    }
    addOrRemoveHiddenSpoiler(spoilerSpan, "pse", pse);
    addOrRemoveHiddenSpoiler(spoilerSpan, "bse", bse);
    addOrRemoveHiddenSpoiler(spoilerSpan, "fse", fse);
}

function addOrRemoveHiddenSpoiler(spoilerSpan, className, checkboxName) {
    if (spoilerSpan.classList.contains(className)) { 
        if (checkboxName.checked) {
            spoilerSpan.classList.remove("hiddenspoiler");
        } else {
            spoilerSpan.classList.add("hiddenspoiler");
            spoilerSpan.addEventListener("click", () => {spoilerSpan.classList.remove("hiddenspoiler")});
        }
    }
}

// Set spoiler checkboxes to use correct functions
function setUpSpoilerCheckboxes() {
    markLowerLevelSpoilers(this);
    changeSpoilerStyling();
}

for (let i=0; i<spoilerInputs.length; i++) {
    spoilerInputs[i].addEventListener("click", setUpSpoilerCheckboxes);
}


// Set entry logos to be clickable elements to populate content area
const entryTitle = document.getElementById("entrytitle");
const releaseDate = document.getElementById("releasedate");
// const phaseNum = phasesExist ? document.getElementById("phasenum") : null;
const whereToFindHeading = document.getElementById("wheretofindheading");
const whereToFind = document.getElementById("wheretofind");
const contentGuideHeading = document.getElementById("contentguideheading");
const contentGuide = document.getElementById("contentguide");
const whyPlacementHeading = document.getElementById("whyplacementheading");
const whyPlacement = document.getElementById("whyplacement");
const whyChron = document.getElementById("whychron");


function populateContent() {
    // Thanks for some array/object searching help: https://stackoverflow.com/questions/7176908/how-can-i-get-the-index-of-an-object-by-its-property-in-javascript
    // const entryIndex = entries.findIndex(item => item.code === this.id);

    // entryTitle.textContent = entries[entryIndex].name;

    const entry = entries[entries.findIndex(item => item.code === this.id)];
    entryTitle.textContent = entry.name;
    releaseDate.textContent = parseDate(entry.release);

    if (phasesExist) { document.getElementById("phasenum").textContent = entry.phase ? entry.phase : "?" }
    if (sagaNames) { document.getElementById("saganame").textContent = entry.phase ? sagaNames[entry.phase] : "?" }
    if (subseriesExist) { document.getElementById("subseriesname").textContent = entry.subseries ? entry.subseries + (entry.subsubseries ? " (" + entry.subsubseries + ")" : "") : "?"}
    
    populateWhereToFind(entry);
    populateContentGuide(entry);
    populateWhyContent(entry);

    document.getElementById("content").classList.remove("hid");
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

// "Where to Find" Section
const iconFilePath = "../icons/";
const disneyPlusIcon = "disneyplus.png";
const netflixIcon = "netflix.jpeg";
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
    ${entry.primevideo ? '<li><a href="https://www.amazon.com/gp/video/detail/' + entry.primevideo + '"><img src="' + iconFilePath + primeVideoIcon + '" alt="Prime Video"></a></li>' : ''}
    ${entry.vudu ? '<li><a href="https://www.vudu.com/content/movies/details/' + entry.vudu + '"><img src="' + iconFilePath + vuduIcon + '" alt="Vudu Fandango"></a></li>' : ''}
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
// Add eBay?

function prepForURL(string) {
    return string.toLowerCase().replaceAll(" ","+");
}


// "Content Guide" Section
// https://www.commonsensemedia.org/movie-reviews/iron-man
// https://www.imdb.com/title/tt0371746/parentalguide
// https://kids-in-mind.com/i/ironman.htm
// https://www.clearplay.com/MovieDash.aspx?id=3003

const commonSenseIcon = "commonsense.jpeg";
const imdbIcon = "imdb.jpg";
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

function populateWhyContent(entry) {
    const noInfo = "Information not available.";
    let whyPlacementContent = noInfo;
    let setHeading = false;
    let whyPlacementType = "this";

    if (release.checked) {
        whyPlacementHeading.classList.add("hid");
        whyPlacement.classList.add("hid");
    } else {
        whyPlacementHeading.classList.remove("hid");
        whyPlacement.classList.remove("hid");

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

    whyPlacementHeading.textContent = `${capitalizeFirstLetter(whyPlacementType)} Order Reasoning`;
    whyPlacement.innerHTML = whyPlacementContent;

    // whyChron.innerHTML = entry.whychron;

    replaceSpoilerTags();
    changeSpoilerStyling();
}

function adjustWhyContent() {
    if (!content.classList.contains("hid")) {
        const currentEntryTitle = entryTitle.textContent;
        const entry = entries[entries.findIndex(item => item.name === currentEntryTitle)];
        populateWhyContent(entry);
    }
}

// Replace custom HTML spoiler tags with appropriate spans
function replaceSpoilerTags() {
    const spoilerTags = document.querySelectorAll("#content p > *:not(span, strong, em, a, img, ul, li, p)");

    for (let i=0; i<spoilerTags.length; i++) {
        const tagType = spoilerTags[i].nodeName.toLowerCase();
        
        let tagTypeWritten;
        if (tagType == "pst") {tagTypeWritten = "Premise story level"}
        else if  (tagType == "bst") {tagTypeWritten = "Basic story level"}
        else if  (tagType == "fst") {tagTypeWritten = "Full story level"}
        else if  (tagType == "pse") {tagTypeWritten = "Premise series level"}
        else if  (tagType == "bse") {tagTypeWritten = "Basic series level"}
        else if  (tagType == "fse") {tagTypeWritten = "Full series level"}
        else if  (tagType == "psu") {tagTypeWritten = "Premise subseries level"}
        else if  (tagType == "bsu") {tagTypeWritten = "Basic subseries level"}
        else if  (tagType == "fsu") {tagTypeWritten = "Full subseries level"}

        const spoilerMessage = `${tagTypeWritten} spoilers`;

        spoilerTags[i].insertAdjacentHTML("afterend", `<span class="${tagType} spoiler" title="${spoilerMessage}"><span>${spoilerTags[i].innerHTML}</span></span>`);
        spoilerTags[i].remove();
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