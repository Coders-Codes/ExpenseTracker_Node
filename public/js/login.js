function login(event) {
  event.preventDefault();
  console.log(event.target.name);

  const email = event.target.email.value;
  const password = event.target.password.value;

  const loginDetails = {
    email,
    password,
  };

  console.log(loginDetails);

  //Post request to create login of the user
  axios
    .post("http://localhost:3000/user/login", loginDetails)
    .then((response) => {
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      window.location.href = "expense.html";
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red";>${err.message}</div>`;
    });
}
