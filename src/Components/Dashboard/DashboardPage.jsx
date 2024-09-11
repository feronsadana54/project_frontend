import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { getTotalSetoran } from "../../Api/pembayaranapi";
import DashboardLayout from "../../Layouts/DashboardLayouts";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("access_token");
  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   fetchTotalSetoran();
  // }, []);

  // const fetchTotalSetoran = async () => {
  //   const response = await getTotalSetoran(currentYear,token);
  //   setData(response.data);
  // };

  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "bulan",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Setoran",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "total",
        categoryXField: "bulan",
      })
    );

    series.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <DashboardLayout>
      <h1 className="mt-4">Dashboard</h1>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </DashboardLayout>
  );
};

export default DashboardPage;