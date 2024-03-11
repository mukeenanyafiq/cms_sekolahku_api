export const urlPaths = {
    "feed": "/feed",
    "getPostsByCategories": "/public/post_categories/get_posts",
    "getPostsByTags": "/public/post_tags/get_posts",
    "getPostsByArchives": "/public/archives/get_posts",
    "getPostComments": "/public/post_comments/get_post_comments",
    "postComment": "/public/post_comments",
    "getPhotoAlbums": "/public/gallery_photos/get_albums",
    "getPhotoPreview": "/public/gallery_photos/preview",
    "getVideos": "/public/gallery_videos/get_videos",
    "getStudents": "/public/student_directory/get_students",
    "getAlumni": "/public/alumni_directory/get_alumni",
    "getEmployees": "/public/employee_directory/get_employees",
    "getOpeningSpeech": "/public/opening_speech",
    "getFiles": "/public/download/get_files",
    "subscribe": "/subscribe",
    "vote": "/vote"
}

export const requiredPostHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-requested-with": "XMLHttpRequest"
}

export const externalPostHeaders = {
    "Cookie": ""
}