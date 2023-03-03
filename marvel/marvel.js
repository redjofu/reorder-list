const pageTitle = "Best Order to Watch the Marvel Cinematic Universe";

// How to describe the people who consume the media in question (e.g. "viewers," "readers," "gamers")
const userType = "viewers";
const progressiveVerb = "watching";
const infinitiveVerb = "watch";

// How to describe how someone might view the media in "tailer" or "blurb" form
const blurbVerb = "watching a trailer";

// Example of a subseries
const subseriesExample = "Thor";

const typeOptions = [
    ["Films", "films"],
    ["TV Series", "tvseries"]
]

const orderOptions = {
    release: true,
    chronological: true,
    narrative: true
};

// Are different elements present?
const lengthExists = true;
const subseriesExist = true;
const phasesExist = true;

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

    // Order inputs
    chronological: `The order according to when the core events for each entry occur within the overarching story. This is primarily taken from the order listed within Disney+, though sources using orders compiled by fans are also used.`

    // Spoiler inputs
};


// Series-specific details
const officialSite = {
    url: "https://www.marvel.com/",
    icon: "marvel.png",
    description: "Official Marvel Website"
}

const wiki = {
    url: "https://marvelcinematicuniverse.fandom.com/wiki/",
    icon: "fandom.png",
    description: "Marvel Cinimatic Universe Wiki"
}


////////////////////////////////////////
///////////// Characters ///////////////
////////////////////////////////////////

const characters = {
    "tonystark" : {
        "name" : "Tony Stark",
        "fullname" : "Anthony Stark",
        "alias" : "Iron Man",
        "gender" : "m",
        "nationality" : "american",
        "species" : "human",
        "race" : "white"
    },
    "rhodey" : {
        "name" : "James Rhodes"
    },
    "pepperpotts" : {
        "name" : "Pepper Potts",
        "fullname" : "Virginia Potts",
        "gender" : "f",
        "nationality" : "american",
        "species" : "human",
        "race" : "white"
    },
    "philcoulson" : {
        "name" : "Phil Coulson"
    },
    "nickfury" : {
        "name" : "Nick Fury"
    }
}

////////////////////////////////////////
///////////// Subseries ////////////////
////////////////////////////////////////

const subseries = {
    "ironman" : {
        "name" : "Iron Man",
        "subsubseries" : {
            "trilogy" : "Iron Man trilogy"
        }
    }
}

////////////////////////////////////////
/////////// Entry Content //////////////
////////////////////////////////////////

const entries = [
    {
        "code" : "iron-man",
        "name" : "Iron Man",
        "release" : "2008-05",
        "chronological" : 3,
        "narrative" : 1,
        "type" : "films",
        "classification" : "Film",
        "image" : "iron-man.png",
        "length" : 127,
        "lengthtype" : "minutes",
        "phase": 1,
        "subseries": subseries.ironman.name,
        "subsubseries" : subseries.ironman.subsubseries.trilogy,
        "disneyplus" : "movies/iron-man/6aM2a8mZATiu",
        "netflix" : "70080038",
        "primevideo" : "B001FD5KJM",
        "vudu" : "Iron-Man/141479",
        "appletv" : "movie/iron-man/umc.cmc.219lnb4s678o8roez3o905h7r",
        "googleplay" : "movies/details/Iron_Man?id=gOe5jcSmQT4",
        "disc" : true,
        "official" : "movies/iron-man",
        "wikipedia" : "Iron_Man_(2008_film)",
        "wiki" : "Iron_Man_(film)",
        "rottentomatoes" : "m/iron_man",
        "imdb" : "tt0371746",
        "wikiquote" : "Iron_Man_(2008_film)",
        "youtube" : "8ugaeA-nMTc",
        "commonsense" : "movie-reviews/iron-man",
        "kim" : "i/ironman.htm",
        "clearplay" : "3003",
        "characters" : {
            "main" : [
                [characters.tonystark.name, characters.tonystark.alias, "pst"]
            ],
            "major" : [
                [characters.pepperpotts.name, null, "bst"],
                [characters.rhodey.name, null, "bst"]
            ],
            "minor" : [
                [characters.philcoulson.name, null, "bst"]
            ],
            "cameo" : [
                [characters.nickfury.name, null, "fst"]
            ]
        },
        "whychron" : "<fst>Although the first film released in the MCU, the end-credits scene features Nick Fury telling Tony Stark there are other superheroes.</fst> <pse>Indeed, both Captain America and Captain Marvel take place before,</pse> <bse>and we discover that Ant-Man and Black Panther's predecessors were also active previous to Iron Man.</pse>"
    },
    {
        "code": "incredible-hulk",
        "name": "The Incredible Hulk",
        "release": "2008-06",
        "chronological": 4,
        "narrative": 4,
        "type": "films",
        "image": "incredible-hulk.png",
        "phase": 1,
        "whychron": "hello <pst>pst</pst> <bst>bst</bst> <fst>fst</fst> <psu>psu</psu> <bsu>bsu</bsu> <fsu>fsu</fsu> <pse>pse</pse> <bse>bse</bse> <fse>fse</fse> hello"
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