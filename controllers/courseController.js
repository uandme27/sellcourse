class CoursesController {
    index(req, res) {
     res.render('courses')
    }

    deteil(req, res) {
        const courseId = req.params.id
        res.render('deteil-course', { layout: 'main', courseId })
       }


       watchCourse(req, res) {
    const courseId = req.params.id
    res.render('course-watch')
   }
}


module.exports = new CoursesController