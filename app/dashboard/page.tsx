import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from '@/components/dashboard/DashboardClient'

interface Props {
  searchParams: Promise<{ upgraded?: string }>
}

export default async function DashboardPage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: wardrobe } = await supabase
    .from('wardrobe_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Stripe redirects back with ?upgraded=true after a successful checkout.
  // We read it here in the server component and pass it down so the client
  // can show a welcome toast without relying on the webhook having fired yet.
  const params = await searchParams
  const justUpgraded = params?.upgraded === 'true'

  return (
    <DashboardClient
      user={user}
      wardrobe={wardrobe || []}
      profile={profile}
      justUpgraded={justUpgraded}
    />
  )
}
