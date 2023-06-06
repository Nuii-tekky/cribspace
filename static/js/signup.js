

console.log("initiating......")
console.log("templated loaded")

const submitbtn = document.querySelector("#signup-btn")
const p1 = document.querySelector("#pass1")
const p2 = document.querySelector("#pass2")
const cautioncolor = "#f41212" || "#bd1e24"
const okcolor = "#ea9b1b"

function addBorder(elementt, color) {
  const green = "#0fd945"
  const red = cautioncolor
  if (color == "red") {
    elementt.style.border = `1px solid ${color}`
  }
  else if (color == "green") {
    elementt.style.border = `1px solid ${color}`
  }
  else if (color == "purple") {
    elementt.style.border = `1px solid ${color}`
  }
  else if (color == "none") {
    elementt.style.border = ""
  }
}

function addMultipleBorder(...args) {
  let elements = args
  elements.forEach(item => {
    addBorder(item, "none")
  })
}

p1.addEventListener("input", () => {
  let message = "please pick a strong password"
  updateMessage(message, cautioncolor, "normal")
  p1.style.border = "1px solid #0fd945"
  if (p1.value === "") {
    let message = "...Discover your space"
    updateMessage(message, okcolor, "normal")
    addBorder(p1, "")
    p2.setAttribute("readonly", true)
    p2.value = ""
    addBorder(p2, "none")
  }
  else {
    p2.removeAttribute("readonly")
  }
})

const Title = input => {
  if (typeof (input) === "string") {
    let m_input = input
    let first_char = m_input.charAt(0)
    let updated_first_char = first_char.toUpperCase()
    let newString = m_input.replace(first_char, updated_first_char)
    return newString
  }
  else {
    console.log("fuck off")
  }
}

function renderRedirector() {
  let endpoint = "http://127.0.0.1:8000/auth/redirector"
  window.location.replace(endpoint)
}

function renderLoginpage() {
  let endpoint = "http://127.0.0.1:8000/auth/login"
  window.location.replace(endpoint)
}

function updateMessage(message, color, tmargin) {
  if (tmargin) {
    let value = tmargin
    const msg = document.querySelector("#message")
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
    else if (value === "step4") {
      msg.style.marginLeft = "25%"
    }
  }
  else {
    const msg = document.querySelector("#message")
    msg.textContent = `${message}`
    msg.style.color = `${color}`
  }
}

async function fetchPromptpage(a1) {
  const token = a1
  let authendpoint = `http://127.0.0.1:8000/auth/authuser`
  const response = await fetch(authendpoint, {
    method: "GET",
    headers: {
      "Authorization": `Token ${token}`,
      "Requestredirect": "userpromptpage"
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
    else if (response_data['detail'] === "Invalid token.") {
      renderRedirector()
    }
  }
}

async function updateDom(a1, a2, a3, a4, a5, a6, a7) {
  const responsedata = await submitForm(a1, a2, a3, a4, a5, a6)
  if (responsedata["details"] === "username exists") {
    updateMessage("username already exists", "red", "normal")
    a4.value = ""
    addBorder(a4, "red")
  }
  else if (responsedata["details"] === "email exists") {
    updateMessage("email already exists", "red", "step4")
    a3.value = ""
    addBorder(a3, "red")
  }
  else if (responsedata["reason"] === "invalid inputs") {
    updateMessage("please dont use special characters", "red", "step3")
    addBorder(a4, "red")
    a5.value = ""
    a7.value = ""
  }
  else if (responsedata["details"] === "user saved") {
    let usertoken = responsedata["token"]
    let userid    = responsedata["userid"]
    sessionStorage.setItem("token", usertoken)
    sessionStorage.setItem("id_user",userid)
    sessionStorage.setItem("isthisfirsttime", true)
    fetchPromptpage(usertoken)
  }
}

async function submitForm(a1, a2, a3, a4, a5, a6, a7) {
  const firstnamee = a1.value
  const lastnamee = a2.value
  const emaill = a3.value
  const usernamee = a4.value
  const passwordd = a5.value
  const token = a6.value

  const data = {
    first_name: Title(firstnamee),
    last_name: Title(lastnamee),
    email: emaill,
    username: Title(usernamee),
    password: passwordd
  }
  const endpoint = "http://127.0.0.1:8000/api/users/createnewuser"
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
  const details = await response.json()
  return details
}

function validateFormData() {
  const fn = document.querySelector("#fname")
  const ln = document.querySelector("#lname")
  const em = document.querySelector("#email")
  const us = document.querySelector("#uname")
  const p1 = document.querySelector("#pass1")
  const p2 = document.querySelector("#pass2")
  const tk = document.querySelector("#token")
  if (p1.value.length >= 6) {
    if (p1.value == p2.value) {
      addBorder(p1)
      addBorder(p2)
      let em_val = em.value
      if (em_val.endsWith(".com") && em_val.search("@") !== -1 && em_val !== "") {
        em.style.border = ""
        if (fn.value !== "") {
          if (ln.value !== "") {
            if (us.value !== "") {
              addMultipleBorder(fn, ln, em, us, p1, p2)
              updateMessage("You are all set to go...", okcolor)
              updateDom(fn, ln, em, us, p1, tk, p2)
              return true
            }
            else {
              addBorder(us, "red")
              let message = "please fill the entire form"
              updateMessage(message, cautioncolor)
              p1.value= p2.value = ""
              addMultipleBorder(fn, ln, em, p1, p2)
            }
          }
          else {
            addBorder(ln, "red")
            let message = "please fill the entire form"
            updateMessage(message, cautioncolor)
            p1.value= p2.value = ""
            addMultipleBorder(fn, em, us, p1, p2)
          }
        }
        else {
          addBorder(fn, "red")
          let message = "please fill the entire form"
          updateMessage(message, cautioncolor)
          p1.value= p2.value = ""
          addMultipleBorder(ln, em, us, p1, p2)
        }
      }
      else {
        let message = "invalid email address"
        updateMessage(message, cautioncolor)
        addBorder(em, "red")
        p1.value= p2.value = ""
        addMultipleBorder(fn, ln, us, p1, p2)
      }
    }
    else {
      let message = "passwords dont match"
      updateMessage(message, cautioncolor)
      addBorder(p1, "red")
      addBorder(p2, "red")
      addMultipleBorder(fn, ln, em, us)
    }
  }
  else {
    let message = "passwords must be more than 6 characters"
    updateMessage(message, cautioncolor, "step2")
    addBorder(p1, "red")
    addMultipleBorder(fn, ln, em, us, p2)
    p2.value = ""
  }
}

submitbtn.addEventListener("click", (e) => {
  e.preventDefault()
  validateFormData()
})