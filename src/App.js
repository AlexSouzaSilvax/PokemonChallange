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
        console.log(error);
        alert("Não conseguimos encontrar os pokemons");
      });
  }

  function pesquisar(param) {
    setPesquisa(param);
    setPokemonsP(filter(param, pokemons));
  }

  async function buscarPokemon(id, name) {
    setLoadingDetalhe(true);
    setDetalhe(true);
    await api
      .get(`/pokemon/${id}`)
      .then((response) => {
        let { hp, attack, defense, speed } = "";

        response.data.stats.map((stat) => {
          switch (stat.stat.name) {
            case "hp":
              hp = stat["base_stat"];
              break;
            case "attack":
              attack = stat["base_stat"];
              break;
            case "defense":
              defense = stat["base_stat"];
              break;
            case "speed":
              speed = stat["base_stat"];
              break;
            default:
              break;
          }
        });

        /*console.log(
          "--------------------------------------------------> DADOS = hp: " +
            hp +
            ", attack: " +
            attack +
            ", defense: " +
            defense +
            ", speed: " +
            speed
        );*/

        const height =
          Math.round((response.data.height * 0.328084 + 0.00001) * 100) / 100;

        const weight =
          Math.round((response.data.weight * 0.220462 + 0.00001) * 100) / 100;

        const evs = response.data.stats
          .filter((stat) => {
            if (stat.effort > 0) {
              return true;
            }
            return false;
          })
          .map((stat) => {
            return `${stat.effort} ${stat.stat.name
              .toLowerCase()
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")}`;
          })
          .join(", ");

        const abilities = response.data.abilities
          .map((ability) => {
            return ability.ability.name
              .toLowerCase()
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");
          })
          .join(", ");

        getDescricaoPokemon(
          id,
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          evs,
          abilities
        );
      })
      .catch((error) => {
        console.log("-------------------> error buscarPokemon: " + error);
      });
  }

  async function getDescricaoPokemon(
    id,
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    evs,
    abilities
  ) {
    let res = await api.get(`/pokemon-species/${id}/`);
    res.data.flavor_text_entries.some((flavor) => {
      if (flavor.language.name === "en") {
        setPokemonSelecionado({
          id,
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          evs,
          abilities,
          description: flavor.flavor_text,
        });
        setLoadingDetalhe(false);
      }
    });
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
          buscarPokemon(id, p.name);
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
        loading={loadingDetalhe}
      />
    </div>
  );
}
