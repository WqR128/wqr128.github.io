let timestamp, donations = [],
    css = {},
    currency = {
        "1": { // 10р 1 min
            "modifier": 6,
            "action": 1
        },
        "4": { // new sub
            "modifier": 600,
            "action": 2
        }
    };

if (window.location.search) {
    getSeting()
}

function getSeting() {
    let url = new URL(location.href);
    if (url.searchParams.get('reset') != null) {
        if (url.searchParams.get('reset') == 'all') {
            console.log('reset all');
            return localStorage.clear();
        }
        console.log('reset');
        return localStorage.setItem("timestamp", '0');
    }
    if (url.searchParams.get('set') != null) {
        console.log('set');
        setTimestamp(url.searchParams.get('set'))
    }

    if (url.searchParams.get('token') != null) {
        console.log('token');
        setToken(url.searchParams.get('token'))
    }
    if (url.searchParams.get('currency') != null) {
        console.log('currency');
        setСurrency(url.searchParams.get('currency'))
    }
    if (url.searchParams.get('css') != null) {
        console.log('css');
        setCss(url.searchParams.get('css'))
    }

}

function setСurrency(currencyGetParams) {
    let decoded = window.atob(currencyGetParams);
    currency = JSON.parse(decoded);
    console.log('currency');
    return localStorage.setItem("currency", decoded);
}

function setCss(cssGetParams) {
    let decoded = window.atob(cssGetParams);
    console.log(decoded);
    css = JSON.parse(decoded);
    console.log('css');
    return localStorage.setItem("css", decoded);
}





timestamp = localStorage.getItem("timestamp");

if (localStorage.getItem("currency")) {
    currency = JSON.parse(localStorage.getItem("currency"));
}

if (localStorage.getItem("css")) {
    css = JSON.parse(localStorage.getItem("css"));
    cssRender()
}

function cssRender() {
    let h1Timet = document.getElementById("timer");

    WebFont.load({
        google: {
            families: [css.font]
        }
    });
    h1Timet.style.fontFamily = css.font;
    h1Timet.style.color = css.color;
    h1Timet.style.fontSize = css.size;
    h1Timet.style.lineHeight = css.size;
}

function setTimestamp(newSetTime) {
    let newTime;
    if (newSetTime.indexOf(':') > -1) {
        newSetTime = newSetTime.split(`:`);
        if (newSetTime.length == 2) {
            newSetTime.push("0");
        }
        newTime = (parseInt(newSetTime[0], 10) * 3600) + (parseInt(newSetTime[1], 10) * 60) + parseInt(newSetTime[2], 10);
    } else {
        newTime = (parseInt(newSetTime, 10) * 60);
    }
    timestamp = newTime + 1;
    localStorage.setItem("timestamp", timestamp);
    console.log(newTime);

}

setInterval(() => {
    if (timestamp > 0) {
        timestamp = timestamp - 1;
        localStorage.setItem("timestamp", timestamp);
    }
    document.getElementById("timer").innerHTML = format_time(timestamp);
}, 1000);


function format_time(timestamp) {
    let hours = Math.floor(timestamp / 60 / 60),
        minutes = Math.floor(timestamp / 60) - (hours * 60),
        seconds = timestamp % 60;

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
}

function setLocalConfig(config) {
    localStorage.setItem("config ", config);
}

function getLocalConfig() {
    localStorage.getItem("config");
}


function setToken(newToken) {
    localStorage.setItem("token", newToken);
}

function getLocalToken() {
    return localStorage.getItem("token");
}

let socket = io("wss://socket.donationalerts.ru:443");
socket.emit('add-user', {
    token: getLocalToken(),
    type: "minor"
});

socket.on('donation', function(msg) {
    pars_msg = JSON.parse(msg);
    data = {
        alert_type: parseInt(pars_msg.alert_type),
        username: pars_msg.username,
        message: pars_msg.message,
        amount: pars_msg.amount,
        currency: pars_msg.currency
    }
    donations.push(data)
    console.log(data);
    console.log(donations.length)
});


let watcher = setInterval(() => {
    if (donations.length != 0) {
        if (currency[donations[0].alert_type]) {
            switch (currency[donations[0].alert_type].action) {
                case 1:
                    timestamp = timestamp + (parseInt(donations[0].amount) * currency[donations[0].alert_type].modifier);
                    break;
                case 2:
                    timestamp = timestamp + parseInt(currency[donations[0].alert_type].modifier);
                    break;
                default:
                    console.log("error action");
            }
        }
        donations.shift()
    }
}, 2000);