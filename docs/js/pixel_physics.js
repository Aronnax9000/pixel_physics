

var pixelFieldLines = [
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

var linesA = [];

for (i = 0; i < 18; i++) {
    var lineA = [];
    linesA.push(lineA);
    
    var triples = pixelFieldLines[i].split(" "); // Array of six three character strings
    
    for (j = 0; j < 6; j++) {
        var triple = triples[j]; // string of three characters
        var tripleA = [];
        lineA.push(tripleA);
        for (k = 0; k < 3; k++) {
            tripleA.push(triple.substring(k,k+1));
        }
    }
}


$("#textarea1").html(pixelFieldLines.join("\n"));

$(document).ready(function(){
//    $("#textarea1").html(pixelFieldLines.join("\n"));
    $('#theButton').click(function(){
        doSomething();
    });
});

function doSomething() {
    var linesA2 = [];
    for (i=0;i<18;i++){
        var triplesA = [];
        for (j = 0; j < 6; j++) {
            triplesA.push(linesA[i][j].join());
        }
        var line = triplesA.join(" ");
        linesA2.push(line);
    }
    var answer = linesA2.join('\n');

    alert(answer);
    $("#textarea2").html(answer);
}