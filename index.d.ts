declare module "cms_sekolahku_api" {
    export class BaseAPI {
        /**
         * Base class of the API. Use this for a much cheaper code way
         * 
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)

        posts: Posts;
        comments: Comments;
        gallery: Gallery;
        student: Student;
        alumni: Alumni;
        employee: Employee;
        openingSpeech: OpeningSpeech;
        download: Download;
        subscribe: Subscribe;
        pollings: Pollings;
    }

    export class Posts {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Get current page feed (Newest posts)
         * 
         * @param {"XHR" | "JSON" | null} parseInfo How the information will be parsed
         * @returns {string}
         */
        feed(parseInfo: "XHR" | "JSON" | null): Promise<string>
    
        /**
         * Get all post on a specific category
         * 
         * @param {string} category_slug The category name
         * @param {number} page_number Category page
         * @returns {PostRows}
         */
        getPostsByCategories(category_slug: string, page_number: number?): Promise<PostRows>
    
        /**
         * Get all post with a specific tag
         * 
         * @param {string} tag The specified tag
         * @param {number} page_number Category page
         * @returns {PostRows}
         */
        getPostsByTags(tag: string, page_number: number?): Promise<PostRows>
        
        /**
         * Get all archived post with a specific year and month
         * 
         * @param {string} year The specified year
         * @param {string} month The specified month
         * @param {number} page_number Category page
         * @returns {PostRows}
         */
        getPostsByArchives(year: string, month: string, page_number: number?): Promise<PostRows>
    }
    
    export class Comments {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Get all comments on a post in a specific page number
         * 
         * @param {number} post_id The ID of the post
         * @param {number} page_number Page number
         * @returns {CommentRows}
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
         * @returns {ResponseStatus}
         */
        postComment(post_id: number, author: string, email: string, url: string, content: string): Promise<ResponseStatus>
    }
    
    export class Gallery {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Get photo albums on the website
         * 
         * @param {number} page_number Page number
         * @returns {GalleryAlbumRows}
         */
        getPhotoAlbums(page_number: number?): Promise<GalleryAlbumRows>
    
        /**
         * Get the preview of an album
         * 
         * @param {number} id Album ID
         * @returns {GalleryPreviewPhotoInformation}
         */
        getPhotoPreview(id: number): Promise<GalleryPreviewPhotoInformation>
    
        /**
         * Get videos on the website
         * 
         * @param {number} page_number Page number
         * @returns {GalleryVideoRows}
         */
        getVideos(page_number: number?): Promise<GalleryVideoRows>
    }
    
    export class Student {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Gets all student information
         * 
         * @param {number} academic_year_id The academic year ID
         * @param {number} class_group_id The class group ID
         * @returns {StudentRows}
         */
        getStudents(academic_year_id: number?, class_group_id: number?): Promise<StudentRows>
    }
    
    export class Alumni {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Gets all alumni student information
         * 
         * @param {number} page_number Page number
         * @returns {StudentRows}
         */
        getAlumni(page_number: number?): Promise<StudentRows>
    }
    
    export class Employee {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Gets all employees information
         * 
         * @param {number} page_number Page number
         * @returns {EmployeeRows}
         */
        getEmployess(page_number: number?): Promise<EmployeeRows>
    }
    
    export class OpeningSpeech {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Gets the headmaster's opening speech
         * 
         * @returns {string}
         */
        getOpeningSpeech(): Promise<string>
    }
    
    export class Download {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * Gets all available files that can be downloaded (public files)
         * 
         * @param {string} slug The file slug
         * @param {number} page_number Page number
         * @returns {DownloadFilesRows}
         */
        getFiles(slug: string, page_number: number?): Promise<DownloadFilesRows>
    }
    
    export class Subscribe {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * **NOTE: The function will only work ONE TIME and then won't work anymore unless you change the "csrf_token" or/and "_sessions" parameter**
         * 
         * Subscribe to the website's latest post
         * 
         * @param {string} subscriber_email Subscriber's email
         * @param {string} csrf_token The CSRF Token (find it on the head of the html)
         * @param {string} _sessions The cookie for "_sessions" (find it on DevTools > Application > Cookies > the base url)
         * @returns {ResponseCSRFTokenStatus} This function will affect your web interface on the Base URL if attempted to do a similar function.
         */
        subscribe(subscriber_email: string, csrf_token: string?, _sessions: string): Promise<ResponseCSRFTokenStatus>
    }
    
    export class Pollings {
        /**
         * @param baseURL The base/homepage URL/link of the website
         */
        constructor(baseURL: string)
    
        /**
         * **NOTE: The function will only work ONE TIME and then won't work anymore unless you change the "csrf_token" or/and "_sessions" parameter**
         * 
         * Vote in the latest poll questions
         * 
         * @param {number} answer_id The ID of the vote's answer
         * @param {string} csrf_token The CSRF Token (find it on the head of the html)
         * @param {string} _sessions The cookie for "_sessions" (find it on DevTools > Application > Cookies > the base url)
         * @returns {ResponseCSRFTokenStatus} This function will affect your web interface on the Base URL if attempted to do a similar function.
         */
        vote(answer_id: number, csrf_token: string?, _sessions: string): Promise<ResponseCSRFTokenStatus>
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
        comment_reply: string
    }
    
    export interface GalleryAlbumRows {
        rows: [GalleryAlbumInformation]
    }
    
    export interface GalleryAlbumInformation {
        id: number,
        album_title: string,
        album_description: string,
        album_cover: string,
        album_slug: string,
        photo_url: string
    }
    
    export interface GalleryPreviewPhotoInformation {
        count: number,
        items: [ { src: string } ]
    }
    
    export interface GalleryVideoRows {
        rows: [GalleryVideoInformation]
    }
    
    export interface GalleryVideoInformation {
        id: number,
        post_title: string,
        post_content: string,
        url: string
    }
    
    export interface StudentRows {
        rows: [StudentInformation]
    }
    
    export interface StudentInformation {
        identity_number: string,
        full_name: string,
        gender: string,
        birth_place: string,
        birth_date: string,
        photo: string
    }
    
    export interface AlumniRows {
        rows: [AlumniInformation]
    }
    
    export interface AlumniInformation {
        identity_number: string,
        full_name: string,
        gender: string,
        birth_place: string,
        birth_date: string,
        start_date: string,
        end_date: string,
        photo: string
    }
    
    export interface EmployeeRows {
        rows: [EmployeeInformation]
    }
    
    export interface EmployeeInformation {
        nik: string,
        full_name: string,
        gender: string,
        birth_place: string,
        birth_date: string,
        photo: string,
        employment_type: string
    }
    
    export interface DownloadFilesRows {
        rows: [DownloadFilesInformation]
    }
    
    export interface DownloadFilesInformation {
        id: number,
        file_title: string,
        file_name: string,
        file_ext: string
        file_size: string,
        category_name: string,
        file_counter: string,
        file_visibility: string
    }
    
    export interface ResponseCSRFTokenStatus {
        csrf_token: string,
        message: string,
        status: string
    }
    
    export interface ResponseStatus {
        message: string,
        status: string
    }
}