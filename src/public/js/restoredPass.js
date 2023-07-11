const form = document.getElementById('restoredForm')

form.addEventListener('submit', async (event)=>{
    event.preventDefault(); //Evitamos que, cuando el evento submit se lanze, recarguemos la página
    const data = new FormData(form); //Convertimos la info que nos llega, en data que si podamos usar
    const obj = {}
    data.forEach((value,key)=>(obj[key]=value))
    const response = await fetch('/api/session/restoredPassword', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const responseData = await response.json(); 
    console.log("Respuesta q nos llega al login: "+responseData)
})