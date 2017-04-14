/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
		<textarea class="ff7" id="info" ng-change="infoChange()" ng-model="text" disabled></textarea> \
    ';
    $templateCache.put('main', multiStr);
});