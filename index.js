const axios = require("axios");
const xmljs = require("xml-js")

class Posts {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getCurrentFeed(parseInfo) {
        try {
            return QuickRequest(`${this.baseURL}feed`).then((response) => {
                if (parseInfo == "JSON") {
                    response.data = JSON.parse(xmljs.xml2json(response.data))
                }

                return response.data
            })
        } catch(err) { throw err }
    }

    async getPostsByCategories(category_slug, page_number = 1) {
        try {
            return QuickRequest(`${this.baseURL}public/post_categories/get_posts`, "POST", { "page_number": page_number, "category_slug": category_slug }, {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
            }).then((response) => {
                return buildPostRows(response.data)
            })
        } catch(err) { throw err }
    }
    
    async getPostsByTags(tag, page_number = 1) {
        try {
            return QuickRequest(`${this.baseURL}public/post_tags/get_posts`, "POST", { "page_number": page_number, "tag": tag }, {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
            }).then((response) => {
                return buildPostRows(response.data)
            })
        } catch(err) { throw err }
    }

    async getPostsByArchives(year, month, page_number = 1) {
        try {
            return QuickRequest(`${this.baseURL}public/post_tags/get_posts`, "POST", { "page_number": page_number, "year": year, "month": month }, {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
            }).then((response) => {
                return buildPostRows(response.data)
            })
        } catch(err) { throw err }
    }
}

class Comments {
    constructor(baseURL) {
        this.baseURL = baseURL
    }
}

function buildPostRows(data) {
    data.rows.forEach(postInfo => {
        postInfo.post_link = `${this.baseURL}read/${postInfo.id}/${postInfo.post_slug}`;
    });

    return data
}

function QuickRequest(url, method, body, headers) {
    return axios.default.request({ url: url, method: method, data: body, headers: headers })
}

module.exports = { Posts }