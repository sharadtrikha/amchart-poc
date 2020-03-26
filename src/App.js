import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";

am4core.useTheme(am4themes_animated);

function App() {
  const [chart, setChart] = React.useState({});

  useEffect(() => {
    let map = am4core.create("chartdiv", am4maps.MapChart);
    // Set map definition
    map.geodata = am4geodata_usaLow;

    // Set projection
    map.projection = new am4maps.projections.AlbersUsa();

    // Create map polygon series
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name} {value} ";

    // Add some data
    polygonSeries.data = [
      {
        id: "US-TX",
        value: 100,
        fill: am4core.color("#F05C5C")
      },
      {
        id: "US-MT",
        value: 50,
        fill: am4core.color("#5C5CFF")
      }
    ];

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = "fill";

    // Create a circle image in image series template so it gets replicated to all new images
    let imageSeries = map.series.push(new am4maps.MapImageSeries());
    var imageSeriesTemplate = imageSeries.mapImages.template;
    var circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#B27799");
    circle.stroke = am4core.color("#FFFFFF");
    circle.strokeWidth = 2;
    circle.nonScaling = true;
    circle.tooltipText = "{title}";

    // Set property fields
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    // Add data for the three cities
    imageSeries.data = [
      {
        latitude: 31.9686,
        longitude: -99.9018,
        title: "Demo"
      },
      {
        latitude: 32,
        longitude: -102,
        title: "Demo 2"
      },
      {
        latitude: 31,
        longitude: -101,
        title: "Demo 3"
      }
    ];

    // ... chart code goes here ...

    setChart(map);
    return () => map.dispose();
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "800px" }}></div>;
}

export default App;
