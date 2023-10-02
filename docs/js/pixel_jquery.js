function initGui() {
$("#menu").menu({position: { at: "right top" , my: "left top"}})
    .css("display", "block");
    $("#textDialog").dialog({autoOpen: false,
        title: "Edit Model",
        minWidth: 500,
        position: { my: "center", at: "center" },
        classes: {
            "ui-dialog": "pixelDialog",
            "ui-dialog-titlebar": "pixelDialogTitleBar"
        }
    }).draggable();

    $("#aboutDialog").dialog({autoOpen: false,
        title: "About Pixel Physics",
        minWidth: 500,
        position: { my: "center", at: "center" },
        classes: {
            "ui-dialog": "pixelDialog",
            "ui-dialog-titlebar": "pixelDialogTitleBar"

        }
    }).draggable();

    $("#edit3x3Dialog").dialog({autoOpen: false,
        title: "Edit Pixel Matrix",
        minWidth: 540,
        position: { my: "center", at: "center" },
        classes: {
            "ui-dialog": "pixelDialog",
            "ui-dialog-titlebar": "pixelDialogTitleBar"

        }
    }).draggable();
    

    $(".singlepixel").click(function() {
        singlepixelClick(this);
    });

    $(".reset").click(function() { pixelEditReset(this);});
    $(".save").click(function() { pixelEditSave(this);});
    
    $('#updateModel').click(function(){
        initModel();
        renderPixelField();
    });
    $("#menuabout").click(function() {menuAboutClick()});
    $("#menutext").click(function() {menuTextClick()});
    $("#textarea1").val(pixelFieldLines.join("\n"));
    }