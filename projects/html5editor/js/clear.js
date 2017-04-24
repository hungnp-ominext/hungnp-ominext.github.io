/**
 * Created by devpc on 4/24/2017.
 */
$('#clear').click(function () {
    canvas.forEachObject(function(o){
        o.remove();
    })
});