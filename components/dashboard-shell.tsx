interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({
  children,
  className,
}: DashboardShellProps) {
  return (
    <div className="grid items-start gap-8">
      {children}
    </div>
  )
} 