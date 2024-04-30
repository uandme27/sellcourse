const section = document.querySelector('.section')
const video = document.querySelector('.video')
let courses
const apiCourses = 'http://localhost:5500/courses'


const fetchApiCourses = async () => {
    const response = await fetch(apiCourses)
    courses = await response.json()
    console.log(courses)

    showSection()
}

const showSection= () => {
    courses.forEach(course => {
        console.log(course.sections)
    });
}

fetchApiCourses()