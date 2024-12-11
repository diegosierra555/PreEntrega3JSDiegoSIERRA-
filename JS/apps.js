
// ********************************************************** // 
// Declaracion de Variables
// ********************************************************** // 
let unoNuevo = "";
let unlugarElegido = "";
// los arrays que voy a usar
const listaLugares = [];
const listaPasajeros = [];

// ********************************************************** // 
// Declaracion de Clases
// ********************************************************** // 
class Alojamiento
    {
        constructor(codigoLugar, nombreLugar, direccionLugar, capacidad)
        { this.codigoLugar= codigoLugar;
            this.nombreLugar = nombreLugar;
            this.direccionLugar = direccionLugar;
            this.capacidad = capacidad;

        }
    }
// constructora de un pasajero
class Pasajero
{
    constructor(nombrePasajero, alojamientoAsignado)
    { this.nombrePasajero =nombrePasajero.toUpperCase();
        this.alojamientoAsignado = alojamientoAsignado;
    }
    infoUbicacion() 
    {
        console.log(this.nombrePasajero + " esta alojado en "+this.alojamientoAsignado)
    }
};

// ********************************************************** // 
// Declaraciones de objetos de la pagina HTML Index 
// ********************************************************** // 
const titulo = document.getElementById("tituloTabla");
const tablaDepto = document.getElementsByClassName("departamento")

tablaDepto[0].innerText= "Lugar = JUNCAL - Direccion = Juncal 2692. Piso 4 - Capacidad = 4 personas" ;      
tablaDepto[1].innerText= "Lugar = MELO - Direccion =  Melo 3498. Piso 1 - Capacidad = 2 personas" ;
tablaDepto[2].innerText= "Lugar = RINCON - Direccion = Rincon 1912. Lomas - Capacidad = 6 personas";
tablaDepto[3].innerText= "Lugar = FRENCH -  Direccion = French 654 PB A - 10 personas";

let nombreNuevoPax = document.getElementById("nuevoPaxIngresado");
let lugarNuevoPax = document.getElementById("lugarElegido");
let botonNuevoPax = document.getElementById("ctaNuevoPax");
let nombreUltimoPax = document.getElementById("ultimoPaxIngresado");
let resultadoAsignacion = document.getElementById("mensajeAsignacion");

let ultimoPax = document.getElementById("ultimoPaxIngresado");
let direccionCompleta = document.getElementById("mensajeDireccion");

let botonListar = document.getElementById("ctaListar");
let listaCompleta = document.getElementById("mensajeLista")


// ********************************************************** // 
// Declaracion de Funciones 
// ********************************************************** // 

// FUNCION : contar la capacidad disponible de un lugar
function disponible(lugar)
{
let ocupacion = 0 ; 
let capa = -1;
    // Busco la capacidad
    for (let i=0; i<listaLugares.length; i++) 
        {
        // mejorar la busqueda de la capacidad con index of 
        if (listaLugares[i].nombreLugar == lugar) 
            { capa = listaLugares[i].capacidad}
        };
    // Cuento la ocupacion
    for (let i=0; i<listaPasajeros.length; i++) 
            { 
            if (listaPasajeros[i].alojamientoAsignado == lugar) 
            {  ocupacion ++ ;};
            };
return(capa - ocupacion );
}

// FUNCION : oobtener el domicilio de un pasajero
function alojadoEn(pax)
{
let x = "" ;
let a = " Direccion DESCONOCIDA. ";
// Busco el lugar donde fue asignado el pasajero
// CON UN FOR ... OF
for (const unPax of listaPasajeros)     
    if (unPax.nombrePasajero == pax.toUpperCase()) 
        x = unPax.alojamientoAsignado;

//Busco la direccion del lugar asignado y la retorno
for (let i=0; i<listaLugares.length; i++) 
{
    if (listaLugares[i].nombreLugar == x)
        a = listaLugares[i].direccionLugar;

};

return(a);
};




function validarAsignacion(){
    
    unoNuevo =nombreNuevoPax.value.toUpperCase();
    unlugarElegido = lugarNuevoPax.value.toUpperCase();

    // console.log(unoNuevo , unlugarElegido)

    if ( disponible(unlugarElegido)  > 0 )
        {// le asigno el lugar    
            listaPasajeros.push(new Pasajero(unoNuevo,unlugarElegido));
            resultadoAsignacion.innerText = "El pasajero fue asignado con exito!";
            // voy guardando la LISTA de CONFIRMADO en el LOCAL STORAGE
            localStorage.setItem('pasajeros-alojados',JSON.stringify(listaPasajeros));
            // me guardo el ultimo ingresado tambien para mostrarle la direccion
            localStorage.setItem('ultimo-pax',unoNuevo);
            localStorage.setItem('ultimo-lugar',unlugarElegido)
            // limpio los inputs
            nombreNuevoPax.value = "";
            lugarNuevoPax.value = ""
        }
        else
            if ( disponible(unlugarElegido) == 0)
            { resultadoAsignacion.innerText = "No hay mas lugar en " + unlugarElegido + ", por favor vuelva a ingresar al pasajero."}
            else 
                resultadoAsignacion.innerText = unlugarElegido + " no es un lugar valido o no esta disponible. Vuelva a ingresar al pasajero.";

          
            };

// FUNCION : oobtener el domicilio de un pasajero
function alojadoEn(pax)
{
let x = "" ;
let a = " Direccion DESCONOCIDA.";

// Busco el lugar donde fue asignado el pasajero
// CON UN FOR ... OF
for (const unPax of listaPasajeros)     
    if (unPax.nombrePasajero == pax.toUpperCase()) 
        x = unPax.alojamientoAsignado;

//Busco la direccion del lugar asignado y la retorno
for (let i=0; i<listaLugares.length; i++) 
{
    if (listaLugares[i].nombreLugar == x)
        a = listaLugares[i].direccionLugar;
};
return(a) ;

};



function mostrarListaAlojados(){
    listaCompleta.innerText =""
    
    // Recupero de la local storage los pasajeros confirmados y la convierto de JSO a objeto
    const listaConfirmadosString = localStorage.getItem("pasajeros-alojados");
    const listaConfirmada = JSON.parse(listaConfirmadosString);

    // hago lo mismo pero con funcion de orden superior
    listaConfirmada.forEach( unPax => { 
        listaCompleta.innerText += 
                                unPax.nombrePasajero 
                                + " esta en " 
                                + unPax.alojamientoAsignado + " , " 
                                + alojadoEn(unPax.nombrePasajero) 
                                + "   ///   " }) ;
       
}


function prepararEntradaDatos(){
                resultadoAsignacion.innerText="...";
                nombreNuevoPax.value = "";
                lugarNuevoPax.value = "";

                nombreUltimoPax.value = localStorage.getItem('ultimo-pax');
                
                direccionCompleta.innerText  = alojadoEn(localStorage.getItem('ultimo-pax'))
            };

// ********************************************************** // 
// Inicializo los objetos alojamiento en un array lista de lugares

// ********************************************************** // 
listaLugares.push(new Alojamiento("A23","JUNCAL","Juncal 2692. Piso 4",4));
listaLugares.push(new Alojamiento("B52","MELO","Melo 3498. Piso 1",2));
listaLugares.push(new Alojamiento("4F2","RINCON","Rincon 1912. Lomas ",6));
listaLugares.push(new Alojamiento("A16","FRENCH","French 654 PB A",2));



// ********************************************************** // 
// INICIO EL RUN //
// ********************************************************** // 

// Ingreso un nuevo Pasajero y el lugar elegido
botonNuevoPax.addEventListener("click",validarAsignacion);

nombreNuevoPax.addEventListener("click",prepararEntradaDatos);

botonListar.addEventListener("click",mostrarListaAlojados);


// ********************************************************* //
// BORRO LA LOCAL STORAGE //
// ********************************************************** // 

localStorage.clear();

