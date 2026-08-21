let daftarTugas = [];
let daftarCatatan = [];
let nextId = 1;
let filterAktif = "semua";

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

  const footer = document.createElement("footer");
  const footerText = document.createElement("p");
  footerText.innerHTML = "&copy; 2026 DailyBoard. Gibran Vargan Alfahrezi.";
  footer.appendChild(footerText);
  document.body.appendChild(footer);
}

buildLayout();

function simpanKeStorage() {
  localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatDariStorage() {
  const data = localStorage.getItem("daftarTugas");
  daftarTugas = data ? JSON.parse(data) : [];
  nextId = daftarTugas.length
    ? Math.max(...daftarTugas.map((t) => t.id)) + 1
    : 1;
}

function simpanCatatanKeStorage() {
  localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage() {
  const data = localStorage.getItem("daftarCatatan");
  daftarCatatan = data ? JSON.parse(data) : [];
}

function validasiInput(nilai) {
  if (nilai.trim() === "") {
    alert("Input tidak boleh kosong!");
    return false;
  }
  if (nilai.length > 100) {
    alert("Input maksimal 100 karakter!");
    return false;
  }
  return true;
}

function tambahTugas(nama) {
  if (!validasiInput(nama)) return;
  daftarTugas.push({ id: nextId++, nama, selesai: false });
  simpanKeStorage();
  renderUlangTugas();
}

function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);
  simpanKeStorage();
  renderUlangTugas();
}

function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, selesai: !t.selesai } : t
  );
  simpanKeStorage();
  renderUlangTugas();
}

function editTugas(id, namaBaru) {
  if (!validasiInput(namaBaru)) return;
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, nama: namaBaru } : t
  );
  simpanKeStorage();
  renderUlangTugas();
}

const formTugas = document.getElementById("form-tugas");
const tombolTambahTugas = document.createElement("button");
tombolTambahTugas.type = "submit";
tombolTambahTugas.textContent = "Tambah";
formTugas.appendChild(tombolTambahTugas);

function renderUlangTugas() {
  const kataKunci = document.getElementById("cari-tugas")?.value || "";
  renderTugas(filterAktif, kataKunci);
}

function renderTugas(filter = "semua", kataKunci = "") {
  filterAktif = filter;
  const list = document.getElementById("daftar-tugas");
  list.innerHTML = "";

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("aktif", btn.dataset.filter === filter);
  });

  let tugasTersaring = daftarTugas.filter((t) => {
    if (filter === "selesai") return t.selesai;
    if (filter === "belum") return !t.selesai;
    return true;
  });

  if (kataKunci.trim() !== "") {
    tugasTersaring = tugasTersaring.filter((t) =>
      t.nama.toLowerCase().includes(kataKunci.toLowerCase())
    );
  }

  tugasTersaring.forEach((tugas) => {
    const li = document.createElement("li");
    li.className = "tugas-item";
    li.dataset.id = tugas.id;
    li.setAttribute("draggable", true);

    const span = document.createElement("span");
    span.textContent = tugas.nama;
    span.style.textDecoration = tugas.selesai ? "line-through" : "none";
    span.addEventListener("click", () => toggleSelesai(tugas.id));

    span.addEventListener("dblclick", () => {
      const namaBaru = prompt("Edit tugas:", tugas.nama);
      if (namaBaru !== null) editTugas(tugas.id, namaBaru);
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", () => hapusTugas(tugas.id));

    li.appendChild(span);
    li.appendChild(tombolHapus);
    list.appendChild(li);
  });

  aktifkanDragDrop();
}

function aktifkanDragDrop() {
  const items = document.querySelectorAll(".tugas-item");
  let idSedangDiseret = null;

  items.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      idSedangDiseret = Number(item.dataset.id);
      e.dataTransfer.setData("text/plain", item.dataset.id);
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      item.classList.add("drag-over");
    });

    item.addEventListener("dragleave", () => {
      item.classList.remove("drag-over");
    });

    item.addEventListener("drop", (e) => {
      e.preventDefault();
      item.classList.remove("drag-over");

      const idTarget = Number(item.dataset.id);
      const id = Number(e.dataTransfer.getData("text/plain"));
      console.log("Tugas dipindahkan:", id);

      if (idSedangDiseret === null || idSedangDiseret === idTarget) return;

      const dariIndex = daftarTugas.findIndex((t) => t.id === idSedangDiseret);
      const keIndex = daftarTugas.findIndex((t) => t.id === idTarget);
      if (dariIndex === -1 || keIndex === -1) return;

      const [tugasDipindah] = daftarTugas.splice(dariIndex, 1);
      daftarTugas.splice(keIndex, 0, tugasDipindah);

      simpanKeStorage();
      renderUlangTugas();
    });
  });
}

const toggleTema = document.createElement("button");
toggleTema.id = "toggle-tema";
toggleTema.textContent = "Dark Mode 🌙";
document.querySelector("header").appendChild(toggleTema);

function aktifkanDarkMode() {
  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
    toggleTema.textContent = modeAktif ? "Light Mode ☀️" : "Dark Mode 🌙";
  });
}

function terapkanTemaTersimpan() {
  if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
    toggleTema.textContent = "Light Mode ☀️";
  }
}

function aktifkanPencarian() {
  document.getElementById("cari-tugas").addEventListener("input", (e) => {
    const kataKunci = e.target.value.toLowerCase();
    renderTugas(filterAktif, kataKunci);
  });
}

function aktifkanFilter() {
  const filterGroup = document.getElementById("filter-group");
  const daftarFilter = [
    { filter: "semua", label: "Semua" },
    { filter: "selesai", label: "Selesai" },
    { filter: "belum", label: "Belum Selesai" },
  ];

  daftarFilter.forEach(({ filter, label }) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = filter;
    btn.textContent = label;

    btn.addEventListener("click", () => {
      const kataKunci = document.getElementById("cari-tugas").value;
      renderTugas(filter, kataKunci);
    });

    filterGroup.appendChild(btn);
  });
}

const formCatatan = document.getElementById("form-catatan");
const tombolSimpanCatatan = document.createElement("button");
tombolSimpanCatatan.type = "submit";
tombolSimpanCatatan.textContent = "Simpan Catatan";
formCatatan.appendChild(tombolSimpanCatatan);

function tambahCatatan(isi) {
  if (!validasiInput(isi)) return;
  daftarCatatan.push({
    id: Date.now(),
    isi,
    tanggal: new Date().toLocaleDateString("id-ID"),
  });
  simpanCatatanKeStorage();
  renderCatatan();
}

function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
  simpanCatatanKeStorage();
  renderCatatan();
}

function renderCatatan() {
  const container = document.getElementById("daftar-catatan");
  container.innerHTML = "";

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";
    div.innerHTML = `<p>${catatan.isi}</p><small>${catatan.tanggal}</small>`;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", () => hapusCatatan(catatan.id));

    div.appendChild(tombolHapus);
    container.appendChild(div);
  });
}

const kutipanText = document.getElementById("kutipan-harian");

async function ambilKutipan() {
  try {
    const res = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random"
    );

    const data = await res.json();

    kutipanText.textContent = data.quote;
  } catch (error) {
    console.log("Gagal mengambil kutipan:", error);
    kutipanText.textContent = "Gagal memuat kutipan";
  }
}

const cuaca = document.createElement("section");
cuaca.id = "cuaca";
const subJudulCuaca = document.createElement("h2");
subJudulCuaca.textContent = "Cuaca";
app.appendChild(cuaca);
cuaca.appendChild(subJudulCuaca);

const infoCuaca = document.createElement("article");
const subHeade = document.createElement("h3");
const inputKota = document.createElement("input");
inputKota.placeholder = "Masukkan Nama Kota";
subHeade.textContent = "Info Cuaca";
const tombolCuaca = document.createElement("button");
tombolCuaca.textContent = "Cek";

const cuacaHasil = document.createElement("div");
cuacaHasil.id = "cuaca-hasil";
cuacaHasil.className = "cuaca-hasil";

const info = document.createElement("p");
info.id = "info-cuaca";
info.textContent = "Memuat Info Cuaca...";
cuacaHasil.appendChild(info);

tombolCuaca.addEventListener("click", () => {
  const kota = inputKota.value.trim();
  if (kota === "") {
    info.textContent = "Masukkan nama kota terlebih dahulu";
    return;
  }
  ambilCuaca(kota);
});

async function ambilCuaca(kota) {
  const apiKey = "18841e293493445a30cd12b4f150c108";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(kota)}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan");
    const data = await res.json();

    cuacaHasil.innerHTML = "";
    const namaKota = document.createElement("p");
    namaKota.textContent = `${data.name}: ${data.main.temp}°C`;
    const deskripsi = document.createElement("p");
    deskripsi.textContent = data.weather[0].description;
    cuacaHasil.appendChild(namaKota);
    cuacaHasil.appendChild(deskripsi);
  } catch (error) {
    cuacaHasil.innerHTML = "";
    const pesanError = document.createElement("p");
    pesanError.textContent = error.message;
    cuacaHasil.appendChild(pesanError);
  }
}

cuaca.appendChild(infoCuaca);
infoCuaca.appendChild(subHeade);
infoCuaca.appendChild(inputKota);
infoCuaca.appendChild(tombolCuaca);
infoCuaca.appendChild(cuacaHasil);

const status = document.createElement("p");
app.appendChild(status);

async function muatSemuaWidget() {
  status.textContent = "Memuat data...";
  await Promise.all([ambilKutipan(), ambilCuaca("Bandung")]);
  status.textContent = "Data berhasil dimuat";
}

window.addEventListener("DOMContentLoaded", () => {
  muatDariStorage();
  muatCatatanDariStorage();
  terapkanTemaTersimpan();

  renderTugas();
  renderCatatan();

  aktifkanDarkMode();
  aktifkanPencarian();
  aktifkanFilter();

  muatSemuaWidget();

  document.getElementById("form-tugas").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("input-tugas");
    tambahTugas(input.value);
    input.value = "";
  });

  document.getElementById("form-catatan").addEventListener("submit", (e) => {
    e.preventDefault();
    const textarea = document.getElementById("input-catatan");
    tambahCatatan(textarea.value);
    textarea.value = "";
  });
});