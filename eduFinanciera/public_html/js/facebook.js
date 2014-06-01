/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Se activa cuando selecciinan la opción conectarse a Face
 */
function facebook() {
    alert(1);
    Login();
}

//DAtos de inicio de la APi
window.fbAsyncInit = function() {
    FB.init({
        appId: '411903142258993',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

};
// Load the SDK asynchronously
//carga el SDK de Face
(function(d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/es_ES/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

//SE especifican los datos que se necesitan del usuario (scope)
function Login()
{
    alert(3);
    FB.login(function(response) {
        if (response.authResponse)
        {
            getUserInfo(); // Get User Information.
        } else
        {
            alert('Error al entrar con facebook, intentalo nuevamente, Recuerda: "No publicaremos nada a tu nombre"');
        }
    }, {scope: 'email,publish_actions,user_birthday'});

}
//Se obtienen los datos del Usuario
function getUserInfo() {
    FB.api('/me', function(response) {

        //getPhoto();
        //publicar();
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
                    var edad= calcular_edad(fecha[0], fecha[1], fecha[2]);
                    if(edad >= 18){
                        localStorage.setItem('grupo','2');
                    }else{
                        localStorage.setItem('grupo','1');
                    }
                    localStorage.setItem('idFace', persona.idFace);
                    
                    window.location.href = 'index.html';
                } else {
                    alert("Gracias por unirte a la comunidad, Has ganado 10 Puntos !");
                    facebook();
                }
            });
}
