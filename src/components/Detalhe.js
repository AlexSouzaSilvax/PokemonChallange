/** @format */

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import iconFechar from "../img/iconFechar.png";

export default function Detalhe({
  pokemonSelecionado,
  detalhe,
  setDetalhe,
  loading,
}) {
  return (
    <Dialog
      open={detalhe}
      onClose={setDetalhe}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {loading ? (
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <h4>Aguarde...</h4>
            </DialogContentText>
          </DialogContent>
      ) : (
        <DialogContent>
          <div className="btnSair">
            <a
              onClick={(ev) => {
                ev.preventDefault();
                setDetalhe();
              }}
              href='/'
            >
              <img
                src={iconFechar}
                width='30px'
                height='30px'
                alt='icone fechar'
              />
            </a>
          </div>
          <DialogContentText id='alert-dialog-description'>
            <h1>{pokemonSelecionado.name}</h1>
          </DialogContentText>
          <div style={{ columns: 2 }}>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonSelecionado.id}.png`}
                width='150px'
                height='150px'
                alt='imagem pokemon'
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <DialogContentText id='alert-dialog-description'>
                HP: {pokemonSelecionado.hp}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Attack: {pokemonSelecionado.attack}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Defense: {pokemonSelecionado.defense}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Speed: {pokemonSelecionado.speed}
              </DialogContentText>
            </div>
          </div>

          <div style={{ columns: 2 }}>
            <div>
              <DialogContentText id='alert-dialog-description'>
                Abilities: {pokemonSelecionado.abilities}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Evs: {pokemonSelecionado.evs}
              </DialogContentText>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <DialogContentText id='alert-dialog-description'>
                Height: {pokemonSelecionado.height}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Weight: {pokemonSelecionado.weight}
              </DialogContentText>
            </div>
          </div>
          <DialogContentText
            id='alert-dialog-description'
            style={{ marginTop: "10px" }}
          >
            {pokemonSelecionado.description}
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}
