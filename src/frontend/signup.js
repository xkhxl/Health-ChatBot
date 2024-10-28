const full_name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
  console.log(full_name.value);
  console.log(email.value);
  console.log(password.value);

  try {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: full_name.value,
        email: email.value,
        password: password.value,
      }),
    });
    console.log(response);
    const responseData = await response.json();
    console.log(responseData);
    result.innerHTML = "User Created Successfully!";
  } catch (error) {
    console.log("Error:", error);
    result.innerHTML = error;
  }
});
