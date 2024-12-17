// DOM Elemanlarını Seçme
export const output = document.querySelector('#products'); // Ürünleri gösteren alan
export const butonlar = document.querySelector('#btns'); // Kategori butonları
export const kategoriler = document.querySelector('#category'); // Seçili kategori başlığı
export const aramaKutusu = document.querySelector('#searchInput'); // Arama kutusu
export const modalBaslik = document.querySelector('#exampleModalLabel'); // Modal başlık
export const modalBody = document.querySelector('.modal-body'); // Modal içeriği
export const sepetteYumurta = document.querySelector('#sepet'); // Sepet simgesi
export const sepetSayfasi = document.querySelector('#sepetBody'); // Sepet sayfası içeriği
export const sepetToplam = document.querySelector('#sepetTotal'); // Sepet toplam tutarı
export const buttonClasses = [
  'btn-primary',
  'btn-secondary',
  'btn-success',
  'btn-danger',
  'btn-warning',
  'btn-info',
];
export const apiUrl = 'https://anthonyfs.pythonanywhere.com/api/products/'; // API URL'si
