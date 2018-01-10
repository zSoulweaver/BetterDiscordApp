const 
    path = require('path'),
    fs = require('fs');

class Utils {

    static async tryParseJson(jsonString) {
        try {
            return JSON.parse(jsonString);
        }catch(err) {
            throw ({
                'message': 'Failed to parse json',
                err
            });
        }
    }

    static get timestamp() {
        return 'Timestamp';
    }

}

class FileUtils {

    static async fileExists(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if(err) return reject({
                    'message': `No such file or directory: ${err.path}`,
                    err
                });

                if(!stats.isFile()) return reject({
                    'message': `Not a file: ${path}`,
                    stats
                });

                resolve();
            });
        });
    }

    static async directoryExists(path) {
        return new Promise(resolve => {
            fs.stat(path, (err, stats) => {
                if(err) return reject({
                    'message': `Directory does not exist: ${path}`,
                    err
                });

                if(!stats.isDirectory()) return reject({
                    'message': `Not a directory: ${path}`,
                    stats
                });

                resolve();
            });
        });
    }

    static async readFile(path) {
        try {
            await this.fileExists(path);
        } catch(err) {
            throw(err);
        }

        return new Promise(resolve => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) reject({
                    'message': `Could not read file: ${path}`,
                    err
                });

                resolve(data);
            });
        });
    }

    static async readJsonFromFile(path) {
        let readFile;
        try {
            readFile = await this.readFile(path);
        } catch(err) {
            throw(err);
        }

        try {
            const parsed = await Utils.tryParseJson(readFile);
            return parsed;
        } catch(err) {
            throw(Object.assign(err, { path }));
        }
    }
}

module.exports = {
    Utils,
    FileUtils
}