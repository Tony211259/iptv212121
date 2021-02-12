console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"","time":-1},

    {"line": "♪", "time": 1000},
    
    {"line":"Thought I found a way","time": 20970},

    {"line":"Thought I found a way, yeah (found)","time": 25190},
    
    {"line":"But you never go away (Never go away)","time": 28770},
    
    {"line":"So I guess i gotta stay now","time": 33060},

    {"line":"Oh, I Hope some day I'll make it out of here ","time": 36350},
    
    {"line":"Even if it takes all night, or a hundread years","time": 44560},
    
    {"line":"Need a place to hide, but I can't find one near","time": 53000},
    
    {"line":"Wanna feel alive, outside I can fight mt fears","time": 61000},
    
    {"line":"Isn't lovely, all alone","time": 71030},
    
    {"line":"Heart made by glass my mind of stone","time": 75170},
    
    {"line":"Tear me to piesces, Skin of bone","time": 79280},
    
    {"line":"Hello, Welcome home","time": 84130},

    {"line":"Walkin' out of town","time": 91760},

    {"line":"Lookin' for a better place ( Lookin' for a better place )","time": 96490},
    
    {"line":"Something's on my mind","time": 100460},
    
    {"line":"Always in my headspace","time": 104320},
    
    {"line":"But I Know someday I'll make it out of here","time": 107000},
    
    {"line":"Even if it takes all night or a hundread years","time": 115720},
    
    {"line":"Need a place to hide, but I can't find one near","time": 124000},
    
    {"line":"Wanna feel alive outside I can fight my fear","time": 132000},
    
    {"line":"Isn't lovely, all alone","time": 142000},
    
    {"line":"Heart made of glass my mind of stone","time": 146000},

    {"line":"Tear me to piesces, skin and bone","time": 150500},
    
    {"line":"Hello, welcome home","time": 155380},
    
    {"line":"Woah, yeah","time": 161000},
    
    {"line":"Yeah, ah","time": 167300},
    
    {"line":"Woah, Woah","time": 173500},
    
    {"line":"Hello, Welcome home","time": 188340},
    
    
    
    {"line":"Thank you for coming in, Wait for Next Update","time":192550},

    {"line":"FRQ","time":194660}
    
    ]}`);
var currentLine = "";

function align() {
    var a = $(".highlighted").height();
    var c = $(".content").height();
    var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
    var e = d + (a / 2) - (c / 2);
    $(".content").animate({ scrollTop: e + "px" }, { easing: "swing", duration: 250 });
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
    if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
        lyricHeight = $(".lyrics").height();
        align();
    }
});

$(document).ready(function() {
    $("video").on('timeupdate', function(e) {
        var time = this.currentTime * 1000;
        var past = _data["lyrics"].filter(function(item) {
            return item.time < time;
        });
        if (_data["lyrics"][past.length] != currentLine) {
            currentLine = _data["lyrics"][past.length];
            $(".lyrics div").removeClass("highlighted");
            $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
            align();
        }
    });
});

generate();

function generate() {
    var html = "";
    for (var i = 0; i < _data["lyrics"].length; i++) {
        html += "<div";
        if (i == 0) {
            html += ` class="highlighted"`;
            currentLine = 0;
        }
        if (_data["lyrics"][i]["note"]) {
            html += ` note="${_data["lyrics"][i]["note"]}"`;
        }
        html += ">";
        html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
        html += "</div>"
    }
    $(".lyrics").html(html);
    align();
}