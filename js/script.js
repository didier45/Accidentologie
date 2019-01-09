
var map, vectorLayer,Layeracc;
var token = "pk.eyJ1Ijoic2FmYXNoYW1zIiwiYSI6ImNqcWk0ZHZlNjV2OW0zeGxnZmlpd3k2NHUifQ.GJHX4f4bKPr5XnLHlXuT4A";
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


    $(document).ready(function () {
        // Create map with OSM baselayer / centered on the East of the Neuchâtel lake
        map = new ol.Map({
            view: new ol.View({
                center: ol.proj.fromLonLat([6.1667, 46.2]),
                zoom: 12
            }),
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    opacity: 1, // !!
                    source: new ol.source.OSM()
                })
            ]
        });
        
        vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector(), // empty source
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 2
                })
            })
        });
        map.addLayer(vectorLayer);


        var canton = new ol.layer.Image({
            //visible: false,
            source: new ol.source.ImageWMS({
                url: chWMS,
                ratio: 1,
                params: {
                    VERSION: "1.0.0",
                    LAYERS: "ch.swisstopo.swissboundaries3d-kanton-flaeche.fill",
                    FORMAT: "image/png"
                }
            })
        });

        map.addLayer(canton);

       Layeracc = new ol.layer.Vector({
            title: 'Accident',
            visible: true,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 2,
                    fill: new ol.style.Fill({
                        color: [115, 8, 0]
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#cb1d1d',
                        width: 2
                    })
                })
            }),
            source: new ol.source.Vector({
                projection: 'EPSG:4326',
                url: 'Accident.geojson',
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeracc);





        initRoute();

        map.on("singleclick", function (e) {
            var fts = vectorLayer.getSource().getFeatures();
            fts[0].getGeometry().appendCoordinate(e.coordinate);
        });

        $("#route").click(function (e) {
            // interact with Mapbox Directions API given all the segments of the requested route
            var fts = vectorLayer.getSource().getFeatures();
            if (fts[0].getGeometry().getLength() >= 2) {
                ft = fts[0].getGeometry().clone().transform("EPSG:3857", "EPSG:4326");
                var s = ft.getCoordinates().join(";");
                console.log(s);

                var url = "https://api.mapbox.com/v4/directions/mapbox.walking/" + s + ".json?access_token=" + token;
                $.get(url, function (data) {
                    $("#info").append($("<p/>").text(data.origin.properties.name + " --> " + data.destination.properties.name));

                    var geom = new ol.geom.LineString(data.routes[0].geometry.coordinates);
                    var ft = new ol.Feature({
                        geometry: geom.transform("EPSG:4326", "EPSG:3857"),
                        name: "Route 1"
                    });
                    vectorLayer.getSource().addFeature(ft);
                    var fts = vectorLayer.getSource().getFeatures();
                    fts[0].getGeometry().setCoordinates([]);
                });
            }
        });

        $("#reset").click(function (e) {
            vectorLayer.getSource().clear();
            $("#info p").remove();
            initRoute();
        });
        
        // Event sur click sur un icon pour afficher info
            var selectInteraction = new ol.interaction.Select({
                condition: ol.events.condition.singleClick,
                // the interactive layers on which the selection is possible (they may be more than one)
                layers: [Layeracc]
            });
            map.addInteraction(selectInteraction);
            // add a listener to fire when one or more feature from the interactive layer(s) is(are) selected
            selectInteraction.on('select', function(e) {
                
                    var groupeacc = e.selected[0].get("GROUPE_ACC");
                    var dateacc = e.selected[0].get("DATE_");
                    var typeacc = e.selected[0].get("TYPE");
                    var causeacc = e.selected[0].get("CAUSE");
                    var consacc = e.selected[0].get("CONSEQUENC");
                    var tueacc = e.selected[0].get("NB_TUES");
                    var pietonacc = e.selected[0].get("NB_PIETONS");
                    var cycleacc = e.selected[0].get("NB_BICYCLE");
                    var blessacc = e.selected[0].get("NB_BLESSES");
                    
                    
                    
                        $("#infoacc").html(" <b> Groupe : </b>" + groupeacc + " <br> <b> Date : </b>" + dateacc + " <br> <b> Type : </b>" + typeacc + " <br> <b> Cause : </b>" + causeacc + " <br> <b> Consequence : </b>" + consacc + " <br> <b> Nombres de personnes blessees : </b>"+ blessacc + " <br> <b> Nombres de personnes mortes : </b>" + tueacc + " <br> <b> Nombre de pietons : </b>" + pietonacc + " <br> <b> Nombre de cyclictes : </b>" + cycleacc );

                });



    
                    
            
    
    function initRoute(){
        // Just add a first empty LineString
        var geom = new ol.geom.LineString([]);
        var ft = new ol.Feature({
            geometry: geom,
            name: "Input feature"
        });
        vectorLayer.getSource().addFeature(ft);
    }

    });
    
    
    






 

