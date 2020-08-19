/** @format */

export function filter(val, data) {
  return data.filter((el) => {
    return !!val.length ? objectValues(el).includes(strOp(val)) : true;
  });
}

function strOp(str) {
  return str.toString().replace(/\s/g, "").toLowerCase();
}

function objectValues(value) {
  return Object.values(value).reduce((string, val) => {
    const test = val !== null && val !== undefined;
    return (
      string +
      (typeof val === "object" && val !== null
        ? strOp(objectValues(val))
        : test
        ? strOp(val)
        : "")
    );
  }, "");
}

export function getInfoPokemonss(data) {
  var { hp, attack, defense, speed } = "";
  data.map((stat) => {
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
    return { hp: hp, attack: attack, defense: defense, speed: speed };
  });
}

export function getInfoPokemons(data, param) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].stat.name === param) {
      return data[i].base_stat;
    }
  }
}

export function calcHeihtWheight(data, param) {
  return Math.round((data * param + 0.00001) * 100) / 100;
}

export function filterEvs(data) {
  let values = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].effort > 0) {
      values.push(
        `${data[i].effort} ${data[i].stat.name
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`
      );
    }
  }
  return values.join(", ");
}

export function filterAbilities(data) {
  let values = [];
  for (var i = 0; i < data.length; i++) {
    values.push(
      data[i].ability.name
        .toLowerCase()
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")
    );
  }
  return values.join(", ");
}

export function getIdPokemon(param) {
  return param.split("/")[param.split("/").length - 2];
}

export function getNamePokemon(param) {
  return param.charAt(0).toUpperCase() + param.slice(1);
}
