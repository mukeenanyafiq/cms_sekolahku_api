# CMS Sekolahku API
If your school has a website that is powered using [CMS Sekolahku](https://sekolahku.web.id) (especially in Indonesia), you can get every* online public data on the website using this API!

You can get current post feed (Newest posts)
```js
const { Posts } = require('cms_sekolahku_api');
const school = new Posts("https://cms.sekolahku.web.id/")

school.getCurrentFeed().then((response) => {
    console.log(response)
})
```

or even, post a comment!
```js
const { Comments } = require('cms_sekolahku_api');
const school = new Comments("https://cms.sekolahku.web.id/")

school.postComment(69, "mukeenanyafiq", "mukeenan@gmail.com", "https://example.com", "Merdeka!").then((response) => {
    // Checks if the comment were successfully posted
    console.log(response.status)
})
```

Currently, this module includes:
- getting post feed;
- getting posts by category, tag, and archives;
- getting comments on a post;
- post a comment;
- gets a gallery of photos and videos, also previewing them;
- gets all student information;
- and gets all alumni information

# Install
Install using npm:
```
npm install cms_sekolahku_api
```

# Contribution
This module is not complete yet. There are still many information to acquire that haven't been implemented in this API.
With your help, it would be a lot faster to complete this project!

You can contribute in this project by making a new [pull request!](https://github.com/mukeenanyafiq/cms_sekolahku_api/pulls) Anything that would improve this module a bit

If you find any issues regarding about this module, make a new [issue!](https://github.com/mukeenanyafiq/cms_sekolahku_api/issues/new)