    let currency = {},
        formNeme = [{
                "title": "Donations",
                "alert_type": "1"
            }, {
                "title": "Twitch subscribers",
                "alert_type": "4"
            }, {
                "title": "Twitch followers",
                "alert_type": "6"
            }, {
                "title": "Twitch Bits",
                "alert_type": "11"
            }, {
                "title": "Custom alerts",
                "alert_type": "12"
            }, {
                "title": "Twitch gifted subscriptions",
                "alert_type": "13"
            }, {
                "title": "Twitch gifted subscriptions paid upgrade",
                "alert_type": "14"
            }, {
                "title": "Twitch Prime subscriptions",
                "alert_type": "15"
            }, {
                "title": "Twitch channel gifted subscriptions",
                "alert_type": "16"
            }, {
                "title": "Twitch Raids",
                "alert_type": "17"
            }, {
                "title": "Twitch Hosts",
                "alert_type": "18"
            }, {
                "title": "Twitch Channel Points",
                "alert_type": "19"
            }

        ];
    document.querySelector('#encoded').value = ``;

    function encode(arr) {
        let str = JSON.stringify(arr);
        let encoded = window.btoa(str);
        console.log(encoded)
        return encoded;
    }

    function give() {
        document.querySelector('#encoded').value = ``;

        getForms()
        document.querySelector('#encoded').value = '?currency=' + encode(currency);
        document.querySelector('#encoded').select();
        document.execCommand("copy");
    }


    function getForms() {

        [...document.querySelectorAll('.form')].map(e => {
            alert_type = parseInt(e.getElementsByTagName("input")[0].value);
            modifier = parseInt(e.getElementsByTagName("input")[1].value);
            action = parseInt(e.getElementsByTagName("select")[0].value);
            if (modifier != 0) {
                currency[alert_type] = {
                    "modifier": modifier,
                    "action": action
                };
            }
        });
        console.log(currency)
    }


    function render() {
        formNeme.map(e => {
            console.log(e)
            console.log(e.title)
            console.log(e.alert_type)
            document.querySelector('.wrap').innerHTML += `
            <div class="frame">
            <div class="bit-2">
                <h1>${e.title} </h1>
            </div>
            <div class="bit-2 form">
                <input id="alert_type" type="text" placeholder="alert_type" value="${e.alert_type}" readonly hidden />
                <input id="modifier" type="number" min="0" placeholder="modifier" value="0" />
                <select name="action">
                    <option value="1" >multiplication</option>
                    <option value="2">addition</option>
            </div> </div>`;

        });

    }

    render()
