async function analyzeText() {
  const input = document.getElementById("userInput").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Analyzing...";

  try {
    const res = await fetch("http://localhost:5050/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();

    if (data.isInappropriate) {
      resultDiv.innerHTML = `
        <p style="color:#582f0e;"><strong>⚠️ Warning:</strong> ${data.warning}</p>
        <p><strong>✅ Suggestion:</strong> ${data.suggestion}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p style="color:#656d4a;">✅ Your message is polite and appropriate!</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = "❌ Error analyzing the text.";
    console.error(error);
  }
}
