import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectCurrentUsername } from '../auth'
import { createNewPost } from './slice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'pending'>('idle')

  const userId = useAppSelector(selectCurrentUsername)!
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    const form = e.currentTarget

    try {
      setStatus('pending')
      await dispatch(createNewPost({ title, content, user: userId })).unwrap()
      form.reset()
    } catch (error) {
      console.error('Failed to save the post: ', error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button disabled={status === 'pending'}>Save Post</button>
      </form>
    </section>
  )
}
