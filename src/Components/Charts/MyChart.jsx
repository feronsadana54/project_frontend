import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import DashboardLayout from "../../Layouts/DashboardLayout";

const DashboardPage = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series.data.setAll([
      { category: "January", value: 40 },
      { category: "February", value: 55 },
      { category: "March", value: 60 },
    ]);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <DashboardLayout>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </DashboardLayout>
  );
};

export default DashboardPage;
