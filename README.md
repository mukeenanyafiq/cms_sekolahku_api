# CMS Sekolahku API
If your school has a website that is powered using [CMS Sekolahku](https://sekolahku.web.id) (especially in Indonesia), you can get every* online public data on the website using this API!

You can get current post feed (Newest posts)
```js
const api = require('cms_sekolahku_api');
const school = new api.BaseAPI("https://cms.sekolahku.web.id/")

school.posts.feed().then((response) => {
    console.log(response)
})
```

or even, post a comment!
```js
const api = require('cms_sekolahku_api');
const school = new api.BaseAPI("https://cms.sekolahku.web.id/")

school.comments.postComment(69, "mukeenanyafiq", "mukeenan@gmail.com", "https://example.com", "Merdeka!").then((response) => {
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
- .. subscribing for the latest posts;
- .. voting in the latest polls;
- .. and a list of available downloadable files

# URL Path
This module uses a specific URL path to obtain information from your school's website and then parsing it into something readable. You can use these URL paths (by continuing from the base url) instead if you want the cheapest way

- `[H]` means the data needs another header for the data that were sent to return "success" status

**Data that will not included in the original URL path**
- `post_url` & `post_comment_count` element (from `PostRows`)
- `photo_url` element (from `GalleryAlbumInformation`)
- `url` element (from `GalleryVideoInformation`)

**Required Headers for POST Requests**
- `"Content-Type": "application/x-www-form-urlencoded"`
- `"x-requested-with": "XMLHttpRequest"`

| Origin Function                    | URL Path                                  | Methods | Data to send                                                 | Returns |
| ---------------                    | --------                                  | ------- | ------------                                                 | ------- |
| `Posts.feed()`                     | `/feed`                                   | `GET`   |                                                              | `XHR`   |
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
| `Subscribe.subscribe()`            | `/subscribe`                              | `POST`  | `[H] { "subscriber": string, "csrf_token": string }`         | `JSON`  |
| `Pollings.vote()`                  | `/vote`                                   | `POST`  | `[H] { "answer_id": number, "csrf_token": string }`          | `JSON`  |

**Data to send headers for [H]**
| Data to send                                     | URL Path     | Headers required           |
| ------------                                     | --------     | ----------------           |
| `{ "subscriber": string, "csrf_token": string }` | `/subscribe` | `Cookie: _sessions=string` |
| `{ "answer_id": number, "csrf_token": string }`  | `/vote`      | `Cookie: _sessions=string` |

# Install
Install using npm:
```
npm i cms_sekolahku_api
```

# Contribute
This module is not complete yet. There are still hopefully more information to acquire that haven't been implemented in this API.

Most of the information were completely private and couldn't be acquired, and making it public from the school's organization will help this module grows bigger. Alternative way: making an algorithm. (could be risky when the website is modified to not look the same as the [CMS Sekolahku](https://sekolahku.web.id))

However, with your help, it would be a lot faster to complete this project!

You can do: 
- Try help adding/changing something (example: my bad code) in this project by making a new [pull request!](https://github.com/mukeenanyafiq/cms_sekolahku_api/pulls) 
or
- If you find any issues/suggestions regarding about this module, make a new [issue!](https://github.com/mukeenanyafiq/cms_sekolahku_api/issues/new)

Anything that would improve this module a bit!

# Is it recommended?
Probably not for most developers.
I just made this in the first place because I was bored.