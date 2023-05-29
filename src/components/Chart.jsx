import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";

ChartJs.register(
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

const Chart = ({ arr = [], currency, days }) => {
  const date = [];
  const prices = [];



  arr.forEach((el)=>{
 
    
   if(days==="24h") date.push(new Date(el[0]).toLocaleTimeString())
   else date.push(new Date(el[0]).toLocaleDateString())
   prices.push(el[1])
    
    
    
  })


    


  

    
 





    const data = {
        labels: date,

        datasets: [
          {
            label: `price in ${currency}`,
            data: prices,
            borderColor: "black",
            backgroundColor: "rgba(255,99,132,0.5)",
          },
        ],
      }

  return (
    <Line
      options={{ responsive: true }}
      data={data}
    />
  );
};

export default Chart;
