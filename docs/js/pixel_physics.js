

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

var matrix6633;

$(document).ready(function(){
    $("#textarea1").html(pixelFieldLines.join("\n"));
    $('#theButton').click(function(){
        renderPixelField();
    });
    renderPixelField();
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

function renderPixelField() {
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


    $(".pixelField6x6").empty();
    matrix6633 = transformTo6633(linesA);
    for(i = 0; i < 6 ; i++) {
        for(j = 0; j < 6; j++) {
            var pixelField6x6Cell = $("<div>").addClass('pixelField6x6Cell');
            pixelField6x6Cell.data('row', i);
            pixelField6x6Cell.data('column', j);
            
            pixelField6x6Cell.on('mouseenter', handlemouseenter);
            pixelField6x6Cell.on('mouseleave', handlemouseleave);
            pixelField6x6Cell.on('click', handleclick);
            
            
            $(".pixelField6x6").append(pixelField6x6Cell);

            var divcell = $("<div>").addClass('pixelField3x3');  
            $(pixelField6x6Cell).append(divcell);         
            var overlaycell = $("<div>").addClass('overlay');           
            $(pixelField6x6Cell).append(overlaycell);         
        
            for(k = 0; k < 3; k++) {
              for(l = 0; l < 3; l++) {
                var value = matrix6633[i][j][k][l];
                var imageName;
                switch(value) {
                    case "-":  imageName = "img/minus.png"; break;
                    case "0":  imageName = "img/zero.png"; break;
                    case "+":  imageName = "img/plus.png"; break;
                }
                divcell.append($("<img>")
                  .attr("src", imageName)
                  .addClass('pixelField'));
              }
            }
            
        }
    }

    function handlemouseenter(evt) {
        var target = $(evt.target).closest(".pixelField6x6Cell").find('.overlay');
        $(target).css('display', 'block');
        
        // console.log("Enter " + target);
    }
    function handlemouseleave(evt) {
        var target = $(evt.target).closest(".pixelField6x6Cell").find('.overlay');
        $(target).css('display', 'none');
        //console.log("Leave target" + target);
    }
    function handleclick(evt) {
        var target = $(evt.target).closest(".pixelField6x6Cell");
        var row = $(target).data('row');
        var column = $(target).data('column');
        var pixelField3x3 = matrix6633[row][column];
        alert("Charge is " + charge(pixelField3x3));
    }

    function charge(pixelField3x3) {
        var charge = 0;
        for(i = 0; i < 2; i++) {
            for(j = 0; i < 2; j++) {
                switch(pixelField3x3[i][j]) {
                    case '-': charge -= 1; break;
                    case '+': charge += 1; break;
                    default: break; // unchanged
                }
            }
        }
        return charge;
    }
            
}