function Notice(p_NoticeDiv, p_Height, p_Width, p_LocX, p_LocY, p_Text, p_Font, p_CForeground, p_CBackground, p_HUnits, p_WUnits) {
    if(p_Text === undefined) p_Text = "Notice Text";
    if(p_Font === undefined) p_Font = "Monospace";
    if(p_CForeground === undefined) p_CForeground = "#000000";
    if(p_CBackground === undefined) p_CBackground = "#ffffff";
    if(p_HUnits === undefined) p_HUnits = "vh";
    if(p_WUnits === undefined) p_WUnits = "vw";
    this.Container = p_NoticeDiv;
    this.Canvas = p_NoticeDiv.getElementsByClassName("NoticeCanvas")[0];
    this.CanvasContext = this.Canvas.getContext("2d");
    this.Height = p_Height;
    this.Width = p_Width;
    this.Location = [p_LocX, p_LocY];
    this.Text = p_Text;
    this.Font = p_Font;
    this.ForegroundColor = p_CForeground;
    this.BackgroundColor = p_CBackground;
    this.HeightUnits = p_HUnits;
    this.WidthUnits = p_WUnits;
    this.CurrentlyDisplayed = false;
    this.UpdateSizes();
    this.Container.style.backgroundColor = this.BackgroundColor;
    this.CanvasContext.fillStyle = this.ForegroundColor;
    this.Container.addEventListener("resize", this.UpdateSizes.bind(this));
    window.addEventListener("resize", this.UpdateSizes.bind(this));
}

Notice.prototype.UpdateSizes = function() {
    if(!this.CurrentlyDisplayed) return;
    this.Container.style.left = this.Location[0] + this.WidthUnits;
    this.Container.style.top = this.Location[1] + this.HeightUnits;
    this.Container.style.width = this.Width + this.WidthUnits;
    this.Container.style.height = this.Height + this.HeightUnits;
    this.Canvas.width = this.Container.clientWidth;
    this.Canvas.height = this.Container.clientHeight;
    this.Canvas.style.width = this.Container.clientWidth +"px";
    this.Canvas.style.height = this.Container.clientHeight +"px";
    this.UpdateDisplay();
}

Notice.prototype.UpdateDisplay = function() {
    if(!this.CurrentlyDisplayed) return;
    this.CanvasContext.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    this.CanvasContext.font = "360pt " + this.Font;
    ratio = this.CanvasContext.measureText(this.Text).width / 480;
    TextHeight = 0;
    if(this.Canvas.width / this.Canvas.height < ratio) {
        TextHeight = this.Canvas.width  / ratio;
    } else {
        TextHeight = this.Canvas.height;
    }
    this.CanvasContext.font = TextHeight * (72/96) +"pt " + this.Font;
    this.CanvasContext.fillStyle = this.ForegroundColor;
    this.CanvasContext.textAlign = "center";
    this.CanvasContext.textBaseline = "top";
    this.CanvasContext.fillText(this.Text, this.Canvas.width / 2, (this.Canvas.height - TextHeight) / 2);
}

Notice.prototype.Display = function(p_Text, p_Duration) {
    this.Text = p_Text;
    this.Container.style.display = "block";
    this.CurrentlyDisplayed = true;
    this.UpdateSizes();
    if(p_Duration >= 0) {
        setTimeout(
            function() {
                this.Container.style.display = "none";
                this.CurrentlyDisplayed = false;
            }.bind(this),
            p_Duration
        );
    }
}

Notice.prototype.UpdateColors = function(p_CForeground, p_CBackground, p_CColon) {
    this.ForegroundColor = p_CForeground;
    this.BackgroundColor = p_CBackground;
    this.Container.style.backgroundColor = this.BackgroundColor;
    this.CanvasContext.fillStyle = this.ForegroundColor;
    this.UpdateDisplay();
}

Notice.prototype.UpdateFont = function(p_Font) {
    this.Font = p_Font;
    this.UpdateDisplay();
}