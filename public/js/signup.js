function signup(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  const obj = {
    name,
    email,
    password,
  };
  console.log(obj);

  axios
    .post("http://localhost:3000/user/signup", obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log("Some Error Occurred", err);
    });
  // window.location.href = "login.html";
}
