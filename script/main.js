(function(window) {
    'use strict';


    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var Validation = App.Validation;
    var RemoteDataStore = App.RemoteDataStore;


    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);






    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var Validation = App.Validation;
    var RemoteDataStore = App.RemoteDataStore;
    var remoteDS = new RemoteDataStore(SERVER_URL);


    var myTruck = new Truck('ncc-1701', remoteDS);


    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));




    window.myTruck = myTruck;


    formHandler.addSubmitHandler(
        function(data) {
            console.log(formHandler);
            return myTruck.createOrder.call(myTruck, data)
                .then(function() {
                    checkList.addRow.call(checkList, data);
                }, function() {
                    alert('Server unreachable. Try again later.');
                });
        });

    formHandler.addInputHandler(Validation.isInstitutionEmail);
    myTruck.printOrders(checkList.addRow.bind(checkList));




})(window);