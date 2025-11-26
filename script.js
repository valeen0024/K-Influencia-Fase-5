// Cuando la página termina de cargarse, activamos todo
document.addEventListener("DOMContentLoaded", function () {
  initDropdownMenu();
  initWelcomeMessage();
  initSlider();
});

//
// 1. MENÚ DESPLEGABLE (TENDENCIAS)
//
function initDropdownMenu() {
  var dropdown = document.querySelector(".has-dropdown");
  if (!dropdown) return;

  var menu = dropdown.querySelector(".dropdown-menu");

  // Mostrar menú cuando el mouse está encima
  dropdown.addEventListener("mouseover", function () {
    menu.classList.add("open");
  });

  // Ocultar menú cuando el mouse sale
  dropdown.addEventListener("mouseout", function () {
    menu.classList.remove("open");
  });
}

//
// 2. MENSAJE DE BIENVENIDA SEGÚN LA HORA
//
function initWelcomeMessage() {
  var mensaje = document.getElementById("welcome-message");
  if (!mensaje) return; // si en esa página no existe, no hace nada

  var hora = new Date().getHours();
  var saludo = "";

  if (hora < 12) {
    saludo = "☀️ Buenos días, bienvenido(a) a La K-Influencia";
  } else if (hora < 18) {
    saludo = "🌤️ Buenas tardes, bienvenido(a) a La K-Influencia";
  } else {
    saludo = "🌙 Buenas noches, bienvenido(a) a La K-Influencia";
  }

  mensaje.textContent = saludo;
}

//
// 3. SLIDER DE IMÁGENES (VERSIÓN SIMPLE CON AUTO-PLAY)
//
function initSlider() {
  var slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return; // por si estamos en otra página

  var prevBtn = document.querySelector(".slider-prev");
  var nextBtn = document.querySelector(".slider-next");
  var dots = document.querySelectorAll(".dot-dot");

  var indiceActual = 0;

  // Mostrar una diapositiva
  function mostrarSlide(indice) {
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === indice);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === indice);
    });

    indiceActual = indice;
  }

  // Ir a la siguiente
  function siguienteSlide() {
    var nuevoIndice = indiceActual + 1;
    if (nuevoIndice >= slides.length) {
      nuevoIndice = 0;
    }
    mostrarSlide(nuevoIndice);
  }

  // Ir a la anterior
  function anteriorSlide() {
    var nuevoIndice = indiceActual - 1;
    if (nuevoIndice < 0) {
      nuevoIndice = slides.length - 1;
    }
    mostrarSlide(nuevoIndice);
  }

  // 👉 AUTO-PLAY sencillo: cada 4 segundos pasa a la siguiente
  setInterval(siguienteSlide, 3000);

  // Eventos de los botones
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      siguienteSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      anteriorSlide();
    });
  }

  // Eventos de los punticos
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var index = Number(dot.getAttribute("data-index"));
      mostrarSlide(index);
    });
  });

  // Mostrar la primera imagen al inicio
  mostrarSlide(0);
}
