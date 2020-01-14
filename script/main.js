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

    var firebaseConfig = {
        apiKey: "AIzaSyCVONnhVNunjc2dnRair1RTNeetvxj6gd8",
        authDomain: "coffee-shop-32af1.firebaseapp.com",
        databaseURL: "https://coffee-shop-32af1.firebaseio.com",
        projectId: "coffee-shop-32af1",
        storageBucket: "coffee-shop-32af1.appspot.com",
        messagingSenderId: "767988509163",
        appId: "1:767988509163:web:13221a7e7e79b065db91ae",
        measurementId: "G-62DT187RN6"
    };

    var FIREBASE_COLLECTION_NAME = 'coffeerunAuth';
    var username = 'abc@google.com';
    var password = 'password123';



    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);


    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var Validation = App.Validation;
    var RemoteDataStore = App.RemoteDataStore;
    var FirebaseDataStore = App.FirebaseDataStore;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var firebaseDS = new FirebaseDataStore(firebaseConfig, FIREBASE_COLLECTION_NAME);


    var myTruck = new Truck('ncc-1701', firebaseDS);


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
        }
    );

    formHandler.addInputHandler(Validation.isInstitutionEmail);

    window.addEventListener("beforeunload", function() {
        firebaseDS.userSignOut();
    });

    firebaseDS.userSignIn(username, password)
        .then(firebaseDS.onUserSignedIn(function() {
            myTruck.printOrders(checkList.addRow.bind(checkList));
        }));

    document.querySelector('[data-coffee-button="SignUp"]').addEventListener('click', function(event) {
        console.log("SignUP");
        var signUpUserEmail = prompt('Please input email to Sign Up: ');
        var signUpPassword = prompt('Please input password to Sign Up: ');

        if (signUpUserEmail === null || signUpPassword === null) {
            return;
        }

        firebaseDS.auth().createUserWithEmailAndPassword(signUpUserEmail, signUpPassword)
            .then(function() {
                console.log('Sign UP Successfully.');
            })
            .catch(function(error) {
                console.log(`${error.code} : ${error.message}`);
                alert(`${error.message }`)
            });
    })


    document.querySelector('[data-coffee-button="SignIn"]').addEventListener('click', function(event) {
        console.log("SignIN");
        var email = propmt('Please input email to Sign In: ');
        var password = prompt('Please input password to Sign In: ');

        if (email === null || password === null) {
            return;
        }

        firebaseDS.userSignIn(email, password)
            .then(function() {
                console.log('Sign IN Successfully.');
            })
            .catch(function(error) {
                console.log(`${error.code} : ${error.message}`);
                alert(`${error.message }`)
            });
    })

    document.querySelector('[data-coffee-button="SignOut"]').addEventListener('click', function(event) {
        console.log("SignOUT");

        firebaseDS.userSignOut()
            .then(function() {
                console.log('Sign Out Successfully.');

            })
            .catch(function(error) {
                console.log(`${error.code} : ${error.message}`);
                alert(`${error.message }`)
            });
    })


})(window);