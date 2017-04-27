var socket ;

function initialize() {
    socket = io('ws://localhost:3000');
    var btn_getcountries = document.getElementById('btn-getWebsocket');
    btn_getcountries.addEventListener('click', wsRequest);
    socket.on('connect', function() {
        console.log('WebSocket connected to Server');
    });
    socket.on('RESULT', function(msg) {
        console.log('Serveur dit : ' + msg);
        document.getElementById('liste_countries').value = msg;
    });
}

function wsRequest() {
    socket.emit('GET', 'Countries');
}

window.load = initialize();
