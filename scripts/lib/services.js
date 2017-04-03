/* jshint multistr: true */
/* jshint node: true */
"use strict";

// production
//var httpBasicBase = "http://service-osrapi.rhcloud.com/OSRAPI/basic_dnd/";

// local
var httpBasicBase = "http://localhost:8080/LLService/ll/";

angular.module('restApp').factory('basicAttributeService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'attributes' ].join("");
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

angular.module('restApp').factory('basicCurrencyService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'currencies' ].join("");
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

angular.module('restApp').factory('basicDieService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'dies' ].join("");
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

angular.module('restApp').factory('basicDiceService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'dices' ].join("");
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

angular.module('restApp').factory('basicElementService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'equipment_element_types' ].join("");
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

angular.module('restApp').factory('basicModifierService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'equipment_item_modifiers' ].join("");
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

angular.module('restApp').factory('basicEquipmentSlotService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'equipment_slots' ].join("");
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
    var urlBase = [ httpBasicBase, 'groups' ].join("");
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
    var urlBase = [ httpBasicBase, 'object_types' ].join("");
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
    var urlBase = [ httpBasicBase, 'genders' ].join("");
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

angular.module('restApp').factory('basicItemService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'io_item_data' ].join("");
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

angular.module('restApp').factory('basicNpcService', function($http, $q) {
    var urlBase = [ httpBasicBase, 'io_npc_data' ].join("");
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
