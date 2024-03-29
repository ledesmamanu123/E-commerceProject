const form = document.getElementById('register_form')

form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log(obj)
    const response = await fetch('/api/users/register', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const responseData = await response.json();
    console.log(responseData)
    // if(responseData.status === 'Success'){
    //     console.log(responseData)
    //     localStorage.setItem('accessToken',responseData.access_token)
    // }
})