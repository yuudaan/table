const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

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

    exec('base ./deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            throw new Error(error);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

    const { PKG_NAME, VERSION_TAG } = process.env;

    await axios.request({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        baseUrl: BranchToUrl[branch],
        url: '/version',
        data: { name: PKG_NAME, version: VERSION_TAG }
    });
}

main().catch(err => {
    console.error('出错了: ', err.message);
    process.exit(1);
});
