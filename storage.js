export function simpanTugasKeStorage(daftarTugas) {
  localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

export function muatTugasDariStorage() {
  const data = localStorage.getItem("daftarTugas");
  return data ? JSON.parse(data) : [];
}

export function simpanCatatanKeStorage(daftarCatatan) {
  localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

export function muatCatatanDariStorage() {
  const data = localStorage.getItem("daftarCatatan");
  return data ? JSON.parse(data) : [];
}