// Hacer una matriz de 4*4
const $tabla = document.querySelector(".tabla");

function numeros() {
  let nums = arrayNumsorden();

  //Volvemos esos numeros aleatorios
  let aleat = [];
  while (nums.length > 0) {
    let indice = Math.floor(Math.random() * nums.length);
    let almacAleat = nums.splice(indice, 1)[0];
    aleat.push(almacAleat);
  }
  return aleat;
}

let position = 0;
let $input;
function ejecutarNumeros() {
  let ejecNumeros = numeros();
  for (let i = 0; i < 16; i++) {
    $input = document.createElement("input");
    $input.type = "button";
    $input.value = ejecNumeros[i];
    $input.id = `a_${[i]}`;
    $tabla.appendChild($input);
    if (ejecNumeros[i] == "") {
      $input.className = "Blanco";
      position = [i];
    }
  }
}
ejecutarNumeros();

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  position = mover(position);
  function mover(position) {
    if (position != 0 && position != 1 && position != 2 && position != 3) {
      if (e.key == "ArrowDown" || e.keyCode == 83) {
        MoverA(position, 4, 0);
      }
    }
    if (position != 12 && position != 13 && position != 14 && position != 15) {
      if (e.key == "ArrowUp" || e.keyCode == 87) {
        MoverA(position, 4, 1);
      }
    }
    if (position != 0 && position != 4 && position != 8 && position != 12) {
      if (e.key == "ArrowRight" || e.keyCode == 68) {
        MoverA(position, 1, 0);
      }
    }
    if (position != 3 && position != 7 && position != 11 && position != 15) {
      if (e.key == "ArrowLeft" || e.keyCode == 65) {
        MoverA(position, 1, 1);
      }
    }

    let position2 = reAsignarId();
    return position2;
  }
  let NumsOrden = arrayNumsorden();
  let comparador = comparadorFun();
  let final = 0;

  for (let i = 0; i < 15; i++) {
    if (NumsOrden[i] === comparador[i]) {
      final++;
    }
  }

  var end;
  if (final === 15) {
    end = Date.now() + 15 * 1000;

    // go Buckeyes!
    var colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
    let canvas = document.querySelector("canvas");
    canvas.style.display = "inline";
    setTimeout(() => {
      Swal.fire({
          title: "HAZ GANADO?",
          text: "¿Quieres jugar de nuevo?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "SI",
          cancelButtonText: "NO"
      }).then((result) => {
            if (result.isConfirmed) {
              canvas.style.display = "none";
              let inputs = document.querySelectorAll("input");
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].parentNode.removeChild(inputs[i]);
              }
              ejecutarNumeros();
            }
        });
    }, 300);
  }
});

function comparadorFun() {
  let arrayComparador = [];
  for (let i = 0; i < 16; i++) {
    let $input = document.querySelector(`#a_${i}`);
    $input = parseInt($input.value);
    arrayComparador.push($input);
  }
  return arrayComparador;
}

function arrayNumsorden() {
  let nums = [];
  for (let i = 1; i <= 15; i++) {
    nums.push(i);
  }
  nums[15] = "";
  return nums;
}

function MoverA(position, num, operador) {
  position = parseInt(position);
  let NumBoton = "";
  if (operador === 0) {
    NumBoton = document.querySelector(`#a_${position - num}`);
  } else {
    NumBoton = document.querySelector(`#a_${position + num}`);
  }
  let numBlanco = document.querySelector(`#a_${position}`);

  numBlanco.value = NumBoton.value;
  NumBoton.value = "";
}

function reAsignarId() {
  let chao = document.querySelector(".Blanco");
  chao.classList.remove("Blanco");

  for (let i = 0; i < 16; i++) {
    let $input = document.querySelector(`#a_${i}`);
    // $input.setAttribute(`id`, `a_${[i]}`);
    if ($input.value == "") {
      $input.className = "Blanco";
      position = [i];
    }
  }
  return position;
}
