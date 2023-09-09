import chalk from 'chalk';

import dedent from 'dedent-js';
const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (error) => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + error);
}

const printHelp = () => {
    console.log(`
        ${chalk.bgCyan(' HELP ')}
        No parameters - weather output
        -c [CITY] to set the city
        -h to display help
        -t [API_KEY] to save the token
    `)
}


const printWeather = (res,icon) => {
    console.log(
        dedent`${chalk.bgYellow('WEATHER')} Weather in the city ${res.name}
        ${icon}  ${res.weather[0].description}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}%
        Wind speed: ${res.wind.speed}

        `
    )
}

export { printSuccess, printError, printHelp, printWeather };