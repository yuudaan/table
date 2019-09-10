const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const gitRemoteOriginUrl = require('git-remote-origin-url');

function getCurrentBranchName(p = process.cwd()) {
    const gitHeadPath = `${p}/.git/HEAD`;

    return fs.existsSync(p) ?
        fs.existsSync(gitHeadPath) ?
            fs.readFileSync(gitHeadPath, 'utf-8').trim().split('/')[2] :
            getCurrentBranchName(path.resolve(p, '..')) :
        false;
}

const BranchToUrl = {
    master: 'http://odyssey-plugin.dev.gaoding.com:7070',
    release: 'http://odyssey-plugin.dev.gaoding.com:7070',
    dev: 'http://odyssey-plugin.dev.gaoding.com:7070',
};

async function main() {

    const branch = getCurrentBranchName();
    if (!BranchToUrl[branch]) {
        throw new Error('Current branch is not a branch to release.');
    }

    execSync('bash ./scripts/deploy.sh', { stdio: 'inherit' });
    const addr = await gitRemoteOriginUrl();
    const pattern = /\w+@(.+)/i;
    const result = pattern.exec(addr);
    if (!result) {
        throw new Error('Unexpected git remote addr.');
    }
    execSync(`git push -f --tags https://$GITHUB_TOKEN@${result[1]} HEAD:master`, { stdio: 'inherit' });

    const { PKG_NAME, VERSION_TAG } = process.env;

    await axios.request({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: `${BranchToUrl[branch]}/version`,
        data: { name: PKG_NAME, version: VERSION_TAG }
    });
}

main().catch(err => {
    console.error('出错了: ', err);
    process.exit(1);
});
