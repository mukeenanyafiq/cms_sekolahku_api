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
- .. alumni;
- .. employees;
- .. opening speech;
- .. and a list of available downloadable files

# URL Path
This module uses a specific URL path to obtain information from your school's website and then parsing it into something readable. You can use these URL paths (by continuing from the base url) instead if you want a cheapest way

**Data that will not included in the original path**
- `post_url` element (from `PostRows`)
- `photo_url` element (from `GalleryAlbumInformation`)
- `url` element (from `GalleryVideoInformation`)

**Default Headers for POST Requests**
- `"Content-Type": "application/x-www-form-urlencoded"`
- `"x-requested-with": "XMLHttpRequest"`

| Origin Function                    | URL Paths                                 | Methods | Data to send                                                 | Returns |
| ---------------                    | ---------                                 | ------- | ------------                                                 | ------- |
| `Posts.getCurrentFeed()`           | `/feed`                                   | `GET`   |                                                              | `XHR`   |
| `Posts.getPostsByCategories()`     | `/public/post_categories/get_posts`       | `POST`  | `{ "page_number": number, "category_slug": string }`         | `JSON`  |
| `Posts.getPostsByTags()`           | `/public/post_tags/get_posts`             | `POST`  | `{ "page_number": number, "tag": string }`                   | `JSON`  |
| `Posts.getPostsByArchives()`       | `/public/archives/get_posts`              | `POST`  | `{ "page_number": number, "year": string, "month": string }` | `JSON`  |
| `Comments.getPostComments()`       | `/public/post_comments/get_post_comments` | `POST`  | `{ "page_number": number, "comment_post_id": number }`       | `JSON`  |
| `Comments.postComment()`           | `/public/post_comments`                   | `POST`  | `{ "comment_author": author, "comment_email": email, "comment_url": url, "comment_content": content, "comment_post_id": post_id }` | `JSON`  |
| `Gallery.getPhotoAlbums()`         | `/public/gallery_photos/get_albums`       | `POST`  | `{ "page_number": number }`                                  | `JSON`  |
| `Gallery.getPhotoPreview()`        | `/public/gallery_photos/preview`          | `POST`  | `{ "id": number }`                                           | `JSON`  |
| `Gallery.getVideos()`              | `/public/gallery_photos/get_videos`       | `POST`  | `{ "page_number": number }`                                  | `JSON`  |
| `Student.getStudents()`            | `/public/student_directory/get_students`  | `POST`  | `{ "academic_year_id": number, "class_group_id": number }`   | `JSON`  |
| `Alumni.getAlumni()`               | `/public/alumni_directory/get_alumni`     | `POST`  | `{ "page_number": number }`                                  | `JSON`  |
| `Employee.getEmployees()`          | `/public/employee_directory/get_employee` | `POST`  | `{ "page_number": number }`                                  | `JSON`  |
| `OpeningSpeech.getOpeningSpeech()` | `/public/opening_speech`                  | `GET`   |                                                              | `HTML`  |
| `Download.getFiles()`              | `/public/download/get_files`              | `POST`  | `{ "slug": string, "page_number": number }`                  | `JSON`  |
| `Subscribe.subscribe()`            | `/public/subscribe`                       | `POST`  | `{ "csrf_token": string, "subscriber": string }`             | `JSON`  |

# Install
Install using npm:
```
npm install cms_sekolahku_api
```

# Contribute
This module is not complete yet. There are still many information to acquire that haven't been implemented in this API.
With your help, it would be a lot faster to complete this project!

You can contribute in this project by making a new [pull request!](https://github.com/mukeenanyafiq/cms_sekolahku_api/pulls) Anything that would improve this module a bit

If you find any issues regarding about this module, make a new [issue!](https://github.com/mukeenanyafiq/cms_sekolahku_api/issues/new)