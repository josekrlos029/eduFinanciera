/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Se activa cuando selecciinan la opción conectarse a Face
 */
function facebook() {
    FB.login(
            function(response) {
                if (response.session) {
                    alert('logged in');
                } else {
                    alert('not logged in');
                }
            },
            {scope: "email"}
    );
}
//Se obtienen los datos del Usuario
function getUserInfo() {
    FB.api('/me', function(response) {
        alert(4);
        var regId = localStorage.getItem('regid');
        var persona = {idFace: response.id,
            nombres: response.first_name,
            apellidos: response.last_name,
            email: response.email,
            fechaNacimiento: response.birthday,
            regId: regId
        };

        confirmarRegistro(persona);
    });
}

//Consulta en la bd del servidor si el usuario Existe... Sino Existe Lo agrega como nuevo usuario de la App
function confirmarRegistro(persona) {

    $.ajax({
        type: "POST",
        url: "http://admineducacion.spamedicopalace.com/administrador/confirmarRegistroFace",
        data: persona
    })
            .done(function(msg) {
                alert(msg);
                var json = eval("(" + msg + ")");
                if (json === "autenticado") {

                    var fecha = persona.fechaNacimiento.split("/");
                    var edad = calcular_edad(fecha[0], fecha[1], fecha[2]);
                    if (edad >= 18) {
                        localStorage.setItem('grupo', '2');
                    } else {
                        localStorage.setItem('grupo', '1');
                    }
                    localStorage.setItem('idFace', persona.idFace);

                    window.location.href = 'index.html';
                } else {
                    alert("Gracias por unirte a la comunidad, Has ganado 10 Puntos !");
                    facebook();
                }
            });
}