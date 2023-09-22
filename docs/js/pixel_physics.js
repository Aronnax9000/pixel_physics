

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


 

$(document).ready(function(){
    $("#textarea1").html(pixelFieldLines.join("\n"));
    $('#theButton').click(function(){
        doSomething();
    });
});

function parsetext(textareaid) {
    var text = $(textareaid).val().split('\n');
    var linesA = [];

    for (i = 0; i < 18; i++) {
        var lineA = [];
        linesA.push(lineA);
        
        var triples = text[i].split(" "); // Array of six three character strings
        
        for (j = 0; j < 6; j++) {
            var triple = triples[j]; // string of three characters
            var tripleA = [];
            lineA.push(tripleA);
            for (k = 0; k < 3; k++) {
                tripleA.push(triple.substring(k,k+1));
            }
        }
    }
    return linesA;
}


function transformTo6633(linesA) {
    var matrix6633 = [];
    for(row6 = 0; row6 < 6; row6++) {
      var row6Matrix = [];
      matrix6633.push(row6Matrix);
      for(col6 = 0; col6 < 6; col6++) {
        var col6Matrix = [];
        row6Matrix.push(col6Matrix);
        for(row3 = 0; row3 < 3; row3++) {
          var row3Matrix = [];
          col6Matrix.push(row3Matrix);
          for(col3 = 0; col3 < 3; col3++) {
            var line = (row6 * 3) + (row3);
            var triple = col6;
            var letter = col3;
//            console.log(row6 + ","  + row3 + "," + line + "," + triple + "," + letter);
            row3Matrix.push(linesA[line][triple][letter]);
          }
        }
      }
    }
    return matrix6633;
}

function matrix6633ToText(matrix6633) {
    var text = "";
    for(line = 0; line < 18; line++) {
        for(letter = 0; letter < 18; letter++) {
            row6 = Math.floor(line / 3);
            col6 = Math.floor(letter / 3);
            row3 = line % 3;
            col3 = letter % 3;
//            console.log(row6 + ","  + row3 + "," + col6 + "," + col3);
            text = text.concat(matrix6633[row6][col6][row3][col3]);
            if(col6 != 5 && col3 == 2) text = text.concat("   ");
            
        }
        if(line % 3 == 2) text = text.concat("\n");
        text = text.concat("\n");
    }
    return text;
}

function doSomething() {
    var linesA = parsetext("#textarea1");
    
    var linesA2 = [];
    for (i=0;i<18;i++){
        var triplesA = [];
        for (j = 0; j < 6; j++) {
            triplesA.push(linesA[i][j].join(""));
        }
        var line = triplesA.join(" ");
        linesA2.push(line);
    }
    //var answer = linesA2.join('\n');

    //$("#textarea2").html(answer);

    $(".pixelField6x6").empty();
    var matrix6633 = transformTo6633(linesA);
    for(i = 0; i < 6 ; i++) {
        for(j = 0; j < 6; j++) {
            var divcell = $("<div>").addClass('pixelField3x3')
            .on('mouseenter', mouseenterhandler)
            .on('mouseleave', mouseleavehandler);

            $(".pixelField6x6").append(divcell);
            for(k = 0; k < 3; k++) {
              for(l = 0; l < 3; l++) {
                var value = matrix6633[i][j][k][l];
                var imageName;
                switch(value) {
                    case "-":  imageName = "minus"; break;
                    case "0":  imageName = "zero"; break;
                    case "+":  imageName = "plus"; break;
                }
                divcell.append($("<img>").attr('src', 'img/' + imageName + '.png').addClass('pixelField'));
                divcell.append($("<div>").addClass('overlay'));
              }
            }
        }
    }

    function mouseenterhandler(evt) {
        var target = evt.target;
        $("div", target).style.display = "block";
      console.log(target);
    }
    function mouseleavehandler(evt) {
        var target = evt.target;
        $("div", target).style.display = "none";
       // console.log(evt);
    }
        
}