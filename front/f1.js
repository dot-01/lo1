document.forms[0].onsubmit = (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let data = {
    email: email,
  };
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res1) => {
      if (!res1) {
        alert("please sign up");
        window.location.replace("./index.html");
      } else {
        if (email === res1[0].email && password === res1[0].password) {
          localStorage.setItem("email", email);
          window.location.replace("./logined.html");
        } else if (email === res1[0].email && password != res1[0].password) {
          alert("your password is wrong");
        }
      }
    });
};
