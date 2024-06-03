export default function Xresize({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-0 mr-1 flex h-full w-full min-w-12 max-w-60 resize-x overflow-hidden rounded-sm bg-gd-container p-1">
      {children}
    </div>
  )
}