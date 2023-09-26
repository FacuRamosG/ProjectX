'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar } from '@nextui-org/react'
import Link from 'next/link'
import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'
import { DeleteButton } from './delete-button'

export default function PostCard ({
  userFullName,
  userName,
  avatarUrl,
  content,
  sameUser,
  id,
  userId
}: {
  userFullName: string | null
  userName: string
  avatarUrl: string
  content: string
  sameUser: boolean
  id: string
  userId: string
}) {
  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 border-b border-white/20 rounded-none cursor-pointer">
      <CardHeader className="justify-between">
        <div className="flex gap-x-2">
            <Link href={`/${userName}`}>
                <Avatar radius="full" size="md" src={avatarUrl} />
            </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-base font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-base tracking-tight text-default-400">{`@${userName}`}</h5>
          </div>
          <div className='absolute top-0 right-0 m-2'>
            {sameUser ? <DeleteButton postId={id} userId={userId}/> : ''}
          </div>
        </div>

      </CardHeader>
      <CardBody className="px-3 py-0 text-base text-white">
        <p>
          {content}
        </p>

      </CardBody>
      <CardFooter className="gap-3">
        <button>
         <IconMessageCircle className='w-6 h-6' />
        </button>

        <button>
            <IconHeart className='w-6 h-6' />
        </button>

        <button>
         <IconRepeat className='w-6 h-6' />
        </button>
      </CardFooter>
    </Card>
  )
}
