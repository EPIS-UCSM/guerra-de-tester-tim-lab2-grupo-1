const user = document.getElementById('user');
const password = document.getElementById('password');
const btn = document.getElementById('btn');

const almacen = document.getElementById('almacen');

let idAlmacen = 0;

const fetchData = async () => {

    if( user.value.length < 1 || password.value.length <1 || almacen.value==0 ){
        return alert("Llene todos los campos")
    }

    const response = await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        body:JSON.stringify({
           usuario: user.value,
           password: password.value,
           almacen: idAlmacen 
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status==400){
        const {msg} = await response.json();
        alert(JSON.stringify(msg))

        user.value=''
        password.value=''
        almacen.value=0
        return
    } 

    const data = await response.json();
    
    console.log(data);

    window.location.href='dashboard.html'

}

btn.onclick = fetchData

const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/almacenes",{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();

    const fragment = document.createDocumentFragment();
    for (let i=0; i < data.data.length; i ++ ) {
        const option = document.createElement('OPTION')
        option.setAttribute('value',data.data[i].id)
        option.innerText=data.data[i].nombre
        fragment.append(option)
    }
    almacen.append(fragment)

    almacen.onchange = () => {
        idAlmacen = almacen.value
    }

}

loadData()


