/**
 * Created by devpc on 4/26/2017.
 */

function AppController($scope) {
    $scope.zoomNumber = 1;
    $scope.percentZoom = ($scope.zoomNumber * 100).toFixed(0);
    $scope.canvas = canvas;
    $scope.contentText = "";
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.strokeWidth = 0;
    $scope.stroke = "000000";
    $scope.shadowTransparent = 100;
    $scope.shadowDistance = 0;
    $scope.shadowBlur = 0;
    $scope.shadowPosition = 7;
    $scope.shadowColor = "000000";
    $scope.fontsize = 60;
    $scope.charSpacing = 0;
    $scope.lineHeight = 0;
    $scope.colorText = "#000000";
    $scope.fontFamily = "genjyuugothic-p-normal";
    // $scope.getActiveStyle = getActiveStyle;
    $scope.decreaseZoom = function () {
        if ($scope.zoomNumber >= 0.2) {
            $scope.zoomNumber = $scope.zoomNumber - 0.1;
            $scope.setZoom();
        }
    };
    $scope.increaseZoom = function () {
        if ($scope.zoomNumber <= 2.9) {
            $scope.zoomNumber = $scope.zoomNumber + 0.1;
            $scope.setZoom();
        }
    };
    $scope.setZoom = function () {
        canvas.deactivateAll();
        canvas.renderAll();
        canvas.setZoom($scope.zoomNumber);
        $scope.percentZoom = ($scope.zoomNumber * 100).toFixed(0);

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