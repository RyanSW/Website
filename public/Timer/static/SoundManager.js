function SoundManager (p_LSItem, p_DefaultPath) {
    this.SoundElement = document.createElement("audio");
    this.p_LSItem = p_LSItem;
    this.SoundElement.oncanplay = function() {
        this.SoundElement.oncanplay = function(){};
//        this.Trigger();
    }.bind(this);
    if(localStorage.getItem(p_LSItem) === null) {
        this.SetNewPath("timer.wav");        // Temporary port from legacy
    } else {
        this.SoundElement.src = localStorage.getItem(p_LSItem);
    }
    this.onNeedQueue = null;
    this.onReady = null;
    this.onEnd = null;
    this.SoundElement.onpause = function() {
        if(this.onEnd !== null)
            this.onEnd();
    }.bind(this);
    this.SoundElement.preload = true;
    this.SoundElement.load();
    this.Muted = false;
}

SoundManager.prototype.Trigger = function() {
    if(this.Muted) return;
    this.SoundElement.pause();
    this.SoundElement.currentTime = 0;
    this.SoundElement.play();
}

SoundManager.prototype.Queue = function() {
    this.SoundElement.play();
    this.SoundElement.pause();
    this.Initialize();
}

SoundManager.prototype.Initialize = function() {
    console.info("init");
    this.initilized = false;
    this.SoundElement.onplay = function() {
        this.initilized = true;
        this.SoundElement.pause();
        this.SoundElement.onplay = null;
    }.bind(this);
    this.SoundElement.play();
    setTimeout(function() {
        if(!this.initilized) {
            if(this.onNeedQueue !== null)
                this.onNeedQueue();
        }
    }.bind(this), 1500);
}

SoundManager.prototype.SetNewPath = function(p_Path) {
    this.SoundElement.src = p_Path;
    this.SoundElement.load();
}

SoundManager.prototype.SetFromFile = function(p_file) {
    if(p_file === undefined) { alert("No file selected"); return; }
    var reader = new FileReader();
    var Ref = this;
    reader.onload = function() {
        var DoCache = true;
        if(this.result.length > 1048576 * 2) {
            alert("File is to large to cache, but can be used for this session.\nRefreshing will require you to reset the file.\n\nSmaller files will be saved in memory");
            DoCache = false;
        }
        var TestAud = new Audio();
        TestAud.oncanplay = function() {
            if(DoCache)
                localStorage.setItem("sound", reader.result);
            Ref.SoundElement.src = reader.result;
            Ref.SoundElement.load();
            delete this;
        };
        TestAud.onerror = function() {
            alert("Not a media file!");
            delete this;
        };
        TestAud.src = this.result;
    }
    reader.onerror = function() {
        alert("File reader error");
    }
    reader.readAsDataURL(p_file);
}
