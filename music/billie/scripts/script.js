new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Bad Guy",
          artist: "Billie Eilish",
          cover: "https://i.scdn.co/image/ab67616d00001e0250a3147b4edd7701a876c6ce",
          source: "https://raw.githubusercontent.com/Tony211259/iptv212121/main/Billie_Eilish_-_bad_guy(128kbps).mp3",
          url: "Nothing",
          favorited: false
        },
        {
          name: "Bellyache",
          artist: "Billie Eilish",
          cover: "https://i.scdn.co/image/ab67616d00001e02a9f6c04ba168640b48aa5795",
          source: "https://raw.githubusercontent.com/Tony211259/iptv212121/main/Billie_Eilish_-_Bellyache(128k).mp3",
          url: "Nothing",
          favorited: false
        },        
        {
          name: "Bored",
          artist: "Billie Eilish",
          cover: "https://i.scdn.co/image/ab67616d00001e02e0f2af91be409aad81bba98c",
          source: "https://raw.githubusercontent.com/Tony211259/iptv212121/main/Billie_Eilish_-_Bored(128k).mp3",
          url: "Nothing",
          favorited: false
        },        {
          name: "Bury a friend",
          artist: "Billie Eilish",
          cover: "lyrics/buryafriend/favicon.png",
          source: "lyrics/buryafriend/buryafriend.mp3",
          url: "lyrics/buryafriend",
          favorited: false
        },
        {
          name: "COPYCAT",
          artist: "Billie Eilish",
          cover: "https://m.media-amazon.com/images/I/61O2SRKg6lL._SS500_.jpg",
          source: "https://raw.githubusercontent.com/Tony211259/iptv212121/main/Billie_Eilish_-_COPYCAT_(Audio)(128k)%20(3).mp3",
          url: "https://drive.google.com/file/d/15deF8p0NtsS402rBiNKWkc7pZwRtikBn/view?usp=sharing",
          favorited: false
        },
        {
          name: "Lovely",
          artist: "Billie Eilish ft. Khalid",
          cover: "lyrics/lovely/favicon.png",
          source: "lyrics/lovely/lovely.mp3",
          url: "lyrics/lovely",
          favorited: false
        },
        {
          name: "all the good girls go to hell",
          artist: "Billie Eilish",
          cover: "lyrics/allthegoodgirlsgotohell/favicon.png",
          source: "lyrics/allthegoodgirlsgotohell/allthegoodgirlsgotohell.mp3",
          url: "lyrics/allthegoodgirlsgotohell",
          favorited: false
        },
        {
          name: "idontwannabeyouanymore",
          artist: "Billie Eilish",
          cover: "lyrics/idontwannabeyouanymore/favicon.jpg",
          source: "lyrics/idontwannabeyouanymore/idontwannabeyouanymore.mp3",
          url: "lyrics/idontwannabeyouanymore",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
