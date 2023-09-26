'use client'
import { IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ThreeDots } from 'react-loading-icons'

export function DeleteButton ({ postId, userId }: { postId: string, userId: string }) {
  const router = useRouter()
  const [deleting, setDeleiting] = useState(false)

  const deletePost = async () => {
    setDeleiting(true)
    await fetch('http://localhost:3000/posts', {
      method: 'delete',
      body: JSON.stringify({ id: postId, userId })
    })

    setDeleiting(false)
    router.refresh()
  }
  return (

    deleting
      ? < ThreeDots className='w-5 cursor-default'/>
      : <button onClick={deletePost} className='hover:text-red-600'>
             <IconTrash/>
        </button>
  )
}
