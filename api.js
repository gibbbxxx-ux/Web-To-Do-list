export async function ambilKutipan() {
  const kutipanText = document.getElementById("kutipan-harian");
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




export async function ambilCuaca(kota) {
  const cuacaHasil = document.getElementById("cuaca-hasil");
  const apiKey = "18841e293493445a30cd12b4f150c108";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    kota
  )}&appid=${apiKey}&units=metric`;

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

export async function muatSemuaWidget() {
  const status = document.getElementById("status");
  status.textContent = "Memuat data...";
  await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);
  status.textContent = "Data berhasil dimuat";
}

export function initCuaca() {
  const inputKota = document.getElementById("input-kota");
  const tombolCuaca = document.getElementById("tombol-cuaca");
  const info = document.getElementById("info-cuaca");

  tombolCuaca.addEventListener("click", () => {
    const kota = inputKota.value.trim();
    if (kota === "") {
      info.textContent = "Masukkan nama kota terlebih dahulu";
      return;
    }
    ambilCuaca(kota);
  });
}