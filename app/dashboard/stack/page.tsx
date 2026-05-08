import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import StackBuilder from '@/components/dashboard/StackBuilder'

export default async function StackPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: wardrobe } = await supabase
    .from('wardrobe_items')
    .select('*')
    .eq('user_id', user.id)

  return <StackBuilder wardrobe={wardrobe || []} userId={user.id} />
}
