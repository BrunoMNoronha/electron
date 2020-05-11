const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    store(course, studyDuration) {

        let fullFileName = __dirname + '/data/' + course + '.json';
        if (fs.existsSync(fullFileName)) {
            this.addTimeToCourse(fullFileName, studyDuration);
        } else {
            this.createFile(fullFileName, {})
                .then(() => {
                    this.addTimeToCourse(fullFileName, studyDuration);
                })
        }
    },
    getData(course) {

        let fullFileName = __dirname + '/data/' + course + '.json';
        return jsonfile.readFile(fullFileName);
    },
    getCoursesName() {

        let files = fs.readdirSync(__dirname + '/data/');
        let courses = files.map((file) => {
            return file.substr(0, file.lastIndexOf('.'));
        })
        return courses;
    },
    addTimeToCourse(fullFileName, studyDuration) {

        let data = {
            updateAt: new Date().toString(),
            time: studyDuration
        }
        jsonfile.writeFile(fullFileName, data, { spaces: 2 })
            .then(() => {
                console.log('dados incluidos com sucesso');
            }).catch((error) => {
                console.log(error);
            })

    },
    createFile(fileName, fileContent) {

        return jsonfile.writeFile(fileName, fileContent)
            .then(() => {
                console.log('Arquivo criado com sucesso.');
                console.log(fileName);
                console.log(fileContent);
            })
            .catch(() => {
                console.log('Ocorreu um erro ao criar o arquivo.');
            });
    }
};