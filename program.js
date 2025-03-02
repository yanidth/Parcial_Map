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

btnTrees.addEventListener("click",
    async ()=>{
        let response = await fetch('arboles_La_Alborada.geojson');
        let datos = await response.json();

        //Agregar la capa al mapa
        L.geoJSON(
            datos,
            {
                pointToLayer: function(feature, latlng){

                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: "green",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    })
   
                }
            }
        ).addTo(map);
    }
)

let btnDistance = document.getElementById("btnDistance");

btnDistance.addEventListener("click",
    async ()=>{

        let response = await fetch('arboles_La_Alborada.geojson');
        let datos = await response.json();
        let trees = datos.features.map((myElement, index) => ({
            id: index + 1,
            coordinates: myElement.geometry.coordinates
        }));

        let distances = [];

        trees.forEach((treeA) => {trees.forEach(
                (treeB)=>{
                    //Calcular la distancia de treeA a cada uno de los arboles.
                    if(treeA.id != treeB.id){                    
                        let distance = turf.distance(
                            turf.point(treeA.coordinates),
                            turf.point(treeB.coordinates)

                        );

                        distances.push(
                            [
                                `Arbol ${treeA.id}`,
                                `Arbol ${treeB.id}`,
                                distance.toFixed(3)
                            ]
                        )
                }   
            }
            )
        }
        )
        generatePDF(distances, trees.length);
    }
)
function generatePDF(distances, totalTrees){ 

    let {jsPDF} = window.jspdf;
    let documentPDF =new jsPDF();

    documentPDF.text('Distancias entre árboles del Barrio La Alborada', 10, 10);
    
    documentPDF.autoTable(
        {
            head: [['Árbol A', 'Arbol B', 'Distancia (km)']],
            body: distances
        }

    );
    documentPDF.save('Distancias_Árboles_La_Alborada.pdf');
}

btnIncidentes.addEventListener("click",
    async ()=>{
        let response = await fetch('incidentes_La_Alborada.geojson');
        let datos = await response.json();

        L.geoJSON(
            datos,
            {
                pointToLayer: function(feature, latlng){

                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: "red",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    })
   
                }
            }
        ).addTo(map);
    }
)