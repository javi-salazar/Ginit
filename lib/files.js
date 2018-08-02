/**
 Basic file management

 Get the current directory (to get default repo name)

 Check wether a directory exists (to determine wether the current foler is already a git repository by looking for a
 folder names .git
 **/

const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase : () => {
        return path.basename(process.cwd());
    },

    directoryExists : (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    }
};