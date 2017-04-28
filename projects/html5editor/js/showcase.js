// function drawPerspective(canvasId, imgUrl, scale) {
//     var canvas  = document.getElementById(canvasId),
//         context = canvas.getContext('2d'),
//         img     = document.createElement('img');
//
//     img.src = imgUrl;
//
//     img.onload = function () {
//         context.clearRect(0, 0, img.width,img.height);
//         canvas.height = img.height;
//         canvas.width  = img.width;
//
//         numSlices   = img.width * 0.75;
//         sliceWidth  = img.width / numSlices;
//         sliceHeight = img.height;
//         heightScale = (1 - scale) / numSlices;
//         widthScale  = (scale*scale*scale);
//
//         for (var i = 0; i < numSlices; i++) {
//             // Where is the vertical chunk taken from?
//             var sx = sliceWidth * i,
//                 sy = 0;
//
//             // Where do we put it?
//             var dx      = sliceWidth * i * widthScale,
//                 dy      = (sliceHeight * heightScale * (numSlices - i)) / 2,
//                 dHeight = sliceHeight * (1 - (heightScale * (numSlices - i))),
//                 dWidth  = sliceWidth * scale;
//
//
//             context.drawImage(img, sx, sy, sliceWidth, sliceHeight, dx, dy, dWidth, dHeight);
//         }
//
//     };
// }
//
// sign  = 1;
// scale = 1;
//
// setInterval(function(){
//     scale -= 0.0025 * sign;
//     drawPerspective("showcase-canvas", 'https://pbs.twimg.com/media/BxXhdmSCAAAuVq-.jpg', scale);
//
//     if(scale <= 0.5 || scale >= 1) sign = - sign;
// }, 30);


var canvasShowcase = document.getElementById('showcase-canvas'),
    contextShowcase = canvasShowcase.getContext('2d');
// img     = document.createElement('img');
canvasShowcase.width = 600;
canvasShowcase.height = 600;
var text = 'Hihi do ngok* :)';
var index = 0;
// setInterval(function () {
//     contextShowcase.clearRect(0, 0, canvasShowcase.width, canvasShowcase.height);
//     if (index === text.length) index = 0;
//     var textDraw = text.substring(0, index + 1);
//     contextShowcase.font = "100px Arial";
//     var th = getTextHeight("Arial", '100px');
//     var textHeight = th.height;
//     var textWidth = contextShowcase.measureText(textDraw).width;
//     contextShowcase.fillText(textDraw, 0, 100);
//     contextShowcase.beginPath();
//
//
//     contextShowcase.lineWidth = 7;
//     contextShowcase.moveTo(0, textHeight - 1);
//     contextShowcase.lineTo(textWidth, textHeight);
//     contextShowcase.strokeStyle = '#ff0000';
//     contextShowcase.stroke();
//
//     contextShowcase.lineWidth = 3;
//     contextShowcase.moveTo(0, textHeight);
//     contextShowcase.lineTo(textWidth, textHeight);
//     contextShowcase.strokeStyle = '#000000';
//     contextShowcase.stroke();
//
//
//     index++;
// }, 100);

var getTextHeight = function (font, fontSize) {

    var text = $('<span>Hg</span>').css({'font-family': font, 'font-size': fontSize});
    var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

    var div = $('<div></div>');
    div.append(text, block);

    var body = $('body');
    body.append(div);

    try {

        var result = {};

        block.css({verticalAlign: 'baseline'});
        result.ascent = block.offset().top - text.offset().top;

        block.css({verticalAlign: 'bottom'});
        result.height = block.offset().top - text.offset().top;

        result.descent = result.height - result.ascent;

    } finally {
        div.remove();
    }

    return result;
};

function writeMessage(message) {
    contextShowcase.clearRect(0, 0, canvasShowcase.width, canvasShowcase.height);
    contextShowcase.font = '18pt Calibri';
    contextShowcase.fillStyle = 'black';
    contextShowcase.fillText(message, 10, 25);
}
function getMousePos(evt) {
    var rect = canvasShowcase.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvasShowcase.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvasShowcase.height
    };
}
//
// canvasShowcase.addEventListener('click', function (evt) {
//     var mousePos = getMousePos(evt);
//     var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//     writeMessage(message);
// }, false);

function Text(canvas, option) {
    this.text = option.text || '';
    this.font = option.font || 'Arial';
    this.fontColor = option.fontColor || '#000000';
    this.left = option.left || 0;
    this.top = option.top || 0;
    this.fontSize = option.fontSize || 10;
    this.fontStyle = option.fontStyle || '';
    this.canvas = canvas || document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.active = false;
    this.holding = false;
    var self = this;
    this._init = function () {
        this._setEvents();
    };
    this.render = function () {
        this._drawText();
        this._getTextWidth();
        this._getTextHeight();
    };
    this._clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    this._drawText = function () {
        var cFontSize = this.fontSize + 'px';
        var cFont = cFontSize + ' ' + this.font;
        this.ctx.font = cFont;
        this.ctx.fillText(this.text, this.left, this.top + this.fontSize);
    };
    this._getTextHeight = function () {
        this.height = getTextHeight(this.font, this.fontSize).height;
        return this.height;
    };
    this._getTextWidth = function () {
        this.width = this.ctx.measureText(this.text).width;
        return this.width;
    };
    this._setEvents = function () {
        this._onMouseDown();
        this._onMouseUp();
        this._onMouseMove();
    };
    this.setActive = function () {
        this._setActive();
    };
    this._setActive = function () {
        this.active = true;
    };
    this._isActive = function () {
        return this.active;
    };
    this._onMouseDown = function () {
        this.canvas.addEventListener('click', function (evt) {
            self.holding = true;
            var mousePos = getMousePos(evt);
            var x = mousePos.x;
            var y = mousePos.y;
            if (x >= self.left && x <= (self.left + self.width) && y >= self.top && y <= (self.top + self.height)) {
                self.active = true;
            } else {
                self.active = false;
            }
            if (self.active) {
                self._drawBorder();
            } else {
                self.active = false;
                self._clear();
                self.render();
            }
        }, false);
    };
    this._onMouseUp = function () {
        this.canvas.addEventListener('mouseup', function (evt) {
            self.holding = false;
        }, false);

    };
    this._onMouseMove = function () {
        this.canvas.addEventListener('mousemove', function (evt) {
            if (self.active && self.holding) {
                var mousePos = getMousePos(evt);
                var x = mousePos.x;
                var y = mousePos.y;
                self.left = x;
                self.top = y;
                self._clear();
                self.render();
            }
        }, false);
    };
    this._drawBorder = function () {
        // horizontal top
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(this.left, this.top);
        this.ctx.lineTo(this.left + this.width, this.top);
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();
        // horizontal bottom
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(this.left, this.top + this.height);
        this.ctx.lineTo(this.left + this.width, this.top + this.height);
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();
        // vertical left
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(this.left, this.top);
        this.ctx.lineTo(this.left, this.top + this.height);
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();
        // vertical lright
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(this.left + this.width, this.top);
        this.ctx.lineTo(this.left + this.width, this.top + this.height);
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();

    };
    this._init();
}

var txt = new Text(canvasShowcase, {
    text: text,
    fontSize: 100,
    top: 50,
    left: 10
});

txt.render();
//
// document.querySelector('body').addEventListener('mousemove', function (evt) {
//     console.log(evt.clientX, evt.clientY);
// });