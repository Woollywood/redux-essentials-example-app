import { useAppSelector } from '@/hooks/store'
import React from 'react'
import { selectUserById } from '../users'

interface Props {
  userId: string
  showPrefix?: boolean
}

export const PostAuthor: React.FC<Props> = ({ userId, showPrefix = false }) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <span>
      {showPrefix && 'by'} {author?.name ?? 'Unknown author'}
    </span>
  )
}
