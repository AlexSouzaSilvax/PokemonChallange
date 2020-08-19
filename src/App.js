/** @format */

import React, { useState, useEffect } from "react";

import Topo from "./components/Topo";
import Load from "./components/Load";
import Card from "./components/Card";
import Detalhe from "./components/Detalhe";

import {
  filter,
  getInfoPokemons,
  calcHeihtWheight,
  filterEvs,
  filterAbilities,
  getIdPokemon,
  getNamePokemon,
} from "./service/Util";
import { api } from "./service/Api";

import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]); //api
  const [pokemonsP, setPokemonsP] = useState([]); //pesquisa
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [detalhe, setDetalhe] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [loadingDetalhe, setLoadingDetalhe] = useState(false);

  useEffect(() => {
    getPokemons();
  }, []);

  async function getPokemons() {
    await api
      .get("/pokemon?limit=352") //?limit=807
      .then((response) => {
        setPokemons(response.data["results"]);
        setPokemonsP(response.data["results"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Não conseguimos encontrar os pokemons");
      });
  }

  function researching(param) {
    setSearch(param);
    setPokemonsP(filter(param, pokemons));
  }

  async function getPokemon(id, name) {
    setLoadingDetalhe(true);
    setDetalhe(true);
    await api
      .get(`/pokemon/${id}`)
      .then((response) => {
        getPokemonsEspecies(id, name, response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getPokemonsEspecies(id, name, data) {
    let response = await api.get(`/pokemon-species/${id}/`);
    response.data.flavor_text_entries.some((flavor) => {
      if (flavor.language.name === "en") {
        setSelectedPokemon({
          id,
          name,
          hp: getInfoPokemons(data.stats, "hp"),
          attack: getInfoPokemons(data.stats, "attack"),
          defense: getInfoPokemons(data.stats, "defense"),
          speed: getInfoPokemons(data.stats, "speed"),
          height: calcHeihtWheight(data.height, 0.328084),
          weight: calcHeihtWheight(data.weight, 0.220462),
          evs: filterEvs(data.stats),
          abilities: filterAbilities(data.abilities),
          description: flavor.flavor_text,
        });
        setLoadingDetalhe(false);
      }
      return "";
    });
  }

  const listPokemons = pokemonsP.map((p) => {
    const id = getIdPokemon(p.url);
    const name = getNamePokemon(p.name);
    return (
      <Card
        key={p.name}
        name={name}
        id={id}
        onClickDetalhe={(ev) => {
          ev.preventDefault();
          getPokemon(id, name);
        }}
      />
    );
  });

  return (
    <>
      <Topo search={search} setSearch={(e) => researching(e)} />
      {loading ? (
        <Load />
      ) : (
        <div className='pokemon-list'>
          <ul>{listPokemons}</ul>
        </div>
      )}
      <Detalhe
        selectedPokemon={selectedPokemon}
        detalhe={detalhe}
        setDetalhe={() => setDetalhe(!detalhe)}
        loading={loadingDetalhe}
      />
    </>
  );
}
