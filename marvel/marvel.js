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
        "code": "iron-man",
        "name": "Iron Man",
        "release": "2008-05",
        "chronological": 3,
        "narrative": 1,
        "type": "films",
        "image": "iron-man.png"
    },
    {
        "code": "incredible-hulk",
        "name": "The Incredible Hulk",
        "release": "2008-06",
        "chronological": 4,
        "narrative": 4,
        "type": "films",
        "image": "incredible-hulk.png"
    },
    {
        "code": "iron-man-2",
        "name": "Iron Man 2",
        "release": "2010-05",
        "chronological": 5,
        "narrative": 2,
        "type": "films",
        "image": "iron-man-2.png"
    },
    {
        "code": "thor",
        "name": "Thor",
        "release": "2011-05",
        "chronological": 6,
        "narrative": 3,
        "type": "films",
        "image": "thor.png"
    },
    {
        "code": "captain-america-first-avenger",
        "name": "Captain America: The First Avenger",
        "release": "2011-07",
        "chronological": 1,
        "narrative": 5,
        "type": "films",
        "image": "captain-america-first-avenger.png"
    }
    /*
    {
        "name": ,
        "release": ,
        "chronological": ,
        "narrative": ,
        "type": ,
        "image": 
    }
    */
]