import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";

export default function PokeCard(props) {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  useEffect(() => {
    // if loading, we're gonna exit loop
    if (loading || !localStorage) {
      return;
    }
    // check if selected pokemon information is in the cache
    // 1. define the cache
    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }
    // 2. check if the selected pokemon is in the cache, else fetch from api
    if (selectedPokemon in cache) {
      //read from cache
      setData(cache[selectedPokemon]);
      return;
    }
    //fetch data from api
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseURL = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalUrl = baseURL + suffix;
        const response = await fetch(finalUrl);
        const pokemonData = await response.json();
        setData(pokemonData);
        console.log(pokemonData);

        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
    // 3. if we fetch from the api, make sure to save the information to the cache
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
        <div className="type-container">
          {types.map((type, typeIndex) => {
            return <TypeCard key={typeIndex} type={type} />;
          })}
        </div>
      </div>
    </div>
  );
}
