const btn = document.getElementById("btn");
const result = document.getElementById("result");
const result2 = document.getElementById("result2");
const diagnosis = document.getElementById("diagnosis");
const suggestion = document.getElementById("suggestion");

const age = document.getElementById("age");
const blood_type = document.getElementById("blood_type");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const sugar_levels = document.getElementById("sugar_levels");
const bp = document.getElementById("bp");
const symptoms = document.getElementById("symptoms");

btn.addEventListener("click", async () => {
  console.log(blood_type.value);
  console.log(height.value);
  console.log(weight.value);
  console.log(sugar_levels.value);
  console.log(bp.value);
  console.log(symptoms.value);

  const prompt = `Patient who is ${age.value} years old has ${blood_type.value} blood type, height is ${height.value}, weight is ${weight.value}, sugar levels are ${sugar_levels.value}, bp is ${bp.value}, symptoms are ${symptoms.value}. Please determine the dianosis and about the disease they have in short`;

  try {
    //   const prompt = text_prompt.value; // Get the value of the prompt input
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }), // Send the prompt in the request body
    });
    console.log(prompt);
    const responseData = await response.json();
    console.log(responseData);
    diagnosis.innerHTML = "Diagnosis Result";
    result.innerHTML = responseData.result;
    suggestion.innerHTML = "Suggestion";
    result2.innerHTML = responseData.med;
  } catch (error) {
    console.error("Error:", error);
  }
  //   fetchData();
});

async function fetchData() {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct", // Replace with your chosen model
      prompt: "hello, how are you",
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  console.log(data.choices[0]);
  result.innerHTML = data.choices[0].text;
}
