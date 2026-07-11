const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";

async function loadData() {
    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        document.getElementById("nifty").textContent = Number(data.nifty).toFixed(2);
        document.getElementById("banknifty").textContent = data.banknifty;
        document.getElementById("vix").textContent = data.vix;
        document.getElementById("lastUpdated").textContent = data.lastUpdated;

        const support = Number(data.nifty) - 100;
        const resistance = Number(data.nifty) + 100;

        document.getElementById("support").textContent = support.toFixed(2);
        document.getElementById("resistance").textContent = resistance.toFixed(2);

        if (Number(data.nifty) > support) {
            document.getElementById("signal").textContent = "🟢 BUY CALL";
        } else {
            document.getElementById("signal").textContent = "🔴 BUY PUT";
        }

    } catch (error) {

        console.error(error);

        document.getElementById("signal").textContent = "❌ API ERROR";
    }
}

loadData();

setInterval(loadData,10000);
