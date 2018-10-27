var panelSection = '<div class="panel panel-default">' +
    '<div class="panel-heading">' +
    '<h4 class="panel-title">' +
    '<a data-toggle="collapse" href="#%PANEL_ID%">%PANEL_NAME%</a>' +
    '</h4>' +
    '</div>' +
    '<div id="%PANEL_ID%" class="panel-collapse collapse in">' +
    '<div class="panel-body"></div>' +
    '</div>' +
    '</div>';
var panelDataInput = '<div class="panel-data">' +
    '<p class="data-header">%DATA_NAME%</p>' +
    '<div class="data">' +
    '<span class="text-data">%DEFAULT_DATA%</span>' +
    '</div>' +
    '<div class="data-edit hide">' +
    '<input type="%TYPE%" class="form-control" placeholder="Enter %DATA_NAME%">' +
    '</div>' +
    '</div>';
var panelSelectInput = '<div class="panel-data">' +
    '<p class="data-header">%DATA_NAME%</p>' +
    '<div class="data">' +
    '<span class="text-data">%DEFAULT_DATA%</span>' +
    '</div>' +
    '<div class="data-edit hide">' +
    '<select class="form-control" >%OPTIONS%' +
    '</select>' +
    '</div>' +
    '</div>';
var panelIdCount = 0;

function replaceStr(str, replacements) {
    return str.replace(/%\w+%/g, function (all) {
        return replacements[all] || all;
    });
}

function addPanel(panelName) {
    var replacements = {
        "%PANEL_NAME%": panelName,
        "%PANEL_ID%": "panel" + panelIdCount++
    };
    console.log("PANEL ADDED: " + panelName);

    var newPanel = replaceStr(panelSection, replacements);

    $(".panel-group").append(newPanel);
}

function addInputText(panelId, dataName, defaultVal, type) {
    var replacements = {
        "%DATA_NAME%": dataName,
        "%DEFAULT_DATA%": defaultVal,
        "%TYPE%": (type == null) ? "text" : type
    };

    var newInputText = replaceStr(panelDataInput, replacements);

    $(panelId).find(".panel-body").append(newInputText);
}

function addInputSelect(panelId, dataName, values, defaultVal) {
    var options = "";
    for (i = 0; i < values.length; i++) {
        options += '<option value="' + values[i] + '">' + values[i] + '</option>'
    }
    var replacements = {
        "%DATA_NAME%": dataName,
        "%DEFAULT_DATA%": defaultVal,
        "%OPTIONS%": options
    };

    var newInputText = replaceStr(panelSelectInput, replacements);

    $(panelId).find(".panel-body").append(newInputText);
}

function fillPatientInfo() {
    var id = "#patientInfo";
    addInputText(id, "Last Name", "Si");
    addInputText(id, "First Name", "Maynard John");
    addInputText(id, "Middle Name", "Corvera");
    addInputText(id, "Age", 21, "number");
    addInputSelect(id, "Sex", ["Male", "Female"], "Male");
    addInputText(id, "Birthday", "2018-10-12", "date");
    addInputText(id, "Contact Number", "09173242344", "tel");
    addInputSelect(id, "Civil Status", ["Single", "Married", "Divorced"], "Single");
}

$(document).ready(function () {
    fillPatientInfo();

    $(".edit-btn").on("click", function () {
        $(this).siblings(".panel-action").removeClass("hide");
        $(this).addClass("hide");

        var dataPanelId = $(this).data("panel");
        var val = "";
        $("#" + dataPanelId).find(".panel-data").each(function () {
            $(this).find(".data").each(function () {
                $(this).addClass("hide");
                val = $(this).find("span").text();
            });
            $(this).find(".data-edit").each(function () {
                $(this).removeClass("hide");
                $(this).find("input, select").val(val);
            });

        });
    });

    $(".save-btn").on("click", function () {
        $(this).siblings(".edit-btn").removeClass("hide");
        $(this).siblings(".cancel-btn").addClass("hide");
        $(this).addClass("hide");

        var dataPanelId = $(this).data("panel");
        var val = "";
        $("#" + dataPanelId).find(".panel-data").each(function () {
            $(this).find(".data-edit").each(function () {
                $(this).addClass("hide");
                val = $(this).find("input, select").val();
            });
            $(this).find(".data").each(function () {
                $(this).removeClass("hide");
                $(this).find("span").text(val);
            });

        });
    });

    $(".cancel-btn").on("click", function () {
        $(this).siblings(".edit-btn").removeClass("hide");
        $(this).siblings(".save-btn").addClass("hide");
        $(this).addClass("hide");

        var dataPanelId = $(this).data("panel");
        $("#" + dataPanelId).find(".panel-data").each(function () {
            $(this).find(".data").each(function () {
                $(this).removeClass("hide");
            });
            $(this).find(".data-edit").each(function () {
                $(this).addClass("hide");
            });

        });
    });
});