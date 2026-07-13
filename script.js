const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";


let oiChart = null;



async function loadData() {


    try {


        const response = await fetch(API_URL);


        if (!response.ok) {

            throw new Error("API Error");

        }



        const data = await response.json();



        // =========================
        // BASIC DATA
        // =========================


        document.getElementById("nifty").textContent =
            data.nifty || "--";



        document.getElementById("banknifty").textContent =
            data.banknifty || "Coming Soon";



        document.getElementById("vix").textContent =
            data.vix || "Coming Soon";





        // =========================
        // AI SIGNAL
        // =========================


        document.getElementById("signal").textContent =
            data.signal || "🟡 WAIT";



        document.getElementById("confidence").textContent =
            data.confidence || "--";



        document.getElementById("trend").textContent =
            data.trend || "--";



        document.getElementById("reason").textContent =
            data.reason || "--";






        // =========================
        // SUPPORT RESISTANCE
        // =========================


        document.getElementById("support").textContent =
            data.support || "--";



        document.getElementById("resistance").textContent =
            data.resistance || "--";






        // =========================
        // OI DATA
        // =========================


        document.getElementById("calloi").textContent =
            data.calloi || "Coming Soon";



        document.getElementById("putoi").textContent =
            data.putoi || "Coming Soon";



        document.getElementById("pcr").textContent =
            data.pcr || "Coming Soon";



        document.getElementById("atm").textContent =
            data.atm || "Coming Soon";





        document.getElementById("lastUpdated").textContent =
            data.lastUpdated || "--";






        // =========================
        // OPTION CHAIN
        // =========================


        if(data.optionChain){


            loadOptionChain(
                data.optionChain
            );


            loadOIChart(
                data.optionChain
            );


        }



    }



    catch(error){


        console.error(error);


        document.getElementById("signal").textContent =
        "❌ API ERROR";


    }


}








// =================================
// OPTION TABLE
// =================================


function loadOptionChain(optionChain){



    const table =
    document.getElementById(
        "optionChainTable"
    );



    if(!table) return;



    table.innerHTML = "";




    optionChain.forEach(row=>{


        let status =
        "⚪ Neutral";



        if(row.putOI > row.callOI){


            status =
            "🟢 Support";


        }


        else if(row.callOI > row.putOI){


            status =
            "🔴 Resistance";


        }






        table.innerHTML += `

        <tr>

        <td>
        ${row.strike}
        </td>


        <td>
        ${(row.callOI/100000).toFixed(2)}L
        </td>


        <td>
        ${(row.putOI/100000).toFixed(2)}L
        </td>


        <td>
        ${status}
        </td>


        </tr>


        `;


    });


}










// =================================
// OI CHART
// =================================


function loadOIChart(optionChain){



    const chartElement =
    document.getElementById(
        "oiChart"
    );



    if(!chartElement) return;






    const labels =
    optionChain.map(
        item=>item.strike
    );



    const callData =
    optionChain.map(
        item=>item.callOI/100000
    );



    const putData =
    optionChain.map(
        item=>item.putOI/100000
    );







    if(oiChart){


        oiChart.destroy();


    }







    oiChart = new Chart(

        chartElement,


        {

        type:"bar",


        data:{


            labels:labels,


            datasets:[


                {

                label:"Call OI (L)",

                data:callData

                },



                {

                label:"Put OI (L)",

                data:putData

                }


            ]


        },



        options:{


            responsive:true,


            plugins:{


                legend:{


                    display:true


                }


            }



        }



        }



    );



}








// ===============================
// START
// ===============================


loadData();




// Refresh Every 60 seconds

setInterval(

    loadData,

    60000

);
