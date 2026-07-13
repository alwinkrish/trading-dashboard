const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";

async function loadData() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        // NIFTY
        document.getElementById("nifty").innerHTML =
            data.nifty ? Number(data.nifty).toFixed(2) : "--";

        // BANK NIFTY
        document.getElementById("banknifty").innerHTML =
            data.banknifty || "Coming Soon";

        // INDIA VIX
        const vix = document.getElementById("vix");

        if (typeof data.vix === "number") {

            vix.innerHTML = data.vix.toFixed(2);

            if (data.vix < 12) {
                vix.style.color = "#00ff99";
            } else if (data.vix < 18) {
                vix.style.color = "yellow";
            } else {
                vix.style.color = "red";
            }

        } else {

            vix.innerHTML = data.vix || "Coming Soon";
            vix.style.color = "white";

        }

        // MARKET SIGNAL
        document.getElementById("signal").innerHTML =
            data.signal || "🟡 WAIT";

        // SUPPORT
        document.getElementById("support").innerHTML =
            data.support || "--";

        // RESISTANCE
        document.getElementById("resistance").innerHTML =
            data.resistance || "--";

        // HIGHEST CALL OI
        document.getElementById("calloi").innerHTML =
            data.calloi || "Coming Soon";

        // HIGHEST PUT OI
        document.getElementById("putoi").innerHTML =
            data.putoi || "Coming Soon";

        // PCR
        document.getElementById("pcr").innerHTML =
            data.pcr || "Coming Soon";

        // LAST UPDATED
        if (document.getElementById("lastUpdated")) {

            document.getElementById("lastUpdated").innerHTML =
                data.lastUpdated || "--";

        }

    } catch (err) {

        console.log(err);

        document.getElementById("nifty").innerHTML = "--";
        document.getElementById("banknifty").innerHTML = "Coming Soon";
        document.getElementById("vix").innerHTML = "Coming Soon";
        document.getElementById("signal").innerHTML = "❌ API ERROR";
        document.getElementById("support").innerHTML = "--";
        document.getElementById("resistance").innerHTML = "--";

        document.getElementById("calloi").innerHTML = "--";
        document.getElementById("putoi").innerHTML = "--";
        document.getElementById("pcr").innerHTML = "--";

    }

}

// First Load
loadData();

// Refresh every 60 seconds
setInterval(loadData, 60000);
