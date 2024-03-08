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
         * Get current page feed
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
         * Get all post with a specific tag
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

    export enum ParseInfo {
        "XHR" = "XHR",
        "JSON" = "JSON"
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
        post_link: string
    }

    export interface XMLJSON {}
}