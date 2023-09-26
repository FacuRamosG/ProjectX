import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE (request: Request) {
  const { id, userId } = await request.json()

  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase.from('posts').delete().match({ id, user_id: userId })

  return NextResponse.json(data)
}
