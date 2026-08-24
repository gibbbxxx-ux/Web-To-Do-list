import { initTugas } from "./tugas.js";
import { initCatatan } from "./catatan.js";
import { initCuaca, muatSemuaWidget } from "./api.js";

function buildLayout() {
  const header = document.createElement("header");
  const judul = document.createElement("h1");
  judul.textContent = "DailyBoard";
  header.appendChild(judul);
  document.body.appendChild(header);

  const main = document.createElement("main");
  main.id = "app";
  document.body.appendChild(main);

  const sectionTugas = document.createElement("section");
  sectionTugas.id = "tugas";

  const judulTugas = document.createElement("h2");
  judulTugas.textContent = "Tugas";
  sectionTugas.appendChild(judulTugas);

  const formTugas = document.createElement("form");
  formTugas.id = "form-tugas";
  const inputTugas = document.createElement("input");
  inputTugas.type = "text";
  inputTugas.id = "input-tugas";
  inputTugas.placeholder = "Tambah tugas baru...";
  formTugas.appendChild(inputTugas);

  const tombolTambahTugas = document.createElement("button");
  tombolTambahTugas.type = "submit";
  tombolTambahTugas.textContent = "Tambah";
  formTugas.appendChild(tombolTambahTugas);

  sectionTugas.appendChild(formTugas);

  const cariTugas = document.createElement("input");
  cariTugas.type = "text";
  cariTugas.id = "cari-tugas";
  cariTugas.placeholder = "Cari tugas...";
  sectionTugas.appendChild(cariTugas);

  const filterGroup = document.createElement("div");
  filterGroup.className = "filter-group";
  filterGroup.id = "filter-group";
  sectionTugas.appendChild(filterGroup);

  const daftarTugasEl = document.createElement("ul");
  daftarTugasEl.id = "daftar-tugas";
  sectionTugas.appendChild(daftarTugasEl);

  main.appendChild(sectionTugas);

  const sectionCatatan = document.createElement("section");
  sectionCatatan.id = "catatan";

  const judulCatatan = document.createElement("h2");
  judulCatatan.textContent = "Catatan";
  sectionCatatan.appendChild(judulCatatan);

  const formCatatan = document.createElement("form");
  formCatatan.id = "form-catatan";
  const inputCatatan = document.createElement("textarea");
  inputCatatan.id = "input-catatan";
  inputCatatan.placeholder = "Tulis catatan cepat...";
  formCatatan.appendChild(inputCatatan);

  const tombolSimpanCatatan = document.createElement("button");
  tombolSimpanCatatan.type = "submit";
  tombolSimpanCatatan.textContent = "Simpan Catatan";
  formCatatan.appendChild(tombolSimpanCatatan);

  sectionCatatan.appendChild(formCatatan);

  const daftarCatatanEl = document.createElement("div");
  daftarCatatanEl.id = "daftar-catatan";
  sectionCatatan.appendChild(daftarCatatanEl);

  main.appendChild(sectionCatatan);

  const sectionQuotes = document.createElement("section");
  sectionQuotes.id = "quotes";

  const judulQuotes = document.createElement("h2");
  judulQuotes.textContent = "Quotes";

  const kutipanHarian = document.createElement("p");
  kutipanHarian.id = "kutipan-harian";
  kutipanHarian.textContent = "Memuat kutipan...";

  sectionQuotes.appendChild(judulQuotes);
  sectionQuotes.appendChild(kutipanHarian);

    main.appendChild(sectionQuotes);
    const tombolRefreshQt = document.createElement("button");
  tombolRefreshQt.textContent = "Refresh Quotes";
  tombolRefreshQt.addEventListener("click", () => {
    ambilKutipan();
  });

sectionQuotes.appendChild(tombolRefreshQt);
  const cuaca = document.createElement("section");
  cuaca.id = "cuaca";
  const subJudulCuaca = document.createElement("h2");
  subJudulCuaca.textContent = "Cuaca";
  cuaca.appendChild(subJudulCuaca);

  const infoCuaca = document.createElement("article");
  const subHeader = document.createElement("h3");
  subHeader.textContent = "Info Cuaca";
  const inputKota = document.createElement("input");
  inputKota.id = "input-kota";
  inputKota.placeholder = "Masukkan Nama Kota";
  const tombolCuaca = document.createElement("button");
  tombolCuaca.id = "tombol-cuaca";
  tombolCuaca.textContent = "Cek";

  const cuacaHasil = document.createElement("div");
  cuacaHasil.id = "cuaca-hasil";
  cuacaHasil.className = "cuaca-hasil";

  const info = document.createElement("p");
  info.id = "info-cuaca";
  info.textContent = "Memuat Info Cuaca...";
  cuacaHasil.appendChild(info);

  infoCuaca.appendChild(subHeader);
  infoCuaca.appendChild(inputKota);
  infoCuaca.appendChild(tombolCuaca);
  infoCuaca.appendChild(cuacaHasil);
  cuaca.appendChild(infoCuaca);

  main.appendChild(cuaca);

  const status = document.createElement("p");
  status.id = "status";
  main.appendChild(status);

  const footer = document.createElement("footer");
  const footerText = document.createElement("p");
  footerText.innerHTML = "&copy; 2026 DailyBoard. Gibran Vargan Alfahrezi.";
  footer.appendChild(footerText);
  document.body.appendChild(footer);
}

function initTema() {
  const toggleTema = document.createElement("button");
  toggleTema.id = "toggle-tema";
  toggleTema.textContent = "Dark Mode 🌙";
  document.querySelector("header").appendChild(toggleTema);

  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
    toggleTema.textContent = modeAktif ? "Light Mode ☀️" : "Dark Mode 🌙";
  });

  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
    toggleTema.textContent = "Light Mode ☀️";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  buildLayout();

  initTugas();
  initCatatan();
  initCuaca();
  initTema();

  muatSemuaWidget();
});