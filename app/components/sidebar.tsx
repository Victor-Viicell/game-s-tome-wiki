export function OpenWiki() {
  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-sm bg-gd-content p-1">
      <p className="h-fit w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
        Open Pages
      </p>
    </div>
  )
}

export function Container() {
  return (
    <div className="flex h-full w-full flex-1 flex-col rounded-sm bg-gd-content p-1">
      <p className="h-fit w-full rounded-sm bg-gd-header-1 text-center text-gd-white">
        Menu
      </p>
    </div>
  )
}

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col gap-1 overflow-hidden">
      <Container />
      <OpenWiki />
    </div>
  )
}
