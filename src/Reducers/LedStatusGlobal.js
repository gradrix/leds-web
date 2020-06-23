import { addReducer, setGlobal } from 'reactn';

// Initial state
setGlobal({
    isOn: null,
    brightness: 0,
    mode: 0,
    toggle: 0,
    speed: 0,
});

// Reducers
let receivingStatusData = false;
addReducer('getLedSettings', (global, dispatch) => {
        var result = {};

        if (receivingStatusData === true) return;
        receivingStatusData = true;
 
        fetch("/api/status/")
            .then(response => response.json())
            .then(data => result = data)
            .catch(error => result.isOn = null)

        receivingStatusData = false;
        return result;
    }
);

addReducer('setLedSetting', (global, dispatch, key, value) => {
    var result = {};
    var objToSend = {}
    objToSend[key] = value;

    fetch("/api/"+key+"/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objToSend)
    })
        .then(response => response.json())
        .then(data => result = data)
        .catch(error => result.isOn = null)

    return result;
});