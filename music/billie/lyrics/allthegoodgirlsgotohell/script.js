console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"","time":-1},
    
    {"line":"My Lucifer is lonely","time": 8990},
    
    {"line":"Standing there, killing time","time": 15560},

    {"line":"Can't commit to anything but a crime","time": 17990},
    
    {"line":"Peter's on vocation, An open invitation","time": 20310},
    
    {"line":"Animals, Evidence","time": 26060},
    
    {"line":"Pearly Gates look more like a picket fence","time": 28430},
    
    {"line":"Once you get inside them","time": 30930},

    {"line":"Got friends but can't invite them","time": 32940},
    
    {"line":"Hills burn in California","time": 35870},

     {"line":"My turn to ignore ya","time": 38240},
    
    {"line":"Don't say i didn't warn ya","time": 41120},
    
    {"line":"All the good girls go to hell","time": 46060},
    
    {"line":"Cause even god herself, Has enemies","time": 50060},
    
    {"line":"And once the water starts to rise","time": 55770},
    
    {"line":"And heaven's out of sight","time": 60650},
    
    {"line":"She'll want the devil on her team","time": 62970},
    
    {"line":"♪","time": 68720},
    
    {"line":"My Lucifer is lonely","time": 70900},
    
    {"line":"♪","time": 76230},

    {"line":"Look at you, needing me","time": 77730},
    
    {"line":"You know i'm not your friend without some greenery","time": 80290},
    
    {"line":"Walk in wearin' fetters","time": 82850},
    
    {"line":"Peter should know better","time": 84920},
    
    {"line":"Your cover up is caving in","time": 88170},
    
    {"line":"Man is such a fool, why we saving him?","time": 90670},
    
    {"line":"Poisoning themselves now","time": 93230},
    
    {"line":"Begging our help, wow","time": 95170},

    {"line":"Hills burn in California","time": 98110},
    
    {"line":"My turn to ignore ya","time": 100730},
    
    {"line":"Don't say i didn't warn ya","time": 103300},
    
    {"line":"All the good girls go to hell","time": 108300},
    
    {"line":"Cause even god herself, Has enemies","time": 115200},
    
    {"line":"And once the water starts to rise","time": 158160},
    
    {"line":"And heaven's out of sight","time": 122590},
    
    {"line":"She'll want the devil on her team","time": 125400},
    
    {"line":"♪","time": 130840},
    
    {"line":"My Lucifer is lonely","time": 133000},
    
    {"line":"There's nothing left to save now","time": 137340},
    
    {"line":"My god is gonna owe me","time": 143700},
    
    {"line":"There's nothing left to save now","time": 147650},
    
    {"line":"♪","time": 152150},

    {"line":"Haha!","time": 161480},
    
    {"line":"I cannot do this snowflake","time": 163100},

    {"line":"Thank you for coming in, Wait for Next Update","time":16604},

    {"line":"Synchronized by FRQ","time":167210}
    
   
    
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