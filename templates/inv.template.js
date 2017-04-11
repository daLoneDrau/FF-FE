/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <div> \
    	<div style="float:left;"> \
    		paperdoll \
    	</div> \
    	<div style="float:left;"> \
			item \
		</div> \
    </div> \
    ';
    $templateCache.put('inv', multiStr);
});