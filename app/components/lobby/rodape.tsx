export default function Rodape() {
  return (
    <div className="flex h-fit w-full flex-row">
      <div className="flex h-full w-full flex-col rounded-sm bg-gd-header-2 p-1 text-center items-center text-sm text-gd-purple">
        <h1 className="text-gd-white bg-gd-header-1 w-fit px-2 rounded-sm items-center mb-2">Desenvolvido por</h1>

        <div className="flex flex-row gap-1 text-center w-full">
          <div className="flex flex-1 flex-col gap-1">
            <p>Paulo Lucas Fernandes Moura</p>
            <p>Joel Caldas França</p>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p>Victor Lucas Gomes da Silva</p>
            <p>Eduardo Alves Silva Gomes</p>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p>Matheus Otávio Perdigão Barros Costa</p>

            <p>Derick Matheus Nunes de Souza</p>
          </div>
        </div>
      </div>
    </div>
  );
}
