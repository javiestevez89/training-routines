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
} from '@/components/ui/card'
import {
  Target,
  Dumbbell,
  Clock,
  ChevronRight,
  Loader2
} from 'lucide-react'

type UserPreferences = Database['public']['Tables']['user_preferences']['Row']

function getCookie(name: string): string | undefined {
  try {
    // Log all cookies for debugging
    console.log('All cookies:', document.cookie)
    
    // Split all cookies and find the one we want
    const cookies = document.cookie.split(';')
    const targetCookie = cookies
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(`${name}=`))
    
    if (targetCookie) {
      const value = targetCookie.substring(name.length + 1)
      console.log(`Found cookie ${name}:`, value)
      return value
    }
    
    console.log(`Cookie ${name} not found in:`, cookies)
    return undefined
  } catch (error) {
    console.error('Error reading cookie:', error)
    return undefined
  }
}

export default function DashboardPage() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const checkAccess = async () => {
      // Clear any previous logs
      console.clear()
      console.log('%c Dashboard Page Loaded ', 'background: #222; color: #bada55')

      // Check for debug info from onboarding
      const debugInfo = sessionStorage.getItem('onboardingDebug')
      if (debugInfo) {
        console.log('%c Previous Onboarding Data ', 'background: #222; color: #bada55', JSON.parse(debugInfo))
        sessionStorage.removeItem('onboardingDebug') // Clear it after showing
      }

      const userEmail = getCookie('user_email')
      console.log('%c Cookie Check ', 'background: #222; color: #bada55', {
        found: !!userEmail,
        value: userEmail
      })

      if (!userEmail) {
        console.log('%c No user email cookie found, redirecting to onboarding... ', 'background: #222; color: #ff0000')
        // Add a delay to see the logs
        await new Promise(resolve => {
          console.log('Redirecting in 3 seconds...')
          setTimeout(resolve, 3000)
        })
        window.location.href = '/onboarding'
        return
      }
    }

    const fetchPreferences = async () => {
      try {
        setLoading(true)
        setError(null)

        // First check if we have access
        await checkAccess()

        // Get user email from cookie
        const userEmail = getCookie('user_email')
        if (!userEmail) return // Already handled in checkAccess

        console.log('%c Fetching preferences ', 'background: #222; color: #bada55', {
          email: userEmail
        })

        // Fetch preferences using email
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('email', decodeURIComponent(userEmail))
          .single()

        if (error) {
          console.error('%c Supabase error: ', 'background: #222; color: #ff0000', error)
          throw error
        }
        
        if (!data) {
          console.log('%c No preferences found, redirecting to onboarding... ', 'background: #222; color: #ff0000')
          // Add a delay to see the logs
          await new Promise(resolve => {
            console.log('Redirecting in 3 seconds...')
            setTimeout(resolve, 3000)
          })
          window.location.href = '/onboarding'
          return
        }
        
        console.log('%c Successfully fetched preferences ', 'background: #222; color: #bada55', data)
        setPreferences(data)
      } catch (error) {
        console.error('%c Error in fetchPreferences: ', 'background: #222; color: #ff0000', error)
        setError(error instanceof Error ? error.message : 'Failed to load preferences')
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !preferences) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>
              {error === 'No preferences found' 
                ? "It looks like you haven't completed the onboarding process yet."
                : "There was an error loading your preferences."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/onboarding">
                {error === 'No preferences found' ? 'Complete Onboarding' : 'Try Again'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8"
      >
        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Your Dashboard!</CardTitle>
            <CardDescription>
              Here's your personalized workout journey based on your preferences.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Preferences Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Goals Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Your Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {preferences.fitness_goals.map((goal) => (
                  <li key={goal} className="text-muted-foreground">
                    {goal.charAt(0).toUpperCase() + goal.slice(1).replace('-', ' ')}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Equipment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Equipment Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {preferences.equipment_access.charAt(0).toUpperCase() +
                  preferences.equipment_access.slice(1).replace('-', ' ')}
              </p>
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Workout Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {preferences.workout_frequency} times per week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button size="lg">
            Start Workout <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            View Progress
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 