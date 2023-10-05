document.forms[0].onsubmit = (event) => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let email = document.getElementById("emails").value;
  let password = document.getElementById("passwords").value;
  let fname = document.getElementById("fnames").value;
  let lname = document.getElementById("lnames").value;
  let phone = document.getElementById("numbers").value;
  let fulldata = {
    username: username,
    fname: fname,
    email: email,
    password: password,
    lname: lname,
    phone: phone,
  };
  let data = {
    username: username,
  };
  fetch("http://localhost:3000/api/testuser", {
    method: "post",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.username) {
        alert("user already created");
        window.location.replace("./a.html");
      } else {
        create(fulldata);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
function create(fulldata) {
  fetch("http://localhost:3000/api/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fulldata),
  }).then((res) => {
    if (res.ok) {
      alert("the user created");
      window.location.replace("./a.html");
    } else {
      alert("the user not created now login");
      window.location.replace("./a.html");
    }
  });
}
