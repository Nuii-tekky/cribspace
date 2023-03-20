

console.log("initiating......")
console.log("templated loaded")

const submitbtn = document.getElementById("login-btn")
const cautioncolor = "#f41212" || "#bd1e24"
const okcolor = "#ea9b1b"


const addborder = (elementt, color) => {
  const green = "#0fd945"
  const red = cautioncolor

  if (color == "red") {
    elementt.style.border = `1px solid ${color}`
  }
  else if (color == "green") {
    elementt.style.border = `1px solid ${color}`
  }
  else {
    elementt.style.border = ""
  }
}



const updatemessage = (message, color, tmargin) => {
  if (tmargin) {
    let value = tmargin
    const msg = document.getElementById("message")
    msg.textContent = `${message}`
    msg.style.color = `${color}`
    if (value === "normal") {
      msg.style.marginLeft = "22%"
    }
    else if (value === "step2") {
      msg.style.marginLeft = "9%"
    }
    else if (value === "step3") {
      msg.style.marginLeft = "14%"
    }
  }
  else {
    const msg = document.getElementById("message")
    msg.textContent = `${message}`
    msg.style.color = `${color}`
  }

}


const Title = input => {
  if (typeof (input) === "string") {
    let first_char = input.charAt(0)
    let updated_first_char = first_char.toUpperCase()
    let newString = input.replace(first_char, updated_first_char)
    return newString
  }
  else {
    console.log("fuck off")
  }
}


const submitform = async (a4, a5, a6) => {
  const usernamee = a4.value;
  const passwordd = a5.value;
  const token = a6.value;

  const data = {
    username: Title(usernamee),
    password: passwordd
  }


  const endpoint = "http://127.0.0.1:8000/api/loginuser"

  const request_params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-CSRFToken": `${token}`
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(endpoint, request_params)
  console.log(response)

}


submitbtn.addEventListener("click", (e) => {
  e.preventDefault()
  const us = document.getElementById("uname")
  const p1 = document.getElementById("pass")
  const tk = document.getElementById("token")
  submitform(us,p1,tk)
})
