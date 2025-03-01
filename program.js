var map = L.map('map').setView([4.6920279795640125, -74.07692210386752], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



async function loadPolygon() {
    
    let myDates = await fetch('barrios_prueba.geojson');
    let myPolygon = await myDates.json();
    
    L.geoJSON(myPolygon,
        {
            style:{

                color:"blue"

            }

        }
    
    ).addTo(map);

}

loadPolygon();

let btnTrees = document.getElementById("btnTrees");

btnTrees.addEventListener("click", ()=> alert('Hola'));



async function loadPolygon() {
    
    let myDates = await fetch('arboles.geojson');
    let myPolygon = await myDates.json();
    
    L.geoJSON(myPolygon,
        {
            style:{

                color:"green"

            }

        }
    
    ).addTo(map);

}

loadPolygon();