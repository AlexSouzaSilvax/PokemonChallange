/** @format */

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import iconFechar from "../img/iconFechar.png";

export default function Detalhe({
  selectedPokemon,
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
          <div className='btnSair'>
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
            <h1>{selectedPokemon.name}</h1>
          </DialogContentText>
          <div style={{ columns: 2 }}>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                width='150px'
                height='150px'
                alt='imagem pokemon'
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <DialogContentText id='alert-dialog-description'>
                HP: {selectedPokemon.hp}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Attack: {selectedPokemon.attack}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Defense: {selectedPokemon.defense}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Speed: {selectedPokemon.speed}
              </DialogContentText>
            </div>
          </div>

          <div style={{ columns: 2 }}>
            <div>
              <DialogContentText id='alert-dialog-description'>
                Abilities: {selectedPokemon.abilities}
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Evs: {selectedPokemon.evs}
              </DialogContentText>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <DialogContentText id='alert-dialog-description'>
                Height: {selectedPokemon.height} ft
              </DialogContentText>
              <DialogContentText id='alert-dialog-description'>
                Weight: {selectedPokemon.weight} lbs
              </DialogContentText>
            </div>
          </div>
          <DialogContentText
            id='alert-dialog-description'
            style={{ marginTop: "10px" }}
          >
            {selectedPokemon.description}
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}
