const form = document.getElementById('login_form')

form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const response = await fetch('/api/session/login', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const responseData = await response.json();
    if(responseData.status === 'Success'){
        window.location.replace('/home')
    }else{
        const errBox = document.getElementById('login_error')
        errBox.innerHTML = 'Credenciales Incorrectas'
    }
})