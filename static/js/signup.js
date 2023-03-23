

console.log("initiating......")
console.log("templated loaded")

const submitbtn = document.getElementById("signup-btn")
const p1 = document.getElementById("pass1")
const p2 = document.getElementById("pass2")
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

p1.addEventListener("input", () => {
  let message = "please pick a strong password"
  updatemessage(message, cautioncolor, "normal")
  p1.style.border = "1px solid #0fd945"
  if (p1.value === "") {
    let message = "...Discover your space"
    updatemessage(message, okcolor, "normal")
    addborder(p1, "")
    p2.setAttribute("readonly", true)
    p2.value = ""
    addborder(p2, "")
  }
  else {
    p2.removeAttribute("readonly")
  }

})



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


const submitform = async (a1, a2, a3, a4, a5, a6) => {
  const firstnamee = a1.value;
  const lastnamee = a2.value;
  const emaill = a3.value;
  const usernamee = a4.value;
  const passwordd = a5.value;
  const token = a6.value;

  const data = {
    first_name: Title(firstnamee),
    last_name: Title(lastnamee),
    email: emaill,
    username: Title(usernamee),
    password: passwordd
  }


  const endpoint = "http://127.0.0.1:8000/api/createnewuser"


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
  const details= await response.json()
  console.log(response)

}



const validateformdata = () => {
  const fn = document.getElementById("fname")
  const ln = document.getElementById("lname")
  const em = document.getElementById("email")
  const us = document.getElementById("uname")
  const p1 = document.getElementById("pass1")
  const p2 = document.getElementById("pass2")
  const tk = document.getElementById("token")
  if (p1.value.length >= 6) {
    if (p1.value == p2.value) {
      addborder(p1)
      addborder(p2)
      let em_val = em.value
      if (em_val.endsWith(".com") && em_val.search("@") !== -1 && em_val !== "") {
        em.style.border = ""
        if (fn.value !== "") {

          if (ln.value !== "") {
            if (us.value !== "") {
              addborder(fn)
              addborder(ln)
              addborder(em)
              addborder(us)
              addborder(p1)
              addborder(p2)
              updatemessage("You are all set to go...", okcolor)

              submitform(fn, ln, em, us, p1, tk)
              return true
            }
            else {
              addborder(us, "red")
              let message = "please fill the entire form"
              updatemessage(message, cautioncolor)
              p1.value = ""
              p2.value = ""
            }
          }
          else {
            addborder(ln, "red")
            let message = "please fill the entire form"
            updatemessage(message, cautioncolor)
            p1.value = ""
            p2.value = ""
          }
        }
        else {
          addborder(fn, "red")
          let message = "please fill the entire form"
          updatemessage(message, cautioncolor)
          p1.value = ""
          p2.value = ""
        }

      }
      else {
        let message = "invalid email address"
        updatemessage(message, cautioncolor)
        addborder(em, "red")
        p1.value = ""
        p2.value = ""
      }
    }
    else {
      let message = "passwords dont match"
      updatemessage(message, cautioncolor)
      addborder(p1, "red")
      addborder(p2, "red")

    }
  }
  else {
    let message = "passwords must be more than 6 characters"
    updatemessage(message, cautioncolor, "step2")
    addborder(p1, "red")
    p2.value = ""
  }
}

submitbtn.addEventListener("click", (e) => {
  e.preventDefault()
  validateformdata()
})


function renderloginpage(){
  let endpoint= "http://127.0.0.1:8000/home/login"
  window.location.replace(endpoint)
}