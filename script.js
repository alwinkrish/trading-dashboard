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
        document.getElementById("vix").innerHTML =
            data.vix || "Coming Soon";

        // -------- Market Signal --------
        let signal = "🟡 WAIT";
        let support = "--";
        let resistance = "--";

        if (data.nifty) {

            const price = Number(data.nifty);

            support = (price - 100).toFixed(2);
            resistance = (price + 100).toFixed(2);

            if (price > resistance - 20) {
                signal = "🟢 BUY";
            } else if (price < support + 20) {
                signal = "🔴 SELL";
            }

        }

        document.getElementById("signal").innerHTML = signal;
        document.getElementById("support").innerHTML = support;
        document.getElementById("resistance").innerHTML = resistance;

    } catch (err) {

        document.getElementById("signal").innerHTML = "❌ API ERROR";

    }
}

// Load immediately
loadData();

// Auto Refresh every 60 seconds
setInterval(loadData, 60000);
