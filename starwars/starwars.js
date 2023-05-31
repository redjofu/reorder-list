const seriesName = "Star Wars";
const pageTitle = `Best Order to Watch ${seriesName}`;
const pageName = "Star Wars";
const pageNameMobile = "Star Wars";

// How to describe the people who consume the media in question (e.g. "viewers," "readers," "gamers")
const userType = "viewers";
const progressiveVerb = "watching";
const infinitiveVerb = "watch";
const greetingsName = "Jedi"

// How to describe how someone might view the media in "tailer" or "blurb" form
const blurbVerb = "watching a trailer";

// How to describe the people who made the media
const mediaCreators = "filmmakers";

// Example of a subseries
const subseriesExample = "Clone Wars";

// Type of image being used
const imageType = "poster";

const typeOptions = [
    ["Films", "films"],
    ["TV Series", "tvseries"],
    ["Animation", "animation"],
    ["Jr. Animation", "jranimation"],
    ["Shorts", "shorts"]
]

const orderOptions = {
    release: true,
    chronological: true,
    narrative: true,
    alphabetical: true
};

// Are different elements present?
// const lengthExists = true;
// const subseriesExist = true;
// const phasesExist = true;
const creditScenesExist = true;
const otherSeriesMentions = true;

// Names of sagas
const sagaInfinity = "The Infinity Saga";
const sagaMultiverse = "The Multiverse Saga";

const sagaNames = [
    "", // 0
    sagaInfinity, sagaInfinity, sagaInfinity, // 1-3
    sagaMultiverse, sagaMultiverse, sagaMultiverse, // 4-6
    "" // 7
]

// Text that appears when a selection input is clicked
const selectionOptionDescription = {
    // Type inputs
    films: `Theatrical films produced by Marvel Studios. Marvel films produced by other studios (e.g. Fox's "X-Men" series) are not included.`,
    tvseries: `Disney+ series produced by Marvel Studios. Series produced by Marvel TV (e.g. "Agents of S.H.I.E.L.D.") are not included.`,
    animation: `Animated series produced by Marvel Studios and which are expressly tied to the Marvel Cinematic Universe.`,
    specials: `Marvel Studios Special Presentations, styled after traditional TV specials and often themed for a holiday.`,
    shorts: `Short films produced by Marvel Studios.`,


    // Order inputs
    chronological: `The order according to when the core events for each entry occur within the overarching story. This is primarily taken from the order listed within Disney+, though sources using orders compiled by fans are also used.`

    // Spoiler inputs
};

const orderRec = {
    releaseRec: true,
    releaseFeeling: "good",
    chronologicalRec: true,
    chronologicalFeeling: "good",
    // narrativeRec: true,
    // narrativeFeeling: "excellent"
}


// Series-specific details
const officialSite = {
    url: "https://www.starwars.com/",
    icon: "marvel.png",
    description: "Official Star Wars Website"
}

const wiki = {
    url: "https://marvelcinematicuniverse.fandom.com/wiki/",
    icon: "fandom.png",
    description: "Marvel Cinimatic Universe Wiki"
}

pageLoads = true; // This is used by the check-update file trying to find this JS file, and it should always be true.