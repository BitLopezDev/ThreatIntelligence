async function analyzeUrl() {
  const urlGetter =
    (document.getElementById("urlToScan") as HTMLInputElement) || null;
  const urlToScan = urlGetter.value;
  const response = await fetch(
    `/api/virustotal/url?url=${encodeURIComponent(urlToScan)}`
  );
  const data = await response.json();
  document.getElementById("responseP")!.innerText = JSON.stringify(data, null, 2);
}
