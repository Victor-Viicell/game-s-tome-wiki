import Layer1 from '../components/lobby/layer_1';
import Rodape from '../components/lobby/rodape';

export default function Lobby() {
  return (
    <div className="flex flex-col overflow-hidden bg-gd-prop p-1 gao-1">
      <Layer1 />
      <Rodape />
    </div>
  );
}
