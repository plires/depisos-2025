import AOS from 'aos/dist/aos.js'

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  // disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  // startEvent: "DOMContentLoaded", // nombre del evento enviado en el documento, que AOS debe inicializar en
  initClassName: 'aos-init', // clase aplicada después de la inicialización
  animatedClassName: 'aos-animate', // class applied on animation
  // useClassNames: false, // si es verdadero, agregará contenido de `data-aos` como clases en el desplazamiento
  // disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  // debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  // throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 150, // desplazamiento (en px) desde el punto de activación original
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // si la animación debe ocurrir solo una vez, mientras se desplaza hacia abajo
  // mirror: false, // si los elementos deben animarse mientras se desplaza más allá de ellos
  // anchorPlacement: "top-bottom", // define qué posición del elemento con respecto a la ventana debe activar la animación
})
