const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});
async function getGPT() {}
async function callGPT() {}

async function callVTUrl() {
  /*const apiKey = process.env.APIKEYVT;
  const urlToScan = prompt("Enter the URL to scan:");

  if (!urlToScan) {
    alert("URL cannot be empty");
    return;
  }

  const apiUrl = `https://www.virustotal.com/vtapi/v2/url/report?apikey=${apiKey}&resource=${urlToScan}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("VirusTotal Response:", data);

      if (data.response_code === 1) {
        alert(
          `Scan result for ${urlToScan}:\nPositives: ${data.positives}\nTotal: ${data.total}`
        );
      } else {
        alert("URL not found or not yet analyzed by VirusTotal.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while fetching data from VirusTotal.");
    });
    */
}
