let data = [];
let latitude = 0;
let longitude = 0;
let identification = '';

function getData(){
    setTimeout(async function(){
    const url = 'https://airlabs.co/api/v9/flights?api_key=f8cf4996-43d5-401d-b4f5-da5a4e42d6b4&flight_number';
    let response = await fetch(url);
    data = await response.json();
    search(data);
    getData();
    }, 25000);
}

async function search(data){
    for (let i=0; i<data.response.length; i++){
        if(data.response[i].reg_number === identification){
            latitude = await data.response[i].lat;
            longitude = await data.response[i].lng;
            move(latitude, longitude);
        } else {}
    }
}

mapboxgl.accessToken = 'pk.eyJ1Ijoia2ltcGFjbyIsImEiOiJjbGZwMnJ1bm8wNmc1M3pueXU4dTRubDZqIn0.ty3gwSeNaEFvRH9D9kz1Wg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});

var marker = new mapboxgl.Marker()
.setLngLat([longitude, latitude])
.addTo(map);

function move(latitude, longitude){
    marker.setLngLat([longitude, latitude]);
    console.log(latitude);
    console.log(longitude);
}

async function getID() {
    const url = 'https://airlabs.co/api/v9/flights?api_key=f8cf4996-43d5-401d-b4f5-da5a4e42d6b4&flight_number';
    let response = await fetch(url);
    data = await response.json();
    identification = data.response[42].reg_number;
    getData();
    console.log(identification)
}

getID();