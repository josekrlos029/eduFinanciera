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




