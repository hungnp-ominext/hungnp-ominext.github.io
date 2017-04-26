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
            evented: false
        });
        canvas.add($scope.canvasPoster);
        $scope.canvasPoster.sendBackwards();
        $scope.canvasPoster.center();
        $scope.canvasPoster.setCoords();
    };
    $scope.tabLeftActive = {
        tabCreateActive: true,
        tabMaterialActive: false,
        tabTextActive: false,
        tabUploadActive: false,
        tabTemplateActive: false
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