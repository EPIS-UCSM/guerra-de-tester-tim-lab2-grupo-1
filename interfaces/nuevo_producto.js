(function(){

    if(!sessionStorage.getItem('idAlmacen')){
        document.body.innerHTML=`
        <h1> Debe iniciar sesion primero </h1>
        <a href='index.html'>Ir al login </a>
        `
        return;
    }
})()


const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const unidad = document.getElementById('unidad');
const proveedor = document.getElementById('proveedor');
const stock = document.getElementById('stock');
const precio = document.getElementById('precio');

const btnRegistrar = document.getElementById('registrar');

(async () => {
    const response = await fetch('https://modulo-inventario.herokuapp.com/api/proveedores',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    const fragment = document.createDocumentFragment();
    for (let i=0; i < data.data.length; i ++ ) {
        const option = document.createElement('OPTION')
        option.setAttribute('value',data.data[i].id)
        option.innerText=data.data[i].nombre
        fragment.append(option)
    }
    proveedor.append(fragment)
})()



btnRegistrar.onclick = () => {

    const almacen = sessionStorage.getItem('idAlmacen');
    
    const body = {
        nombre:nombre.value,
        descripcion:descripcion.value,
        unidad:unidad.value,
        proveedor:parseInt(proveedor.value),
        almacen,
        stock:parseInt(stock.value),
        precio:parseFloat(precio.value)
    };
    console.log(body);

    if(!isNaN(parseInt(nombre.value)) || !isNaN(parseInt(descripcion.value)) || !isNaN(parseInt(unidad.value))){
        return alert("Revise los datos ingresados")
    }

    if(isNaN(parseInt(stock.value)) || isNaN(parseFloat(precio.value)))
        return alert("El stock y el precio deben ser un numero")
    
    if(proveedor.value == '0') return alert("Seleccione un proveedor")

    try {

        saveData(body);
        alert("Producto registrado")

        window.location.href = 'dashboard.html'

    } catch (error) {
        console.log(error);
    }
}

const saveData = async (body = {}) => {

   try {
        const response = await fetch('https://modulo-inventario.herokuapp.com/api/productos',{
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if(response.status===400) console.log(data.err)
        else console.log(data.msg);

   } catch (error) {
       console.log(data.err);
   }

}

