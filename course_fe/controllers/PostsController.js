class PostsController {

    show(req, res, next) {
        // Post.findOne({ slug: req.params.slug })
        //     .then(() => res.render('posts/show'))
        //     .catch(next);
        res.render('posts/show')
    }

    getPost(req, res) {

        Post.find({})

            .then((post) => {
                return res.json(post)
            })
            .catch((error) => {
                return res.json({
                    message: error
                })
            })

    }

    index(req, res) {
        res.render('posts/post')
    }

}

module.exports = new PostsController