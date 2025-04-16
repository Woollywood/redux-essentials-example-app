import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { NewPost, Post } from '../posts'
export type { Post }

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice
