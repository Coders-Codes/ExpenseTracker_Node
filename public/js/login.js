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
      // if (response.data.success) {
      alert(response.data.message);
      // } else {
      //   alert(response.data.message);
      // }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red";>${err.message}</div>`;
    });
}
