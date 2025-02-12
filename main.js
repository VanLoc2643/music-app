//Todo: 1. Render songs
//Todo: 2. Scroll Top
//Todo: 3. Play / Pause / seek
//Todo: 4. Cd rotate
//Todo: 5. Next / prev

//Todo: 6. Random
//Todo: 7. Next / Repeat when end
//Todo: 8. active song
//Todo: 9. Scroll active song into view
//Todo: 10. Play song when click

const PLAYER_STOREGE_KEY = "YAN_PLAYER";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $("#main");
const heading = $(".header__title-two");
const cdThumb = $(".cd__thumb");
const audio = $("#audio"); //update sửa bài hát
const playBtn = $(".btn--toggle-play");
const progress = $("#progress");
const nextSong = $(".btn-next");
const prveSong = $(".prve-btn");
const btnRandom = $(".btn-random");
const repeat = $(".btn-repeat");
const playlist = $(".playlist");
const songOption = $(".song__option");
// !BÀi hat yêu thích
const listFavotite = $(".playlist-favorite__list-item");
const btnFavorite = $(".btn-favorite");
const btnListFavorite = $(".btn-listfavorite");
const playlistFavorite = $(".playlist-favorite");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isFavorite: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STOREGE_KEY)) || {}, //lấy dữ liệu của tg object storegex
  setConfig: function (key, value) {
    (this.config[key] = value), // Thêm obj key - value vào config
      localStorage.setItem(PLAYER_STOREGE_KEY, JSON.stringify(this.config)); // cấu hình lại config đã thêm
  },

  songs: [
    {
      name: "Thiên Lý Ơi",
      singer: "JACK",
      path: "./assets/music/jack2.wav",
      img: "./assets/img/rikaa.jpg",
    },
    {
      name: "Tip Toe",
      singer: "Radwimps",
      path: "./assets/music/tiptoe.mp3",
      img: "./assets/img/tiptoe.jpg",
    },
    {
      name: "Yêu nhau nửa ngày",
      singer: "Phan Mạnh Quỳnh",
      path: "./assets/music/yeunhaunuangay.mp3",
      img: "./assets/img/yeunhaunuangay.jpg",
    },
    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/radwimps.mp3",
      img: "./assets/img/phenomenal.jpg",
    },
    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/memeshe.jpg",
    },
    {
      name: "Nghe kể là năm 90",
      singer: "Radwimps",
      path: "./assets/music/nam90.mp3",
      img: "./assets/img/nam90.jpg",
    },
    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/png6.jpg",
    },

    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/png4.jpg",
    },

    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/png4.jpg",
    },

    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/png4.jpg",
    },
    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/png4.jpg",
    },

    {
      name: "Me me she",
      singer: "Radwimps",
      path: "./assets/music/memeshe.mp3",
      img: "./assets/img/png4.jpg",
    },
  ],

  //  //todo: Render GIAO DIỆN Main

  render: function () {
    const htmls = this.songs
      .map((song, index) => {
        return `
        <div class="song ${
          this.currentIndex === index ? "active" : ""
        }" data-index=${index} >
          <div class="song__thumb" style=" background-image: url(${
            song.img
          })"></div>
          <div class="song__body">
            <h3 class="song__body-title">${song.name}</h3>
            <h3 class="song__body-author">${song.singer}</h3>
          </div>
          <div class="song__option">
           <i class="btn-favorite fa-regular fa-heart"></i>
          </div>
        </div>
      `;
      })
      .join("");

    playlist.innerHTML = htmls;
  },

  renderFavorite: function () {
    let htmlFavorite;
    if (this.config.listFavorites.length === 0) {
      htmlFavorite = `<div class="empty">
              <i class="fa-solid fa-music"></i>
              <h4>Bài hát trống</h4>
            </div>`;
    } else {
      htmlFavorite = this.config.listFavorites
        .map(
          (song, index) =>
            `<div class="song" data-index="${index}">
          <div class="song__thumb" style="background-image: url(${song.img})"></div>
          <div class="song__body">
            <h3 class="song__body-title">${song.name}</h3>
            <h3 class="song__body-author">${song.singer}</h3>
          </div>
          <div class="song__option">
            <i class="btn-favorite fa-regular fa-heart"></i>
            <i class="btn-favorite--active fa-solid fa-heart"></i>
          </div>
        </div>`
        )
        .join("");
    }

    listFavotite.innerHTML = htmlFavorite;
  },

  //todo: BẮt sự kiện giao diện

  handleEvents: function () {
    const _thisapp = this;
    x = 0;
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;

    //*Cd quay dung
    const animeteCdThumb = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      fill: "backwards",
      iterations: Infinity,
      easing: "linear",
    });

    animeteCdThumb.pause(); // mac dinh pasue
    //! cả trình duyệt khi kéo xuống

    //!XỬ lsy phong to thu nhỏ cd khi kéo bài hát
    document.onscroll = function () {
      //?bắt sự kiện kéo cua trình duyệt
      //console.log(window.scrollX);
      //scrollY là lấy ra giá trị cuộn thep trục y
      //documentElement để lấy ra element của html
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      //tính kích thươnc để giảm Cd mỗi khi kéo xuống
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      //dùng kích thước mới chia kích thước cũ để ra tỷ lệ opacity
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //!Xử lý khi click play
    playBtn.addEventListener("click", function () {
      if (_thisapp.isPlaying) {
        audio.pause(); //method 	Bắt đầu phát audio/video có sẵn trong 2 thẻ audio và video
      } else {
        // audio.play(); //method 	Bắt đầu phát audio/video có sẵn trong 2 thẻ audio và video
        // _thisapp.isPlaying = true;
        // player.classList.add("playing");
        audio.play();
      }
    });

    //* Khi song được play
    audio.onplay = function () {
      _thisapp.isPlaying = true;
      player.classList.add("playing");
      animeteCdThumb.play();
    };

    //* Khi song bị pause
    audio.onpause = function () {
      _thisapp.isPlaying = false;
      player.classList.remove("playing");
      animeteCdThumb.pause();
    };

    //*khi next bai hat
    nextSong.onclick = function () {
      if (_thisapp.isRandom) {
        _thisapp.randomSong();
      } else {
        _thisapp.nextSong();
        _thisapp.setConfig("currentIndex", _thisapp.currentIndex);
        _thisapp.resetCd();
      }
      audio.play();
      _thisapp.render(); //gọi lại phương thức render để cập nhật giao diện, từ đó sẽ loại bỏ lớp active khỏi bài hát trước đó và thêm vào bài hát mới.
      /// đảm bảo gọi this.render() mỗi khi bạn thay đổi currentIndex để giao diện được cập nhật lại.
      _thisapp.scrollTopActiveSong();
    };

    prveSong.addEventListener("click", () => {
      if (_thisapp.isRandom) {
        _thisapp.randomSong();
      } else {
        _thisapp.prevSong();
        _thisapp.setConfig("currentIndex", _thisapp.currentIndex);
      }
      audio.play();
      _thisapp.render();
    });

    //*Khi tiến độ bài hát thay đổi/ khi chế độ random end vẫn random
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    });

    //* Xử lý khi tua song
    progress.onchange = function (e) {
      const seekTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    };

    //*khi random bai hat
    btnRandom.addEventListener("click", () => {
      _thisapp.isRandom = !_thisapp.isRandom;
      //nhớ dữ liệu vẫn random trên bài hát
      _thisapp.setConfig("isRandom", _thisapp.isRandom);
      btnRandom.classList.toggle("active", _thisapp.isRandom);
      //_thisapp.randomSong();
    });

    //* XỬ lý next song khi bài hát kết thúc
    audio.addEventListener("ended", function () {
      if (_thisapp.isRepeat) {
        audio.play();
      }
      //!Tự bấm click:))
      else nextSong.click();
    });

    //* Xử lý repeat
    repeat.addEventListener("click", function () {
      _thisapp.isRepeat = !_thisapp.isRepeat;
      _thisapp.setConfig("isRepeat", _thisapp.isRepeat);
      repeat.classList.toggle("active", _thisapp.isRepeat);
    });

    //* Lắng nghe hành vi click vào playlist
    playlist.onclick = function (e) {
      const songElementNode = e.target.closest(".song:not(.active)");
      //closest trả về phần tử khớp vs phần tử
      //  onsole.log(e.target.closest(".song__thumb"));
      //Todo: Làm thêm phần danh sách yêu thích
      if (songElementNode || e.target.closest(".btn-favorite")) {
        //*xử lý khi click song bài hát
        if (songElementNode) {
          // console.log(songElementNode.getAttribute("data-index"));
          console.log(songElementNode.dataset.index);
          _thisapp.currentIndex = parseInt(songElementNode.dataset.index); // khi get như này giá trị số sẽ thành chuỗi
          _thisapp.setConfig("currentIndex", _thisapp.currentIndex);
          _thisapp.render();
          _thisapp.loadCurrentSong();
          _thisapp.resetCd();
          audio.play();
        }
        //Todo: Xử lsy phần option
        //*
        if (e.target.closest(".btn-favorite")) {
          const songIndex = parseInt(e.target.closest(".song").dataset.index);
          _thisapp.toggleFavorite(songIndex);
          e.target.closest(".btn-favorite").classList.toggle("active");
        }
      }
    };

    //!hien thi danh sách yêu thích
    btnListFavorite.onclick = function () {
      playlistFavorite.classList.toggle("active");

      _thisapp.renderFavorite();
    };

    //
  },
  //?=====================================================

  //todo: Hàm xử Lý sự kiện
  toggleFavorite: function (songIndex) {
    const favoriteSongs = this.config.listFavorites || [];
    const song = this.songs[songIndex];
    const songInFavorites = favoriteSongs.find(
      (favSong) => favSong.path === song.path
    );

    if (songInFavorites) {
      // Remove from favorites
      this.config.listFavorites = favoriteSongs.filter(
        (favSong) => favSong.path !== song.path
      );
    } else {
      // Add to favorites
      favoriteSongs.push(song);
      this.config.listFavorites = favoriteSongs;
    }

    this.setConfig("listFavorites", this.config.listFavorites);
    this.renderFavorite();
  },
  //!ACtive song scroll top:
  loadConfig: function () {
    this.config.listFavorites = this.config.listFavorites || [];
    this.currentIndex = this.config.currentIndex || this.currentIndex;
    this.isRandom = this.config.isRandom || this.isRandom;
    this.isRepeat = this.config.isRepeat || this.isRepeat;
  },

  scrollTopActiveSong: function () {
    //todo:cần xử lý hanh vị bị đè
    setTimeout(() => {
      if (this.currentIndex === 0) {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 300);
  },
  //!Random song
  shuffledPlayList: [], // ta tạo 1 cái mảng lưu trữ 1 danh sách bài hát đã được xáo trộn
  shuffleSong: function () {
    const shuffle = this.songs.slice(); // Giữ nguyên danh sách gốc, không ảnh hưởng đến mảng ban đầu
    for (let i = shuffle.length - 1; i > 0; i--) {
      // Duyệt ngược từ cuối mảng để đảm bảo không bị trùng bài hát
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]]; // Hoán đổi vị trí các bài hát
    }

    return shuffle;
  },

  randomSong: function () {
    // Kiểm tra xem có bài hát nào chưa được phát không
    if (this.shuffledPlayList.length === 0) {
      this.shuffledPlayList = this.shuffleSong(); // Nếu hết bài hát, xáo trộn lại
    }

    // Lấy bài hát tiếp theo từ danh sách chưa phát
    const song = this.shuffledPlayList.pop(); // Lấy bài hát từ danh sách đã xáo trộn

    // Cập nhật index bài hát hiện tại
    this.currentIndex = this.songs.indexOf(song);
    this.loadCurrentSong(); // Tải bài hát hiện tại vào giao diện
    this.resetCd(); // Reset lại hiệu ứng CD
    audio.play(); // Bắt đầu phát bài hát
  },

  //!next Bai hat
  nextSong: function () {
    this.currentIndex++;

    // console.log(this.currentIndex);
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.resetCd();
  },
  resetCd: function () {
    const resestAnimationCd = cdThumb.getAnimations()[0];
    if (resestAnimationCd) {
      resestAnimationCd.cancel();
    }
  },

  //! Hàm định nghĩa ra các thuộc tính
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        // trả về bài hát hiện tại this.currenIndex
        //là đang trỏ đến thuộc tính bài hát hiện tai của obj app
        return this.songs[this.currentIndex];
      },
    });
  },
  // getCurrentSong: function () {
  //   return this.songs[this.currentIndex];
  // },
  //!tải bài hát hiện tại
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.path;

    // console.log(heading, cdThumb);
  },

  start: function () {
    //GÁn cấu hìnhtừ config vào ứng dụng
    //tức là nó sẽ đọc từ localStoge ra để lưu vào ứng dụng
    this.loadConfig();
    //!ĐỊnh nghĩa các thuộc tính cho obj
    this.defineProperties();
    //khi app.starts() thì code nó sẽ chạy vào đây thì ta sẽ render ra
    //!Render bài hát hiện tại
    this.render();
    //lấy ra bài hát hiện tại
    // console.log(this.getCurrentSong()); // lấy ra bai hát đầu tiên nhưng mỗi lần gọi lại consolog ra
    // this.currentSong;
    //!Tải thông tin bài hát đầu tiên vào Ui khi chạy ứng dụng
    this.loadCurrentSong();
    //!Lắng nghe xư lý sự kiện DOm event
    this.handleEvents();
    this.renderFavorite(); // Thêm dòng này
    repeat.classList.toggle("active", this.isRepeat);
    btnRandom.classList.toggle("active", this.isRandom);
  },
};

app.start();
