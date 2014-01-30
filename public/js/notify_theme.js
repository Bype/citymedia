define(['lib/notify.min'], function() {
	$.notify.addStyle("metro", {
    html:
        "<div>" +
            "<div class='text-wrapper'>" +
                "<div class='title' data-notify-html='title'/>" +
                "<div class='text' data-notify-html='text'/>" +
            "</div>" +
        "</div>",
    classes: {
        error: {
            "color": "#fafafa !important",
            "background-color": "#F71919",
            "border": "1px solid #FF0026"
        },
        success: {
            "background-color": "#32CD32",
            "border": "1px solid #4DB149"
        },
        info: {
            "color": "#fafafa !important",
            "background-color": "#8F9080",
            "border": "1px solid #8F9080",
            "border-radius": "8px",
            "opacity":"0.9"
            
        },
        warning: {
            "background-color": "#FAFA47",
            "border": "1px solid #EEEE45"
        },
        black: {
            "color": "#fafafa !important",
            "background-color": "#333",
            "border": "1px solid #000"
        },
        white: {
            "background-color": "#f1f1f1",
            "border": "1px solid #ddd"
        }
    }
});
$.notify.insertCSS(
".notifyjs-metro-base {\n"+
"	position: relative;\n"+
"    min-height: 52px;\n"+
"    max-width: 320px;\n"+
"    color:#444;\n"+
"}\n"+

"    .notifyjs-metro-base .text-wrapper {\n"+
"        display: inline-block;\n"+
"        vertical-align: top;\n"+
"        text-align: left;\n"+
"        margin: 10px 10px 10px 10px;\n"+
"        clear: both;\n"+
"    }\n"+

"    .notifyjs-metro-base .title {\n"+
"        font-size: 14px;\n"+
"        font-weight: bold;\n"+
"    }\n"+

"    .notifyjs-metro-base .text {\n"+
"        font-size: 15px;\n"+
"        font-weight: normal;\n"+
"        vertical-align: middle;\n"+
"    }\n"+"");
});
