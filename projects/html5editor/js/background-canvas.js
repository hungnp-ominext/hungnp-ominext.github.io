// canvas.setBackgroundColor(new fabric.Pattern({source: '../images/pattern/background-canvas/ps-neutral.png'}), function () {
//     console.log('set canvas pattern background...');
// });
var srcBgPattern = '../html5editor/images/pattern/background-canvas/ps-neutral.png';
canvas.setBackgroundColor({source: srcBgPattern, repeat: 'repeat'}, function () {
    canvas.renderAll();
});