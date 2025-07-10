// Variables
const claseSel = document.getElementById("clase");
const subtipoSel = document.getElementById("subtipo");
const edadSel = document.getElementById("edad");
const edadLabel = document.getElementById("edad-label");
const placaInput = document.getElementById("placa");
const modalRes = document.getElementById("modalResultado");
const detalleCotiz = document.getElementById("detalleCotizacion");

// Tarifa oficial (38 tarifas)
const tarifas = [
  { clase: "MOTOS", subtipo: "Ciclomotor", edad: "", valor: 118200 },
  { clase: "MOTOS", subtipo: "Menos de 100 c.c.", edad: "", valor: 243700 },
  { clase: "MOTOS", subtipo: "De 100 a 200 c.c.", edad: "", valor: 326600 },
  { clase: "MOTOS", subtipo: "Más de 200 c.c.", edad: "", valor: 758600 },
  { clase: "MOTOS", subtipo: "Motocarros, tricimoto, cuadriciclos", edad: "", valor: 368100 },
  { clase: "CAMPEROS Y CAMIONETAS", subtipo: "Menos de 1500 c.c.", edad: "0 a 9 años", valor: 789900 },
  { clase: "CAMPEROS Y CAMIONETAS", subtipo: "Menos de 1500 c.c.", edad: "10 años o mas", valor: 949500 },
  { clase: "CAMPEROS Y CAMIONETAS", subtipo: "1500 a 2500", edad: "0 a 9 años", valor: 943100 },
  { clase: "CAMPEROS Y CAMIONETAS", subtipo: "1500 a 2500", edad: "10 años o mas", valor: 1117100 },
  { clase: "CAMPEROS Y CAMIONETAS", subtipo: "Más de 2500 c.c.", edad: "0 a 9 años", valor: 1106200 },
  { clase: "CAMPEROS Y CAMIONETAS", subtipo: "Más de 2500 c.c.", edad: "10 años o mas", valor: 1269300 },
  { clase: "AUTOS FAMILIARES", subtipo: "Menos de 1500 c.c.", edad: "0 a 9 años", valor: 445600 },
  { clase: "AUTOS FAMILIARES", subtipo: "Menos de 1500 c.c.", edad: "10 años o mas", valor: 590700 },
  { clase: "AUTOS FAMILIARES", subtipo: "1500 a 2500", edad: "0 a 9 años", valor: 542700 },
  { clase: "AUTOS FAMILIARES", subtipo: "1500 a 2500", edad: "10 años o mas", valor: 675000 },
  { clase: "AUTOS FAMILIARES", subtipo: "Más de 2500 c.c.", edad: "0 a 9 años", valor: 633800 },
  { clase: "AUTOS FAMILIARES", subtipo: "Más de 2500 c.c.", edad: "10 años o mas", valor: 751600 },
  { clase: "AUTOS DE NEGOCIOS Y TAXIS", subtipo: "Menos de 1500 c.c.", edad: "0 a 9 años", valor: 268200 },
  { clase: "AUTOS DE NEGOCIOS Y TAXIS", subtipo: "Menos de 1500 c.c.", edad: "10 años o mas", valor: 334800 },
  { clase: "AUTOS DE NEGOCIOS Y TAXIS", subtipo: "1500 a 2500", edad: "0 a 9 años", valor: 333000 },
  { clase: "AUTOS DE NEGOCIOS Y TAXIS", subtipo: "1500 a 2500", edad: "10 años o mas", valor: 411200 },
  { clase: "AUTOS DE NEGOCIOS Y TAXIS", subtipo: "Más de 2500 c.c.", edad: "0 a 9 años", valor: 429300 },
  { clase: "AUTOS DE NEGOCIOS Y TAXIS", subtipo: "Más de 2500 c.c.", edad: "10 años o mas", valor: 503500 },
  { clase: "BUSES Y BUSETAS DE SERVICIO PUBLICO URBANO", subtipo: "Único", edad: "", valor: 640300 },
  { clase: "SERVICIO PÚBLICO INTERMUNICIPAL", subtipo: "Menor 10 pasajeros", edad: "", valor: 633000 },
  { clase: "SERVICIO PÚBLICO INTERMUNICIPAL", subtipo: "10 o más pasajeros", edad: "", valor: 918000 }
];

// Evento para mostrar clases
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modalBienvenida").style.display = "flex";
  document.getElementById("cerrarModal").onclick = () => {
    document.getElementById("modalBienvenida").style.display = "none";
  };

  placaInput.addEventListener("input", () => {
    placaInput.value = placaInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  });

  [...new Set(tarifas.map(t => t.clase))].forEach(cl => {
    const o = document.createElement("option");
    o.value = cl; o.textContent = cl;
    claseSel.appendChild(o);
  });

  claseSel.addEventListener("change", () => {
    subtipoSel.innerHTML = "<option value=''>Seleccione un subtipo</option>";
    subtipoSel.disabled = true;
    edadSel.style.display = "none";
    edadLabel.style.display = "none";

    const subtipos = tarifas.filter(t => t.clase === claseSel.value).map(t => t.subtipo);
    [...new Set(subtipos)].forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub; opt.textContent = sub;
      subtipoSel.appendChild(opt);
    });
    subtipoSel.disabled = false;
  });

  subtipoSel.addEventListener("change", () => {
    const mostrarEdad = tarifas.filter(t =>
      t.clase === claseSel.value && t.subtipo === subtipoSel.value
    ).some(t => t.edad !== "");

    edadSel.style.display = mostrarEdad ? "block" : "none";
    edadLabel.style.display = mostrarEdad ? "block" : "none";
  });

  document.getElementById("cotizarOtraBtn").onclick = () => {
    modalRes.style.display = "none";
    placaInput.value = "";
    claseSel.value = "";
    subtipoSel.innerHTML = "<option value=''>Seleccione un subtipo</option>";
    subtipoSel.disabled = true;
    edadSel.style.display = "none";
    edadLabel.style.display = "none";
  };

  document.getElementById("comprarBtn").onclick = () => {
    const placa = placaInput.value;
    const clase = claseSel.value;
    const subtipo = subtipoSel.value;
    const edad = edadSel.style.display !== "none" ? edadSel.value : "";
    const valorMatch = detalleCotiz.textContent.match(/\$\d[\d.]+/);
    const valor = valorMatch ? valorMatch[0] : "";

    const url = `datos.html?placa=${encodeURIComponent(placa)}&clase=${encodeURIComponent(clase)}&subtipo=${encodeURIComponent(subtipo)}&edad=${encodeURIComponent(edad)}&valor=${encodeURIComponent(valor)}`;
    window.location.href = url;
  };
});

function cotizar() {
  const placa = placaInput.value.trim();
  const clase = claseSel.value;
  const subt = subtipoSel.value;
  const ed = edadSel.style.display !== "none" ? edadSel.value : "";

  if (!placa || !clase || !subt || (edadSel.style.display !== "none" && !ed)) {
    alert("⚠️ Por favor completa todos los campos obligatorios.");
    return;
  }

  const encontrado = tarifas.find(t =>
    t.clase === clase &&
    t.subtipo === subt &&
    (t.edad === ed || t.edad === "")
  );

  if (encontrado) {
    detalleCotiz.innerHTML = `
      <strong>Placa:</strong> ${placa}<br>
      <strong>Clase:</strong> ${clase}<br>
      <strong>Subtipo:</strong> ${subt}<br>
      ${ed ? `<strong>Edad:</strong> ${ed}<br>` : ""}
      <br><strong style="font-size:22px; color:#003087;">Valor del SOAT 2025:</strong><br>
      <span style="font-size:26px; color:green; font-weight:bold;">
        $${encontrado.valor.toLocaleString("es-CO")}
      </span>
    `;
    modalRes.style.display = "flex";
  } else {
    alert("❌ No se encontró una tarifa para esa combinación.");
  }
}
