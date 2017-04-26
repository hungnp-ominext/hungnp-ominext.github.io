/**
 * Created by devpc on 4/26/2017.
 */

function AppController($scope) {
    $scope.zoomNumber = DEFAULT_ZOOM;
    $scope.percentZoom = ($scope.zoomNumber * 100).toFixed(0);
    $scope.poster = {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    };
    $scope.canvasObjects = [];
    $scope.canvasPoster = null;
    // $scope.getActiveStyle = getActiveStyle;
    $scope.decreaseZoom = function () {
        if ($scope.zoomNumber >= MIN_ZOOM + ZOOM_STEP) {
            $scope.zoomNumber = $scope.zoomNumber - ZOOM_STEP;
            $scope.setZoom();
        }
    };
    $scope.increaseZoom = function () {
        if ($scope.zoomNumber <= MAX_ZOOM - ZOOM_STEP) {
            $scope.zoomNumber = $scope.zoomNumber + ZOOM_STEP;
            $scope.setZoom();
        }
    };
    $scope.setZoom = function () {
        canvas.deactivateAll();
        canvas.renderAll();
        canvas.setZoom($scope.zoomNumber);
        $scope.percentZoom = ($scope.zoomNumber * 100).toFixed(0);

    };
    $scope.zoomEntire = function () {
        $scope.zoomNumber = DEFAULT_ZOOM;
        $scope.setZoom();
    };
    $scope.createPoster = function (item) {
        if ($scope.canvasPoster !== null) {
            $scope.canvasPoster.remove();
        }
        var width = angular.element(item).data('width');
        var height = angular.element(item).data('height');
        $scope.canvasPoster = new fabric.Rect({
            fill: DEFAULT_BACKGROUND_COLOR,
            width: width,
            height: height,
            selectable: false,
            hoverCursor: "default",
            alwaysBottom: true,
            posterType: "poster",
            evented: false,
            name: 'Poster'
        });
        canvas.add($scope.canvasPoster);
        $scope.canvasPoster.moveTo(0);
        $scope.canvasPoster.center();
        $scope.canvasPoster.setCoords();
        $scope.getObjects();
    };
    $scope.createText = function (text, fontSize, bold, italic) {
        var textProperties = {
            fontSize: fontSize,
            width: 300,
            shadow: {
                color: 'rgba(0,0,0,1)',
                blur: 0,
                offsetX: 0,
                offsetY: 0,
                position: 7
            },
            editable: true,
            name: 'Text'
        };
        if (bold) textProperties.fontWeight = 'bold';
        if (italic) textProperties.fontStyle = 'italic';
        var txt = new fabric.Textbox(text, textProperties);
        canvas.add(txt);
        txt.center();
        txt.setCoords();
        $scope.getObjects();
    };
    $scope.tabLeftActive = {
        tabCreateActive: true,
        tabMaterialActive: false,
        tabTextActive: false,
        tabUploadActive: false,
        tabTemplateActive: false
    };
    $scope.uploadFileDragend = function (ev) {
        return false;
    };
    $scope.uploadFileDragover = function (ev) {
        return false;
    };
    $scope.uploadFileDrop = function (ev, item) {
        ev.preventDefault();

        var file = ev.dataTransfer.files[0],
            reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target);
        };
        console.log(file);
        reader.readAsDataURL(file);
        return false;
    };
    $scope.layerToggleHidden = function (obj) {
        var index = $scope.canvasObjects.indexOf(obj);
        if (obj.display) {
            obj.display = false;
            canvas.item(index).opacity = 0;
        } else {
            obj.display = true;
            canvas.item(index).opacity = 1;
        }
        canvas.renderAll();
    };
    $scope.getObjects = function () {
        $scope.canvasObjects = [];
        var objects = canvas.getObjects();
        angular.forEach(objects, function (value, key) {
            var obj = {};
            obj.display = value.opacity !== 0;
            obj.name = value.name + ' (' + value.width.toFixed(0) + '*' + value.height.toFixed(0) + ')';
            obj.image = value.toDataURL();
            $scope.canvasObjects.push(obj);
        })
    };

    $scope.activeTab = function (tab) {
        switch (tab) {
            case 'create':
                $scope.setActiveTabLeft('tabCreateActive');
                break;
            case 'material':
                $scope.setActiveTabLeft('tabMaterialActive');
                break;
            case 'text':
                $scope.setActiveTabLeft('tabTextActive');
                break;
            case 'upload':
                $scope.setActiveTabLeft('tabUploadActive');
                break;
            case 'template':
                $scope.setActiveTabLeft('tabTemplateActive');
                break;
        }
    };

    $scope.setActiveTabLeft = function (index) {
        angular.forEach($scope.tabLeftActive, function (value, key) {
            $scope.tabLeftActive[key] = index === key;
        })
    };

    addAccessors($scope);
    watchCanvas($scope);
}

function addAccessors($scope) {

}

function watchCanvas($scope) {
    function updateScope() {
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    }

    canvas.on("object:scaling", function (e) {
        var obj = e.target;
        if (obj.isType('textbox')) {
            $scope.fontsize = parseInt(obj.fontSize);
            console.log($scope.fontsize);
            $scope.$$phase || $scope.$digest();
        }

    });

    canvas.on("object:selected", function (e) {
        var obj = e.target;
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    });

    canvas
        .on('group:selected', updateScope)
        .on('path:created', updateScope)
        .on('selection:cleared', updateScope);
}