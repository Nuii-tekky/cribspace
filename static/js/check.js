window.onload = checkUserAuthenticity

const header= document.querySelector("#heading")
const homebtn= document.querySelector("#gohome")
const profilebtn= document.querySelector("#createprofile")

let redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
let authendpoint = "http://127.0.0.1:8000/auth/authuser"
let getuserendpoint= "http://127.0.0.1:8000/api/users/getbasicuserdata"

function renderRedirector() {
  window.location.replace(redirectendpoint)
}

const userId=()=>{
  const userid=sessionStorage.getItem("id_user")
  return userid
}

async function fetchUserData(a1){
  let token= a1
  const userid= userId()
  let response= await fetch(getuserendpoint,{
    method:"GET",
    headers: {
      "Authorization": token,
      "userid":userid,
      "Accept":"application/json"
    }
  })
  let responsedata=await response.json()
  let username=await responsedata["details"]["username"]
  header.textContent= `Hi ${username}`
}

const userToken=()=>{
 const token= sessionStorage.getItem("token")
 return token
}

function loadUrl(url){
  let endpoint= url
  window.location.replace(endpoint)
}

async function fetchPage(pagename){
  let redirect= pagename
  let access= userToken()
  const request_params= {
    method: "GET",
    headers:{
      "Authorization": `Token ${access}`,
      "Requestredirect": `${redirect}`
    }
  }
  const response= await fetch(authendpoint,request_params)
  if(response.redirected){
    let url = response.url
    loadUrl(url)
  }
  else{
    let data=await response.json()
    console.log(data)
    renderRedirector()
  }
}

async function checkUserAuthenticity() {
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("id_user")) {
    renderRedirector()
  }
  else if (!sessionStorage.getItem("isthisfirsttime")) {
    fetchPage("homepage")
  }
  else{
    let access= userToken()
    fetchUserData(access)
  }
}

homebtn.addEventListener("click",()=>{
  fetchPage("homepage")
})

profilebtn.addEventListener("click",()=>{
  fetchPage("accountsettingpage")
})

