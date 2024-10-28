let url = new URL(location.href);
if (url.searchParams.get('token') === null) { txt.innerHTML = "Link not end ?token="; }

let socket = io('wss://socket10.donationalerts.ru:443', {
    reconnection: true,
    reconnectionDelayMax: 5000,
    reconnectionDelay: 1000,
});
socket.on('connect', (msg) => {
    console.log('WS: connected');
    socket.emit('add-user', { token: url.searchParams.get('token'), type: 'minor' });
});
socket.on('connect_timeout', (msg) => console.log('WS: connection_timeout'));
socket.on('reconnect', (msg) => console.log('WS: reconnected'));
socket.on('donation', (msg) => {
    pars_msg = JSON.parse(msg);
    console.log(pars_msg);
    if (parseInt(pars_msg.alert_type) == 1 &&
        parseInt(pars_msg.amount) >= 66) {
        boo.arr.push(pars_msg.username || `Anonym`)
        grave.run()
    }
});


let nik = {
    set(neme) { txt.innerHTML = neme },
    clear() { txt.innerHTML = '' }
}

let boo = {
    arr: [],
    active() { ghost.classList.add("active") },
    noActive() { ghost.classList.remove("active") }
};

let grave = {
    active() { tomb.classList.add("donat") },
    noActive() { tomb.classList.remove("donat") },
    run() {
        grave.active()
        app.timeOut(grave.noActive, 1e3)
    },
};

let app = {
    timeOut(callback, time) { setTimeout(callback, parseInt(time)); },
    random(min, max) {
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor(min + Math.random() * (max + 1 - min))
    },
    watcher() { this.timeOut(this.run, this.random(5e4, 18e4)) },
    playAudio() { new Audio('./assets/song/' + this.random(1, 18) + '.mp3').play() },
    run() {
        if (boo.arr.length != 0) {
            nik.set(boo.arr[0])
            boo.active()
            app.timeOut(boo.noActive, 6e3)
            app.timeOut(nik.clear, 6e3)
            app.playAudio()
            boo.arr.shift()
            console.log(boo.arr)
        }
        app.watcher()
    },
    test() {
        grave.run()
        nik.set("Test")
        boo.active()
        app.timeOut(boo.noActive, 6e3)
        app.timeOut(nik.clear, 6e3)
        app.playAudio()
    }
};

app.run()

window.addEventListener("click", app.test); 