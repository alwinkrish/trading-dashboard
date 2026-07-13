const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";

async function loadData() {
    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        // NIFTY
        document.getElementById("nifty").textContent =
            data.nifty ? Number(data.nifty).toFixed(2) : "--";

        // BANK NIFTY
        document.getElementById("banknifty").textContent =
            data.banknifty || "Coming Soon";

        // INDIA VIX
        const vix = document.getElementById("vix");

        if (typeof data.vix === "number") {

            vix.textContent = data.vix.toFixed(2);

            if (data.vix < 12) {
                vix.style.color = "#00ff99";
            } else if (data.vix < 18) {
                vix.style.color = "yellow";
            } else {
                vix.style.color = "red";
            }

        } else {

            vix.textContent = data.vix || "Coming Soon";
            vix.style.color = "white";

        }

        // MARKET SIGNAL
        document.getElementById("signal").textContent =
            data.signal || "🟡 WAIT";

        // SUPPORT
        document.getElementById("support").textContent =
            data.support || "--";

        // RESISTANCE
        document.getElementById("resistance").textContent =
            data.resistance || "--";

        // HIGHEST CALL OI
        document.getElementById("calloi").textContent =
            data.calloi || "Coming Soon";

        // HIGHEST PUT OI
        document.getElementById("putoi").textContent =
            data.putoi || "Coming Soon";

        // PCR
        document.getElementById("pcr").textContent =
            data.pcr || "Coming Soon";

        // ATM STRIKE
        document.getElementById("atm").textContent =
            data.atm || "Coming Soon";

        // LAST UPDATED
        document.getElementById("lastUpdated").textContent =
            data.lastUpdated || "--";

    } catch (err) {

        console.error(err);

        document.getElementById("nifty").textContent = "--";
        document.getElementById("banknifty").textContent = "Coming Soon";
        document.getElementById("vix").textContent = "Coming Soon";
        document.getElementById("signal").textContent = "❌ API ERROR";
        document.getElementById("support").textContent = "--";
        document.getElementById("resistance").textContent = "--";

        document.getElementById("calloi").textContent = "--";
        document.getElementById("putoi").textContent = "--";
        document.getElementById("pcr").textContent = "--";
        document.getElementById("atm").textContent = "--";
        document.getElementById("lastUpdated").textContent = "--";
    }
}

// Initial Load
loadData();

// Auto Refresh every 60 seconds
setInterval(loadData, 60000);
