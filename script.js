const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";

async function loadData() {
    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        document.getElementById("nifty").innerHTML =
            data.nifty ? Number(data.nifty).toFixed(2) : "Coming Soon";

        document.getElementById("banknifty").innerHTML =
            data.banknifty || "Coming Soon";

        document.getElementById("vix").innerHTML =
            data.vix || "Coming Soon";

        // Temporary Signal
        let signal = "🟡 WAIT";

        if (data.nifty && data.nifty > 25000) {
            signal = "🟢 BUY";
        }

        if (data.nifty && data.nifty < 24500) {
            signal = "🔴 SELL";
        }

        document.getElementById("signal").innerHTML = signal;

        document.getElementById("support").innerHTML =
            data.support || "--";

        document.getElementById("resistance").innerHTML =
            data.resistance || "--";

    } catch (err) {

        console.log(err);

        document.getElementById("nifty").innerHTML = "0.00";
        document.getElementById("banknifty").innerHTML = "Coming Soon";
        document.getElementById("vix").innerHTML = "Coming Soon";
        document.getElementById("signal").innerHTML = "❌ API ERROR";
        document.getElementById("support").innerHTML = "--";
        document.getElementById("resistance").innerHTML = "--";
    }
}

loadData();

// Refresh every 30 seconds
setInterval(loadData, 30000);
