import { fakeApi } from "@/utils/axios" 
import { postTypes } from "@/types";

export const fakeRepository = {
    async getAllPost () {
        const { data } = await fakeApi.get(`posts`);
        return data;
    },

    async getPost (id: number) {
        const { data } = await fakeApi.get(`posts/${id}`);
        return data;
    },
    
    async postPost (post: Omit<postTypes, "id">) {
        const { data } = await fakeApi.post(`posts`, { post });
        return data;
    },
    
    /* async postPost (post: postTypes) {
        const { data } = await fakeApi.post(`posts`, { post });
        return data;
    }, */

    async deletePost (id: number) {
        const { data } = await fakeApi.delete(`/posts/${id}`);
        return data;
    }
}