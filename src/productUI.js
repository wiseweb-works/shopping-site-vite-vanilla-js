import {
  output,
  apiUrl,
  butonlar,
  buttonClasses,
  kategoriler,
} from './variables';

// Veri Çekme Fonksiyonu
export const veriGetir = async () => {
  localStorage.clear();
  try {
    output.innerHTML = `<p class="text-center">Ürünler yükleniyor...</p>`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Veri alınamadı.');

    const data = await res.json();
    localStorage.setItem('All', JSON.stringify(data));
    ekranaBas(data);
    kategoriTopla(data);
  } catch (error) {
    alert(`Hata: ${error.message}`);
  }
};

// Ürünleri Ekrana Basma Fonksiyonu
const ekranaBas = (veri) => {
  output.innerHTML = '';
  let biriktir = '';
  veri.forEach((item) => {
    biriktir += `
        <div class='card'>
          <img src='${item.image}' class='p-2' height='250px' alt="${item.title} Görseli" />
          <div class='card-body'>
            <h5 class='card-title line-clamp-1'>${item.title}</h5>
            <p class='card-text line-clamp-3'>${item.description}</p>
          </div>
          <div class='card-footer w-100 fw-bold d-flex justify-content-between gap-3'>
            <span>Fiyat:</span><span>${item.price} ₺</span>
          </div>
          <div class='card-footer w-100 d-flex justify-content-center gap-3'>
            <button class='btn btn-danger' data-id='${item.id}'>Sepete Ekle</button>
            <button class='btn btn-primary' data-id='${item.id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
              Detay Gör
            </button>
          </div>
        </div>`;
  });
  output.innerHTML = biriktir;
};

// Kategorileri Topla ve Ekrana Bas
const kategoriTopla = (urun) => {
  let hepsi = ['All'];
  urun.forEach((element) => {
    if (!hepsi.includes(element.category)) hepsi.push(element.category);
  });
  kategoriBas(hepsi);
};

// Kategori Butonlarını Oluşturma
const kategoriBas = (veri) => {
  let index = 0;
  butonlar.innerHTML = '';
  let biriktir = '';
  veri.forEach((element) => {
    const buttonClass = buttonClasses[index % buttonClasses.length];
    index++;
    biriktir += `<button type='button' id='${element}' class='btn ${buttonClass}'>${element.toUpperCase()}</button>`;
  });
  butonlar.innerHTML = biriktir;
};

// Kategoriye Göre Filtreleme
export const kategoriyeGoreGetir = (kategori, input) => {
  kategoriler.textContent = kategori;
  const data = JSON.parse(localStorage.getItem('All')) || [];
  let kategoriData;

  if (kategori !== 'All') {
    kategoriData = data.filter((esya) => esya.category === kategori);
  } else {
    kategoriData = data;
  }

  if (input) {
    kategoriData = kategoriData.filter((item) =>
      item.title.toLowerCase().includes(input.toLowerCase())
    );
  }

  ekranaBas(kategoriData);
};
