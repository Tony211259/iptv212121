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
          name: "Surabaya",
          artist: "Wijaya FM",
          cover: "https://indonesiafms.com/wp-content/uploads/2012/06/Radio-Wijaya-FM-Surabaya-Live-Streaming-Online.png",
          source: "http://wijayafm.onlivestreaming.net:9880/;",
          url: "#",
          favorited: false
        },
        {
          name: "Gresik",
          artist: "Giri FM",
          cover: "https://mytuner.global.ssl.fastly.net/media/tvos_radios/sgyw8andwmrw.png",
          source: "http://streaming.girifm.com:8010/;stream.nsv?type=.mp3/;stream.mp3",
          url: "sg.html",
          favorited: false
        },
          {
          name: "Surabaya",
          artist: "MTB FM",
          cover: "https://lh3.googleusercontent.com/proxy/hjE58EWcYsPYfkqjPyQ-CgnUHWhOa_2xWlpedUFhST6HvOlO6EqQJav89HbdW2TC3XCitUzX2mkQY3jckt1wzQ",
          source: "http://103.28.148.18:8784/;",
          url: "#",
          favorited: false
        },
          {
          name: "Jakarta",
          artist: "Dangdut FM",
          cover: "http://indonesiafms.com/wp-content/uploads/2012/10/Radio-Dangdut-Indonesia-FM-Online.png",
          source: "http://202.147.199.99:8000/;",
          url: "#",
          favorited: false
        },
          {
          name: "Surabaya",
          artist: "Suzzana FM",
          cover: "https://pbs.twimg.com/profile_images/829238152573440000/RyNIfCay.jpg",
          source: "http://streaming.suzanafm.com:8000/;",
          url: "#",
          favorited: false
        },
        {
          name: "Surabaya",
          artist: "Suara FM",
          cover: "https://indonesiafms.com/wp-content/uploads/2012/06/5f98423fa63ff920f9c57e0091e20229.jpeg",
          source: "http://s9.viastreaming.net/mobile.php?port=7020",
          url: "#",
          favorited: false
        },
          {
          name: "Kediri",
          artist: "Andika FM",
          cover: "https://cdn-profiles.tunein.com/s149533/images/logog.png?t=158472",
          source: "http://stream2.andikafm.com:1057/andikafm",
          url: "#",
          favorited: false
        },
        {
          name: "Nganjuk",
          artist: "Jodhipati FM",
          cover: "https://i2.wp.com/jodhipatifm.co.id/wp-content/uploads/2016/04/cropped-master-logo-radio.jpg?fit=512%2C512&ssl=1",
          source: "http://103.28.148.18:8062/;",
          url: "#",
          favorited: false
        },
          {
          name: "Surabaya",
          artist: "Mercury FM",
          cover: "https://upload.wikimedia.org/wikipedia/id/5/54/Mercury_96FM.jpg",
          source: "https://svara-stream.radioddns.net:8443/surabaya_mercuryfm-aac",
          url: "#",
          favorited: false
        },
          {
          name: "Jakarta",
          artist: "Prambors FM",
          cover: "https://imgsvr.radiocut.site/get/thumb/600/600/radio_logos/e8/9b/e89b5c0e-0dea-4f13-873c-3483604a1861.jpg",
          source: "http://masima.rastream.com/masima-pramborsjakarta?",
          url: "#",
          favorited: false
        },
          {
          name: "Jakarta",
          artist: "Trax FM",
          cover: "https://pbs.twimg.com/profile_images/1242405601885302785/GNfqtQG9.jpg",
          source: "https://n05.radiojar.com/rrqf78p3bnzuv?rj-ttl=5&rj-tok=AAABdr7mYI0AyiorQWXclJDhXg",
          url: "#",
          favorited: false
        },
          {
          name: "Medan",
          artist: "Lodiko Mulo FM",
          cover: "https://imgproxy.zenomedia.com/insecure/fit/380/380/ce/0/plain/https://proxy.zeno.fm/content/stations/agxzfnplbm8tc3RhdHNyMgsSCkF1dGhDbGllbnQYgIDA4uzJmgkMCxIOU3RhdGlvblByb2ZpbGUYgICg_pelsgkMogEEemVubw/image/%3Fresize=380x380&v=1",
          source: "https://stream.zenolive.com/v5efxxecx5quv.aac",
          url: "#",
          favorited: false
        },
          {
          name: "Malaysia",
          artist: "Fly FM",
          cover: "https://assets.radioactive.sg/org-mediaprima/a11d3aaa-75b4-43f6-b3ac-b90076703648-logo_flyfm_750x750.png",
          source: "https://mediaprima.rastream.com/mediaprima-flyfm",
          url: "#",
          favorited: false
        },



          {
          name: "New York",
          artist: "Fox News FM",
          cover: "https://cdn-profiles.tunein.com/s20431/images/logog.jpg?t=159405",
          source: "https://streaming-ent.shoutcast.com/foxnews",
          url: "#",
          favorited: false
        },
          {
          name: "Maryland",
          artist: "NBOC-FM",
          cover: "https://upload.wikimedia.org/wikipedia/en/2/20/WBOC1025.jpg",
          source: "https://live.wostreaming.net/direct/wboc-wbocfmaac-ibc2",
          url: "#",
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
