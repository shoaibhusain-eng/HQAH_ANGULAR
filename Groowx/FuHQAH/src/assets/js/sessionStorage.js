(function () {

    if (!sessionStorage.length) {
        // Ask other tabs for session storage
        localStorage.setItem('storageSession', Date.now());
    };

    window.addEventListener('storage', function (event) {

        //console.log('storage event', event);

        if (event.key == 'storageSession') {
            // Some tab asked for the sessionStorage -> send it

            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');

        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // sessionStorage is empty -> fill it

            var data = JSON.parse(event.newValue),
                value;

            for (key in data) {
                sessionStorage.setItem(key, data[key]);
            }

            // showSessionStorage();
        }
    });

    window.onbeforeunload = function () {
        //sessionStorage.clear();
    };

})();

// // transfers sessionStorage from one tab to another
// var sessionStorage_transfer = function (event) {
//     if (!event) { event = window.event; } // ie suq
//     if (!event.newValue) return;          // do nothing if no value to work with
//     if (event.key == 'getSessionStorage') {
//         // another tab asked for the sessionStorage -> send it
//         localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
//         // the other tab should now have it, so we're done with it.
//         localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
//     } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
//         // another tab sent data <- get it
//         var data = JSON.parse(event.newValue);
//         for (var key in data) {
//             sessionStorage.setItem(key, data[key]);
//         }
//     }
// };

// // listen for changes to localStorage
// if (window.addEventListener) {
//     window.addEventListener("storage", sessionStorage_transfer, false);
// } else {
//     window.attachEvent("onstorage", sessionStorage_transfer);
// };


// // Ask other tabs for session storage (this is ONLY to trigger event)
// if (!sessionStorage.length) {
//     localStorage.setItem('getSessionStorage', 'foobar');
//     localStorage.removeItem('getSessionStorage', 'foobar');
// };