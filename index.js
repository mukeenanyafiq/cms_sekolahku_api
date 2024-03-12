const axios = require("axios");
const cheerio = require("cheerio");
const xmljs = require("xml-js");

// Base class
class BaseAPI {
    // Construct a website's public information grabber
    constructor(baseURL) {
        this.baseURL = baseURL;

        // Register all class that are not exported
        this.posts = new Posts(this.baseURL);
        this.comments = new Comments(this.baseURL);
        this.gallery = new Gallery(this.baseURL);
        this.student = new Student(this.baseURL);
        this.alumni = new Alumni(this.baseURL);
        this.employee = new Employee(this.baseURL);
        this.openingSpeech = new OpeningSpeech(this.baseURL);
        this.download = new Download(this.baseURL);
        this.subscribe = new Subscribe(this.baseURL);
        this.pollings = new Pollings(this.baseURL);
    }
}

class Posts {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async feed(parseInfo = "XHR") {
        try {
            return QuickRequest(`${this.baseURL}feed`).then((response) => {
                if (parseInfo == "JSON") {
                    response.data = JSON.parse(xmljs.xml2json(response.data, { compact: true }))
                }

                return response.data
            })
        } catch(err) { throw err }
    }

    // This function runs an algorithm by doing:
    // - getting all posts on the category..
    // - then getting total comments on each post
    // - then when it gets the post id for the most commented one, it will summarize it up

    // i feel like im a genius
    async getMostCommentedPostOnCategory(category_slug, page_number = 1, ascending = true, record = false) {
        try {
            const limitResult = 10

            let arrayIndex = 0
            let pageNumberResult = 1
            let acquiredPosts = { "rows": [] }
            let commentsCount = {}
            
            async function getPosts(baseURL) {
                const response = await quickPostCMS(`${baseURL}public/post_categories/get_posts`, {
                    "page_number": pageNumberResult,
                    "category_slug": category_slug
                })

                if (response.status == 200) {
                    for (const postInfo of response.data.rows) acquiredPosts.rows.push(postInfo)

                    if (response.data.rows.length == limitResult) {
                        pageNumberResult += 1
                        return getPosts(baseURL)
                    } else if (response.data.rows.length < limitResult) {
                        if (response.data.rows.length = 0) pageNumberResult -= 1

                        if (record) console.log(`[${category_slug}] Took ${pageNumberResult} page(s) to complete the list of posts (in total, ${acquiredPosts.rows.length} post(s) recorded)`)
                        pageNumberResult = 1
                        return getComments(baseURL)
                    }
                } else throw new Error(`Something went wrong while trying to get every post in the category. The server responded with status: ${response.status}`)
            }

            async function getComments(baseURL) {
                let postId = acquiredPosts.rows[arrayIndex].id

                const response = await quickPostCMS(`${baseURL}public/post_comments/get_post_comments`, { 
                    "page_number": pageNumberResult,
                    "comment_post_id": postId
                })

                if (response.status == 200) {
                    if (commentsCount[postId]) commentsCount[postId] += response.data.comments.length
                    else commentsCount[postId] = response.data.comments.length

                    if (response.data.comments.length == limitResult) {
                        pageNumberResult += 1
                        return getComments(baseURL)
                    } else if (response.data.comments.length < limitResult) {
                        if (response.data.comments.length = 0) pageNumberResult -= 1

                        if (record) console.log(`[#${postId}] Took ${pageNumberResult} page(s) to complete the list of comments (in total, there were ${commentsCount[postId]} comment(s) recorded).`)
                        pageNumberResult = 1
                        
                        if (arrayIndex < acquiredPosts.rows.length - 1) {
                            arrayIndex += 1
                            return getComments(baseURL)
                        } else {
                            if (record) console.log(`[${category_slug}] Total comments on all posts in the category successfully recorded. Summarizing data`)

                            let sortedArray = [];
                            for (let i in commentsCount) sortedArray.push({ "id": i, "count": commentsCount[i]});
                        
                            // Sort data by their total comments
                            sortedArray = sortedArray.sort((a, b) => b.count - a.count);

                            // Add the total comment count on each post information
                            for (const post of acquiredPosts.rows) post.post_comment_count = sortedArray.find((value) => value.id == post.id).count.toString()
                            if (ascending) acquiredPosts.rows = acquiredPosts.rows.sort((a, b) => Number.parseInt(b.post_comment_count) - Number.parseInt(a.post_comment_count))
                            else acquiredPosts.rows = acquiredPosts.rows.sort((a, b) => Number.parseInt(a.post_comment_count) - Number.parseInt(b.post_comment_count))

                            // Slice posts by their page number specified on the parameter
                            if (page_number > 1) acquiredPosts.rows = acquiredPosts.rows.slice(limitResult * page_number, limitResult * page_number + limitResult)
                            else acquiredPosts.rows = acquiredPosts.rows.slice(0, limitResult)

                            // Return the data and build post rows
                            return buildPostRows(baseURL, acquiredPosts, false)
                        }
                    }
                } else throw new Error(`Something went wrong while trying to get the total comments were in the post. The server responded with status: ${response.status}`)
            }

            return getPosts(this.baseURL)
        } catch(err) { throw err }
    }

    // This function runs an algorithm by doing:
    // - getting all posts on the category..
    // - then when it gets all the posts, it sorts the list by the post's viewed counter

    // BANG ANTON SOFYAN.
    async getPopularPostsOnCategory(category_slug, page_number = 1, ascending = true, includeTotalComments = true, record = false) {
        try {
            const limitResult = 10
            
            let acquiredPosts = { "rows": [] }
            let pageNumberResult = 1

            async function getPosts(baseURL) {
                const response = await quickPostCMS(`${baseURL}public/post_categories/get_posts`, {
                    "page_number": pageNumberResult,
                    "category_slug": category_slug
                });

                if (response.status == 200) {
                    for (const postInfo of response.data.rows) acquiredPosts.rows.push(postInfo)

                    if (response.data.rows.length == limitResult) {
                        pageNumberResult += 1
                        return getPosts(baseURL)
                    } else if (response.data.rows.length < limitResult) {
                        if (response.data.rows.length == 0) pageNumberResult -= 1
                        if (record) console.log(`[${category_slug}] Took ${pageNumberResult} page(s) to complete the list of posts (in total, ${acquiredPosts.rows.length} post(s) recorded). Sorting the lists by the post's view counter`)

                        // Sort the rows/lists
                        if (ascending) acquiredPosts.rows = acquiredPosts.rows.sort((a, b) => Number.parseInt(b.post_counter) - Number.parseInt(a.post_counter))
                        else acquiredPosts.rows = acquiredPosts.rows.sort((a, b) => Number.parseInt(a.post_counter) - Number.parseInt(b.post_counter))

                        // Slice posts by their page number specified on the parameter
                        if (page_number > 1) acquiredPosts.rows = acquiredPosts.rows.slice(limitResult * page_number, limitResult * page_number + limitResult)
                        else acquiredPosts.rows = acquiredPosts.rows.slice(0, limitResult)

                        return buildPostRows(baseURL, acquiredPosts, includeTotalComments)
                    }
                }
            }

            return getPosts(this.baseURL)
        } catch(err) { throw err }
    }

    async getPostsByCategories(category_slug, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/post_categories/get_posts`, { 
                "page_number": page_number, 
                "category_slug": category_slug 
            }).then((response) => {
                return buildPostRows(this.baseURL, response.data, true)
            })
        } catch(err) { throw err }
    }
    
    async getPostsByTags(tag, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/post_tags/get_posts`, { 
                "page_number": page_number, 
                "tag": tag 
            }).then((response) => {
                return buildPostRows(this.baseURL, response.data, true)
            })
        } catch(err) { throw err }
    }

    async getPostsByArchives(year, month, page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/archives/get_posts`, { 
                "page_number": page_number, 
                "year": year, 
                "month": month 
            }).then((response) => {
                return buildPostRows(this.baseURL, response.data, true)
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
            return quickPostCMS(`${this.baseURL}public/post_comments/get_post_comments`, { 
                "page_number": page_number, 
                "comment_post_id": post_id 
            }).then((response) => {
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
            return quickPostCMS(`${this.baseURL}public/gallery_photos/get_albums`, { 
                "page_number": page_number 
            }).then((response) => {
                return buildAlbumRows(this.baseURL, response.data)
            })
        } catch(err) { throw err }
    }

    async getPhotoPreview(id) {
        try {
            return quickPostCMS(`${this.baseURL}public/gallery_photos/preview`, { 
                "id": id 
            }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }

    async getVideos(page_number = 1) {
        try {
            return quickPostCMS(`${this.baseURL}public/gallery_videos/get_videos`, { 
                "page_number": page_number
            }).then((response) => {
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
            return quickPostCMS(`${this.baseURL}public/student_directory/get_students`, { 
                "academic_year_id": academic_year_id, 
                "class_group_id": class_group_id 
            }).then((response) => {
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
            return quickPostCMS(`${this.baseURL}public/alumni_directory/get_alumni`, { 
                "page_number": page_number 
            }).then((response) => {
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
            return quickPostCMS(`${this.baseURL}public/employee_directory/get_employees`, { 
                "page_number": page_number 
            }).then((response) => {
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
            return quickPostCMS(`${this.baseURL}public/download/get_files`, { 
                "slug": slug, 
                "page_number": page_number 
            }).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

class Subscribe {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async subscribe(subscriber_email, csrf_token, _sessions) {
        try {
            return quickPostCMS(`${this.baseURL}subscribe`, { 
                "subscriber": subscriber_email, 
                "csrf_token": csrf_token 
            }, `_sessions=${_sessions}`).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

class Pollings {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async vote(answer_id, csrf_token, _sessions) {
        try {
            return quickPostCMS(`${this.baseURL}vote`, { 
                "answer_id": answer_id, 
                "csrf_token": csrf_token 
            }, `_sessions=${_sessions}`).then((response) => {
                return response.data
            })
        } catch(err) { throw err }
    }
}

function quickPostCMS(url, data, cookie) {
    return QuickRequest(url, "POST", data, {
        "content-type": "application/x-www-form-urlencoded",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookie
    })
}

async function buildPostRows(baseURL, data, commentCount) {
    let limitResult = 10
    let arrayIndex = 0
    let pageNumberResult = 1

    async function getComments(baseURL, data) {
        if (data.rows.length > 0) {
            const response = await quickPostCMS(`${baseURL}public/post_comments/get_post_comments`, { 
                "page_number": pageNumberResult,
                "comment_post_id": data.rows[arrayIndex].id
            })
    
            if (response.status == 200) {
                if (data.rows[arrayIndex].post_comment_count) data.rows[arrayIndex].post_comment_count += response.data.comments.length
                else data.rows[arrayIndex].post_comment_count = response.data.comments.length
    
                if (response.data.comments.length == limitResult) {
                    pageNumberResult += 1
                    return getComments(baseURL, data)
                } else if (response.data.comments.length < limitResult) {
                    pageNumberResult = 1
                    data.rows[arrayIndex].post_comment_count = data.rows[arrayIndex].post_comment_count.toString()
    
                    if (arrayIndex < data.rows.length - 1) {
                        arrayIndex += 1
                        return getComments(baseURL, data)
                    } else return data
                }
            } else {
                console.log(`Failed to get total comments for Post ID of ${data.rows[arrayIndex].id}. "post_comment_count" element will be shown as "0" instead`)
                data.rows[arrayIndex].post_comment_count = "0"

                if (arrayIndex < data.rows.length - 1) {
                    arrayIndex += 1
                    return getComments(baseURL, data)
                } else return data
            }
        }
    }

    if (commentCount) {
        getComments(baseURL, data).then((data) => {
            data.rows.forEach(postInfo => {
                postInfo.post_url = `${baseURL}read/${postInfo.id}/${postInfo.post_slug}`;
            });
        
            return data
        })
    } else {
        data.rows.forEach(postInfo => {
            postInfo.post_url = `${baseURL}read/${postInfo.id}/${postInfo.post_slug}`;
        });
    
        return data
    }
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
    BaseAPI,
    Posts,
    Comments,
    Gallery,
    Student,
    Alumni,
    Employee,
    OpeningSpeech,
    Download,
    Subscribe,
    Pollings
}