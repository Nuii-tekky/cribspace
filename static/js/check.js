window.onload = checkuserauthenticity

const header= document.getElementById("heading")
const homebtn= document.getElementById('gohome')
const profilebtn= document.getElementById('createprofile')

let redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
let authendpoint = "http://127.0.0.1:8000/auth/authuser"
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

const usertoken=()=>{
 const token= sessionStorage.getItem("token")
 return token
}

function loadurl(url){
  let endpoint= url
  window.location.replace(endpoint)
}

async function fetchpage(pagename){
  let redirect= pagename
  let access= usertoken()
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
    loadurl(url)
  }
  else{
    let data=await response.json()
    console.log(data)
    renderredirector()
  }
}

async function checkuserauthenticity() {
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("id_user")) {
    renderredirector()
  }
  else if (!sessionStorage.getItem("isthisfirsttime")) {
    fetchpage("homepage")
  }
  else{
    let access= usertoken()
    fetchuserdata(access)
  }
}

homebtn.addEventListener("click",()=>{
  fetchpage("homepage")
})

profilebtn.addEventListener("click",()=>{
  fetchpage("accountsettingpage")
})

