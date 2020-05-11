const data = require('./data');

module.exports = {
    initialTemplate: null,
    generateTemplateTray(mainWindow) {
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
            if (course) {
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

        this.initialTemplate = template;
        return template;
    },
    addCourseTray(course, mainWindow) {
            this.initialTemplate.push({
                'label': course,
                type: 'radio',
                checked: true,
                click: () => {
                    mainWindow.send('change-course', course);
                }
            })

        return this.initialTemplate;
    }
}