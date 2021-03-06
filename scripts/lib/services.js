/* jshint multistr: true */
/* jshint node: true */
"use strict";

// production
//var httpBase = "http://service-osrapi.rhcloud.com/OSRAPI/basic_dnd/";

// local
var httpBase = "http://localhost:8080/FFService/ff/";

angular.module('restApp').factory('attributeService', function($http, $q) {
    var urlBase = [ httpBase, 'attributes' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('elementService', function($http, $q) {
    var urlBase = [ httpBase, 'equipment_element_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getByCode = function (code) {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase + "/code/" + code));
        return defer.promise;
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('modifierService', function($http, $q) {
    var urlBase = [ httpBase, 'equipment_item_modifiers' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByCode = function (code) {
        return $http.get(urlBase + '/code/' + code);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('modifierSynchronousService', function($http, $q) {
    var urlBase = [ httpBase, 'equipment_item_modifiers' ].join("");
    var dataFactory = {};
    dataFactory.getEntityByCode = function (code) {
    	var u = [urlBase , '/code/', code].join("");
    	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if (xmlhttp.status == 200) {
               } else if (xmlhttp.status == 400) {
            	   console.log('There was an error 400');
               } else {
            	   console.log('something else other than 200 was returned');
               }
            }
        };
        xmlhttp.open("GET", u, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    };
    return dataFactory;
});

angular.module('restApp').factory('equipmentSlotService', function($http, $q) {
    var urlBase = [ httpBase, 'equipment_slots' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});


angular.module('restApp').factory('basicGroupService', function($http, $q) {
    var urlBase = [ httpBase, 'groups' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, division));
        return defer.promise;
    };
    dataFactory.updateEntity = function (division) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, division));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('basicObjectTypeService', function($http, $q) {
    var urlBase = [ httpBase, 'object_types' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('basicGenderService', function($http, $q) {
    var urlBase = [ httpBase, 'genders' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('itemService', function($http, $q) {
    var urlBase = [ httpBase, 'io_item_data' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        return $http.get(urlBase + '/name/' + name);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('itemSynchronousService', function($http, $q) {
    var urlBase = [ httpBase, 'io_item_data' ].join("");
    var dataFactory = {};
    dataFactory.getEntityByName = function (name) {
    	var u = [urlBase , '/name/', name].join("");
    	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if (xmlhttp.status == 200) {
               } else if (xmlhttp.status == 400) {
            	   console.log('There was an error 400');
               } else {
            	   console.log('something else other than 200 was returned');
               }
            }
        };
        xmlhttp.open("GET", u, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    };
    return dataFactory;
});

angular.module('restApp').factory('textService', function($http, $q) {
    var urlBase = [ httpBase, 'texts' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.getEntityByName = function (name) {
        return $http.get(urlBase + '/name/' + name);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});

angular.module('restApp').factory('textSynchronousService', function($http, $q) {
    var urlBase = [ httpBase, 'texts' ].join("");
    var dataFactory = {};
    dataFactory.getEntityByName = function (name) {
    	var u = [urlBase , '/name/', name].join("");
    	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if (xmlhttp.status == 200) {
               } else if (xmlhttp.status == 400) {
            	   console.log('There was an error 400');
               } else {
            	   console.log('something else other than 200 was returned');
               }
            }
        };
        xmlhttp.open("GET", u, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    };
    return dataFactory;
});

angular.module('restApp').factory('basicNpcService', function($http, $q) {
    var urlBase = [ httpBase, 'io_npc_data' ].join("");
    var dataFactory = {};

    dataFactory.getEntities = function () {
        var defer = $q.defer();
        defer.resolve($http.get(urlBase));
        return defer.promise;
    };
    dataFactory.getEntity = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    dataFactory.insertEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.post(urlBase, entity));
        return defer.promise;
    };
    dataFactory.updateEntity = function (entity) {
        var defer = $q.defer();
        defer.resolve($http.put(urlBase, entity));
        return defer.promise;
    };
    dataFactory.deleteEntity = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    return dataFactory;
});
