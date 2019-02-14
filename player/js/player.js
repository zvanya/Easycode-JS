// Домашнее задание:
// реализовать изменение громкости
// реализовать изменение playbackrate
// реализовать скип вперед назад на кнопках. По умолчанию кнопки перематывают на 1 сек вперед и назад но можно передать также это и в настройках.
// реализовать перемотку вперед и назад при двойном клике на правую и левую часть видео соответсвенно

class VideoPlayer {
    constructor(settings) {
        this._settings = Object.assign(VideoPlayer.DefaultSettings, settings);
    }

    init() {
        if (!this._settings.videoUrl) return console.error('Provide video Url');
        if (!this._settings.videoPlayerContainer) return console.error('Please provide video player container');

        // Создаем разметку для video
        this._addTemplate();
        // Найти все элементы управления
        this._setElements();
        // Установить обработчики событий
        this._setEvents();
    }

    toggle() {
        const method = this._video.paused ? 'play' : 'pause';
        this._toggleBtn.textContent = this._video.paused ? '❚ ❚' :  '►';
        this._video[method]();
    }
    
    // ***** HW14 *****
    _setIconPlayToPlay() {
        this._toggleBtn.textContent = '►';
    }
    // ----------------
    
    _videoProgressHandler() {
        const percent = (this._video.currentTime / this._video.duration) * 100;
        this._progress.style.flexBasis = `${percent}%`;
    }

    _rewind(event) {
        this._video.currentTime = (event.offsetX / this._progressContainer.offsetWidth) * this._video.duration;
    }
    
    // ***** HW14 *****
    _volumeChange() {
        this._video.volume = +this._volumeRange.value;
    }
    // ----------------
    
    // ***** HW14 *****
    // !!! Специально сделал в отдельной ф-ции, чтоб потренироваться с dispatchEvent. Можно было бы использовать ф-цию _volumeChange, по аналогии с _playbackRateChange
    _volumeRangeChange(e) {
        e.preventDefault();
        if (e.target.name === "volume") {
            this._volumeRange.value = +this._volumeRange.value - +e.deltaY / 2000;
            this._volumeRange.dispatchEvent(new Event('input'));
        }
    }
    // ----------------
    
    // ***** HW14 *****
    _playbackRateChange(e) {
        e.preventDefault();
        
        if (e.type === "input") {
            this._video.playbackRate = +this._playbackRateRange.value;
        } else if (e.type === "wheel") {
            if (e.target.name === "playbackRate") {
                this._playbackRateRange.value = +this._playbackRateRange.value + (+e.deltaY > 0 ? -(+this._settings.playbackRateStep) : +this._settings.playbackRateStep);
                this._video.playbackRate = +this._playbackRateRange.value;
            }
        }
    }
    // ----------------
    
    // ***** HW14 *****
    _skip(e) {
        if (e.target.dataset.skip) {
            this._video.currentTime += +e.target.dataset.skip;
        } else if (e.target.classList.contains('player__video') && e.target.classList.contains('viewer')) {
            e.offsetX < e.target.offsetWidth / 2 ? this._video.currentTime += this._settings.skipPrev : this._video.currentTime += this._settings.skipForward;
        }
    }
    // ----------------
    
    _addTemplate() {
        const template = this._createVideoTemplate();
        const container = document.querySelector(this._settings.videoPlayerContainer);
        container ? container.insertAdjacentHTML('afterbegin', template) : console.error('Video container was not found');
    }

    _setElements() {
        this._videoContainer = document.querySelector(this._settings.videoPlayerContainer);
        this._video = this._videoContainer.querySelector('video');
        this._toggleBtn = this._videoContainer.querySelector('.toggle');
        this._volumeRange = this._videoContainer.querySelector('input[name="volume"]'); // ***** HW14 *****
        this._playbackRateRange = this._videoContainer.querySelector('input[name="playbackRate"]'); // ***** HW14 *****
        this._skipBtn = this._videoContainer.querySelectorAll('button[data-skip]'); // ***** HW14 *****
        this._progress = this._videoContainer.querySelector('.progress__filled');
        this._progressContainer = this._videoContainer.querySelector('.progress');
    }

    _setEvents() {
        // ***** HW14 *****
        let timer;
        this._video.addEventListener('click', () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => this.toggle(), 250)
        });
        this._video.addEventListener('dblclick', (e) => {
            clearTimeout(timer);
            this._skip(e);
        });
        // ----------------
        this._video.addEventListener('ended', () => this._setIconPlayToPlay()); // ***** HW14 *****
        this._toggleBtn.addEventListener('click', () => this.toggle());
        this._video.addEventListener('timeupdate', () => this._videoProgressHandler());
        this._progressContainer.addEventListener('click', (e) => this._rewind(e));
        this._volumeRange.addEventListener('input', () => this._volumeChange()); // ***** HW14 *****
        this._volumeRange.addEventListener('wheel', (e) => this._volumeRangeChange(e)); // ***** HW14 *****
        this._playbackRateRange.addEventListener('input', (e) => this._playbackRateChange(e)); // ***** HW14 *****
        this._playbackRateRange.addEventListener('wheel', (e) => this._playbackRateChange(e)); // ***** HW14 *****
        this._skipBtn.forEach((btn) => btn.addEventListener('click', (e) => this._skip(e))); // ***** HW14 *****
    }

    _createVideoTemplate() {
        return `
        <div class="player">
            <video class="player__video viewer" src="${this._settings.videoUrl}"> </video>
            <div class="player__controls">
              <div class="progress">
              <div class="progress__filled"></div>
              </div>
              <button class="player__button toggle" title="Toggle Play">►</button>
              <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="${this._settings.volume}">
              <input type="range" name="playbackRate" class="player__slider" min="${this._settings.playbackRateMin}" max="${this._settings.playbackRateMax}" step="${this._settings.playbackRateStep}" value="1">
              <button data-skip="${this._settings.skipPrev}" class="player__button">« ${this._settings.skipPrev}s</button>
              <button data-skip="${this._settings.skipForward}" class="player__button">${this._settings.skipForward}s »</button>
            </div>
      </div>
        `;
    }

    static get DefaultSettings() {
        return {
            videoUrl: '',
            videoPlayerContainer: 'body',
            volume: 0.5,
            skipPrev: -1,
            skipForward: 1,
            playbackRateMin: 0.5,
            playbackRateMax: 2,
            playbackRateStep: 0.1,
        }
    }
}


const playerInstance = new VideoPlayer({
    videoUrl: 'video/mov_bbb.mp4',
    skipPrev: -2,
    skipForward: 2
});

playerInstance.init();
