export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden rounded-sm bg-gd-container p-1">
      <div className="flex h-full w-full flex-col gap-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export function Xresize({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-0 mr-1 flex h-full w-full min-w-12 max-w-60 resize-x overflow-hidden rounded-sm bg-gd-container p-1">
      {children}
    </div>
  )
}