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
            Number(data.nifty).toFixed(2);

        // BANK NIFTY
        document.getElementById("banknifty").textContent =
            data.banknifty;

        // INDIA VIX
        document.getElementById("vix").textContent =
            data.vix;

        // MARKET SIGNAL
        document.getElementById("signal").textContent =
            data.signal;

        // SUPPORT
        document.getElementById("support").textContent =
            data.support;

        // RESISTANCE
        document.getElementById("resistance").textContent =
            data.resistance;

        // LAST UPDATED
        if (document.getElementById("lastUpdated")) {
            document.getElementById("lastUpdated").textContent =
                data.lastUpdated;
        }

    } catch (err) {

        console.error(err);

        document.getElementById("nifty").textContent = "0.00";
        document.getElementById("banknifty").textContent = "--";
        document.getElementById("vix").textContent = "--";
        document.getElementById("signal").textContent = "❌ API ERROR";
        document.getElementById("support").textContent = "--";
        document.getElementById("resistance").textContent = "--";

        if (document.getElementById("lastUpdated")) {
            document.getElementById("lastUpdated").textContent = "--";
        }
    }
}

// Load immediately
loadData();

// Refresh every 30 seconds
setInterval(loadData, 30000);
