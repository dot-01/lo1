function grt() {
  let email = localStorage.getItem("email");
  let data = {
    email: email,
  };
  fetch("http://localhost:3000/data", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //dont froget id for delete or update
      let em = document.getElementById("email");
      let password = document.getElementById("password");
      let username = document.getElementById("username");
      let fname = document.getElementById("fname");
      let lname = document.getElementById("lname");
      let phone = document.getElementById("phone");
      em.value = res[0].email;
      password.value = res[0].password;
      fname.value = res[0].fname;
      username.value = res[0].username;
      lname.value = res[0].lname;
      phone.value = res[0].phone;
    });
}
grt();
