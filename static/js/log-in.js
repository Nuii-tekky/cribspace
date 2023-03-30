
console.log("initiating......")
console.log("templated loaded")

const submitbtn = document.getElementById("login-btn")
const cautioncolor = "#f41212" || "#bd1e24"
const okcolor = "#ea9b1b"

function rendersignuppage() {
  let endpoint = "http://127.0.0.1:8000/home/auth/signup"
  window.location.replace(endpoint)
}

function renderredirector() {
  let endpoint = "http://127.0.0.1:8000/home/auth/redirector"
  window.location.replace(endpoint)
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
      msg.style.marginLeft = "28%"
    }
    else if (value === "step2") {
      msg.style.marginLeft = "9%"
    }
    else if (value === "step3") {
      msg.style.marginLeft = "21%"
    }
  }
  else {
    const msg = document.getElementById("message")
    msg.textContent = `${message}`
    msg.style.color = `${color}`
  }

}

const validateform = (a1, a2, a3) => {
  let username = a1
  let password = a2
  if (username.value === "" || password.value === "") {
    updatemessage("please fill the entire form", "red", "step3")
  }
  else {
    updatedom(a1, a2, a3)
  }
}

const submitform = async (a4, a5, a6) => {
  if (!sessionStorage.getItem("token")) {
    const usernamee = a4.value;
    const passwordd = a5.value;
    const token = a6.value

    let username = ""
    if (usernamee.endsWith(".com")) {
      username = usernamee
    }
    else {
      username = Title(usernamee)
    }
    let password = passwordd

    const data = {
      user: username,
      passwd: password
    }

    const endpoint = `http://127.0.0.1:8000/api/verifyuser`

    const request_param = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRFToken": `${token}`
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(endpoint, request_param)
    const response_data = await response.json()
    console.log(response_data)
    return response_data
  }
  else{
    let token= sessionStorage.getItem("token")
    let response_data= {"details":"user exists","token": `${token}`}
    return response_data
  }
}

async function fetchhomepage(a1) {
  const token = a1
  let authendpoint = `http://127.0.0.1:8000/home/auth/authuser`

  const response = await fetch(authendpoint, {
    method: "GET",
    headers: {
      "Authorization": `Tokenjh ${token}`,
      "Requestredirect": "homepage"
    }
  })

  if (response.redirected) {
    const url = response.url;
    window.location.replace(url)
  }
  else {
    const response_data = await response.json()
    console.log(response_data)
    if (response_data['detail'] === "Authentication credentials were not provided.") {
      renderredirector()
    }
    else if (response_data['detail'] === "") {
      renderredirector()
    }
  }
}

async function updatedom(a1, a2, a3) {
  let responsedata = await submitform(a1, a2, a3)
  if (responsedata["details"] === "no such user") {
    updatemessage("invalid credentials", "red", "normal")
    a1.value = ""
    a2.value = ""
  }
  else if (responsedata["details"] === "user exists") {
    const token = await responsedata["token"]
    sessionStorage.setItem("access_token", token)
    fetchhomepage(token)
  }
}

submitbtn.addEventListener("click", (e) => {
  e.preventDefault()
  const us = document.getElementById("uname")
  const p1 = document.getElementById("pass")
  const tk = document.getElementById("token")
  validateform(us, p1, tk)
})

window.onload= ()=>{
  if(sessionStorage.getItem("isthisfirsttime")){
    sessionStorage.removeItem("isthisfirsttime")
  }
}
