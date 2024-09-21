import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
const CropPrice = () => {
  const [series, setSeries] = useState(
    [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]
  )

  const [options, setOption] = useState( {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  )
  return (
    <div>
 { <ReactApexChart options={options} series={series} type="line" height={350} /> }

    </div>
  )
}

export default CropPrice