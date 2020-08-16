/** @format */

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Detalhe({
  pokemonSelecionado,
  detalhe,
  setDetalhe,
}) {
  return (
    <Dialog
      open={detalhe}
      onClose={() => setDetalhe(!detalhe)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {`${pokemonSelecionado.id} ${pokemonSelecionado.name}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Let Google help apps determine location. This means sending Let Google
          help apps determine location. This means sending anonymous location
          data to Google, even when no apps are running. Let Google help apps
          determine location. This means sending anonymous location data to
          Google, even when no apps are running. Let Google help apps determine
          location. This means sending anonymous location data to Google, even
          when no apps are running. Let Google help apps determine location.
          This means sending anonymous location data to Google, even when no
          apps are running. Let Google help apps determine location. This means
          sending anonymous location data to Google, even when no apps are
          running. Let Google help apps determine location. This means sending
          anonymous location data to Google, even when no apps are running. Let
          Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running. Let Google
          help apps determine location. This means sending anonymous location
          data to Google, even when no apps are running. Let Google help apps
          determine location. This means sending anonymous location data to
          Google, even when no apps are running. anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
