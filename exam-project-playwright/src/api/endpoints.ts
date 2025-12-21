export const BASE_URL = process.env.BASE_URL || 'https://aqa-complexapp.onrender.com';

export const endpoints = {
    login: `${BASE_URL}/api/login`,
    postsByUser: (username: string) => `${BASE_URL}/api/postsByAuthor/${username}`,
    createPost: `${BASE_URL}/api/create-post`,
    deletePost: (postId: string) => `${BASE_URL}/api/post/${postId}`,
    createUser: `${BASE_URL}/api/user`,
    getUserInfo: (username: string) => `${BASE_URL}/api/user/info/${username}`,
    deleteUser: (userId: string) => `${BASE_URL}/api/user/${userId}`,
};
