var workingArea = document.getElementById('canvas-working-area');
workingAreaWidth = workingArea.clientWidth;
workingAreaHeight = workingArea.clientHeight;

var canvas = new fabric.Canvas('canvas');
canvas.setWidth(workingAreaWidth - 80);
canvas.setHeight(workingAreaHeight - 80);
var rawCanvas = document.getElementById('canvas');
var rawContext = rawCanvas.getContext('2d');
canvas.renderAll();
