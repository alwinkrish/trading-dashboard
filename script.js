const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";


async function loadData() {

    try {


        const response = await fetch(API_URL);


        if (!response.ok) {

            throw new Error("API Error");

        }


        const data = await response.json();



        // ======================
        // NIFTY
        // ======================

        document.getElementById("nifty").textContent =
            data.nifty || "--";



        // ======================
        // BANK NIFTY
        // ======================

        document.getElementById("banknifty").textContent =
            data.banknifty || "Coming Soon";



        // ======================
        // INDIA VIX
        // ======================

        document.getElementById("vix").textContent =
            data.vix || "Coming Soon";



        // ======================
        // SIGNAL
        // ======================

        document.getElementById("signal").textContent =
            data.signal || "🟡 WAIT";



        // ======================
        // SUPPORT
        // ======================

        document.getElementById("support").textContent =
            data.support || "--";



        // ======================
        // RESISTANCE
        // ======================

        document.getElementById("resistance").textContent =
            data.resistance || "--";



        // ======================
        // CALL OI
        // ======================

        document.getElementById("calloi").textContent =
            data.calloi || "Coming Soon";



        // ======================
        // PUT OI
        // ======================

        document.getElementById("putoi").textContent =
            data.putoi || "Coming Soon";



        // ======================
        // PCR
        // ======================

        document.getElementById("pcr").textContent =
            data.pcr || "Coming Soon";



        // ======================
        // ATM
        // ======================

        document.getElementById("atm").textContent =
            data.atm || "Coming Soon";



        // ======================
        // LAST UPDATED
        // ======================

        document.getElementById("lastUpdated").textContent =
            data.lastUpdated || data.time || "--";



        // ======================
        // OPTION CHAIN TABLE
        // ======================

        if(data.optionChain){

            loadOptionChain(data.optionChain);

        }



    }


    catch(error){


        console.error(error);


        document.getElementById("signal").textContent =
        "❌ API ERROR";


    }


}




// ===============================
// OPTION CHAIN TABLE
// ===============================


function loadOptionChain(optionChain){


    const table =
    document.getElementById("optionChainTable");



    if(!table){

        return;

    }



    table.innerHTML="";



    optionChain.forEach(row=>{


        let status="⚪ Neutral";



        if(row.putOI > row.callOI){

            status="🟢 Support";

        }


        else if(row.callOI > row.putOI){

            status="🔴 Resistance";

        }




        table.innerHTML += `

        <tr>

            <td>${row.strike}</td>


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




// ===============================
// INITIAL LOAD
// ===============================


loadData();



// ===============================
// AUTO REFRESH
// ===============================


setInterval(
    loadData,
    60000
);
