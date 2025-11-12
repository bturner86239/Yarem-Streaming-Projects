const socket = new WebSocket("ws://127.0.0.1:8080/");

socket.onopen = () => console.log("✅ Connected to Streamer.bot WebSocket");

socket.onerror = (err) => console.error("❌ WebSocket error:", err);

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    // Update progress bar if data exists
    if (data?.event?.source === "WebSocket" && data?.data?.progress !== undefined) {
      const progress = Math.min(100, Math.max(0, data.data.progress));
      const bar = document.getElementById("main-bar");

      bar.style.width = progress + "%";
      bar.setAttribute("aria-valuenow", progress);
      bar.textContent = progress + "%"; // optional numeric display
    }
  } catch (err) {
    console.error("Error parsing Streamer.bot message:", err);
  }
};