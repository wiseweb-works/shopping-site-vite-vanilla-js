import { modalBaslik, modalBody } from './variables';
import { sepetteGoster } from './sepetUI';

// Sepete Ekleme
export const sepeteEkle = (id) => {
  const allProducts = JSON.parse(localStorage.getItem('All')) || [];
  const mevcut = JSON.parse(localStorage.getItem('sepet')) || [];
  const urun = allProducts.find((urun) => urun.id == id);

  if (!urun) return;

  const { title, price, image } = urun;
  const urunIndex = mevcut.findIndex((urun) => urun[0] === title);

  if (urunIndex !== -1) mevcut[urunIndex][2]++;
  else mevcut.push([title, image, 1, price]);

  localStorage.setItem('sepet', JSON.stringify(mevcut));
  sepetteGoster();
};

// Ürün Detaylarını Gösterme
export const detayGöster = (id) => {
  const urun = JSON.parse(localStorage.getItem('All')).find(
    (urun) => urun.id == id
  );
  if (!urun) return;

  const { title, description, price, image } = urun;
  modalBaslik.textContent = title;
  modalBody.innerHTML = `
      <img src="${image}" height="250px" alt="${title}">
      <p>${description}</p>
      <p>Fiyat: ${price} ₺</p>`;
};
