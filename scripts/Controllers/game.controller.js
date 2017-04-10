/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('GameController', function($scope, $window,
		equipmentSlotService, elementService, itemService, itemSynchronousService,
		modifierSynchronousService,
		/*basicAttributeService, basicElementService,*/ $q, $http) {
    $scope.newEntity = {
        name: "",
        description: "",
        code: ""
    };
    $scope.create = function() {
        console.log($scope.newEntity);
        if ($scope.entities.length > 0) {
            var msg = findEntity($scope.newEntity, $scope.entities);
            if (msg.length > 0) {
                $window.alert(msg);
            } else {
                postEntity();
                postElementEntity($scope.newEntity.name);
            }
        } else {
            postEntity();
            postElementEntity($scope.newEntity.name);
        }
    };
    $scope.update = function() {
        var found = "";
        console.log("UPDATE::");
        console.log($scope.entitySelect);
        for (var i = $scope.entities.length - 1; i >= 0; i--) {
            if ($scope.entities[i].id != $scope.entitySelect.id) {
                if ($scope.entities[i].name === $scope.entitySelect.name) {
                    found = "An attribute with that name already exists";
                    break;
                }
                if ($scope.entities[i].description === $scope.entitySelect.description) {
                    found = "An attribute with that description already exists";
                    break;
                }
                if ($scope.entities[i].code === $scope.entitySelect.code) {
                    found = "An attribute with that code already exists";
                    break;
                }
            }
        }
        if (found.length > 0) {
            $window.alert(found);
        } else {
            putEntity();
        }
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].name === entity.name) {
                found = "An attribute with that name already exists";
                break;
            }
            if (entities[i].description === entity.description) {
                found = "An attribute with that description already exists";
                break;
            }
            if (entities[i].code === entity.code) {
                found = "An attribute with that code already exists";
                break;
            }
        }
        return found;
    };
    var getAllEntities = function() {        
        var promise = basicAttributeService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = response.data;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.entities[i].id)) {
                        $scope.entities[i].id = 0;
                        break;
                    }
                }
            }
        });
    };
    /**
     * Posts an entity to the REST service.
     */
    var postEntity = function() {
        var promise = basicAttributeService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                $scope.newEntity.code = "";
                getAllEntities();
            }
        });
    };
    var postElementEntity = function(name) {
        var s = [];
        s.push("ELEMENT_");
        s.push(name.toUpperCase().replace(/\./g, "").replace(/ /g, "_"));
        s = s.join("");
        console.log("NEW ELEMENT::"+s);
        var promise = basicElementService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                var elements = response.data;
                console.log("ELEMENT LIST");
                console.log(elements);
                var found = false;
                var lastValue = -1;
                for (var i = elements.length - 1; i >= 0; i--) {
                    if (elements[i].code === s) {
                        found = true;
                    }
                    if (angular.isUndefined(elements[i].value)) {
                        elements[i].value = 0;
                    }
                    lastValue = Math.max(lastValue, elements[i].value);
                }
                lastValue++;
                if (!found) {
                    console.log("POST ELEMENT::"+s+","+lastValue);
                    console.log(elements);
                    var elPromise = basicElementService.insertEntity({
                        code: s,
                        value: lastValue
                    });
                    elPromise.then(function(response) {
                        console.log("INSERT ELEMENT::");
                        console.log(response);
                        if (response.status === 200) {
                            $window.alert("Created associated element " + s);
                        } else {                            
                            $window.alert("Unable to create associated element see console for details");
                            console.error(response);
                        }
                    });
                }
            }
        });
        
    };
    var putEntity = function() {
        console.log("POST::");
        console.log($scope.entitySelect);
        var promise = basicAttributeService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                $scope.newEntity.code = "";
                getAllEntities();
            }
        });
    };
    var getElementEntity = function(code) {        
        var promise = basicElementService.getByCode(code);
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.associatedElement = response.data;
            }
        });
    };
    var loadAll = function() {
        var promise1 = equipmentSlotService.getEntities();
        promise1.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                var list = response.data;
                for (var i = list.length - 1; i >= 0; i--) {
                    if (angular.isUndefined(list[i].id)) {
                    	list[i].id = 0;
                    }
                    if (angular.isUndefined(list[i].value)) {
                    	list[i].value = 0;
                    }
                    FFEquipmentSlots.values.push(new FFEquipmentSlots(list[i].name, list[i].value));
                }
            }
        });
        var promise2 = elementService.getEntities();
        promise2.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                var list = response.data;
                for (var i = list.length - 1; i >= 0; i--) {
                    if (angular.isUndefined(list[i].id)) {
                    	list[i].id = 0;
                    }
                    if (angular.isUndefined(list[i].value)) {
                    	list[i].value = 0;
                    }
                    FFEquipmentElements.values.push(new FFEquipmentElements(list[i].code, list[i].value));
                }
            }
        });
        $q.all([promise1, promise2]).then(function(){
            // yes, this only runs after all of the promises fulfilled
            init();
        });
    };
    var init = function() {
    	/** the list of attributes and their matching names and modifiers. */
    	FFCharacter.attributeMap = [
    	        [ "ST", "Stamina", FFEquipmentElements.valueOf("ELEMENT_STAMINA").getIndex() ],
    	        [ "MST", "Max Stamina", FFEquipmentElements.valueOf("ELEMENT_MAX_STAMINA").getIndex() ],
    	        [ "SK", "Skill", FFEquipmentElements.valueOf("ELEMENT_SKILL").getIndex() ],
    	        [ "MSK", "Max Skill", FFEquipmentElements.valueOf("ELEMENT_MAX_SKILL").getIndex() ],
    	        [ "LK", "Luck", FFEquipmentElements.valueOf("ELEMENT_LUCK").getIndex() ],
    	        [ "MLK", "Max Luck",  FFEquipmentElements.valueOf("ELEMENT_MAX_LUCK").getIndex() ],
    	        [ "DMG", "Damage", FFEquipmentElements.valueOf("ELEMENT_DAMAGE").getIndex() ]
    	];
        var o = new FFController();
        ProjectConstants.setInstance(o);
        o = new FFInteractive();
        console.log(o);
        Interactive.setInstance(o);
        Interactive.getInstance().itemSynchronousService = itemSynchronousService;
        Interactive.getInstance().modifierSynchronousService = modifierSynchronousService;
        o = new FFScript();
        Script.setInstance(o);
        o = new FFSpeech();
        Speech.setInstance(o);
        //new FFSpellController();
        //new FFText();
        //new FFGUI();
        //new Combat();
        Interactive.getInstance().newHero();
    };
    //getAllEntities();
    loadAll();
});