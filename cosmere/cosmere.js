const seriesName = "Cosmere";
const pageTitle = `Best Order to Read the ${seriesName}`;
const pageName = "Brandon Sanderson's Cosmere";
const pageNameMobile = "Cosmere";

// How to describe the people who consume the media in question (e.g. "viewers," "readers," "gamers")
const userType = "readers";
const progressiveVerb = "reading";
const infinitiveVerb = "read";
const greetingsName = "Worldhopper"

// How to describe how someone might view the media in "tailer" or "blurb" form
const blurbVerb = "reading a blurb";

// How to describe the people who made the media
const mediaCreators = "author";

// Example of a subseries
const subseriesExample = "Mistborn";

// Type of image being used
const imageType = "book cover";

const typeOptions = [
    ["Novels", "novels"],
    ["Novellas", "novellas"],
    ["Short Stories", "shortstories"],
    ["Graphic Novels", "graphicnovels"],
    ["Anthologies", "anthologies"]
]

const orderOptions = {
    release: true,
    chronological: true,
    narrative: true,
    alphabetical: true,
    special: true
};

const specialOrderName = "machete";

// Are different elements present?
const creditScenesExist = true;
const otherSeriesMentions = false;

// Names of sagas
// const sagaInfinity = "The Infinity Saga";
// const sagaMultiverse = "The Multiverse Saga";

// const sagaNames = [
//     "", // 0
//     sagaInfinity, sagaInfinity, sagaInfinity, // 1-3
//     sagaMultiverse, sagaMultiverse, sagaMultiverse, // 4-6
//     "" // 7
// ]
const sagaNames = false;

// Text that appears when a selection input is clicked
const selectionOptionDescription = {
    // Type inputs
    films: `Theatrical films, including the Skywalker Saga ("episodes") and anthology films.`,
    tvseries: `Live-action series produced for Disney+, such as <em>The Mandalorian</em>.`,
    animation: `Primary animated series produced since the Disney buyout of Lucasfilm, plus <em>the Clone Wars</em> film and series. Legacy Star Wars animation is not currently included. Some other smaller animation projects are also not included.`,
    jranimation: `Animation created for toddlers and very young children, such as <em>Young Jedi Adventures</em>.`,
    shorts: `Shorts that tie in to animated series but don't consist of full-length episodes.`,


    // Order inputs
    chronological: `The order according to when the core events for each entry occur within the overarching story of the Star Wars galaxy. For times when there is uncertainty within the narratives themselves, statements from filmmakers and obscure details help clarify this order. (Thanks to <a href="https://starwars.fandom.com/wiki/Main_Page">Wookieepedia</a>!) Note that non-canon entries like <em>Star Wars Visions</em> are not included.`,
    recommendChronological: `Since Star Wars is a series that constantly builds upon previous entries through prequel stories, watching in chronological order <strong><em>is not</em></strong> recommended for first-time viewers as doing so <strong><em>will</em></strong> spoil significant plot twists. However, chronological order can be an acceptable first-time viewing order if there is a compelling reason to do so; it's just not recommended for most.`,
    narrative: `An order I think offers good narrative structure for viewers (including those watching for the first time), primarily built around continuing related plot threads.`,
    special: `The machete order is a sequence <a href="https://www.rodhilton.com/2011/11/11/the-star-wars-saga-suggested-viewing-order/">created by blogger Rod Hilton in a 2011 post where he advocated a new watching order for the original and prequel trilogies</a>. This order has garnered considerable media attention and fan support over the years. The philosophy behind the machete order is to refocus Star Wars on Luke Skywalker's journey and character arc, so it begins with <em>A New Hope</em> and uses <em>Attack of the Clones</em> and <em>Revenge of the Sith</em> as backstory after <em>Empire Strikes Back</em> to provide context for the events that led to the choices Luke has to make in <em>Return of the Jedi</em>. The sequel trilogy is then next, though even this is a questionable addition to machete order as Luke's arc as begun in <em>A New Hope</em> has already arrived at a resolution by the end of <em>Return of the Jedi</em>. Hilton wrote <a href="https://www.rodhilton.com/2015/12/28/machete-order-update-and-faq/#toc-where-do-episode-vii-and-rogue-one-fit">a follow up post explaining that all other entries are irrelevant to machete order because they take the focus away from Luke</a>, and while Hilton doesn't necessarily advocate ignoring them completely, the machete order treats all of them equally in that you can watch them in whatever order you prefer. Also note that Hilton considers <em>The Phantom Menace</em> as nonessential to Luke's story, so it is also not included in the machete order.`,
    chooseSpecial: `Choose this order for a Star Wars experience focused on Luke Skywalker in his character arc of the <a href="https://en.wikipedia.org/wiki/Hero%27s_journey">Hero's Journey</a>.`,
    recommendSpecial: `This order is excellent for first time viewers who want the core Star Wars experience as it preserves several key plot twists in a way that no other order fully does. However, its lack of concern over non-Skywalker Saga entries (as well as <em>The Phantom Menace</em>) does not make it a great order for first-time viewers who intend to watch all (or most) Star Wars entries&mdash;those who have a more completionist bent on approaching media franchises.`,

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
    url: "https://www.starwars.com/",
    icon: "starwars.png",
    description: "Official Star Wars Website"
}

const wiki = {
    url: "https://starwars.fandom.com/wiki/",
    icon: "fandom.png",
    description: "Wookieepedia"
}

const cloneWarsChronLink = `The official chronological order for <em>the Clone Wars</em> <a href="https://www.starwars.com/news/star-wars-the-clone-wars-chronological-episodeorder">can be found at StarWars.com</a>.`;

pageLoads = true; // This is used by the check-update file trying to find this JS file, and it should always be true.