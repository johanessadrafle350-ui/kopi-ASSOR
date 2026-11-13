function hitungTotal(harga, jumlah) {
  let total = harga * jumlah;
  if (jumlah >= 5) {
    total = total * 0.9; // diskon 10%
  }
  return total;
}
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// 1. Total otomatis (pesan.html)
const pilihMenu = document.getElementById("menu");
const jumlah = document.getElementById("jumlah");
const total = document.getElementById("total");
function updateTotal() {
  const hasil = hitungTotal(Number(pilihMenu.value), Number(jumlah.value));
  total.textContent = formatRupiah(hasil);
}
if (pilihMenu && jumlah && total) {
  pilihMenu.addEventListener("change", updateTotal);
  jumlah.addEventListener("input", updateTotal);
  updateTotal();
}

// 2. Validasi form (pesan.html)
const formPesan = document.getElementById("formPesan");
if (formPesan) {
  formPesan.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const hp = document.getElementById("hp").value.trim();
    const meja = document.getElementById("meja").value;
    const jml = Number(jumlah.value);
    let valid = true;

    document.getElementById("errNama").textContent = "";
    document.getElementById("errHp").textContent = "";
    document.getElementById("errMeja").textContent = "";
    document.getElementById("errJumlah").textContent = "";
    document.getElementById("pesanSukses").textContent = "";

    if (nama.length < 3) {
      document.getElementById("errNama").textContent = "Nama minimal 3 huruf.";
      valid = false;
    }
    if (!/^08[0-9]{8,11}$/.test(hp)) {
      document.getElementById("errHp").textContent =
        "No. HP harus diawali 08 dan berisi 10-13 angka.";
      valid = false;
    }
    if (meja === "") {
      document.getElementById("errMeja").textContent = "No. meja wajib dipilih.";
      valid = false;
    }
    if (jml < 1) {
      document.getElementById("errJumlah").textContent = "Jumlah minimal 1.";
      valid = false;
    }
    if (valid) {
      document.getElementById("pesanSukses").textContent =
        "Terima kasih " + nama + ", pesanan untuk meja " + meja +
        " diterima. Total: " + total.textContent;
    }
  });
}

// 3. Filter kategori menu (menu.html)
document.querySelectorAll(".filter button").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    const pilihan = this.dataset.filter;
    document.querySelectorAll(".filter button").forEach(function (t) {
      t.classList.remove("aktif");
    });
    this.classList.add("aktif");
    document.querySelectorAll(".daftar-menu .kartu").forEach(function (kartu) {
      const cocok = pilihan === "semua" || kartu.dataset.kategori === pilihan;
      kartu.style.display = cocok ? "" : "none";
    });
  });
});

// 4. Pencarian tabel (admin/pesanan.html)
const cari = document.getElementById("cari");
if (cari) {
  cari.addEventListener("input", function () {
    const kata = this.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach(function (baris) {
      baris.style.display = baris.textContent.toLowerCase().includes(kata) ? "" : "none";
    });
  });
}

// 5. Tombol Selesai (admin/pesanan.html)
document.querySelectorAll(".btn-selesai").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    const baris = this.closest("tr");
    baris.querySelector(".status").textContent = "Selesai";
    baris.classList.add("selesai");
  });
});