console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"","time":-1},

    {"line":"Don't be that way","time": 17380 },
    {"line":"Fall apart twice a day","time": 21040 },
    {"line":"I just wish you could feel what you say","time": 25020 },
    {"line":"Show, never tell","time": 34520 },
    {"line":"But I know you too well","time": 37770 },
    {"line":"Got a mood that you wish you could sell","time": 42010 },
    {"line":"If teardrops could be bottled","time": 51030 },
    {"line":"There'd be swimming pools filled by models","time": 54560 },
    {"line":"Told a tight dress is what makes you a whore","time": 58770 },
    {"line":"If I love you was a promise","time": 67520 },
    {"line":"Would you break it, if you're honest?","time": 71530 },
    {"line":"Tell the mirror what you know she's heard before","time": 75270 },
    {"line":"I don't wanna be you, anymore","time": 85270 },
    {"line":"Hand, hands getting cold","time": 98020 },
    {"line":"Losing feeling is getting old","time": 106020 },
    {"line":"Was I made from a broken mold?","time": 110020 },
    {"line":"Hurt, I can't shake","time": 119030 },
    {"line":"We've made every mistake","time": 122780 },
    {"line":"Only you know the way that I break","time": 126770 },
    {"line":"If teardrops could be bottled","time": 135780 },
    {"line":"There'd be swimming pools filled by models","time": 139270 },
    {"line":"Told a tight dress is what makes you a whore","time": 143790 },
    {"line":"If I love you was a promise","time": 152280 },
    {"line":"Would you break it, if you're honest?","time": 156770 },
    {"line":"Tell the mirror what you know she's heard before","time": 161280 },
    {"line":"I-I don't wanna be you","time": 169770 },
    {"line":"I don't wanna be you","time": 178020 },
    {"line":"I don't wanna be you, anymore","time": 188020 },

    {"line":"Thank you for coming in, Wait for Next Update","time":189550},

    {"line":"FRQ","time":189660}
    
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