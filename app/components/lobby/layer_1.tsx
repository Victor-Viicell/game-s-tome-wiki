import { MdNewReleases } from 'react-icons/md'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'
import { IoLogoGameControllerB } from 'react-icons/io'
import { Link } from '@remix-run/react'
import { ReactElement } from 'react'

type Links = {
  title: string
  icon: ReactElement
  description: string
  route: string
  bgColor: string
}

export function LinkButton(props: Links) {
  const { title, icon, description, bgColor, route } = props
  return (
    <Link
      to={route}
      className="group flex h-full flex-1 flex-row rounded-sm bg-gd-container p-1 gap-1 hover:bg-gd-collapsable xl:flex-col"
    >
      <div
        className="flex aspect-square flex-col rounded-smxl:w-full"
      >
        <div className={`flex h-full w-full ${bgColor} rounded-sm p-2`}>
          {icon}
        </div>
      </div>
      <div className="group flex h-full w-full flex-row gap-1 rounded-sm bg-gd-content p-1 xl:flex-col">
        <div className="flex h-full w-full flex-col">
          <p className="h-fit w-full rounded-sm bg-gd-header-1 px-2 py-1 text-center font-victor-mono text-[10px] font-bold text-gd-white">
            {title}
          </p>
          <p className="bg-gd-header-3 h-fit w-full rounded-sm px-2 py-1 text-center font-victor-mono text-[5px] text-gd-white">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export function LinkButtons() {
  return (
    <div className="flex flex-[1.5] flex-col gap-1 rounded-sm xl:flex-row">
      <LinkButton
        title="GAMES"
        icon={<IoLogoGameControllerB className="h-full w-full text-gd-white" />}
        description="Games"
        route="/wikis"
        bgColor="bg-gd-violet"
      />
      <LinkButton
        title="VIDEOS"
        icon={
          <MdOutlineOndemandVideo className="h-full w-full text-gd-white" />
        }
        description="Videos"
        route="/main/videos"
        bgColor="bg-gd-red"
      />
      <LinkButton
        title="LANÇAMENTOS"
        icon={<MdNewReleases className="h-full w-full text-gd-white" />}
        description="Lancamentos"
        route="/main/lancamentos"
        bgColor="bg-gd-green"
      />
      <LinkButton
        title="DISCORD"
        icon={<FaDiscord className="h-full w-full text-gd-white" />}
        description="Discord"
        route="/main/lobby"
        bgColor="bg-gd-purple"
      />
    </div>
  )
}

export function About() {
  return (
    <div className="flex h-full flex-[2] flex-col justify-center text-center">
      <h1 className="p-3 px-2 font-press-start-2p text-3xl font-bold text-gd-white">
        GAME'S TOME
      </h1>
      <h1 className="p-3 px-2 font-press-start-2p text-2xl font-bold text-gd-logo-blue">
        &gt;&gt;&gt; Wiki &lt;&lt;&lt;
      </h1>
      <p className="p-3 font-victor-mono text-xl text-gd-white">
        Bem-vindo ao Gamer’s Tome! Uma wikipedia para gamers. Participe de nossa
        comunidade e compartilhe seu conhecimento.
      </p>
    </div>
  )
}

export default function Layer1() {
  return (
    <div className="flex h-fit w-full flex-row">
      <div className="flex h-full w-full rounded-sm bg-gd-content p-2">
        <LinkButtons />
        <About />
      </div>
    </div>
  )
}
