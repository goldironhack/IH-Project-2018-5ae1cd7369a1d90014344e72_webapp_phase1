
var neighbor = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
var geoshape = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
var housing = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";

var r = new Map();
var map;

function getDataFromURL(URL, key){
    $.get(URL, function(data){})
    .done(function(data){
        switch(key){
            case "neigh":
                r.set(key, data.data) ;
                break;
            case "geo":
                r.set(key, JSON.parse(data).features);
                break;
            case "hous":
                r.set(key, data.data);
                break;
            default:
            break;
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function getDatasets(){
    getDataFromURL(neighbor, "neigh");
    getDataFromURL(geoshape, "geo");
    getDataFromURL(housing, "hous");
}

function initMap(){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 18
    });
    
    var marker = new google.maps.Marker({
        position: centro,
        map: map,
    });
}

function draw(){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 10
    });
    
    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    
    map.data.setStyle(function(feature){
        var numero = feature.getProperty('BoroCD').toString()[0];
        var col;
        switch(numero){
            case "1":
                col = 'chocolate';
                break;
            case "2":
                col = 'blue';
                break;
            case "3":
                col = 'yellow';
                break;
                
            case "4":
                col = 'black';
                break;
            case "5":
                col = 'green';
                break;
            default:
            break;
        }
        return{
            fillColor: col,
            strokeWeight: 1
        }
    });
}

function houses(){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 10
    });
    var mar = [];
    var arre = r.get("hous");
    for(var aux  in arre){
        var centro = new google.maps.LatLng(arre[aux][23], arre[aux][24]);
        var marker = new google.maps.Marker({
            position: centro,
            map: map,
        });
    }
}

function searHouse(){
    console.log("HOLA");
}
$(document).ready( function(){
    getDatasets();
	$("#rstBtn").on("click", initMap);
	$("#drawDistrict").on("click", draw);
	$("#seeHouses").on("click", houses);
	$("#searchHouse").on("click", searHouse);
});