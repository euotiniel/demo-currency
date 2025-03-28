import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fakeRepository } from "@/services/fakeRepository";
import { postTypes } from "@/types";

export const useGetPosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: fakeRepository.getAllPost,
        staleTime: 1000 * 5 * 60,
    })
}

export const useGetPost = (id: number) => {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => fakeRepository.getPost(id),
        staleTime: 1000 * 5 * 60,
    })
}

export const usePostPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: Omit<postTypes, "id">) => {
            return fakeRepository.postPost(post); // - Assim ele manda os dados dentro de um objecto `post`
            // return fakeRepository.postPost({ title: post.title, body: post.body })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            console.log("Post criado com sucesso:", data);
        },
    });
}


