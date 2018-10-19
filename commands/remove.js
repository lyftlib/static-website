const { withError, getRepoName, getStatePath } = require("../src/utils");

// Exports the remove command for the Github module
module.exports = {
  method(p_name) {
    const api = require("../src/");

    // Gets the repository and deletes it.
    // api.getRepo(process.env.LYFTPV_GITHUB_USERNAME, getRepoName(getStatePath(name))).deleteRepo()
    // .catch(() => withError('The repository does not exist or is already deleted'))
    // .then(() => {
    //     console.log(`Repository deleted`);
    // });
    aws.config.loadFromPath(
      require("path").join(__dirname, "../aws-config.json")
    );
    var s3 = new aws.S3();

    var params = {
        Bucket: p_name
      };
      s3.deleteBucket(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
  }
};
