const logger = require('./logger');
const { execSync } = require('child_process');

class Sync {
  constructor(payload) {
    this.options = {
      cwd: `repos/${payload.repository.full_name}`,
      env: {
        repo: `repos/${payload.repository.full_name}`,
        name: payload.commits[0].author.name,
        email: payload.commits[0].author.email,
      },
    };
  }

  shell(commands) {
    try {
      logger.log(execSync(commands, this.options).toString());
    } catch (err) {
      logger.error(err);
    }
  }

  exec() {
    this.shell('git config user.email "$email"');
    this.shell('git config user.name "$name"');
    this.shell('git pull origin master --rebase');
    this.shell('git svn rebase');
    this.shell('git svn dcommit --add-author-from');
  }
}

module.exports = Sync;

// const wrapper = (commands) => {
//   try {
//     log(execSync(commands, options).toString())
//   } catch (err) {
//     log(err)
//   }
// }
//
// const options = {
//   cwd: `repos/${payload.repository.full_name}`,
//   env: {
//     repo: `repos/${payload.repository.full_name}`,
//     name: payload.commits[0].author.name,
//     email: payload.commits[0].author.email,
//   }
// }
//
// const sync = (payload) => {
//   wrapper('git config user.email "$email"', options)
//   wrapper('git config user.name "$name"', options)
//   wrapper('git pull origin master --rebase', options)
//   wrapper('git svn rebase', options)
//   wrapper('git svn dcommit --add-author-from', options)
// }
