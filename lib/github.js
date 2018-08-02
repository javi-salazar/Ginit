/**
 Access token management

 Retrieve OAuth token from the GitHub API.
 Use configstore to save the OAuth token for subsequent requests.

 On Mac OS / Linux the configstore file is found in /Users/[USERNAME]/.config/configstore/ginit,json
 **/

const octokit = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name);

/**
 * Now let’s add the function that checks whether we’ve already got an access token. We’ll also add a function that
 * allows other libs to access octokit(GitHub) functions
 */

module.exports = {
    getInstance: () => {
        return octokit;
    },
    setGithubCredentials: async () => {
        const credentials = await inquirer.askGithubCredentials();
        octokit.authenticate(
            _.extend(
                {
                    type: 'basic',
                },
                credentials
            )
        );
    },
    getStoredGithubToken: () => {
      return conf.get('github.token');
    },
    registerNewToken: async () => {
        const status = new Spinner('Authenticating you, please wait...');
        status.start();

        try {
            const response = await octokit.authorization.create({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginits, the command-line tool for initializing Git repos'
            });
            const token = response.data.token;
            if (token) {
                conf.set('github.token', token);
                return token;
            } else {
                throw new Error('Missing Token', 'GitHub token was not found in the response');
            }
        } catch (e) {
            throw e;
        } finally {
            status.stop();
        }
    },
    githubAuth: (token) => {
        octokit.authenticate({
            type: 'oauth',
            token: token
        });
    },
}