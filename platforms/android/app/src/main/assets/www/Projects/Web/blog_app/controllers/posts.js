const Post = require('../model/post');
 
exports.createPost = (req, res) => {

    const url = req.protocol + '://' + req.get('host');

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        userCreatorId: req.UserData.userId,
        userCreatorName: req.UserData.name
    });

    post.save().then(createdPost => {
        res.status(201).json({
            message: 'post Successfully posted',

            post: {
                ...createdPost,
                postId: createdPost.id,
            }

        });
    }).catch(error => {
        res.status(400).json({
            message: 'post is not created something wrong with the server pls try again'
        })
    });
}
exports.updatePost = (req, res) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        userCreatorId: req.UserData.userId,
        userCreatorName: req.UserData.name
    });
    Post.updateOne({ _id: req.params.id, userCreatorId: req.UserData.userId }, post).then((result) => {
        if (result.n > 0) {
            res.status(200).json({ message: 'post is updated' });
        } else {
            res.status(401).json({ message: 'Is this your Post? you cant edit' });
        }
    }).catch((err) => {
        res.status(500).json({ message: err });
    })
}

exports.getAllPosts = (req, res, next) => {

    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let postsCount;

    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    postQuery.then((document) => {
        postsCount = document;
        return Post.countDocuments();

    }).then(count => {
        res.status(200).json
            ({
                message: "Hello from express",
                maxPosts: count,
                posts: postsCount.map(data => {
                    return {
                        id: data._id,
                        title: data.title,
                        content: data.content,
                        imagePath: data.imagePath,
                        userCreatorId: data.userCreatorId,
                        userCreatorName: data.userCreatorName
                    }
                }),
            });
    });
}

exports.getPostById = (req, res, next) => {

    Post.findById(req.params.id).then((post) => {

        res.status(200).json(post);

    }).catch(err => {
        console.log(err);
        res.status(401).json({ message: "post not found" });
    })
}

exports.deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.id, userCreatorId: req.UserData.userId }).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: 'post is deleted' });
        } else {
            res.status(401).json({ message: 'Is this your Post?' });
        }
    }).catch(err => {
        res.status(401).json({ message: "post not found" + err });
    })
}