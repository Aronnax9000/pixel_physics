

var pixelField = [
"0+- +0- +-0 -+0 -0+ 0-+",
"+-0 -+0 -0+ 0-+ 0+- +0-",
"-0+ 0-+ 0+- +0- +-0 -+0",
"0+- +0- +-0 -+0 -0+ 0-+",
"-0+ 0-+ 0+- +0- +-0 -+0",
"+-0 -+0 -0+ 0-+ 0+- +0-",
"-0+ 0-+ 0+- +0- +-0 -+0",
"0+- +0- +-0 -+0 -0+ 0-+",
"+-0 -+0 -0+ 0-+ 0+- +0-",
"-0+ 0-+ 0+- +0- +-0 -+0",
"+-0 -+0 -0+ 0-+ 0+- +0-",
"0+- +0- +-0 -+0 -0+ 0-+",
"+-0 -+0 -0+ 0-+ 0+- +0-",
"-0+ 0-+ 0+- +0- +-0 -+0",
"0+- +0- +-0 -+0 -0+ 0-+",
"+-0 -+0 -0+ 0-+ 0+- +0-",
"0+- +0- +-0 -+0 -0+ 0-+",
"-0+ 0-+ 0+- +0- +-0 -+0"
];

alert(pixelField);
/*

for (i = 0; i < 18; i++) {
    var currentPixelField = pixelField[i];
    alert(currentPixelField);
    var splitPixelField = currentPixelField.split(" ");
    for (j = 0; j < 6; j++) {
        var pixelFieldRow = splitPixelField[j];
        alert(pixelFieldRow);
        for (k = 0; k < 3; k++) {
            var pixelArrayElement = pixelFieldRow.substring(k,k+1);
            alert(pixelArrayElement);
        }
    }
}

*/
//alert(pixelField.join());
//$("#pixelPhysics").val(pixelField.join());

$(document).ready(function(){
    $("#wug").html("This is Hello World by JQuery");
   });