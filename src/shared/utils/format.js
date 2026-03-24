import { debounce, capitalize } from 'lodash-es';

export const debouncedLog = debounce((message) => {
    console.log(message);
}, 300);

export const formatUserName = (name) => {
    return capitalize(name);
};

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
