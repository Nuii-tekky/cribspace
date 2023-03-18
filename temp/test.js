

const para= document.getElementById("para3")

para.addEventListener("click",()=>{
  para.parentNode.removeChild(para)
})


reportError(e=> console.log(e))