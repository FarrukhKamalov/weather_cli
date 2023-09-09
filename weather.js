#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from './services/storage.service.js';
const saveToken = async (token) => {
    if (!token.length) {
        printError('token not transferred')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved!');
    } catch (error) {
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('city not transferred')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved!');
    } catch (error) {
        printError(error.message);
    }
}





const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon))
        
    } catch (error) {
        if(error?.response?.status == 404){
            printError(`Not found City`)
        }else if(error?.response?.status == 401){
            printError('Not found Token')
        }else{
            printError(error.message)
        }
    }
   
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        // help
        printHelp()
    }
    if (args.c) {
        // save city
        saveCity(args.c)
    }
    if (args.t) {
        // save token
        return saveToken(args.t)
    }
    return getForcast()
}

initCLI()