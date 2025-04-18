"use client"

import { Hero } from '@/components/ui/animated-hero'
import { motion } from 'framer-motion'
import { 
  Dumbbell, 
  Target, 
  LineChart, 
  Users, 
  Clock, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      
      {/* Features Section */}
      <section className="relative py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to achieve your fitness goals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Our platform provides all the tools and guidance you need to create, track, and optimize your training routines.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Dumbbell className="h-6 w-6" />,
                title: "Custom Workouts",
                description: "Create personalized routines based on your goals and equipment"
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Goal Setting",
                description: "Set and track specific fitness objectives with clear milestones"
              },
              {
                icon: <LineChart className="h-6 w-6" />,
                title: "Progress Tracking",
                description: "Monitor your improvements with detailed analytics and charts"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Community Support",
                description: "Connect with like-minded individuals and share experiences"
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Time Management",
                description: "Optimize your workout duration and rest periods"
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "AI Assistance",
                description: "Get intelligent suggestions for exercise variations"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-start rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-primary/5"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start your fitness journey in three simple steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Getting started with your personalized training routine is easy and straightforward.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl grid gap-8 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Set Your Goals",
                description: "Define your fitness objectives and preferences"
              },
              {
                number: "02",
                title: "Get Your Plan",
                description: "Receive a customized workout routine"
              },
              {
                number: "03",
                title: "Track Progress",
                description: "Monitor your improvements and adjust as needed"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="absolute -right-4 top-8 hidden h-8 w-8 text-primary/30 sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl relative overflow-hidden rounded-3xl bg-primary/5 px-6 py-12 backdrop-blur-sm sm:px-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to transform your training?
                </h2>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Join thousands of users who have already improved their fitness journey with our platform.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
                <div className="mt-8 flex items-center justify-center gap-x-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm">Free to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm">No credit card required</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
