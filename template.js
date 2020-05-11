const data = require('./data');

module.exports = {
    generateTemplateTray(mainWindow){
        let template = [
            {
                label: 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let courses = data.getCoursesName();
        courses.forEach((course) => {
            if(course) {
                let menuItem = {
                    'label': course,
                    type: 'radio',
                    click: () => {
                        mainWindow.send('change-course', course);
                    }
                }
                template.push(menuItem);
            }
        });

        return template;
    }
}