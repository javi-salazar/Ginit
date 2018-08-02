/**
 Command line user interaction

 Prompt user for their github credentials.

 Inquirer includes a number of methods for various types of prompts, which are roughly analogous to HTML controls. In
 order to collect user's Github username and password, we're going to use the input and password types respectively.
 **/

const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your Github username or e-mail address: ',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your username or e-mail address.'
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password: ',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your password.'
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository: ',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for the repository.';
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Optionally enter a description for the repository: '
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or Private: ',
                choices: ['Public', 'Private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    },
    askIgnoreFiles: (filelist) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folder you wish to ignore: ',
                choices: filelist,
                default: ['node_modules', 'bower_components']
            }
        ];
        return inquirer.prompt(questions);
    },
}
