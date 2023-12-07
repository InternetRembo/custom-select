import Logoproqio from '/src/assets/logos/Logoproqio.png'
import PokemonTrainerForm from "./PokemonTrainerForm/PokemonTrainerForm";

function App() {
  return (
    <div className={' h-[100vh] flex justify-center bg-gradient-to-b from-yellow-300 to-orange-500 items-center gap-20 bg-gray-200'} >
        <img className={'absolute top-3 left-2 h-[80px]'} src={Logoproqio} alt={'logo'}/>
        <PokemonTrainerForm/>
    </div>
  )
}

export default App
