const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
  console.log(email.value);
  console.log(password.value);

  try {
    const response = await fetch("http://localhost:3000/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    console.log(response);
    const responseData = await response.json();
    console.log(responseData);
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log("Error:", error);
  }
});
