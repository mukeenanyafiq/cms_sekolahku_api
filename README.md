# CMS Sekolahku API
If your school has a website that is powered using [CMS Sekolahku](https://sekolahku.web.id) (especially in Indonesia), you can get every* online public data on the website using this API!

You can get current post feed (Newest posts)
```js
const { Posts } = require('cms_sekolahku_api');
const school = new Posts("https://smpn7tp.sch.id/")

school.getCurrentFeed().then((response) => {
    console.log(response)
})
```

or even, post a comment!
```js
const { Comments } = require('cms_sekolahku_api');
const school = new Comments("https://smpn7tp.sch.id/")

school.postComment(69, "mukeenanyafiq", "mukeenan@gmail.com", "https://example.com", "Merdeka!").then((response) => {
    // Checks if the comment were successfully posted
    console.log(response.status)
})
```

Currently, this module includes:
- getting post feed;
- getting posts by category, tag, and archives;
- getting comments on a post;
- and post a comment

# Install
Install using npm:
```
npm install cms_sekolahku_api
```

# Contribution
This module isn't complete. There are still many information to acquire and send that haven't been implemented in this API.
With your help, it would be a lot faster to complete this project!