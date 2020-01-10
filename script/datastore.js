(function(window) {
    'use strict';

    var App = window.App || {};
    var Promise = window.Promise;


    function DataStore() {
        console.log('Runnin the DataStore function');

        this.data = {}
    }

    function promiseResolvedWith(value) {
        var promise = new Promise(function(resolve, reject) {
            resolve(value);
        });
        return promise;
    }


    DataStore.prototype.add = function(key, val) {
        this.data[key] = val;
        return promiseResolvedWith(null);

    };

    DataStore.prototype.get = function(key) {
        console.log(this.data)
        return this.data[key];
    };

    DataStore.prototype.getAll = function() {
        console.log(this.data)
        return this.data;
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key];
    };



    App.DataStore = DataStore;
    window.App = App;

})(window);