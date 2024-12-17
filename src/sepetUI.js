import { sepetSayfasi, sepetToplam } from './variables';

// Sepetteki Ürünleri Hesaplama
export const sepetHesap = (id, islem) => {
  const urunler = JSON.parse(localStorage.getItem('sepet')) || [];
  switch (islem) {
    case 'artir':
      urunler[id][2]++;
      break;
    case 'azalt':
      if (urunler[id][2] > 1) urunler[id][2]--;
      break;
    case 'remove':
      urunler.splice(id, 1);
      break;
  }
  localStorage.setItem('sepet', JSON.stringify(urunler));
  sepetteGoster();
};

// Sepetteki Ürünleri Gösterme
export const sepetteGoster = () => {
  sepetSayfasi.innerHTML = '';
  const urunler = JSON.parse(localStorage.getItem('sepet')) || [];
  sepet.textContent = urunler.length;
  let fiyat = 0;

  if (!urunler.length) {
    sepetSayfasi.innerHTML = `<p class="text-center">Sepetiniz boş!</p>`;
    sepetToplam.innerHTML = '';
    return;
  }

  let biriktir = '';
  urunler.forEach((element, index) => {
    biriktir += `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4 my-auto">
                    <img src="${element[1]}" class="img-fluid" alt="${element[0]} Görseli" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5>${element[0]}</h5>
                        <div class="d-flex align-items-center gap-2">
                            <i class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2 btn-azalt" data-index="${index}"></i>
                            <span class="fw-bold">${element[2]}</span>
                            <i class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2 btn-artir" data-index="${index}"></i>
                        </div>
                        <p>Total: ${element[2]} x ${element[3]} ₺</p>
                        <button class="btn btn-danger btn-sil" data-index="${index}">Remove</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    fiyat += element[2] * element[3];
  });

  sepetSayfasi.innerHTML = biriktir;
  sepetToplam.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mx-4 mb-1">
        <h5>Toplam Tutar</h5>
        <h5>${fiyat.toFixed(2)} ₺</h5>
      </div>`;

  // Butonlara event listener ekleme
  document.querySelectorAll('.btn-azalt').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      sepetHesap(index, 'azalt');
    });
  });

  document.querySelectorAll('.btn-artir').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      sepetHesap(index, 'artir');
    });
  });

  document.querySelectorAll('.btn-sil').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      sepetHesap(index, 'remove');
    });
  });
};
