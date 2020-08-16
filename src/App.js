/** @format */

import React, { useState, useEffect } from "react";

import Topo from "./components/Topo";
import Load from "./components/Load";
import Card from "./components/Card";
import Detalhe from "./components/Detalhe";

import { filter } from "./service/Util";
import { api } from "./service/Api";

import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]); //api
  const [pokemonsP, setPokemonsP] = useState([]); //pesquisa
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const [detalhe, setDetalhe] = useState(false);
  const [pokemonSelecionado, setPokemonSelecionado] = useState({});

  useEffect(() => {
    getPokemons();
  }, []);

  async function getPokemons() {
    await api
      .get("/pokemon?limit=807") //?limit=807
      .then((response) => {
        setPokemons(response.data["results"]);
        setPokemonsP(response.data["results"]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Não conseguimos encontrar os pokemons");
      });
  }

  function pesquisar(param) {
    setPesquisa(param);
    setPokemonsP(filter(param, pokemons));
  }

  const listaPokemons = pokemonsP.map((p) => {
    const id = p.url.split("/")[p.url.split("/").length - 2];
    return (
      <Card
        key={p.name}
        p={p}
        id={id}
        onClickDetalhe={(ev) => {
          ev.preventDefault();
          setDetalhe(true);
          setPokemonSelecionado({ id, name: p.name });
        }}
      />
    );
  });

  return (
    <div>
      <Topo pesquisa={pesquisa} setPesquisa={(e) => pesquisar(e)} />
      {loading ? <Load /> : <ul className='pokemon-list'>{listaPokemons}</ul>}
      <Detalhe
        pokemonSelecionado={pokemonSelecionado}
        detalhe={detalhe}
        setDetalhe={setDetalhe}
      />
    </div>
  );
}
