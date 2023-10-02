function saveTodb(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const obj = {
    name,
    email,
    password,
  };
  console.log(obj);

  axios
    .post("http://localhost:3000/signUp", obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log("Some Error Occured", err);
    });
}
