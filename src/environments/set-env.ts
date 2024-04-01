const setEnvDev = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    const targetPath = './src/environments/environment.ts';
    require('dotenv').config({
        path: '.env',
    });
    const envConfigFile = `export const environment = {
        RAZOR_PAY_API_KEY: '${process.env.RAZOR_PAY_API_KEY}',
        production: false,
        api: 'http://localhost:8000/api',
    };`;
    writeFile(targetPath, envConfigFile, (err: any) => {
        if (err) {
            console.error(err);
            throw err;
        }
    });
};

const setEnvProd = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
    const targetPath = './src/environments/environment.prod.ts';
    require('dotenv').config({
        path: '.env',
    });
    const envConfigFile = `export const environment = {
        RAZOR_PAY_API_KEY: '${process.env.RAZOR_PAY_API_KEY}',
        production: true,
        api: '${process.env.API_END_POINT}'
    };`;
    writeFile(targetPath, envConfigFile, (err: any) => {
        if (err) {
            console.error(err);
            throw err;
        }
    });
};

setEnvDev();
setEnvProd();
