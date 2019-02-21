let db = require('./src/models');

let recommendation_list = [
    {
        name: "Per Diem",
        placeId: "https://www.yelp.com/biz/per-diem-san-francisco",
        description: "This is a fantastic restaurant.",
        email: "north@gmail.com",
        latitude: 37.790041,
        longitude: -122.401275,
        author: 'Nicolette'
    },
    {
        name: "Hog Island Oyster Co",
        placeId: "https://www.yelp.com/biz/hog-island-oyster-co-san-francisco",
        description: "This is a fantastic restaurant.",
        email: "east@gmail.com",
        latitude:  37.795831,
        longitude:  -122.393303,
        author: 'Nicolette'
    },
    { 
        name: "Curry Up Now Food Truck",
        placeId: "https://www.yelp.com/biz/curry-up-now-food-truck-san-francisco",
        description: "This is a fantastic restaurant.",
        email: "south@gmail.com",
        latitude: 37.79093,
        longitude: -122.40164,
        author: 'Nicolette'
    },
    {
        name: "Señor Sisig",
        placeId: "https://www.yelp.com/biz/se%C3%B1or-sisig-san-francisco-3",
        description: "This is a fantastic restaurant.",
        email: "west@gmail.com",
        latitude: 37.79059,
        longitude: -122.40306,
        author: 'Jonathan'
    },
    {
        name: "Blue Bottle Coffee",
        placeId: "https://www.yelp.com/biz/blue-bottle-coffee-san-francisco-14",
        description: "This is a fantastic restaurant.",
        email: "northeast@gmail.com",
        latitude: 37.7913156019325,
        longitude: -122.401013486507,
        author: 'Jonathan'
    },
    {
        name: "Workshop Cafe FiDi",
        placeId: "https://www.yelp.com/biz/workshop-cafe-fidi-san-francisco-2",
        description: "This is a fantastic restaurant.",
        email: "southeast@gmail.com",
        latitude: 37.79074,
        longitude: -122.40197,
        author: 'Bryant'
    },
    {
        name: "The Treasury",
        placeId: "https://www.yelp.com/biz/the-treasury-san-francisco",
        description: "This is a fantastic restaurant.",
        email: "southwest@gmail.com",
        latitude: 37.7912937,
        longitude: -122.4010389,
        author: 'Bryant'
    },
    {
        name: "La Fusión",
        placeId: "https://www.yelp.com/biz/la-fusi%C3%B3n-san-francisco-2",
        description: "This is a fantastic restaurant.",
        email: "northwest@gmail.com",
        latitude: 37.7916357455614,
        longitude: -122.403691572642,
        author: 'Darnell'
     }
   ];

db.RecommendModel.remove({}, (err, authors) =>{
    console.log('removed all authors');
    db.RecommendModel.create(recommendation_list, (err, recommendation) =>{
        if (err) {throw err}
        console.log(recommendation_list);
    });
});