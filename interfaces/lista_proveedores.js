const lista = document.getElementById('listaProveedores');


const loadData = async () => {
    const response = await fetch('http://localhost:5000/api/proveedores',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    console.log(data.data);

    const fragment = document.createDocumentFragment();
    for (let i=0; i < data.data.length; i ++ ) {
        const tr = document.createElement('TR')
        tr.innerHTML=`
            <td>${ data.data[i].id }</td>
            <td>${ data.data[i].nombre }</td>
            <td>${ data.data[i].direccion }</td>
        `
        fragment.append(tr)
    }
    lista.append(fragment)
}

loadData();