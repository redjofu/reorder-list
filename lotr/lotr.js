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
    films: `Theatrical films, including the Skywalker Saga ("episodes") and anthology films.`,
    tvseries: `Live-action series produced for Disney+, such as <em>The Mandalorian</em>.`,



    // Order inputs
    chronological: `The order according to when the core events for each entry occur within the overarching story of the Star Wars galaxy. For times when there is uncertainty within the narratives themselves, statements from filmmakers and obscure details help clarify this order. (Thanks to <a href="https://starwars.fandom.com/wiki/Main_Page">Wookieepedia</a>!) Note that non-canon entries like <em>Star Wars Visions</em> are not included.`,
    recommendChronological: `Since Star Wars is a series that constantly builds upon previous entries through prequel stories, watching in chronological order <strong><em>is not</em></strong> recommended for first-time viewers as doing so <strong><em>will</em></strong> spoil significant plot twists. However, chronological order can be an acceptable first-time viewing order if there is a compelling reason to do so; it's just not recommended for most.`,
    narrative: `An order I think offers good narrative structure for viewers (including those watching for the first time), primarily built around continuing related plot threads.`,

    // Spoiler inputs
};

const orderRec = {
    releaseRec: true,
    releaseFeeling: "good",
    // chronologicalRec: false,
    // chronologicalFeeling: "not recommended",
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