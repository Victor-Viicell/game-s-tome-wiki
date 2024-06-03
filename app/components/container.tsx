export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden rounded-sm bg-gd-container p-1">
      <div className="flex flex-col gap-1 overflow-y-scroll">
        {children}
      </div>
    </div>
  )
}
