let timestamp = 9999;
setInterval(() => {
    if (timestamp > 0) {
        timestamp = timestamp - 1;
    }
    document.getElementById("preview").innerHTML = format_time(timestamp);
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

let css = {};
let fonts = ["Montez", "Lobster", "Josefin Sans", "Shadows Into Light", "Pacifico", "Amatic SC", "Orbitron", "Rokkitt", "Righteous", "Dancing Script", "Bangers", "Chewy", "Sigmar One", "Architects Daughter", "Abril Fatface", "Covered By Your Grace", "Kaushan Script", "Gloria Hallelujah", "Satisfy", "Lobster Two", "Comfortaa", "Cinzel", "Courgette"];
let string = "";
let select = document.getElementById("font-selector");
let color = document.getElementById("color");
let size = document.getElementById("size");
let preview = document.getElementById("preview");

WebFont.load({
    google: {
        families: fonts
    }
});
for (font in fonts) {
    let opt = document.createElement('option');
    opt.value = opt.innerHTML = fonts[font];
    opt.style.fontFamily = fonts[font];
    select.add(opt);
}



function fontSet() {
    preview.style.fontFamily = select.value;
}


color.value = "rgba(255,255,255,1)"; //fix

function colorSet() {
    preview.style.color = color.value;
}

function sizeSet() {
    preview.style.fontSize = size.value + 'px';
    preview.style.lineHeight = size.value + 'px';
}






function encode(arr) {
    let str = JSON.stringify(arr);
    let encoded = window.btoa(str);
    console.log(encoded)
    return encoded;
}

function give() {
    document.querySelector('#encoded').value = ``;

    getForms()
    document.querySelector('#encoded').value = '?css='+encode(css);
    document.querySelector('#encoded').select();
    document.execCommand("copy");
}


function getForms() {
    css = {
        "color": color.value,
        "font": select.value,
        "size": size.value + 'px'
    };
}
