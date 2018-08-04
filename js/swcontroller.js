if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('cacheWorker.js', {scope: "/"}).then(function(reg) {
    // navigator.serviceWorker.register('zalupa.js', {scope: '/'}).then(function(reg) {
        console.log('Registration OK');
    })
    .catch(function(err) {
        console.log('Registration of serviceWorker is failed: ', err);
    });
}
