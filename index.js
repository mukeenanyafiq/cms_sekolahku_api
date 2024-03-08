const axios = require("axios");
const cheerio = require("cheerio");
const xmljs = require("xml-js");

class Posts {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getCurrentFeed(parseInfo = "XHR") {
        try {
            return QuickRequest(`${this.baseURL}feed`).then((response) => {
                if (parseInfo == "JSON") {
                    response.data = JSON.parse(xmljs.xml2json(response.data, { compact: true }))
                }

                return response.data
            })
        } catch(err) { throw err }
    }

    async getPostsByCategories(category_slug, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/post_categories/get_posts`, { "page_number": page_number, "category_slug": category_slug }).then((response) => {
                return buildPostRows(this.baseURL, response.data)
            })
        } catch(err) { throw err }
    }
    
    async getPostsByTags(tag, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/post_tags/get_posts`, { "page_number": page_number, "tag": tag }).then((response) => {
                return buildPostRows(this.baseURL, response.data)
            })
        } catch(err) { throw err }
    }

    async getPostsByArchives(year, month, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/archives/get_posts`, { "page_number": page_number, "year": year, "month": month }).then((response) => {
                return buildPostRows(this.baseURL, response.data)
            })
        } catch(err) { throw err }
    }
}

class Comments {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getPostComments(post_id, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/post_comments/get_post_comments`, { "page_number": page_number, "comment_post_id": post_id }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }

    async postComment(post_id, author, email, url, content) {
        try {
            return quickPostCMS(`${this.baseURL}public/post_comments`, { 
                "comment_author": author, 
                "comment_email": email,
                "comment_url": url,
                "comment_content": content,
                "comment_post_id": post_id 
            }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

class Gallery {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getPhotoAlbums(page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/gallery_photos/get_albums`, { "page_number": page_number }).then((response) => {
                return buildAlbumRows(this.baseURL, response.data)
            })
        } catch(err) { throw err }
    }

    async getPhotoPreview(id) {
        try {
            return quickPostCMS(`${this.baseURL}public/gallery_photos/preview`, { "id": id }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }

    async getVideos(page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/gallery_videos/get_videos`, { "page_number": page_number }).then((response) => {
                return buildVideoRows(response.data)
            })
        } catch(err) { throw err }
    }
}

class Student {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getStudents(academic_year_id = 1, class_group_id = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/student_directory/get_students`, { "academic_year_id": academic_year_id, "class_group_id": class_group_id }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

class Alumni {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getAlumni(page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/alumni_directory/get_alumni`, { "page_number": page_number }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

class Employee {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getEmployees(page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/employee_directory/get_employees`, { "page_number": page_number }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

class OpeningSpeech {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getOpeningSpeech() {
        try {
            return QuickRequest(`${this.baseURL}public/opening_speech`).then(response => {
                return cheerio.load(response.data)('div[class="card-body pb-0 pt-0"]').text().trim()
            })
        } catch(err) { throw err }
    }
}

class Download {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getFiles(slug, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/download/get_files`, { "slug": slug, "page_number": page_number }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

function quickPostCMS(url, data) {
    return QuickRequest(url, "POST", data, {
        "content-type": "application/x-www-form-urlencoded",
        "x-requested-with": "XMLHttpRequest",
    })
}

function buildPostRows(baseURL, data) {
    data.rows.forEach(postInfo => {
        postInfo.post_url = `${baseURL}read/${postInfo.id}/${postInfo.post_slug}`;
    });

    return data
}

function buildAlbumRows(baseURL, data) {
    data.rows.forEach(albumInfo => {
        albumInfo.photo_url = `${baseURL}media_library/albums/${albumInfo.album_cover}`;
    });

    return data
}

function buildVideoRows(data) {
    data.rows.forEach(videoInfo => {
        videoInfo.url = `https://www.youtube.com/watch?v=${videoInfo.post_content}`;
    });

    return data
}

function QuickRequest(url, method, body, headers) {
    return axios.default.request({ url: url, method: method, data: body, headers: headers })
}

module.exports = { 
    Posts,
    Comments,
    Gallery,
    Student,
    Alumni,
    Employee,
    OpeningSpeech,
    Download
}