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

export function renderCatatan() {
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

export function initCatatan() {
  daftarCatatan = muatCatatanDariStorage();
  renderCatatan();

  document.getElementById("form-catatan").addEventListener("submit", (e) => {
    e.preventDefault();
    const textarea = document.getElementById("input-catatan");
    tambahCatatan(textarea.value);
    textarea.value = "";
  });
}