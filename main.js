var guardar = document.getElementById("agregar");
var alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
var spinner = document.getElementById("spinner");

guardar.onclick = () => {
  var nombre = document.getElementById("nombre").value;
  var ap = document.getElementById("ap").value;
  var am = document.getElementById("am").value;
  var g = document.getElementById("g").value;
  var c = document.getElementById("c").value;
  
  if (nombre.trim() === "" || ap.trim() === "" || am.trim() === "") {
    Swal.fire({
      title: "Ingresa los datos faltantes",
      text: "Ingresa otro valor",
      icon: "error"
    });
    return
  
  }
  
  spinner.innerHTML = `<img src="spinner.gif" alt="spinner.gif" width="200px">`;
  document.getElementById("res").innerHTML = "";
  setTimeout(() => {
    
    let alumno = { nombre, ap, am, g, c };
    alumnos.push(alumno);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    imprimirAlumnos();
    spinner.innerHTML = "";
  }, 2000);
}

const imprimirAlumnos = () => {
  let tablaHTML = `<table class="table table-striped-columns">
    <tr>
      <td>Nombre</td>
      <td>A.Paterno</td>
      <td>A.Materno</td>
      <td>Grupo</td>
      <td>Carrera</td>
      <td>DEL</td>
      <td>UPD</td>
    </tr>`;

let index =0;
  alumnos.forEach(a => {
    tablaHTML += `
    <tr>
      <td>${a.nombre}</td>
      <td>${a.ap}</td>
      <td>${a.am}</td>
      <td>${a.g}</td>
      <td>${a.c}</td>
      <td><button class="btn btn-danger" onclick="delAlumnos(${index})"><i class="bi bi-trash3-fill"></i></button></td>
      
      <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#actualizarR" onclick="mostrarAlumnos(${index})"><i class="bi bi-pencil-fill"></i></button></td>
    </tr> `;
    index++;
  });

  document.getElementById("res").innerHTML = tablaHTML;
}

function delAlumnos(index) {
  Swal.fire({
  title: "Seguro de eliminar?",
  showDenyButton: true,
  confirmButtonText: "Si, eliminar", 
  denyButtonText: "No estoy seguro"
}).then((result=>{
  if (result.isConfirmed) {
    alumnos.splice(index,1);
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    imprimirAlumnos();
    Swal.fire("Se elimino","","success");
  }
}));
}

var indiceAlumno;
const mostrarAlumnos= (index) =>{
  indiceAlumno=index;
  var alumno= alumnos[indiceAlumno];
  
  document.getElementById("nom").value=alumno.nombre;
  document.getElementById("apa").value=alumno.ap;
  document.getElementById("ama").value=alumno.am;
  document.getElementById("gru").value=alumno.g;
  document.getElementById("ca").value=alumno.c;
  document.getElementById("actualizarR").style.display="block";
  
} 

var actualizar=document.getElementById("actualizar");

actualizar.onclick=()=>{

  var alumno= alumnos[indiceAlumno];
  
  alumno.nombre=document.getElementById("nom").value;
  alumno.ap=document.getElementById("apa").value;
  alumno.am=document.getElementById("ama").value;
  alumno.g=document.getElementById("gru").value;
  alumno.c=document.getElementById("ca").value;

  spinner.innerHTML = `<img src="spinner.gif" alt="spinner.gif" width="200px">`;
  document.getElementById("res").innerHTML = "";
  
  setTimeout(() => {  
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    imprimirAlumnos();
    spinner.innerHTML = "";
  }, 2000);
}

imprimirAlumnos();