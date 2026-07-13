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



        document.getElementById("signal").textContent =
            data.signal || "🟡 WAIT";



        document.getElementById("support").textContent =
            data.support || "--";


        document.getElementById("resistance").textContent =
            data.resistance || "--";



        document.getElementById("calloi").textContent =
            data.calloi || "Coming Soon";


        document.getElementById("putoi").textContent =
            data.putoi || "Coming Soon";


        document.getElementById("pcr").textContent =
            data.pcr || "Coming Soon";


        document.getElementById("atm").textContent =
            data.atm || "Coming Soon";



        document.getElementById("lastUpdated").textContent =
            data.lastUpdated || data.time || "--";





        // =========================
        // OPTION CHAIN
        // =========================


        if(data.optionChain){


            loadOptionChain(data.optionChain);


            loadOIChart(data.optionChain);


        }




    }



    catch(error){


        console.error(error);


        document.getElementById("signal").textContent =
        "❌ API ERROR";


    }



}






// =================================
// OPTION CHAIN TABLE
// =================================


function loadOptionChain(optionChain){


    const table =
    document.getElementById("optionChainTable");



    if(!table) return;



    table.innerHTML = "";



    optionChain.forEach(row => {



        let status = "⚪ Neutral";



        if(row.putOI > row.callOI){

            status = "🟢 Support";

        }


        else if(row.callOI > row.putOI){

            status = "🔴 Resistance";

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



    const ctx =
    document.getElementById("oiChart");



    if(!ctx) return;




    const labels =
    optionChain.map(item =>
        item.strike
    );



    const callOI =
    optionChain.map(item =>
        item.callOI / 100000
    );



    const putOI =
    optionChain.map(item =>
        item.putOI / 100000
    );






    if(oiChart){

        oiChart.destroy();

    }




    oiChart = new Chart(ctx, {


        type: "bar",



        data:{


            labels: labels,


            datasets:[


                {

                label:"Call OI (Lakhs)",

                data:callOI


                },


                {

                label:"Put OI (Lakhs)",

                data:putOI


                }


            ]


        },



        options:{


            responsive:true,


            plugins:{


                legend:{


                    display:true


                }


            },


            scales:{


                y:{


                    beginAtZero:true


                }


            }



        }



    });



}








// =================================
// FIRST LOAD
// =================================


loadData();




// =================================
// AUTO REFRESH
// =================================


setInterval(

    loadData,

    60000

);
