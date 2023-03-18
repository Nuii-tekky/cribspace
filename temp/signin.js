

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
    else if(value === "step3"){
      msg.style.marginLeft= "14%"
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
    addborder(p1, "green")
    p2.setAttribute("readonly", true)
    p2.value = ""
    addborder(p2, "")
  }
  else {
    p2.removeAttribute("readonly")
  }

})


const submitform = async () => { }


const validateformdata = () => {
  const fn = document.getElementById("fname")
  const ln = document.getElementById("lname")
  const em = document.getElementById("email")
  const us = document.getElementById("uname")
  const occ = document.getElementById("work")
  const location = document.getElementById("location")
  const p1 = document.getElementById("pass1")
  const p2 = document.getElementById("pass2")


  if (p1.value.length >= 6) {
    if (p1.value == p2.value) {
      let em_val = em.value
      addborder(p1)
      addborder(p2)
      if (em_val.endsWith(".com") && em_val.search("@") !== -1 && em_val !== "") {
        em.style.border = ""
        if (fn.value !== "") {

          if (ln.value !== "") {
            if (us.value !== "") {
              if (occ.value !== "") {
                if (location.value !== "") {
                  if (location.value.search(",") !== -1) {
                    addborder(fn)
                    addborder(ln)
                    addborder(em)
                    addborder(us)
                    addborder(occ)
                    addborder(location)
                    addborder(p1)
                    addborder(p2)
                    updatemessage("You are all set to go...", okcolor)
                    submitform(fn, ln, em, us, occ, location, p1, p2)
                    return true
                  }
                  else {
                    let message = "please put a comma after city name"
                    addborder(location, "red")
                    updatemessage(message, cautioncolor, "step3")
                  }
                }
                else {
                  addborder(location, "red")
                  let message = "please fill the entire form"
                  updatemessage(message, cautioncolor)
                }
              }
              else {
                addborder(occ, "red")
                let message = "please fill the entire form"
                updatemessage(message, cautioncolor)
              }
            }
            else {
              addborder(us, "red")
              let message = "please fill the entire form"
              updatemessage(message, cautioncolor)
            }
          }
          else {
            addborder(ln, "red")
            let message = "please fill the entire form"
            updatemessage(message, cautioncolor)
          }
        }
        else {
          addborder(fn, "red")
          let message = "please fill the entire form"
          updatemessage(message, cautioncolor)
        }

      }
      else {
        let message = "invalid email address"
        updatemessage(message, cautioncolor)
        addborder(em, "red")
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


