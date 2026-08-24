import { simpanTugasKeStorage, muatTugasDariStorage } from "./storage.js";

let daftarTugas = [];
let nextId = 1;
let filterAktif = "semua";

export function validasiInput(nilai) {
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

export function tambahTugas(nama) {
  if (!validasiInput(nama)) return;
  daftarTugas.push({ id: nextId++, nama, selesai: false });
  simpanTugasKeStorage(daftarTugas);
  renderUlangTugas();
}

export function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);
  simpanTugasKeStorage(daftarTugas);
  renderUlangTugas();
}

export function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, selesai: !t.selesai } : t
  );
  simpanTugasKeStorage(daftarTugas);
  renderUlangTugas();
}

export function editTugas(id, namaBaru) {
  if (!validasiInput(namaBaru)) return;
  daftarTugas = daftarTugas.map((t) =>
    t.id === id ? { ...t, nama: namaBaru } : t
  );
  simpanTugasKeStorage(daftarTugas);
  renderUlangTugas();
}

function renderUlangTugas() {
  const kataKunci = document.getElementById("cari-tugas")?.value || "";
  renderTugas(filterAktif, kataKunci);
}

export function renderTugas(filter = "semua", kataKunci = "") {
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

      simpanTugasKeStorage(daftarTugas);
      renderUlangTugas();
    });
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

function aktifkanPencarian() {
  document.getElementById("cari-tugas").addEventListener("input", (e) => {
    const kataKunci = e.target.value.toLowerCase();
    renderTugas(filterAktif, kataKunci);
  });
}

export function initTugas() {
  daftarTugas = muatTugasDariStorage();
  nextId = daftarTugas.length
    ? Math.max(...daftarTugas.map((t) => t.id)) + 1
    : 1;

  renderTugas();
  aktifkanFilter();
  aktifkanPencarian();

  document.getElementById("form-tugas").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("input-tugas");
    tambahTugas(input.value);
    input.value = "";
  });
}