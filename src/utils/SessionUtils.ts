export const getSessionValue = (key: string, defaultValue: (string | null) = ''): (string | null) => {
    return sessionStorage.getItem(key) || defaultValue;
}

export const setSessionValue = (key: string, value: string | number): void => {
    return sessionStorage.setItem(key, value.toString());
}

export const removeSessionValue = (key: string): void => {
    return sessionStorage.removeItem(key);
}

export const toNumber = (value: (string | null)) => {
    return value ? parseInt(value) : null;
}