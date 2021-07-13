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
          name: "Graduation",
          artist: "Juice WRLD ft. Benny Blanco",
          cover: "https://upload.wikimedia.org/wikipedia/en/3/3a/Benny_Blanco_and_Juice_Wrld_Graduation.png",
          source: "mp3/graduation.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "Ghost",
          artist: "Juice WRLD",
          cover: "https://i1.sndcdn.com/artworks-bMLX2UwUVAxIImJO-ArQEjw-t500x500.jpg",
          source: "https://github.com/Tony211259/test/blob/main/Juice%20Wrld%20-%20Ghost%20(Music%20Video).mp3?raw=true",
          url: "#",
          favorited: true
        },
        {
          name: "Vacation",
          artist: "Juice WRLD - Vacation ft. Post Malone, The Kid LAROI & XXXTentacion",
          cover: "https://i1.sndcdn.com/artworks-fezOAkXK075mW59e-BgPJDw-t500x500.jpg",
          source: "https://github.com/Tony211259/test/blob/main/Juice%20Wrld%20-%20Ghost%20(Music%20Video).mp3?raw=true",
          url: "#",
          favorited: true
        },
        {
          name: "Lucid Dreams",
          artist: "Juice WRLD",
          cover: "https://i.pinimg.com/736x/9f/3b/1d/9f3b1ddc0b0e974639f714d034bd81a3.jpg",
          source: "mp3/luciddream.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "Circles",
          artist: "Post Malone",
          cover: "https://upload.wikimedia.org/wikipedia/en/a/a5/Post_Malone_-_Circles.png",
          source: "mp3/circles.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "Mask Off",
          artist: "Future",
          cover: "https://i.pinimg.com/564x/d8/1e/49/d81e49efdf48bf62d54f9bbce49bc8f6.jpg",
          source: "mp3/maskoff.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "Godzilla",
          artist: "Eminem ft. Juice WRLD",
          cover: "https://i1.sndcdn.com/artworks-000675219829-3jglm5-t500x500.jpg",
          source: "mp3/godzilla.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "Toosie Slide",
          artist: "Drake",
          cover: "https://i2.wp.com/radiouty.com/wp-content/uploads/2020/05/toosie-slide-drake.jpg?resize=500%2C500",
          source: "mp3/toosieslide.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "Come and Go",
          artist: "Juice WRLD ft. Marshmello",
          cover: "https://upload.wikimedia.org/wikipedia/en/8/8f/Juice_Wrld_and_Marshmello_-_Come_%26_Go.png",
          source: "mp3/comengo.mp3",
          url: "#",
          favorited: true
        },
        {
          name: "GOOBA",
          artist: "6ix9ne",
          cover: "https://upload.wikimedia.org/wikipedia/en/c/ca/6ix9ine_-_Gooba.png",
          source: "mp3/gooba.mp3",
          url: "nothing",
          favorited: true
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
