---
name: ASISTENCIA PARA GAS SC
description: Seguros para la industria del gas LP, presentados como una ficha técnica.
colors:
  paper: "#f4f2ee"
  paper-raised: "#fbfaf8"
  paper-sunken: "#ebe8e2"
  ink: "#16181b"
  ink-raised: "#22252a"
  text-soft: "#3a3e44"
  text-muted: "#5b6066"
  text-inverse-muted: "#a6aab0"
  line: "#d9d5ce"
  line-strong: "#b9b4ab"
  line-inverse: "#3a3e44"
  signal-orange: "#c2410c"
  signal-orange-deep: "#a63709"
  signal-orange-on-ink: "#f0743d"
  white: "#ffffff"
  danger: "#b42318"
  success: "#1d6b45"
typography:
  display:
    fontFamily: "Archivo, 'Arial Narrow', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 4.6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "font-stretch 125%; text-transform uppercase"
  headline:
    fontFamily: "Archivo, 'Arial Narrow', system-ui, sans-serif"
    fontSize: "clamp(2.07rem, 1.62rem + 2.02vw, 3.55rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "font-stretch 112%"
  title:
    fontFamily: "Archivo, 'Arial Narrow', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.11rem + 0.42vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    fontVariation: "font-stretch 112%"
  body:
    fontFamily: "'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.19vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, 'Arial Narrow', system-ui, sans-serif"
    fontSize: "clamp(0.75rem, 0.73rem + 0.08vw, 0.8125rem)"
    fontWeight: 600
    letterSpacing: "0.14em"
    fontVariation: "font-stretch 112%; text-transform uppercase"
rounded:
  s: "2px"
  m: "4px"
  l: "8px"
  pill: "999px"
spacing:
  3xs: "0.25rem"
  2xs: "0.5rem"
  xs: "0.75rem"
  s: "1rem"
  m: "1.5rem"
  l: "2rem"
  xl: "3rem"
  2xl: "4rem"
  3xl: "6rem"
  gutter: "clamp(1rem, 0.6rem + 1.8vw, 2.5rem)"
  section: "clamp(4rem, 2.67rem + 5.9vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.m}"
    padding: "0 1.5rem"
    height: "2.875rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-orange-deep}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.m}"
    padding: "0 1.5rem"
    height: "2.875rem"
  button-secondary-hover:
    backgroundColor: "{colors.paper-sunken}"
    textColor: "{colors.ink}"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.m}"
  input:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.m}"
    padding: "0.75rem 1rem"
    height: "3rem"
  card-ficha:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.l}"
    padding: "1.5rem"
  chip:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.s}"
    padding: "0.2rem 0.5rem"
  scenario-card:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.l}"
    padding: "1.5rem"
---

# Design System: ASISTENCIA PARA GAS SC

## Overview

**Creative North Star: "La Ficha Técnica"**

Cada página se lee como la hoja de especificaciones de un equipo industrial: datos exactos, etiquetas técnicas, una retícula de plano de fondo y un solo color de señal que marca lo importante. El visitante (dueño de una gasera, responsable de cumplimiento, transportista) compra certeza, y el sistema la transmite con precisión, no con adorno: tipografía expandida de señalética, líneas finas, papel claro y tinta grafito.

La densidad es de documento técnico: bloques numerados, hojas de datos con filas etiqueta/valor, listas de lo que cubre y lo que no, escenarios marcados como «cubierto» o «excluido». Las fotografías se presentan desaturadas, enmarcadas con marcas de registro en las esquinas, como evidencia y no como decoración. El movimiento es mecánico y corto: líneas que se trazan, una aguja que barre, contenidos que entran desde abajo.

Es un sistema claro y plano por defecto. La profundidad aparece solo como respuesta a un estado (hover, elemento flotante), nunca en reposo.

**Key Characteristics:**
- Papel claro (`paper`) con tinta grafito (`ink`) y un único acento naranja señal.
- Archivo expandido en mayúsculas para titulares y etiquetas; Public Sans para leer.
- Retícula de plano de 64 px que se desvanece, solo en los héroes y en el 404.
- Líneas finas de 1 px como estructura; reglas de 2 px en tinta para abrir listas.
- Fotografía en escala de grises con marcas de esquina.
- Movimiento con transform/opacity y ease-out-expo; alternativas con movimiento reducido.

## Colors

Una paleta de papel y tinta casi neutra (tono cálido en el papel, frío en la tinta) con una sola señal naranja.

### Primary
- **Naranja Señal** (`signal-orange`): botones primarios, punto de etiqueta del hero, índices de sección, aguja del logo, foco visible. Es el único color con croma del sistema.
- **Naranja Señal Profundo** (`signal-orange-deep`): estado hover del primario y texto de acento pequeño sobre fondos `paper-sunken`, donde el naranja normal no alcanza AA.
- **Naranja Señal sobre Tinta** (`signal-orange-on-ink`): la misma señal sobre secciones oscuras (contacto, escenarios, footer).

### Neutral
- **Papel Técnico** (`paper`): fondo de página.
- **Papel Elevado** (`paper-raised`): tarjetas, campos, hojas de datos.
- **Papel Hundido** (`paper-sunken`): secciones alternas (seguros, cobertura, otros seguros).
- **Tinta Grafito** (`ink`): texto principal, reglas de 2 px, bloques invertidos (contacto, escenarios, footer).
- **Tinta Elevada** (`ink-raised`): tarjetas sobre tinta (escenarios).
- **Grafito Suave** (`text-soft`) y **Gris Técnico** (`text-muted`): texto secundario y etiquetas.
- **Gris sobre Tinta** (`text-inverse-muted`): texto secundario en bloques oscuros.
- **Línea** (`line`), **Línea Marcada** (`line-strong`), **Línea sobre Tinta** (`line-inverse`): estructura.
- **Peligro** (`danger`) y **Correcto** (`success`): solo estados del formulario; nunca decoración.

### Named Rules
**The One Signal Rule.** El naranja es la única voz de color. Se reserva para la acción principal, la señal activa y la posición (índice, foco). Nunca se introduce un segundo acento.

**The Contrast Floor Rule.** Texto naranja de menos de 18.66 px (o 14 px bold) solo sobre `paper` o `paper-raised`; sobre `paper-sunken` se usa `signal-orange-deep`. En código: el texto de acento usa `--color-accent-text`, que las superficies hundidas cambian solas al tono profundo.

**The Shape Over Hue Rule.** Los estados de contenido (cubierto / excluido, incluido / no incluido) se distinguen por relleno y forma (sólido frente a contorno, ✓ frente a ✕), nunca por el naranja de acción ni por un color nuevo.

## Typography

**Display Font:** Archivo (variable, eje de ancho 62–125; con Arial Narrow de respaldo)
**Body Font:** Public Sans (variable; con system-ui de respaldo)

**Character:** Archivo expandido en mayúsculas es la voz de la señalética industrial: rótulos, placas de equipo, títulos de ficha. Public Sans es neutra y legible, la voz del documento.

### Hierarchy
- **Display** (700, ancho 125 %, mayúsculas): solo el h1 de cada hero y el 404. El tamaño se limita al ancho de la columna (`cqi`) para que la palabra más larga nunca se parta.
- **Headline** (650, ancho 112 %): títulos de sección (h2), máximo ~22 caracteres por línea.
- **Title** (600, ancho 112 %): títulos de tarjetas, pasos, preguntas.
- **Body** (400, 1.6 de interlineado): párrafos de 52–68 ch.
- **Label** (600, ancho 112 %, 0.14em, mayúsculas): etiquetas técnicas, códigos «Ficha 0X», encabezados de columna.

### Named Rules
**The Spec Label Rule.** Toda micro-etiqueta en mayúsculas usa el rol Label; no se redefine en cada componente.

**The No Wrap Display Rule.** El display nunca parte palabras: su tamaño se deriva del ancho de su contenedor.

## Layout

Contenedor de 78 rem con gutter fluido (16 px en móvil, 40 px en escritorio). Secciones con ritmo vertical fluido (`section`, 64–128 px). Las composiciones son de dos columnas asimétricas en escritorio (7/5) y una columna en móvil; las listas técnicas usan rejillas de 2–4 columnas separadas por líneas finas en lugar de tarjetas. Breakpoints: 40em (tableta), 64em (escritorio). La navegación pasa a menú de pantalla completa debajo de 64em.

### Named Rules
**The Spec Sheet Rule.** La información comparable (datos, coberturas, pasos) se presenta en filas o columnas con líneas finas, como una ficha; las tarjetas se reservan para objetos navegables (seguros) o casos (escenarios).

**The No Empty Half Rule.** Una composición 7/5 nunca deja la columna derecha vacía: si la ficha no tiene hoja de datos, el alcance ocupa ese lugar. Las listas largas (más de ~6 puntos) se agrupan con subtítulos en rol Label que solo ordenan la lectura.

**The Action First Rule.** En móvil, el formulario de cotización va inmediatamente después del título de su sección; los datos de contacto lo siguen.

## Elevation & Depth

Plano por defecto, como papel impreso. La estructura la dan las líneas y el cambio de superficie (`paper` → `paper-sunken` → `ink`), no las sombras. Las sombras existen solo como respuesta a un estado.

### Shadow Vocabulary
- **Hairline lift** (`0 1px 0 rgb(22 24 27 / .04), 0 1px 2px rgb(22 24 27 / .06)`): hojas de datos.
- **State lift** (`0 1px 2px rgb(22 24 27 / .05), 0 12px 32px -14px rgb(22 24 27 / .22)`): elementos fijos o destacados (insignia del hero, comparación «bueno»).
- **Hover lift** (`0 2px 4px rgb(22 24 27 / .06), 0 28px 60px -24px rgb(22 24 27 / .32)`): tarjetas de seguro en hover y el dock flotante.

### Named Rules
**The Flat Paper Rule.** Ninguna tarjeta tiene sombra en reposo. Si algo necesita separarse, primero se intenta una línea o un cambio de superficie.

## Shapes

Esquinas casi rectas y técnicas: 2 px en chips, 4 px en botones y campos, 8 px en tarjetas y figuras. La pastilla (999 px) solo para el dock flotante, puntos de estado e íconos circulares. Las fotografías llevan marcas de registro en las cuatro esquinas (14 px, 1 px). Las listas se abren con una regla de 2 px en tinta.

## Components

### Buttons
- **Shape:** esquinas técnicas (4 px), altura mínima 46 px (54 px en tamaño L).
- **Primary:** fondo naranja señal, texto blanco, Archivo 600 ancho 112 % en mayúsculas con 0.04em.
- **Hover / Focus:** un relleno más profundo sube desde abajo (transform, 280 ms ease-out-expo); la flecha avanza 4 px; `:active` escala a 0.98; foco con contorno naranja de 2 px y separación de 3 px.
- **Secondary:** contorno de tinta, relleno `paper-sunken` en hover. **Inverse:** papel sobre tinta. **Ghost:** sin borde, relleno de acento suave.

### Chips y metadatos
- **Style:** el chip con contorno (`line-strong`, esquina de 2 px) queda solo para las siglas regulatorias del footer. Los temas de un seguro no llevan caja: son una línea de especificaciones en rol Label (separada por puntos en el hero de la ficha, apilada en las tarjetas), para no parecer botones dentro de un enlace.
- **Listas de alcance:** filas de ficha con regla de 2 px en tinta, líneas finas y una marca cuadrada de tinta; texto de lectura en minúscula de oración.

**The Readable Floor Rule.** Ninguna etiqueta baja de 12 px (`--step--2`) y ningún texto secundario en minúscula baja de 14 px (`--step--1`), tampoco a 360 px.

**The Meaningful Number Rule.** Los números solo aparecen cuando la secuencia informa: pasos de un proceso, secciones de la ficha que su índice enlaza y códigos «Ficha 0X». Razones, público, escenarios y preguntas no se numeran.

### Cards / Containers
- **Ficha de seguro:** `paper-raised`, 8 px, borde `line-strong`; en hover se traza una franja superior naranja (scaleX), la imagen hace zoom leve y aparece la sombra de hover. Con puntero fino: luz que sigue al cursor e inclinación ≤3°.
- **Hoja de datos:** borde de tinta de 1 px, filas etiqueta/valor separadas por líneas finas.
- **Escenario:** tarjeta `ink-raised` sobre sección de tinta, con insignia «Cubierto» (papel sólido) o «Excluido» (contorno); sin naranja.

### Inputs / Fields
- **Style:** `paper-raised`, contorno `line-strong`, 4 px, 48 px de alto, texto de 16 px (sin zoom en iOS).
- **Focus:** contorno naranja + una barra inferior que se traza de izquierda a derecha.
- **Error:** borde y fondo suave de `danger`, mensaje con ícono; **válido:** check verde que aparece con escala.

### Navigation
- Header fijo de 68 px; en reposo transparente; al hacer scroll aparece un fondo de papel opaco y una línea inferior que se traza. Enlaces Archivo 500 ancho 112 % con subrayado naranja que se traza en hover y marca la sección activa. Debajo de 64em, menú de pantalla completa con entrada escalonada.
- Dock flotante (tinta en pastilla): aparece después del primer pantallazo y se oculta cuando el contacto está a la vista. En móvil lleva WhatsApp + Cotizar; desde 40em, donde el header ya muestra «Cotizar», solo el círculo de WhatsApp.
- Objetivos táctiles: ≥ 44 px. Las filas de contacto son enteras el enlace; los enlaces del footer miden 44 px con puntero táctil. Debajo de 30em los botones van a todo el ancho con 16 px de relleno y Archivo a ancho normal, para que las etiquetas quepan en una línea.
- Índice de la ficha: barra de papel fija bajo el header durante toda la página, abierta con la regla de 2 px en tinta (la barra de progreso de lectura corre sobre ella). La sección que se lee pasa a tinta con subrayado naranja de 2 px, sin cambio de peso; en móvil la lista se desplaza para mantener visible el activo y el borde con contenido oculto se desvanece. Las anclas compensan header + índice con `scroll-padding-top`.

### Logo «Manómetro»
Arco de 270° abierto a la derecha con aguja horizontal naranja (lee como una «G»); la aguja barre al cargar. Variantes default, mono e inverse.

## Do's and Don'ts

### Do:
- **Do** usar `signal-orange` solo para acción principal, señal activa y foco; los íconos decorativos van en tinta.
- **Do** presentar datos comparables como ficha: filas con líneas finas y etiquetas Label.
- **Do** desaturar todas las fotografías y enmarcarlas con marcas de esquina.
- **Do** animar solo transform y opacity, con ease-out-expo, entre 180 y 720 ms, y dar una alternativa con `prefers-reduced-motion`.
- **Do** dar alternativa táctil a todo efecto de cursor (`hover: none`).

### Don't:
- **Don't** introducir un segundo color de acento ni degradados decorativos (la retícula de plano y la luz radial del hero son las únicas excepciones).
- **Don't** usar radios mayores a 8 px fuera del dock y los puntos de estado.
- **Don't** poner sombras en reposo ni bordes laterales gruesos de color como acento.
- **Don't** usar fotografía a color ni imágenes que no correspondan a la operación descrita.
- **Don't** usar texto naranja pequeño sobre `paper-sunken`.
