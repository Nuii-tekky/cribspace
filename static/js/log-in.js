
console.log("initiating......")
console.log("templated loaded")

const submitbtn = document.querySelector("#login-btn")
const cautioncolor = "#f41212" || "#bd1e24"
const okcolor = "#ea9b1b"

function renderSignuppage() {
  let endpoint = "http://127.0.0.1:8000/auth/signup"
  window.location.replace(endpoint)
}

function renderRedirector() {
  let endpoint = "http://127.0.0.1:8000/auth/redirector"
  window.location.replace(endpoint)
}

const Title = input => {
  let returnstring=""
  if (typeof (input) === "string") {
    let first_char = input.charAt(0)
    let updated_first_char = first_char.toUpperCase()
    let newString = input.replace(first_char, updated_first_char)
    returnstring=newString
  }
  return returnstring
}

function addBorder(elementt, color) {
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

function updateMessage(message, color, tmargin) {
  if (tmargin) {
    let value = tmargin
    const msg = document.querySelector("#message")
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
    const msg = document.querySelector("#message")
    msg.textContent = `${message}`
    msg.style.color = `${color}`
  }

}

function validateForm(a1, a2, a3) {
  let username = a1
  let password = a2
  if (username.value === "" || password.value === "") {
    updateMessage("please fill the entire form", "red", "step3")
  }
  else {
    updateDom(a1, a2, a3)
  }
}

async function submitForm(a4, a5, a6) {
  if (!sessionStorage.getItem("token")) {
    const usernamee = a4.value
    const passwordd = a5.value
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

    const endpoint = `http://127.0.0.1:8000/api/users/verifyuser`

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
  else {
    let token = sessionStorage.getItem("token")
    let response_data = { "details": "user exists", "token": `${token}` }
    return response_data
  }
}

async function fetchHomepage(a1) {
  const token = a1
  let authendpoint = `http://127.0.0.1:8000/auth/authuser`

  const response = await fetch(authendpoint, {
    method: "GET",
    headers: {
      "Authorization": `Token ${token}`,
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
      renderRedirector()
    }
    else if (response_data['detail'] === "") {
      renderRedirector()
    }
  }
}

async function updateDom(a1, a2, a3) {
  let responsedata = await submitForm(a1, a2, a3)
  if (responsedata["details"] === "no such user") {
    updateMessage("invalid credentials", "red", "normal")
    a1.value = ""
    a2.value = ""
  }
  else if (responsedata["details"] === "user exists") {
    const token = await responsedata["token"]
    const userid = await responsedata["user_id"]
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("id_user", userid)
    fetchHomepage(token)
  }
}

submitbtn.addEventListener("click", (e) => {
  e.preventDefault()
  const us = document.querySelector("#uname")
  const p1 = document.querySelector("#pass")
  const tk = document.querySelector("#token")
  validateForm(us, p1, tk)
})

window.onload = () => {
  if (sessionStorage.getItem("isthisfirsttime")) {
    sessionStorage.removeItem("isthisfirsttime")
  }
}
