/**
 * Created by devpc on 4/24/2017.
 */
$('#export').click(function () {
    var img = canvas.toDataURL('png');
    download(img, 'image.png', "image/" + 'png');
});