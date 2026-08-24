import { validasiInput } from "./tugas.js";
import { simpanCatatanKeStorage, muatCatatanDariStorage } from "./storage.js";

let daftarCatatan = [];

export function tambahCatatan(isi) {
  if (!validasiInput(isi)) return;
  daftarCatatan.push({
    id: Date.now(),
    isi,
    tanggal: new Date().toLocaleDateString("id-ID"),
  });
  simpanCatatanKeStorage(daftarCatatan);
  renderCatatan();
}

export function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
  simpanCatatanKeStorage(daftarCatatan);
  renderCatatan();
}

export function editCatatan(id, isiBaru) {
  if (!validasiInput(isiBaru)) return;
  daftarCatatan = daftarCatatan.map((c) =>
    c.id === id ? { ...c, isi: isiBaru } : c
  );
  simpanCatatanKeStorage(daftarCatatan);
  renderCatatan();
}

export function renderCatatan() {
  const container = document.getElementById("daftar-catatan");
  container.innerHTML = "";

  daftarCatatan.forEach((catatan) => {
    const div = document.createElement("div");
    div.className = "catatan-item";

    const isiEl = document.createElement("p");
    isiEl.textContent = catatan.isi;
    isiEl.addEventListener("dblclick", () => {
      const isiBaru = prompt("Edit catatan:", catatan.isi);
      if (isiBaru !== null) editCatatan(catatan.id, isiBaru);
    });

    const tanggalEl = document.createElement("small");
    tanggalEl.textContent = catatan.tanggal;

    div.appendChild(isiEl);
    div.appendChild(tanggalEl);

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.addEventListener("click", () => {
      const isiBaru = prompt("Edit catatan:", catatan.isi);
      if (isiBaru !== null) editCatatan(catatan.id, isiBaru);
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", () => hapusCatatan(catatan.id));

    div.appendChild(tombolEdit);
    div.appendChild(tombolHapus);
    container.appendChild(div);
  });
}

export function initCatatan() {
  daftarCatatan = muatCatatanDariStorage();
  renderCatatan();

  const form = document.getElementById("form-catatan");
  const textarea = document.getElementById("input-catatan");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    tambahCatatan(textarea.value);
    textarea.value = "";
  });

  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
}