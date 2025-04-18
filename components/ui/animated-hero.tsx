import { motion } from 'framer-motion'
import { MoveRight, Activity, Target, BarChart3, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Hero() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-background/80">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white bg-grid opacity-20" />
        
        {/* Wave layers */}
        <motion.div
          className="absolute -inset-[25%] origin-center"
          animate={{
            scale: [0.8, 1.5, 0.8],
            rotate: [0, 15, 0],
            x: [-100, 100, -100],
            y: [-100, 100, -100]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/90 via-primary/50 to-transparent blur-xl" />
        </motion.div>

        <motion.div
          className="absolute -inset-[25%] origin-center"
          animate={{
            scale: [1.5, 0.8, 1.5],
            rotate: [0, -15, 0],
            x: [100, -100, 100],
            y: [100, -100, 100]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-secondary/80 via-secondary/40 to-transparent blur-xl" />
        </motion.div>

        <motion.div
          className="absolute -inset-[25%] origin-center"
          animate={{
            scale: [1.2, 0.9, 1.2],
            rotate: [10, -10, 10],
            x: [-50, 50, -50],
            y: [50, -50, 50]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-accent/70 via-accent/40 to-transparent blur-xl" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid min-h-[100svh] grid-cols-1 items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12 lg:py-0">
          {/* Left Column - Main Content */}
          <motion.div 
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                <Activity className="h-4 w-4" />
                <span>Transform Your Training Journey</span>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your Personal{' '}
                <span className="text-primary">Training Routine</span>{' '}
                Generator
              </h1>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                Create personalized training routines based on your goals and experience level. Track your progress and achieve your fitness objectives.
              </p>
            </div>
            
            <motion.div 
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button asChild size="lg" className="gap-2 bg-primary/90 hover:bg-primary">
                <Link href="/onboarding">
                  Get Started <MoveRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/20">
                <Link href="/auth">
                  Sign In
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="rounded-lg border border-primary/20 bg-background/50 p-4 backdrop-blur-sm">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="mt-2 text-sm font-semibold sm:text-base">Goal-Focused</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">Tailored to your objectives</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-background/50 p-4 backdrop-blur-sm">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h3 className="mt-2 text-sm font-semibold sm:text-base">Progress Tracking</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">Monitor your growth</p>
              </div>
              <div className="col-span-2 rounded-lg border border-primary/20 bg-background/50 p-4 backdrop-blur-sm sm:col-span-1">
                <Activity className="h-6 w-6 text-primary" />
                <h3 className="mt-2 text-sm font-semibold sm:text-base">Expert Guidance</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">Professional routines</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square w-full max-w-xl">
              {/* Background Circle */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/5 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-primary/20"
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: [0.8 + i * 0.1, 1 + i * 0.1, 0.8 + i * 0.1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}

                {/* Fitness Icons Grid */}
                <div className="relative grid h-4/5 w-4/5 grid-cols-2 gap-4">
                  {[
                    { icon: <Dumbbell className="h-8 w-8" />, delay: 0 },
                    { icon: <Target className="h-8 w-8" />, delay: 0.2 },
                    { icon: <Activity className="h-8 w-8" />, delay: 0.4 },
                    { icon: <BarChart3 className="h-8 w-8" />, delay: 0.6 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-center rounded-2xl bg-background/50 p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay, duration: 0.5 }}
                    >
                      <motion.div
                        className="text-primary"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: item.delay
                        }}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Animated Lines */}
                <div className="absolute h-full w-full">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-px w-full origin-center bg-primary/20"
                      initial={{ rotate: i * 45, scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                      }}
                    />
                  ))}
                </div>

                {/* Center Circle */}
                <motion.div
                  className="absolute h-24 w-24 rounded-full bg-primary/20 backdrop-blur-md"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="absolute inset-1 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
