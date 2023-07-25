const form = document.getElementById("login_form");
console.log(document.cookie);
form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    const response = await fetch('/api/users/login', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log("Hola, termine ")
    const responseData = await response.json();
    console.log("Hola, termine ")
    console.log(responseData.status)
    if(responseData.status === 'Success'){
        //window.location.href="/";
        console.log(responseData)
    }else{
        const errBox = document.getElementById('login_error')
        errBox.innerHTML = 'Credenciales Incorrectas'
    }
})