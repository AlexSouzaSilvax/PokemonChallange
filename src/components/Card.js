/** @format */

import React from "react";
export default function Card({ p, id, onClickDetalhe }) {
  return (
    <li
      style={{
        backgroundColor: "#F3F3F3",
        margin: 10,
        padding: 10,
        borderRadius: 6,
        width: "150px",
      }}
    >
      <a onClick={e => onClickDetalhe(e)} href="/">
        <header
          style={{
            backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png)`,
          }}
        />
        <strong>{p.name}</strong>
      </a>
    </li>
  );
}
