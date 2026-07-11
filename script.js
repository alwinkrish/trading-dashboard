const API_URL = "https://nifty-api.alwinchristopher25.workers.dev";

async function loadData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    document.getElementById("nifty").textContent = data.nifty.toFixed(2);

    // Temporary demo values
    document.getElementById("banknifty").textContent = "Loading...";
    document.getElementById("vix").textContent = "Loading...";

    const support = data.nifty - 100;
    const resistance = data.nifty + 100;

    document.getElementById("support").textContent = support.toFixed(2);
    document.getElementById("resistance").textContent = resistance.toFixed(2);

    if (data.nifty > support) {
      document.getElementById("signal").textContent = "🟢 BUY CALL";
    } else {
      document.getElementById("signal").textContent = "🔴 BUY PUT";
    }

  } catch (err) {
    console.error(err);
    document.getElementById("signal").textContent = "❌ API Error";
  }
}

loadData();
setInterval(loadData, 10000);
