function addExpense(event) {
  event.preventDefault();

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  // userId: 1

  const obj = {
    amount,
    description,
    category,
    // userId: 1,
  };
  console.log(obj);
  displayExpense(obj);

  //CREATING A NEW EXPENSE USING POST REQUEST METHOD
  const token = localStorage.getItem("token");
  axios
    .post("http://localhost:3000/expense/addexpense", obj, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red";>${err.message}</div>`;
    });
}

//GETTING THE DETAILS OF ALL THE EXPENSES ON THE SCREEN BY GET METHOD
window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/expense/getExpenses", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);

      for (let i = 0; i < response.data.expenses.length; i++)
        displayExpense(response.data.expenses[i]);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red";>${err.message}</div>`;
    });
});

//FUNCTION TO DIsPLAY EXPENSE ON SCREEN
function displayExpense(obj) {
  const parentEle = document.getElementById("listofExpenses");
  const childEle = document.createElement("li");
  childEle.innerHTML +=
    obj.amount + " - " + obj.description + " - " + obj.category + "  ";
  // const resultString = `Amount:${obj.amount} - description:${obj.description} - category:${obj.category}`;
  // console.log(resultString);
  // childEle.innerHTML += resultString;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete Expense";

  //FUNCTIONALITY TO DELETE EXPENSES BY USING DELETE METHOD
  let id = obj.id;
  // console.log(id);

  deleteButton.onclick = async () => {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.delete(
        `http://localhost:3000/expense/deleteExpenses/${id}`,
        { headers: { Authorization: token } }
      );
      console.log(res.status, res.statusText);
    } catch (err) {
      console.log(err, "ERROR OCCURED WHILE DELETING AN ITEM");
    }
    parentEle.removeChild(childEle);
  };

  childEle.appendChild(deleteButton);
  parentEle.appendChild(childEle);
}

document.getElementById("rzp-button").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:3000/purchase/premiumMembership",
    { headers: { Authorization: token } }
  );
  console.log(response);

  var options = {
    key: response.data.key_id,
    // key: response.data.rzp_test_gXBDUFLwMeUwdo,
    order_id: response.data.order.id,

    //This handler function will handle the success payment
    handler: async function (response) {
      await axios.post(
        "http://localhost:3000/purchase/updateTransactionStatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );

      alert("You are a Premium User Now !");
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("Payment Failed", function (response) {
    console.log(response);
    alert("Something went Wrong");
  });
};
