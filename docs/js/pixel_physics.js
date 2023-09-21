

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



for (i = 0; i < 18; i++) {
    var currentPixelField = pixelField[i];
    var splitPixelField = currentPixelField.split(" ");
    for (j = 0; j < 6; j++) {
        var pixelFieldRow = splitPixelField[j];
        for (k = 0; k < 3; k++) {
            var pixelArrayElement = pixelFieldRow.substring(k,k+1);
            alert(pixelArrayElement);
        }
    }
}


//alert(pixelField.join());
//$("#pixelPhysics").val(pixelField.join());

$(document).ready(function(){
    $("#textarea1").html(pixelField.join("\n"));
    $('#theButton').click(function(){
        doSomething();
    });
});

function doSomething() {
   $("#textarea2").val($("#textarea1").val());
}