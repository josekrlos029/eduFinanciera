/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function array_unique(arr) {

                if (arr.length > 1) {

                    var arr = arr.sort();
                    var arrUnique = new Array(arr[0]);
                    for (i = 1; i < arr.length; i++) {
                        if (arr[i] != arrUnique[arrUnique.length - 1]) {

                            arrUnique.push(arr[i]);
                        }

                    }
                    return arrUnique;
                }
                
                else {
                    return arr;
                }
            }

function calcular_edad(dia_nacim,mes_nacim,anio_nacim)
{
    fecha_hoy = new Date();
    ahora_anio = fecha_hoy.getYear();
    ahora_mes = fecha_hoy.getMonth();
    ahora_dia = fecha_hoy.getDate();
    edad = (ahora_anio + 1900) - anio_nacim;
    if ( ahora_mes < (mes_nacim - 1))
    {
      edad--;
    }
    if (((mes_nacim - 1) == ahora_mes) && (ahora_dia < dia_nacim))
    { 
      edad--;
    }
    if (edad > 1900)
    {
    edad -= 1900;
    }
  return edad;
}

function sumarPuntos(puntos){
    
    var puntosActuales = localStorage.getItem('puntos');
    
    localStorage.setItem('puntos',puntosActuales + puntos);
    
}