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

function fillVitals() {
    var id = "#vitals";
    addInputText(id, "Height (in cm)", "190", "number");
    addInputText(id, "Weight (in pounds)", "140", "number");
    addInputText(id, "Temperature (in celsius)", "26.5", "number");
    addInputSelect(id, "Temperature Site", ["Axillary", "Oral", "Rectal"], "Oral");
    addInputText(id, "Blood Pressure", "120/80");
}

function fillHistory() {
    var id = "#history";
    addInputSelect(id, "Stroke", ["Yes", "No"], "No");
    addInputSelect(id, "Heart Trouble", ["Yes", "No"], "Yes");
    addInputSelect(id, "High Blood Pressure", ["Yes", "No"], "No");
    addInputSelect(id, "Diabetes", ["Yes", "No"], "No");
    addInputSelect(id, "Arthritis", ["Yes", "No"], "No");
    addInputSelect(id, "Gout", ["Yes", "No"], "Yes");
    addInputSelect(id, "Seizures", ["Yes", "No"], "No");
    addInputSelect(id, "Mental Illness", ["Yes", "No"], "No");
    addInputSelect(id, "Depression", ["Yes", "No"], "No");
    addInputSelect(id, "Cancer", ["Yes", "No"], "No");
    addInputSelect(id, "Alcoholism", ["Yes", "No"], "No");
}

function fillReview() {
    var id = "#review";
    addInputSelect(id, "Weight loss or gain", ["Yes", "No"], "No");
    addInputSelect(id, "Fatigue", ["Yes", "No"], "No");
    addInputSelect(id, "Fever or chills", ["Yes", "No"], "No");
    addInputSelect(id, "Weakness", ["Yes", "No"], "No");
    addInputSelect(id, "Trouble sleeping", ["Yes", "No"], "No");
    addInputSelect(id, "Rashes", ["Yes", "No"], "No");
    addInputSelect(id, "Lumps", ["Yes", "No"], "No");
    addInputSelect(id, "Itching", ["Yes", "No"], "No");
    addInputSelect(id, "Headache", ["Yes", "No"], "No");
    addInputSelect(id, "Earache", ["Yes", "No"], "No");
    addInputSelect(id, "Cough", ["Yes", "No"], "Yes");
}

function fillPhysical() {
    var id = "#physical";
    addInputSelect(id, "General Appearance", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Integumentary", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Musculoskeletal", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Circulatory", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Respiratory", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Digestive", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Genitourinary", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Eyes", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Ears", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Neural System", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Lymph Nodes", ["Normal", "Abnormal"], "Normal");
    addInputSelect(id, "Mucous Membranes", ["Normal", "Abnormal"], "Normal");
}

$(document).ready(function () {
    fillPatientInfo();
    fillVitals();
    fillHistory();
    fillReview();
    fillPhysical();

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

    $("#vitalsDates").change(function () {
        $("#vitalsDates option:selected").each(function () {
            $($("#vitals").find(".panel-data")[1]).find(".data span").text($(this).data("height"));
            $($("#vitals").find(".panel-data")[2]).find(".data span").text($(this).data("weight"));
        });
    })
});