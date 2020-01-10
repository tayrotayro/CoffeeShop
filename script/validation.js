(function(window) {
    'use strict;'
    var App = window.App || {};

    var Validation = {
        isInstitutionEmail: function(email) {
            return /.+@(go\.)?olemiss\.edu$/.test(email);
        }

    };

    App.Validation = Validation;
    window.App = App;
})(window);