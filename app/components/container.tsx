export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden rounded-sm bg-gd-container p-1">
      <div className="flex h-full w-full flex-col gap-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
