(function(window) {
    'use strict';
    var App = window.App || {};
    var LOCAL_DATA_PROPERTIES = ['coffee', 'emailAddress', 'flavor', 'size', 'strength'];


    function FirebaseDataStore(firebaseConfig, collectionName) {
        if (!firebaseConfig) {
            throw new Error('No firebase config supplied.');
        }

        firebase.initializeApp(firebaseConfig);

        this.collectionRef = firebase.firestore().collection(collectionName);


    }

    function firestoreDataToLocalData(firestoreData) {
        let localData = {};

        LOCAL_DATA_PROPERTIES.forEach((property) => {
            localData[property] = firestoreData.get(property);
        });

        return localData;

    }


    FirebaseDataStore.prototype.add = function(key, val) {
        console.log(val);
        return this.collectionRef.doc(key).set(val);
    };


    FirebaseDataStore.prototype.get = function(key, cb) {
        return this.collectionRef.doc(key).get().then((dataItem) => {
            let data = firestoreDataToLocalData(dataItem);

            if (cb) {
                console.log(data);
                cb(data);
            }

            return data;

        });
    };

    FirebaseDataStore.prototype.getAll = function(cb) {
        return this.collectionRef.get().then((query) => {
            let allData = {};

            query.forEach((dataItem) => {
                allData[dataItem.get('emailAddress')] = firestoreDataToLocalData(dataItem);
            });

            return allData;
        });
    };


    FirebaseDataStore.prototype.remove = function(key) {
        return this.collectionRef.doc(key).delete();
    };


    FirebaseDataStore.prototype.userSignIn = function(username, password) {
        return firebase.auth().signInWithEmailAndPassword(username, password);
    };


    FirebaseDataStore.prototype.userSignOut = function() {
        return firebase.auth().signOut();
    };


    FirebaseDataStore.prototype.onUserSignedIn = function(cb) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user.email + ' logged in.');
                document.getElementById('Up').disabled = true;
                document.getElementById("In").disabled = true;
                document.getElementById("Out").disabled = false;
                document.getElementById("submit").disabled = false;
                cb();
            } else {
                console.log('No user logged in.');
                document.getElementById("Out").disabled = true;
                document.getElementById('Up').disabled = false;
                document.getElementById("In").disabled = false;
                document.getElementById("submit").disabled = true;

            }
        });
    };



    App.FirebaseDataStore = FirebaseDataStore;
    window.App = App;
})(window);