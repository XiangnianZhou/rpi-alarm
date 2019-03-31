// 数据持久化
const util = require('util');
const fs = require('fs');
const path = require('path');

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const settingFilePath = path.resolve(__dirname, 'setting.json');

async function set(content = {}) {
    if (content.morning && content.night && content.state) {
        await writeFile(settingFilePath, JSON.stringify(content));
    } else {
        return false;
    }
}

async function get() {
    const isExists = await exists(settingFilePath);
    if (isExists) {
        const buffer = await readFile(settingFilePath);
        try {
            return JSON.parse(buffer.toString());
        } catch(e) {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = {
    set,
    get
}

