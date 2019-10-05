export var ImageBaseUrl = "http://image.tmdb.org/t/p/";

export var posterSizes = {
    92: "w92",
    154: "w154",
    185: "w185",
    342: "w342",
    500: "w500",
    780: "w780",
    0: "original"
};


export var backdropSizes = {
    300: "w300",
    780: "w780",
    1280: "w1280",
    0: "original"
};


export var genres_map = {
    12: 'Adventure',
    14: 'Fantasy',
    16: 'Animation',
    18: 'Drama',
    27: 'Horror',
    28: 'Action',
    35: 'Comedy',
    36: 'History',
    37: 'Western',
    53: 'Thriller',
    80: 'Crime',
    99: 'Documentary',
    878: 'Science Fiction',
    9648: 'Mystery',
    10402: 'Music',
    10749: 'Romance',
    10751: 'Family',
    10752: 'War',
    10770: 'TV Movie'
};


export const genres_options = Object.entries(genres_map).map(([k, v]) => ({ value: k, label: v }));

