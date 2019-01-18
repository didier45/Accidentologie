
var map, vectorLayer,Layeracc;
var key = "46f211afbd779ed8ee3f670e86470df9254d613b"; 
var bingkey = "Av_A1N0XFpZTl7CLHZapfa-Op1LgA2s7P5xe1yjlJ9Cgg-XGNZfL0c4wXnZYkS2B";
var format = "GeoJSON";
var token = "pk.eyJ1Ijoic2FmYXNoYW1zIiwiYSI6ImNqcWk0ZHZlNjV2OW0zeGxnZmlpd3k2NHUifQ.GJHX4f4bKPr5XnLHlXuT4A";

    $(document).ready(function () {
    
        $("button").click(function(){
        if($(this).hasClass("btn-success")){
            $(this).removeClass("btn-success");
            $(this).addClass("btn-secondary");
        }else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-success");
        }
            ;
    });
        // Create map with OSM baselayer
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
        
        Layeraccxroute = new ol.layer.Vector({
        title: 'Accidentxroute',
        visible: false,
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
            url: 'https://safapaslatete.carto.com/api/v2/sql?format=GeoJSON&q=SELECT a.id_acciden as cartodb_id, ST_ClosestPoint(ST_Centroid(r.the_geom),a.the_geom) as the_geom FROM accident as a,routegeneve as r',
            format: new ol.format.GeoJSON()
        })
    }),
            
            map.addLayer(Layeraccxroute);
        

     Satellite =  new ol.layer.Tile({
            title: 'Bing Maps',
            type: 'base',
            visible: false,
            source: new ol.source.BingMaps({
                imagerySet: 'AerialWithLabels',
                key: 'Av_A1N0XFpZTl7CLHZapfa-Op1LgA2s7P5xe1yjlJ9Cgg-XGNZfL0c4wXnZYkS2B'
            })
        }),

        map.addLayer(Satellite);
        
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
            visible: false,
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
            visible: false,
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
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20accident&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeracc);

        Layeraccvelo = new ol.layer.Vector({
            title: 'Accidentvelo',
            visible: false,
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
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20accidentvelo&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeraccvelo);

        Layeraccpietons = new ol.layer.Vector({
            title: 'Accidentpietons',
            visible: false,
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
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20accidentpietons&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeraccpietons);

        Layeraccroutesecondaire = new ol.layer.Vector({
            title: 'Accidentroutesecondaire',
            visible: false,
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
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20accidentroutesecondaire&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeraccroutesecondaire);

        Layeraccrouteprincipale = new ol.layer.Vector({
            title: 'Accidentrouteprincipale',
            visible: false,
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
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20accidentrouteprincipale&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeraccrouteprincipale);

        Layeraccautoroute = new ol.layer.Vector({
            title: 'Accidentautoroute',
            visible: false,
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
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20accidentautoroute&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),

        map.addLayer(Layeraccautoroute);

        layerroute = new ol.layer.Vector({
            title: 'RouteGeneve',
            visible: false,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [255, 0, 0],
                }),
                stroke: new ol.style.Stroke({
                    color: [255, 0, 0],
                    width: 3
                })
            }),
            source: new ol.source.Vector({
                projection: 'EPSG:4326',
                url: "https://safapaslatete.carto.com/api/v2/sql?q=select*from%20routegeneve&format=" + format + "&api_key=" + key,
                format: new ol.format.GeoJSON()
            })
        }),
        map.addLayer(layerroute);

        $("#routegeneve").click(function(){
            layerroute.setVisible(!layerroute.getVisible());
        });

        $("#accident").click(function(){
            Layeracc.setVisible(!Layeracc.getVisible());
        });

        $("#canton").click(function(){
            canton.setVisible(!canton.getVisible());
        });

        $("#Satellite").click(function(){
            Satellite.setVisible(!Satellite.getVisible());
        });
        
        $("#AccidentRoutes").click(function(){
            Layeraccxroute.setVisible(!Layeraccxroute.getVisible());
        });

        $("#Velos").click(function(){
            Layeraccvelo.setVisible(!Layeraccvelo.getVisible());
        });

        $("#Pietons").click(function(){
            Layeraccpietons.setVisible(!Layeraccpietons.getVisible());
        });

        $("#RouteSecondaire").click(function(){
            Layeraccroutesecondaire.setVisible(!Layeraccroutesecondaire.getVisible());
        });

        $("#RoutePrincipale").click(function(){
            Layeraccrouteprincipale.setVisible(!Layeraccrouteprincipale.getVisible());
        });
        
        $("#Autoroute").click(function(){
            Layeraccautoroute.setVisible(!Layeraccautoroute.getVisible());
        });


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
                

                var url = "https://api.mapbox.com/v4/directions/mapbox.driving/" + s + ".json?access_token=" + token;
                $.get(url, function (data) {
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
                layers: [Layeracc, Layeraccxroute, Layeraccvelo, Layeraccpietons, Layeraccroutesecondaire, Layeraccrouteprincipale, Layeraccautoroute   ]
            });
            map.addInteraction(selectInteraction);
            // add a listener to fire when one or more feature from the interactive layer(s) is(are) selected
            selectInteraction.on('select', function(e) {
                
                    var groupeacc = e.selected[0].get("groupe_acc");
                    var dateacc = e.selected[0].get("date_");
                    var typeacc = e.selected[0].get("type");
                    var causeacc = e.selected[0].get("cause");
                    var consacc = e.selected[0].get("consequenc");
                    var tueacc = e.selected[0].get("nb_tues");
                    var pietonacc = e.selected[0].get("nb_pietons");
                    var cycleacc = e.selected[0].get("nb_bicycle");
                    var blessacc = e.selected[0].get("nb_blesses");
                    console.log(dateacc);
                    
                    
                    
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
    
    
    






 

