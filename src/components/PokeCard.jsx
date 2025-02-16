import { useEffect, useState } from "react";
import { getPokedexNumber } from "../utils";

export function PokeCard(props) {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return <div></div>;
}
