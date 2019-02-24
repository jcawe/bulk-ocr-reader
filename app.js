const Tesseract = require('tesseract.js')
const fs = require('fs');
const path = require('path');
const { input, output, lang } = require('./config.json');
const textOutput = [];

function readFile(file, lang, resolve, index, count) {
    Tesseract.recognize(file, lang)
        .then(result => {
            const filename = path.basename(file);
            textOutput.push(`\n# START ${filename} #\n ${result.text} \n# END ${filename} #`);
            console.log(index != null ? `Processed ${index + 1} of ${count}` : "File processed");
            if ((index || 0) == (count || 1) - 1) resolve();
        });
}

function readDirectory(directory, lang, resolve) {
    fs.readdir(directory, (err, files) => {
        const count = files.length;
        console.log(`Start reading ${count} files...`);
        files.forEach((file, index) => {
            readFile(`${directory}\\${file}`, lang, resolve, index, count);
        });
    });
}

new Promise(resolve => {
    if (fs.statSync(input).isFile()) readFile(input, lang, resolve);
    else readDirectory(input, lang, resolve);
}).then(() => {
    console.log("Read finished!");
    fs.writeFile(output, textOutput.reduce((p, c) => p + c), () => {
        console.log("Output saved!");
        process.exit();
    });
});