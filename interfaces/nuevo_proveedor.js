const nombre = document.getElementById('nombre');
const direccion = document.getElementById('direccion');

const btnRegistrar = document.getElementById('registrar');

btnRegistrar.onclick = () => {
    
    const body = {
        nombre:nombre.value,
        direccion:direccion.value
    };
    if(!isNaN(parseInt(nombre.value)) || !isNaN(parseInt(direccion.value))){
        nombre.focus()
        return alert("Los valores de los campos deben ser cadenas de texto validas")
    }

    try {

        saveData(body);

        nombre.value=''
        direccion.value=''
        alert("Proveedor registrado")
        window.location.href = './dashboard.html'

    } catch (error) {
        console.log(error);
    }
}

const saveData = async (body = {}) => {

    const response = await fetch('http://localhost:5000/api/proveedores',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    console.log(data.msg);
}