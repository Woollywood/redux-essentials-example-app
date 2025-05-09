import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdated, selectPostById } from './slice'

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export const EditPostForm: React.FC = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId!))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    if (!post) {
      return
    }

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      {!post ? (
        <h2>Post not found</h2>
      ) : (
        <>
          <h2>Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Post Title:</label>
            <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />
            <label htmlFor="postContent">Content:</label>
            <textarea id="postContent" name="postContent" defaultValue={post.content} required />
            <button>Save Post</button>
          </form>
        </>
      )}
    </section>
  )
}
