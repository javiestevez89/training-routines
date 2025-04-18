"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Database } from '@/types/database'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Target,
  Dumbbell,
  Clock,
  ChevronRight,
  Loader2,
  Lock,
  CheckCircle,
  Zap
} from 'lucide-react'
import { getCookie } from '@/lib/utils'

type UserPreferences = Database['public']['Tables']['user_preferences']['Row']

export default function PreviewPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function fetchPreferences() {
      try {
        // Small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const email = getCookie('user-email')
        if (!email) {
          setError('No user email found. Please complete onboarding first.')
          return
        }

        const { data, error: fetchError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('email', email)
          .single()

        if (fetchError || !data) {
          setError('No preferences found. Please complete onboarding first.')
          return
        }
        
        setPreferences(data)
      } catch (err) {
        setError('Failed to load preferences. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading your preview...</h2>
          <p className="text-muted-foreground">Just a moment while we prepare your personalized plan</p>
        </div>
      </div>
    )
  }

  if (error || !preferences) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center">
        <Card className="w-[90%] max-w-2xl">
          <CardHeader>
            <CardTitle className="text-red-500">Error Loading Preview</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/onboarding">Return to Onboarding</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-center text-4xl font-bold">Your Personalized Training Plan Preview</h1>
        
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Fitness Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{preferences.fitness_goals}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{preferences.equipment_access}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Schedule Preview</CardTitle>
            <CardDescription>Based on your {preferences.workout_frequency} workouts per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="blur-sm">
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-semibold">Monday</h3>
                    <p>Upper Body Focus</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-semibold">Wednesday</h3>
                    <p>Lower Body Focus</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <div className="rounded-full bg-primary/90 p-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Unlock Your Full Training Plan
            </CardTitle>
            <CardDescription className="text-center">
              Get access to your complete personalized workout routine, progress tracking, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-4 text-center">
              <p className="text-lg font-medium">✓ Detailed exercise instructions</p>
              <p className="text-lg font-medium">✓ Progress tracking tools</p>
              <p className="text-lg font-medium">✓ Nutrition recommendations</p>
              <p className="text-lg font-medium">✓ Weekly adjustments</p>
            </div>
            <Button size="lg" className="w-full">
              Upgrade Now - $9.99/month
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 