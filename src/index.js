import { veriGetir, kategoriyeGoreGetir } from './productUI';
import { sepeteEkle, detayGöster } from './utils';
import { butonlar, aramaKutusu, kategoriler, output } from './variables';

// Sayfa Yüklenince Veri Çek
window.addEventListener('load', () => veriGetir());

// Kategori Butonları Event Listener
butonlar.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON')
    kategoriyeGoreGetir(e.target.id, aramaKutusu.value);
});

// Arama Kutusu Dinleme
aramaKutusu.addEventListener('input', () => {
  kategoriyeGoreGetir(kategoriler.textContent, aramaKutusu.value);
});

// Ürünler Bölgesi Event Listener
output.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger'))
    sepeteEkle(e.target.getAttribute('data-id'));
  if (e.target.classList.contains('btn-primary'))
    detayGöster(e.target.getAttribute('data-id'));
});
