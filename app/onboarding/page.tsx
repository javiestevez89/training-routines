"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from '@/components/providers/auth-provider'
import { cn } from '@/lib/utils'
import { 
  ChevronLeft, 
  ChevronRight,
  Target,
  Dumbbell,
  Clock,
  Calendar,
  Mail,
  CheckCircle2,
  Lock,
  Loader2,
  Activity
} from 'lucide-react'
import type {
  Database,
  ExperienceLevel,
  EquipmentAccess,
  WorkoutFrequency,
  PhysicalLimitations,
  WorkoutPreferences
} from '@/types/database'

type BaseOption = {
  id: string
  label: string
  icon?: typeof Target
  description?: string
}

type StepOption = {
  id: string
  label: string
  icon?: typeof Target
  description: string
}

type Step = {
  id: string
  title: string
  description: string
  type?: 'email'
  bulletPoints?: string[]
  options?: StepOption[]
}

type Answers = {
  fitness_goals: string[]
  experience_level: ExperienceLevel | null
  equipment_access: EquipmentAccess | null
  workout_frequency: WorkoutFrequency | null
  physical_limitations: PhysicalLimitations | null
  workout_preferences: WorkoutPreferences | null
  email: string
}

const steps: Step[] = [
  {
    id: 'goals',
    title: 'What are your main fitness goals?',
    description: 'Choose your primary focus. Your workout plan will be tailored to help you achieve these specific goals.',
    options: [
      { 
        id: 'build_muscle', 
        label: 'Build Muscle', 
        icon: Dumbbell,
        description: 'Focus on strength training and muscle growth with progressive overload'
      },
      { 
        id: 'lose_fat', 
        label: 'Lose Fat', 
        icon: Target,
        description: 'Combine cardio and resistance training for optimal fat loss'
      },
      { 
        id: 'stay_fit', 
        label: 'Stay Fit & Healthy', 
        icon: Clock,
        description: 'Maintain overall fitness with balanced workouts'
      },
      { 
        id: 'strength', 
        label: 'Increase Strength', 
        icon: Target,
        description: 'Focus on compound movements and power development'
      },
      { 
        id: 'endurance', 
        label: 'Improve Endurance', 
        icon: Activity,
        description: 'Build stamina and cardiovascular fitness'
      }
    ]
  },
  {
    id: 'experience',
    title: 'What\'s your fitness experience level?',
    description: 'This helps us adjust the complexity and intensity of your workouts.',
    options: [
      { 
        id: 'beginner', 
        label: 'Beginner',
        description: 'New to working out or returning after a long break'
      },
      { 
        id: 'intermediate', 
        label: 'Intermediate',
        description: 'Consistent training for 6+ months with good form'
      },
      { 
        id: 'advanced', 
        label: 'Advanced',
        description: 'Regular training for 2+ years with strong technique'
      }
    ]
  },
  {
    id: 'equipment',
    title: 'What equipment do you have access to?',
    description: 'We\'ll customize your workouts based on available equipment.',
    options: [
      { 
        id: 'full_gym', 
        label: 'Full Gym Access',
        description: 'Access to a complete gym with machines, free weights, and cardio equipment'
      },
      { 
        id: 'home_gym', 
        label: 'Basic Home Gym',
        description: 'Some equipment like dumbbells, resistance bands, or a pull-up bar'
      },
      { 
        id: 'minimal', 
        label: 'Minimal/No Equipment',
        description: 'Bodyweight exercises and minimal equipment workouts'
      },
      { 
        id: 'park', 
        label: 'Outdoor/Park Gym',
        description: 'Access to outdoor fitness equipment or prefer working out outside'
      }
    ]
  },
  {
    id: 'schedule',
    title: 'How often can you work out?',
    description: 'Be realistic - consistency is more important than frequency.',
    options: [
      { 
        id: '2-3', 
        label: '2-3 times/week',
        description: 'Great for beginners or busy schedules'
      },
      { 
        id: '3-4', 
        label: '3-4 times/week',
        description: 'Ideal for balanced progress and recovery'
      },
      { 
        id: '4-5', 
        label: '4-5 times/week',
        description: 'Perfect for faster progress and dedicated training'
      },
      { 
        id: '5+', 
        label: '5+ times/week',
        description: 'For advanced trainers with good recovery capacity'
      }
    ]
  },
  {
    id: 'limitations',
    title: 'Do you have any physical limitations?',
    description: 'This helps us ensure your workout plan is safe and appropriate.',
    options: [
      { 
        id: 'none', 
        label: 'No Limitations',
        description: 'Free to perform all types of exercises'
      },
      { 
        id: 'back', 
        label: 'Back Issues',
        description: 'Need modifications for back-intensive exercises'
      },
      { 
        id: 'joints', 
        label: 'Joint Problems',
        description: 'Require low-impact alternatives'
      },
      { 
        id: 'other', 
        label: 'Other Limitations',
        description: 'We\'ll focus on exercises you can perform safely'
      }
    ]
  },
  {
    id: 'preferences',
    title: 'What\'s your preferred workout style?',
    description: 'Choose the type of workouts you enjoy most.',
    options: [
      { 
        id: 'traditional', 
        label: 'Traditional Splits',
        description: 'Classic bodypart splits with focused workouts'
      },
      { 
        id: 'functional', 
        label: 'Functional Training',
        description: 'Movement-based exercises for overall fitness'
      },
      { 
        id: 'hiit', 
        label: 'High Intensity (HIIT)',
        description: 'Short, intense workouts with cardio elements'
      },
      { 
        id: 'strength', 
        label: 'Pure Strength',
        description: 'Focus on compound movements and heavy lifting'
      }
    ]
  },
  {
    id: 'email',
    title: 'Last step! Enter your email to save your personalized plan',
    type: 'email',
    description: 'We\'ll create your account and customize your workout plan based on your preferences. Your plan will include:',
    bulletPoints: [
      'Personalized workout routines',
      'Progress tracking tools',
      'Exercise tutorials and form guides',
      'Customized nutrition tips'
    ]
  }
]

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const supabase = createClientComponentClient<Database>()
  
  // Try to restore answers from URL parameters
  const savedAnswers = searchParams.get('answers')
  const initialAnswers = savedAnswers ? JSON.parse(savedAnswers) : {}
  
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Answers>({
    fitness_goals: [],
    experience_level: null,
    equipment_access: null,
    workout_frequency: null,
    physical_limitations: null,
    workout_preferences: null,
    email: ''
  })

  const currentStepData = steps[currentStep]
  const progress = (currentStep / (steps.length - 1)) * 100

  const handleOptionClick = (stepId: string, optionId: string) => {
    switch (stepId) {
      case 'goals':
        if (answers.fitness_goals.includes(optionId)) {
          setAnswers(prev => ({
            ...prev,
            fitness_goals: prev.fitness_goals.filter(id => id !== optionId)
          }))
        } else {
          setAnswers(prev => ({
            ...prev,
            fitness_goals: [...prev.fitness_goals, optionId]
          }))
        }
        break
      case 'experience':
        setAnswers(prev => ({
          ...prev,
          experience_level: optionId as ExperienceLevel
        }))
        break
      case 'equipment':
        setAnswers(prev => ({
          ...prev,
          equipment_access: optionId as EquipmentAccess
        }))
        break
      case 'schedule':
        setAnswers(prev => ({
          ...prev,
          workout_frequency: optionId as WorkoutFrequency
        }))
        break
      case 'limitations':
        setAnswers(prev => ({
          ...prev,
          physical_limitations: optionId as PhysicalLimitations
        }))
        break
      case 'preferences':
        setAnswers(prev => ({
          ...prev,
          workout_preferences: optionId as WorkoutPreferences
        }))
        break
    }
  }

  const isOptionSelected = (stepId: string, optionId: string): boolean => {
    switch (stepId) {
      case 'goals':
        return answers.fitness_goals.includes(optionId)
      case 'experience':
        return answers.experience_level === optionId
      case 'equipment':
        return answers.equipment_access === optionId
      case 'schedule':
        return answers.workout_frequency === optionId
      case 'limitations':
        return answers.physical_limitations === optionId
      case 'preferences':
        return answers.workout_preferences === optionId
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      
      // Clear any previous logs
      console.clear()
      console.log('%c Onboarding Submission Started ', 'background: #222; color: #bada55')
      console.log('Submitting preferences:', answers)
      
      // Save preferences
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      })

      const data = await response.json()
      console.log('%c API Response ', 'background: #222; color: #bada55', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save preferences')
      }

      // Add a delay to ensure the database write is complete
      console.log('%c Waiting for database write to complete... ', 'background: #222; color: #bada55')
      await new Promise<void>(resolve => setTimeout(resolve, 2000))

      // Verify the preferences were saved by making a test query
      const testResponse = await fetch(`/api/preferences?email=${encodeURIComponent(answers.email)}`, {
        method: 'GET',
      })
      
      const testData = await testResponse.json()
      console.log('%c Verifying preferences were saved: ', 'background: #222; color: #bada55', testData)

      if (!testResponse.ok || !testData) {
        throw new Error('Failed to verify preferences were saved')
      }

      // Add a longer delay and show countdown
      console.log('%c Starting 10 second countdown before redirect... ', 'background: #222; color: #bada55')
      
      await new Promise<void>((resolve) => {
        let count = 10
        const interval = setInterval(() => {
          // Check if cookie exists
          const allCookies = document.cookie
          const userEmailCookie = allCookies
            .split('; ')
            .find(row => row.startsWith('user_email='))
          
          console.log(
            `%c COUNTDOWN: ${count} SECONDS REMAINING `,
            'background: #222; color: #bada55; font-size: 14px; font-weight: bold;'
          )
          console.log({
            allCookies: allCookies || 'none',
            userEmailCookie: userEmailCookie || 'not found',
            cookieValue: userEmailCookie?.split('=')[1] || 'none'
          })
          
          count--
          if (count < 0) {
            clearInterval(interval)
            resolve()
          }
        }, 1000)
      })

      console.log('%c Countdown completed! ', 'background: #222; color: #bada55')

      // Store debug info in sessionStorage to persist through redirect
      const debugInfo = {
        timestamp: new Date().toISOString(),
        preferences: answers,
        apiResponse: data,
        finalCookieStatus: {
          allCookies: document.cookie,
          userEmailCookie: document.cookie
            .split('; ')
            .find(row => row.startsWith('user_email=')),
        }
      }

      console.log('%c Storing debug info before redirect: ', 'background: #222; color: #bada55', debugInfo)
      sessionStorage.setItem('onboardingDebug', JSON.stringify(debugInfo))

      // Use window.location for a full page navigation
      console.log('%c 🚀 Redirecting to dashboard NOW! 🚀 ', 'background: #222; color: #bada55; font-size: 16px; font-weight: bold;')
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('%c Error: ', 'background: #222; color: #ff0000', error)
      setError(error instanceof Error ? error.message : 'Failed to save preferences')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const isNextDisabled = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case 'goals':
        return answers.fitness_goals.length === 0
      case 'experience':
        return !answers.experience_level
      case 'equipment':
        return !answers.equipment_access
      case 'schedule':
        return !answers.workout_frequency
      case 'limitations':
        return !answers.physical_limitations
      case 'preferences':
        return !answers.workout_preferences
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !answers.email || !emailRegex.test(answers.email)
      default:
        return false
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setError('Email is required')
      return false
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    setError(null)
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setAnswers(prev => ({ ...prev, email }))
    validateEmail(email)
  }

  return (
    <div className="container relative min-h-screen">
      <Progress value={progress} className="fixed left-0 right-0 top-0" />
      
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-between p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{steps[currentStep].title}</h1>
              <p className="text-muted-foreground">{steps[currentStep].description}</p>
            </div>

            {steps[currentStep].type === 'email' ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={answers.email}
                    onChange={handleEmailChange}
                    className={cn(
                      "h-12",
                      error ? "border-red-500 focus-visible:ring-red-500" : ""
                    )}
                  />
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                </div>
                
                {steps[currentStep].bulletPoints && (
                  <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                    <ul className="list-inside list-disc space-y-2">
                      {steps[currentStep].bulletPoints.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {steps[currentStep].options?.map((option) => (
                  <Button
                    key={option.id}
                    variant={isOptionSelected(steps[currentStep].id, option.id) ? "default" : "outline"}
                    className={cn(
                      "h-auto w-full justify-start gap-4 rounded-lg border p-4 text-left",
                      isOptionSelected(steps[currentStep].id, option.id)
                        ? "border-primary bg-primary/5 hover:bg-primary/10"
                        : "border-border/50 hover:border-border hover:bg-muted/50"
                    )}
                    onClick={() => handleOptionClick(steps[currentStep].id, option.id)}
                  >
                    <div className="flex w-full items-center">
                      {option.icon && (
                        <div className={cn(
                          "flex h-5 w-5 items-center justify-center",
                          isOptionSelected(steps[currentStep].id, option.id)
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}>
                          <option.icon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="ml-4 flex-1">
                        <span className="font-medium">{option.label}</span>
                        {option.description && (
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        )}
                      </div>
                      {isOptionSelected(steps[currentStep].id, option.id) && (
                        <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={isNextDisabled() || loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 