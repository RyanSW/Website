var DayType,
  CountDownClock,
  CurrentTimeClock,
  EventTimeClock,
  FlashColon = true,
  EVManager,
  NoticeDisplay,
  Sound,
  MuteButton,
  SettingsButton,
  SettingsBox;

var displayingCount = undefined;
function SetupManager(p_Man) {
  DayType.innerHTML =
    EVManager.System.GetNextEvent() === undefined
      ? "No more events today"
      : p_Man.System.GetNextSchedule().DisplayName;
  p_Man.FlashFreq = 1000;
  p_Man.OnTick = function (p_Time, p_Remaining, p_Event) {
    if (p_Event != undefined) {
      CountDownClock.UpdateTitle(p_Event.Name);
      EventTimeClock.UpdateTime(p_Event.Time);
      EventTimeClock.UpdateTitle(p_Event.Name + " at");
      if (displayingCount === undefined || !displayingCount) {
        CountDownClock.Show(true);
        EventTimeClock.Show(true);
        CurrentTimeClock.UpdateLocation(20, 45, 55, 80, 0.4);
        DayType.innerHTML = EVManager.System.GetNextSchedule().DisplayName;
        displayingCount = true;
      }
    } else {
      if (displayingCount === undefined || displayingCount) {
        CountDownClock.Show(false);
        EventTimeClock.Show(false);
        CurrentTimeClock.UpdateLocation(89, 100, 0, 10, 0.2);
        DayType.innerHTML = "No more events today";
        displayingCount = false;
      }
    }
    CountDownClock.UpdateTime(p_Remaining);
    CurrentTimeClock.UpdateTime(p_Time);
  };
  p_Man.OnFlash = function (p_Time, p_FlashState) {
    CountDownClock.UpdateTime(-1, p_FlashState | !FlashColon);
    EventTimeClock.UpdateTime(-1, p_FlashState | !FlashColon);
    CurrentTimeClock.UpdateTime(-1, p_FlashState | !FlashColon);
  };
  p_Man.OnNotice = function (p_Event) {
    NoticeDisplay.Display(p_Event.Message, 3000);
    Sound.Trigger();
  };
  p_Man.Start();
}

window.addEventListener("load", function () {
  document.getElementById("JSNotice").style.display = "none";
  UpdaterLoad();
  DayType = document.getElementById("DayType");
  GetSystem("data_2019d.json", function (data) {
    EVManager = new EventManagerObject(data);
    DayType.style.display = "block";
    MuteButton.style.display = "block";
    SettingsButton.style.display = "block";
    CountDownClock = new NamedCanvasClock(
      document.getElementById("CountTime"),
      69,
      100,
      0,
      10,
      0.2,
      "Event Title"
    );
    CountDownClock.CanvasClock.AutoHideHours = true;
    EventTimeClock = new NamedCanvasClock(
      document.getElementById("EventTime"),
      20,
      45,
      0,
      80,
      0.4,
      "Event Time"
    );
    CurrentTimeClock = new NamedCanvasClock(
      document.getElementById("CurrentTime"),
      89,
      100,
      0,
      10,
      0.2,
      "Current Time"
    );
    CurrentTimeClock.Show(true);
    NoticeDisplay.Display("Loading..", 1500);
    UpdateFont("Monospace");
    InitColorPickers();
    SetupManager(EVManager);
  });
  if (localStorage.getItem("colFlash") === null)
    localStorage.setItem("colFlash", false);
  FlashColon = localStorage.getItem("colFlash") == "true";
  document.getElementById("FlashColonsCheckbox").checked = FlashColon;
  NoticeDisplay = new Notice(
    document.getElementById("EventNoticeDisplay"),
    69,
    100,
    0,
    10
  );
  NoticeDisplay.Display("Waiting for data!");
  SettingsBox = document.getElementById("SettingsBox");
  SettingsBox.style.display = "none";
  SettingsButton = document.getElementById("SettingsButton");
  SettingsButton.addEventListener("click", function () {
    SettingsBox.style.display =
      SettingsBox.style.display != "none" ? "none" : "block";
  });
  document
    .getElementById("SettingsClose")
    .addEventListener("click", function () {
      SettingsBox.style.display = "none";
    });
  Sound = new SoundManager("sound");
  MuteButton = document.getElementById("MuteButton");
  MuteButton.addEventListener("click", function () {
    if (!Sound.initilized) {
      Sound.Initialize();
    }
    Sound.Muted = !Sound.Muted;
    localStorage.setItem("Mute", Sound.Muted);
    MuteButton.viewBox.baseVal.x = Sound.Muted ? 0 : 100;
    Sound.SoundElement.pause();
  });
  Sound.Muted = localStorage.getItem("Mute") === "true";
  if (Sound.Muted === null) {
    Sound.Muted = true;
    localStorage.setItem("Mute", Sound.Muted);
  }
  MuteButton.viewBox.baseVal.x = Sound.Muted ? 0 : 100;
  Sound.onNeedQueue = function () {
    document.getElementById("AudioQueue").style.display = "block";
    setInterval(dismisalarm, 30000);
  };
  if (!Sound.Muted) Sound.Initialize();
});

function enablealarm() {
  Sound.Queue();
  document.getElementById("AudioQueue").style.display = "none";
}

function dismisalarm() {
  if (!Sound.initilized) {
    Sound.Muted = true;
    MuteButton.viewBox.baseVal.x = Sound.Muted ? 0 : 100;
  }
  document.getElementById("AudioQueue").style.display = "none";
}

function UpdateColors(p_F, p_B, p_C) {
  if (p_C === undefined) p_C = p_B;
  document.body.style.color = p_F;
  document.body.style.fill = p_F;
  document.body.style.stroke = p_F;
  document.body.style.backgroundColor = p_B;
  SettingsBox.style.background = p_B;
  SettingsBox.style.borderColor = p_F;
  CountDownClock.UpdateColors(p_F, p_B, p_C);
  EventTimeClock.UpdateColors(p_F, p_B, p_C);
  CurrentTimeClock.UpdateColors(p_F, p_B, p_C);
  NoticeDisplay.UpdateColors(p_F, p_B);
}

function UpdateFont(p_Font) {
  DayType.style.fontFamily = p_Font;
  CountDownClock.UpdateFont(p_Font);
  EventTimeClock.UpdateFont(p_Font);
  CurrentTimeClock.UpdateFont(p_Font);
  NoticeDisplay.UpdateFont(p_Font);
}

function UpdateFlashColons() {
  FlashColon = document.getElementById("FlashColonsCheckbox").checked;
  localStorage.setItem("colFlash", FlashColon);
}

//Localized color management

var colors = {};
colors.fg = "#ffffff";
colors.bg = "#000000";
function uc(cols) {
  if (cols === undefined) cols = colors;
  UpdateColors(cols.fg, cols.bg);
  localStorage.setItem("colors", JSON.stringify(colors));
}
var pickers = {};
function update(id) {
  colors[id] = pickers[id].toHEXString();
  uc();
}
function InitColorPickers() {
  if (localStorage.getItem("colors") === null)
    localStorage.setItem("colors", JSON.stringify(colors));
  else colors = JSON.parse(localStorage.getItem("colors"));
  uc();

  var options = {
    valueElement: null,
    sliderSize: 20,
    position: "top"
  };
  pickers.bg = new jscolor("bgcolor-button", options);
  pickers.bg.onFineChange = "update('bg')";
  pickers.bg.fromString(colors.bg);
  pickers.fg = new jscolor("fgcolor-button", options);
  pickers.fg.onFineChange = "update('fg')";
  pickers.fg.fromString(colors.fg);
}

function UpdateSoundFile() {
  Sound.SetFromFile(document.getElementById("CustomSoundFile").files[0]);
}

var LatestUp = 0;
function UpdaterLoad() {
  // Update check function removed
}

function CheckUpdate() {
  // Update check function removed
}

function DoUpdate() {
  NoticeDisplay.Display("Data Update");
  GetSystem("data_2019d.json", function (data) {
    NoticeDisplay.Display("Loading..", 1500);
    EVManager.Stop();
    EVManager = new EventManagerObject(data);
    SetupManager(EVManager);
  });
}
