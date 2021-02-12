console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"","time":-1},
    
    {"line":"Billie","time": 100},
    
    {"line":"What do you want from me? Why don't you run from me?","time": 7620},

    {"line":"What are you wondering? What do you know?","time": 11540},

    {"line":"Why aren't you scared of me? Why do you care for me?","time": 15520},

    {"line":"When we all fall asleep, where do we go?","time": 19500},

    {"line":"Come here","time": 23720},

    {"line":"Say it, spit it out, what is it exactly","time": 25030},

    {"line":"You're payin'? Is the amount cleanin' you out, am I satisfactory?","time": 28920},
    
    {"line":"Today, I'm thinkin' about the things that are deadly","time": 32870},

    {"line":"The way I'm drinkin' you down","time": 36790},
    
    {"line":"Like I wanna drown, like I wanna end me","time": 38280},

    {"line":"Step on the glass, staple your tongue (ahh)","time": 40960},
    
    {"line":"Bury a friend, try to wake up (ah ahh)","time": 44940},
    
    {"line":"Cannibal class, killing the son (ahh)","time": 48920},

    {"line":"Bury a friend, I wanna end me","time": 52900},

    {"line":"I wanna end me","time": 63790},

    {"line":"I wanna, I wanna, I wanna end me","time": 64850},
    
    {"line":"I wanna, I wanna, I wanna","time": 68830},
    
    {"line":"What do you want from me? Why don't you run from me?","time": 71330},
    
    {"line":"What are you wondering? What do you know?","time": 75310},
    
    {"line":"Why aren't you scared of me? Why do you care for me?","time": 79220},

    {"line":"When we all fall asleep, where do we go?","time": 83190},

    {"line":"Listen","time": 87550},
    
    {"line":"Keep you in the dark, what had you expected?","time": 88800},
    
    {"line":"Me to make you my art and make you a star","time": 92660},
    
    {"line":"And get you connected?","time": 95020},
    
    {"line":"I'll meet you in the park, I'll be calm and collected","time": 96580},
    
    {"line":"But we knew right from the start that you'd fall apart","time": 100490},
    
    {"line":"Cause I'm too expensive","time": 103040},
    
    {"line":"Your talk'll be somethin' that shouldn't be said out loud","time": 104540},

    {"line":"Honestly, I thought that I would be dead by now (Wow)","time": 108640},

    {"line":"Calling security, keepin' my head held down","time": 112620},
    
    {"line":"Bury the hatchet or bury your friend right now","time": 116600},
    
    {"line":"For the debt I owe, gotta sell my soul","time": 119910},
    
    {"line":"Cause I can't say no, no, I can't say no","time": 123570},
    
    {"line":"Then my limbs all froze and my eyes won't close","time": 127550},

    {"line":"And I can't say no, I can't say no","time": 131530},
    
    {"line":"Careful","time": 135450},
    
    {"line":"Step on the glass, staple your tongue (ahh)","time": 136510},
    
    {"line":"Bury a friend, try to wake up (ah ahh)","time": 140500},
    
    {"line":"Cannibal class, killing the son (ahh)","time": 144470},

    {"line":"Bury a friend, I wanna end me","time": 148460},
    
    {"line":"I wanna end me","time": 158860},
    
    {"line":"I wanna, I wanna, I wanna end me","time": 160370},

    {"line":"I wanna, I wanna, I wanna","time": 164350},

    {"line":"What do you want from me? Why don't you run from me?","time": 166860},
    
    {"line":"What are you wondering? What do you know?","time": 170850},

    {"line":"Why aren't you scared of me? Why do you care for me?","time": 174780},
    
    {"line":"When we all fall asleep, where do we go?","time": 178720},
    
    
    {"line":"Thank you for coming in, Wait for Next Update","time":184550},

    {"line":"FRQ","time":186660}
    
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