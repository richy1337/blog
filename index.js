import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [];

app.get('/', (req, res) => {
    res.render("index.ejs", { blogPosts: blogPosts });
});

app.get('/form', (req, res) => {
    res.render("form.ejs");
});

app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);

    if (post) {
        res.render('post', { post });
    }
    else {
        res.status(404).send('Post not found');
    }
});

app.post('/submit-article', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const newPost = { id: blogPosts.length + 1, title: title, content: content, datePosted: today };
    blogPosts.push(newPost);

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});