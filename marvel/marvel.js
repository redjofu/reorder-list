const pageTitle = "Best Order to Watch the Marvel Cinematic Universe";

// How to describe the people who consume the media in question (e.g. "viewers," "readers," "gamers")
const userType = "viewers";
const progressiveVerb = "watching";

// How to describe how someone might view the media in "tailer" or "blurb" form
const blurbVerb = "watching a trailer";

const typeOptions = [
    ["Films", "films"],
    ["TV Series", "tvseries"]
]

const orderOptions = {
    release: true,
    chronological: true,
    narrative: true
};

// Text that appears when a selection input is clicked
const selectionOptionDescription = {
    // Type inputs
    films: `Theatrical films produced by Marvel Studios. Marvel films produced by other studios (e.g. Fox's "X-Men" series) are not included.`,
    tvseries: `Disney+ series produced by Marvel Studios. Series produced by Marvel TV (e.g. "Agents of S.H.I.E.L.D.") are not included.`,

    // Order inputs
    chronological: `The order according to when the core events for each entry occur within the overarching story. This is primarily taken from the order listed within Disney+, though sources using orders compiled by fans are also used.`

    // Spoiler inputs
};


////////////////////////////////////////
/////////// Entry Content //////////////
////////////////////////////////////////

const entries = [
    {
        "name": "Iron Man",
        "release year": 2008,
        "release date": "May 2",
        "release order": 2008-05,
        "chronological order": 3,
        "narrative order": 1,
        "type": "films",
        "image": undefined
    },
    {
        "name": "The Incredible Hulk",
        "release date": 2008-06,
        "chronological order": 4,
        "narrative order": 4,
        "type": "films",
        "image": undefined
    },
    {
        "name": "Iron Man 2",
        "release date": 2010-05,
        "chronological order": 5,
        "narrative order": 2,
        "type": "films",
        "image": undefined
    },
    {
        "name": "Thor",
        "release date": 2011-,
        "chronological order": ,
        "narrative order": ,
        "type": "films",
        "image": undefined
    }
    /*
    {
        "name": ,
        "release date": ,
        "chronological order": ,
        "narrative order": ,
        "type": ,
        "image": 
    }
    */
]