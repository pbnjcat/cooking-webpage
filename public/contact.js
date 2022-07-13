
document.querySelector("form").addEventListener("submit", submitEquation);
function submitEquation(event) {
  event.preventDefault();
  const userName = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const successMessage = document.querySelector("#success-message")
  let data = {
    userName: userName.value,
    email: email.value,
    message: message.value,
  };
  fetch(window.location.href, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    for(let key in data) {
      if(Object.values(data[key]) == '') {
        alert('Input can not be left blank!');
        return false;
      }
      console.log(Object.values(data))
    }
    successMessage.textContent="Success!";
    return res.json();
  })
  .catch((err) => {
    alert(err);
  })
}