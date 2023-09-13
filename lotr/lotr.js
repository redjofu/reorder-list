const seriesName = "the Lord of the Rings";
const pageTitle = `Best Order to Watch ${seriesName}`;
const pageName = "Lord of the Rings";
const pageNameMobile = "LotR";

// How to describe the people who consume the media in question (e.g. "viewers," "readers," "gamers")
const userType = "viewers";
const progressiveVerb = "watching";
const infinitiveVerb = "watch";
const greetingsName = "Elf"

// How to describe how someone might view the media in "tailer" or "blurb" form
const blurbVerb = "watching a trailer";

// How to describe the people who made the media
const mediaCreators = "filmmakers";

// Example of a subseries
const subseriesExample = "The Hobbit";

// Type of image being used
const imageType = "poster";

const typeOptions = [
    ["Films", "films"],
    ["TV Series", "tvseries"]
]

const orderOptions = {
    release: true,
    chronological: true,
    narrative: true,
    alphabetical: true,
};

// Are different elements present?
const creditScenesExist = false;
const otherSeriesMentions = false;

const sagaNames = false;

// Text that appears when a selection input is clicked
const selectionOptionDescription = {
    // Type inputs
    films: `Theatrical films, the <em>Hobbit</em> and <em>Lord of the Rings</em> trilogies.`,
    tvseries: `Live-action series, specifically <em>The Rings of Power</em>.`,



    // Order inputs
    chronological: `The order according to when the core events for each entry occur within the history of Middle-earth.`,
    recommendChronological: `The release order for the live-action screen adapations is different than the book publishing order. Because of this, watching <em>The Lord of the Rings</em> films before <em>The Hobbit</em> films is the preferred narrative order, though beginning with <em>The Hobbit</em> since it is chronologically earlier is also acceptable. However, watching <em>The Rings of Power</em> first will not be as meaningful even though it takes place first chronologically.`,
    narrative: `An order I think offers good narrative structure for viewers (including those watching for the first time), primarily built around continuing related plot threads.`,

    // Spoiler inputs
};

const orderRec = {
    releaseRec: true,
    releaseFeeling: "good",
    chronologicalRec: false,
    chronologicalFeeling: "not recommended",
    // narrativeRec: true,
    // narrativeFeeling: "excellent"
}


// Series-specific details
const officialSite = {
    url: "",
    icon: "official.png",
    description: "Official Website"
}

const wiki = {
    url: "https://lotr.fandom.com/wiki/",
    icon: "fandom.png",
    description: "One Wiki to Rule Them All"
}

const cloneWarsChronLink = `The official chronological order for <em>the Clone Wars</em> <a href="https://www.starwars.com/news/star-wars-the-clone-wars-chronological-episodeorder">can be found at StarWars.com</a>.`;

pageLoads = true; // This is used by the check-update file trying to find this JS file, and it should always be true.