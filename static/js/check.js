const header= document.getElementById("heading")

let redirectendpoint = "http://127.0.0.1:8000/home/auth/redirector"
let authendpoint = "http://127.0.0.1:8000/home/auth/authuser"
let getuserendpoint= "http://127.0.0.1:8000/api/getbasicuserdata"

function renderredirector() {
  window.location.replace(redirectendpoint)
}

async function fetchuserdata(a1){
  let token= a1
  let response= await fetch(getuserendpoint,{
    method:"GET",
    headers:{
      "Authorization": token
    }
  })
  let responsedata=await response.json()
  let username=await responsedata["details"]["username"]
  header.textContent= `Hi ${username}`
}

async function checkuserauthenticity() {
  if (!sessionStorage.getItem("token")) {
    renderredirector()
  }
  else if (!sessionStorage.getItem("isthisfirsttime")) {
    let token = sessionStorage.getItem("token")
    let response = await fetch(authendpoint, {
      method: "GET",
      headers: {
        "Authentication": `Token ${token}`,
        "Requestredirect": "homepage"
      }
    })
    if (response.redirected) {
      let url = response.url
      window.location.replace(url)
    }
    else {
      let response_data = await response.json()
      console.log(response_data)
      if (response_data['detail'] === "Authentication credentials were not provided.") {
        renderredirector()
      }
      else {
        renderredirector()
      } 
    }
  }
  else{
    let access= sessionStorage.getItem("token")
    fetchuserdata(access)
  }
}

window.onload = checkuserauthenticity