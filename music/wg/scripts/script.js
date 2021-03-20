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
          name: "Hush",
          artist: "Weird Genius x Yellow Claw ft. Reikko",
          cover: "https://i.ytimg.com/vi/nfVcDJ584RA/maxresdefault.jpg",
          source: "mp3/HUSH.mp3",
          url: "https://www.youtube.com/watch?v=nfVcDJ584RA",
          favorited: false
        },
        {
          name: "DPS",
          artist: "Weird Genius",
          cover: "https://i.scdn.co/image/ab67616d0000b2734507c995741854f274b4ba78",
          source: "mp3/DPS.mp3",
          url: "https://jli.ijjiii.is/652807057c6d32a5236eb27ceb65fc00/sUcQle3S2Yo/cenxcorxoaxcma",
          favorited: false
        },
        {
          name: "Flickshot",
          artist: "Weird Genius ft. Charita Utami",
          cover: "https://i1.sndcdn.com/artworks-000508393653-15a5o9-t500x500.jpg",
          source: "mp3/flickshot.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Graduation",
          artist: "Juice WRLD ft. Benny Blanco",
          cover: "https://upload.wikimedia.org/wikipedia/en/3/3a/Benny_Blanco_and_Juice_Wrld_Graduation.png",
          source: "https://shorturl.at/gzGV1",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Lunatic",
          artist: "Weird Genius ft. Letty",
          cover: "https://i1.sndcdn.com/artworks-000207373420-3l5jsw-t500x500.jpg",
          source: "mp3/lunatic.mp3",
          url: "https://www.youtube.com/watch?v=su-TS7G9Szw",
          favorited: false
        },
        {
          name: "Lathi",
          artist: "Weird Genius ft. Sara Fajira",
          cover: "https://i.ytimg.com/vi/0Gxg9s4aVFs/hqdefault.jpg",
          source: "mp3/lathi.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: false
        },
        {
          name: "Sweet Scar",
          artist: "Weird Genius ft. Prince Husein",
          cover: "https://images.genius.com/c849bd130bf7d3257987915b29c1a51e.630x630x1.jpg",
          source: "mp3/sweetscar.mp3",
          url: "https://www.youtube.com/watch?v=dxIG9JtakBM",
          favorited: false
        },
        {
          name: "Big Bang",
          artist: "Weird Genius ft. Letty",
          cover: "https://images.genius.com/8ee47eafa6fbdfe71b77a74e8cfb4ac6.640x640x1.jpg",
          source: "https://raw.githubusercontent.com/Tony211259/iptv212121/main/Weird%20Genius%20-%20Big%20Bang%20(ft.%20Letty)%20Official%20Music%20Video.mp3",
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
