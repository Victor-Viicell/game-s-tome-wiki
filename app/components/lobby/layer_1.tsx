export function LinkButtons() {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-sm font-victor-mono text-xl text-gd-white">
      <h1 className="bg-gd-header-1 px-1 rounded-sm">Game's Tome <span className="text-gd-red">v0.10b</span></h1>
      
      <div className="flex flex-col text-sm gap-2 rounded-sm text-gd-green bg-gd-header-2 p-1">
        <h2 className="text-xl text-gd-yellow">Em breve:</h2>
        <p>Filro</p>
        <p>Ver perfil de usuários</p>
        <p>Avaliação de wiki</p>
        <p>Paginas abertas</p>
        <p>Videos da comunidade</p>
        <p>Formatação com Markdown</p>
        <p>Personalizaçao de perfil</p>
      </div>
    </div>
  );
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
  );
}

export default function Layer1() {
  return (
    <div className="flex h-fit w-full flex-row">
      <div className="flex h-full w-full rounded-sm bg-gd-content p-2">
        <LinkButtons />
        <About />
      </div>
    </div>
  );
}
