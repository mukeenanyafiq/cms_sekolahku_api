declare module "cms-sekolahku-api" {
    export class CMSSekolahku {
        /**
         * @param {string} baseURL A URL to the website that uses CMS Sekolahku software to run the website
         */
        constructor(baseURL: string)

        posts: Posts
    }

    export class Posts {
        /**
         * Get current page feed (Newest posts)
         * 
         * @param {parseInfo} parseInfo How the information will be parsed
         * @returns { string | XMLJSON }
         */
        getCurrentFeed(parseInfo: ParseInfo): Promise<string | XMLJSON>

        /**
         * Get all post on a specific category
         * 
         * @param {string} category_slug The category name
         * @param {number} page_number Category page
         * @returns { PostRows }
         */
        getPostsByCategories(category_slug: string, page_number: number?): Promise<PostRows>

        /**
         * Get all post with a specific tag (straight up searching)
         * 
         * @param {string} tag The specified tag
         * @param {number} page_number Category page
         * @returns { PostRows }
         */
        getPostsByTags(tag: string, page_number: number?): Promise<PostRows>
        
        /**
         * Get all archived post with a specific year and month
         * 
         * @param {string} year The specified year
         * @param {string} month The specified month
         * @param {number} page_number Category page
         * @returns { PostRows }
         */
        getPostsByArchives(year: string, month: string, page_number: number?): Promise<PostRows>
    }

    export class Comments {
        /**
         * Get all comments on a post in a specific page number
         * 
         * @param {number} post_id The ID of the post
         * @param {number} page_number Page number
         * @returns { CommentRows }
         */
        getPostComments(post_id: number, page_number: number?): Promise<CommentRows>
        
        /**
         * Posts a comment on a post
         * 
         * @param {number} post_id The ID of the post
         * @param {string} author The author of the comment
         * @param {string} email The author's email
         * @param {string} url The author's URL
         * @param {string} content The content of the comment
         * @returns { ResponseStatus }
         */
        postComment(post_id: number, author: string, email: string, url: string, content: string): Promise<ResponseStatus>
    }

    export enum ParseInfo {
        XHR,
        JSON
    }
    
    export interface PostRows {
        rows: [PostInformation]
    }
    
    export interface PostInformation {
        id: number,
        post_title: string,
        created_at: string,
        post_content: string,
        post_image: string,
        post_slug: string,
        post_counter: number,
        post_author: string,
        post_url: string
    }

    export interface CommentRows {
        comments: [CommentInformation]
    }

    export interface CommentInformation {
        id: number,
        comment_author: string,
        comment_url: string,
        created_at: string,
        comment_content: string,
        comment_reply: null
    }

    export interface ResponseStatus {
        message: string,
        status: string
    }

    export interface XMLJSON {}
}