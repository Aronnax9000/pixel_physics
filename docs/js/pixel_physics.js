

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
    for(row = 0; row < 6 ; row++) {
        for(column = 0; column < 6; column++) {
            var pixelField6x6Cell = $("<div>").addClass('pixelField6x6Cell');
            pixelField6x6Cell.data('row', row);
            pixelField6x6Cell.data('column', column);
            pixelField6x6Cell.data('pixelField3x3', matrix6633[row][column] );
            
            pixelField6x6Cell.on('mouseenter', handlemouseenter);
//            pixelField6x6Cell.on('mouseleave', handlemouseleave);
            pixelField6x6Cell.on('touchstart', handleclick);
            pixelField6x6Cell.on('click', handleclick);
            
            
            $(".pixelField6x6").append(pixelField6x6Cell);

            var divcell = $("<div>").addClass('pixelField3x3');  
            $(pixelField6x6Cell).append(divcell);         
            var selection_overlay = $("<div>").addClass('selection_overlay');                     
            $(pixelField6x6Cell).append(selection_overlay);         
            var hover_overlay = $("<div>").addClass('hover_overlay');           
            $(pixelField6x6Cell).append(hover_overlay);         
            var equals_overlay = $("<div>").addClass('equals_overlay');           
            $(pixelField6x6Cell).append(equals_overlay);         
        
            for(k = 0; k < 3; k++) {
              for(l = 0; l < 3; l++) {
                var value = matrix6633[row][column][k][l];
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
    /**
     * Turn off the hover and equals overlays for every cell in the 6x6 grid.
     * 
     * @param {*} theElement an element inside the grid div
     * @returns the element representing the grid div.
     */
    function pixelField6x6TurnOffHoverAndEquals(theElement) {
        var pixelField6x6 = $(theElement)
            .closest('.pixelField6x6');
        
        $(pixelField6x6)
            .find('.hover_overlay, .equals_overlay')
            .css('display', 'none');
        return pixelField6x6;
    }


    function handlemouseenter(evt) {
        evt.preventDefault();
        var target = evt.target;
        // Turn off all hover overlays
        var pixelField6x6 = pixelField6x6TurnOffHoverAndEquals(target);
        // Which cell is hovered over?
        var hovered_cell = $(target).closest(".pixelField6x6Cell");
        // Turn on hover overlay for hovered cell
        $(hovered_cell).find('.hover_overlay')
            .css('display', 'block');
        highlightEqual3x3Grids(hovered_cell); 
        // console.log("Enter " + target);
    }

    function highlightEqual3x3Grids(hovered_cell) {
        pixelField6x6 = $(hovered_cell)
        .closest('.pixelField6x6');
                // Highlight equal 3x3 grids
                $(pixelField6x6)
                    .find('.pixelField6x6Cell')
                    .each( function() {
                        if($(this).find('.hover_overlay').css('display') != 'block') {
                            if(pixelField6x6CellEquals(this, hovered_cell)) {
                            $(this).find('.equals_overlay').css('display', 'block');                        
                        }
                    }
                });
    
    }
    function handlemouseleave(evt) {
        evt.preventDefault();
        var target = $(evt.target).closest(".pixelField6x6Cell").find('.hover_overlay');
        $(target).css('display', 'none');
        console.log("Leave target" + target);
    }
    function handleclick(evt) {
        evt.preventDefault();
        var pixelField6x6Cell = $(evt.target).closest(".pixelField6x6Cell")
        if(pixelField6x6Cell === undefined) {
            return;
        }
        var pixelField6x6 = pixelField6x6TurnOffHoverAndEquals(pixelField6x6Cell);

        var target = pixelField6x6Cell.find('.selection_overlay');
            if($(target).css('display') == 'block') {
            var pixelField3x3 = $(pixelField6x6Cell).data('pixelField3x3');
            if(pixelField3x3 === undefined) {   
                console.log("click target has no pixelField3x3");
                return;  
            } else {
                console.log("click target" + target + " " + row + " " + column);
                var q = charge(pixelField3x3);
                alert("Charge is " + q);
            }
        } else {
            pixelField6x6Cell.parent().find('.selection_overlay').css('display', 'none');
            $(target).css('display', 'block');
            highlightEqual3x3Grids(pixelField6x6Cell)
        }
    }

    function charge(field3x3) {
        var total = 0;
        for(i = 0; i < 3; i++) {
            for(j = 0; j < 3; j++) {
                switch(field3x3[i][j]) {
                    case '-': total -= 1; break;
                    case '+': total += 1; break;
                    default: break; // unchanged
                }
            }
        }
        return total;
    }

    function getPixelGridFrom6x6Cell(pixelField6x6Cell) {
        return $(pixelField6x6Cell).data('pixelField3x3');
    } 

    function pixelField6x6CellEquals(pixelField6x6Cell1, pixelField6x6Cell2) {
        return pixelGridEquals(
            getPixelGridFrom6x6Cell(pixelField6x6Cell1),
            getPixelGridFrom6x6Cell(pixelField6x6Cell2)
        );
    }

    function pixelGridEquals(grid0, grid1) {
        for(k = 0; k < 3; k++) {
            for(l = 0; l < 3; l++) {
                if(grid0[k][l] != grid1[k][l])
                  return false; 
            }
        }
        return true;
    }  

}