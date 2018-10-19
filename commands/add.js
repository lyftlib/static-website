const { writeFile } = require('fs');

const { filter, clone, withError, getStatePath } = require('../src/utils');

// Exports the add command for the Github module
module.exports = {
    // Defines all parameters allowed for this command in the cli
    cli : [
        '[--policy]',
    ],
    // Map object used to get only parameters required for this command
    // Interpretation into github-api syntax
    args : {
        '--policy': 'path',
    },
    // The default filter
    filter,
    method(options) {
        const api = require('../src/aws-s3');
        // If the user uses the flag --repo-name to rename his repository
        options.name = options.repoName ? options.repoName : options.name;
        const mustClone = options.clone;
        const localName = options.localName;

        // Deletes all keys whom not needed by the function createRepo
        delete options.clone;
        delete options.localName;
        delete options.repoName;

        // Uses the github-api to create the repo
        api.getUser().createRepo(options)
        .then(response => {
            // The name of the resource provided by the user
            response.data.localName = localName;
            // Writes a file named state.json to keep all data of the new repository.
            // These data will be used to manage the repository by the other commands of this module
            writeFile(getStatePath(localName), JSON.stringify(response.data), error => {
                if (error) withError(error);
                console.log(`Repository ${options.name} created`);

                // If the flag --clone is provided
                if (mustClone) {
                    try {
                        clone(response.data['clone_url'], localName);
                    } catch (error) {
                        withError(error);
                    }
                }
            });
        })
        .catch(withError);
    }
};