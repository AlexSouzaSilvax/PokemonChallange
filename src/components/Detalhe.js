/** @format */

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function Detalhe({
  pokemonSelecionado,
  detalhe,
  setDetalhe,
  loading,
}) {
  return (
    <Dialog
      open={detalhe}
      onClose={() => setDetalhe(!detalhe)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {loading ? (
        <div className='loadDetalhe'>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <h4>Aguarde...</h4>
            </DialogContentText>
          </DialogContent>
        </div>
      ) : (
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <h1>{pokemonSelecionado.name}</h1>
          </DialogContentText>
          <div style={{ columns: 2 }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonSelecionado.id}.png`}
              width='200px'
              height='200px'
              alt='imagem pokemon'
            />
            <p>HP: {pokemonSelecionado.hp}</p>
            <p>Attack: {pokemonSelecionado.attack}</p>
            <p>Defense: {pokemonSelecionado.defense}</p>
            <p>Speed: {pokemonSelecionado.speed}</p>
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
            <div>
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
