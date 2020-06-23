import { useDispatch } from 'reactn';

// Global reducer functions
export function setLedSetting(key, newState) {
    const setLedSettingFun = useDispatch("setLedSetting");
    return setLedSettingFun(key, newState);
}

export function getLedSettings(key, newState) {
    const getLedSettingsFun = useDispatch("getLedSettings");
    return getLedSettingsFun();
}