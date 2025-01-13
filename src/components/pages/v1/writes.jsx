/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Book } from "lucide-react";

const WritesPage = () => {
  const { slug } = useParams();

  // In a real application, you would fetch the blog post data based on the slug
  // For now, we'll just use the existing content
  const blogPost = {
    title: "YORUSHIKA DAN PENULISAN LIRIKNYA",
    content: `
      <p>Untuk para penikmat setia J-Pop, apabila kalian mendengar nama Yoasobi, maka mungkin nama Yorushika tidak asing di telinga kalian. Siapa yang tidak mengenal dua artist dengan nama bertemakan malam tersebut, kedua grup musik ini telah mencuri hati banyak pendengar dengan karya-karya mereka yang penuh dengan kekuatan emosional.</p>
      <p>Meskipun sudah ada beberapa tulisan tentang Yorushika di luar blog ini, saya ingin mengambil kesempatan ini untuk mempromosikan karya seni (baca: Yorushika) yang luar biasa ini sekali lagi, mungkin sedikit lebih dalam untuk penulisan lagu mereka.</p>
      <p>Bisa dibilang saya adalah salah satu pendengar setia mereka. Tulisan ini hanya akan berisi apresiasi saya terhadap mereka dan sedikit pejelasan lore dalam karya karyanya.</p>

      <div class="bg-neutral-800/30 p-6 rounded-lg border border-neutral-700/30">
        <p class="text-neutral-400 italic">Disclaimer: Saya tidak terlalu meng-eksplor banyak band/artist di luar sana dan saya sendiri tidak terlalu mendalami dunia musik. Dalam tulisan ini, saya mungkin menggunakan gaya penulisan yang sedikit superior mengenai mereka. Mohon maaf jika ada kata-kata saya yang menyinggung perasaan para pembaca.</p>
      </div>

      <h2 class="text-2xl font-semibold text-neutral-200 mt-8 mb-4">Menelusuri Jejak n-buna: Maestro di Balik Yorushika</h2>

      <p>Mari kita bahas tentang n-buna terlebih dahulu, seorang komposer dan gitaris yang merupakan otak di balik Yorushika. Sebelumnya, n-buna adalah seorang produser vocaloid yang menjadi alasan utama terbentuknya Yorushika.Mari kita bahas tentang n-buna terlebih dahulu, seorang komposer dan gitaris yang merupakan otak di balik Yorushika. Sebelumnya, n-buna adalah seorang produser vocaloid yang menjadi alasan utama terbentuknya Yorushika. Jika harus mendeskripsikan n-buna, mungkin kata "Genius" cukup mewakili. Alasan di balik deskripsi ini adalah karena aransemen kompleks yang dia buat dan rangkaian kata (baca: lirik) puitis yang dia tulis.</p>
      <p>N-buna memegang konsep ide <strong class="font-bold">"Art for art's sake"</strong> dalam pembuatan karyanya. Baginya, karya yang dibuatnya adalah untuk seni itu sendiri, tanpa mempedulikan ketenaran atau apresiasi dari orang lain.</p>
      <p>N-buna sudah mulai berkarya sejak masa remajanya, dengan karya pertamanya berjudul <strong class="font-bold">"Alice to Trust"</strong> yang dirilis di platform Nico Nico Douga pada tanggal 2 Maret 2012. Keluarga n-buna juga memiliki latar belakang musikal yang kuat.</p>

      <h2 class="text-2xl font-semibold text-neutral-200 mt-8 mb-4">Karya Literatur Sebagai Inspirasi</h2>

      <p>Mari kita jelajahi bagaimana n-buna memanfaatkan karya sastra sebagai inspirasi dalam menciptakan lagu-lagu Yorushika. Pendekatan yang diambil n-buna terbilang unik jika dibandingkan dengan sejumlah band atau artis J-Pop lainnya. Dalam karyanya, n-buna seringkali mengadopsi elemen-elemen dari karya literatur sebagai konsep dasar dalam pembuatan lagu-lagu Yorushika.</p>
      <p>Sebagai contoh, lagu <strong class="font-bold">"Fireworks Beneath My Shoes"</strong> dari album <strong class="font-bold">"The Summer Grass is Getting in My Way"</strong> menampilkan pengaruh dari karya sastra <strong class="font-bold">"The Nighthawk Star"</strong>, sebuah cerita pendek yang ditulis oleh <strong class="font-bold">Kenji Miyazawa</strong>. Masih banyak lagu-lagu Yorushika yang n-buna buat dengan referensi literatur seperti lagu sebelumnya.</p>

      <h2 class="text-2xl font-semibold text-neutral-200 mt-8 mb-4">Konsep Album</h2>

      <p>Jika kalian menggemari karya literatur dan genre J-Pop, saya akan sangat merekomendasikan kalian mendengarkan karya-karya mereka. Karakteristik lore dalam lagu-lagu Yorushika dapat dijelaskan secara singkat dengan tema "Pertemuan dan Perpisahan" atau "Kematian dan Reinkarnasi".</p>
      <p>N-buna sering kali mengaitkan karyanya dengan karyanya yang lain, menciptakan hubungan yang melankolis antara mereka. Hampir seluruh lagu Yorushika memiliki hubungan parallel, bahkan beberapa fans berteori bahwa lagu-lagu Yorushika yang sekarang terhubung dengan lagu-lagu vocaloid yang di buat n-buna dahulu sebelum terbentuknya Yorushika.</p>
      <p>Sebagai contoh, album mereka <strong class="font-bold">Dakaboku</strong> dan <strong class="font-bold">Elma</strong> memiliki keterhubungan yang sangat kental. Pada dasarnya, ceritanya adalah tentang Amy (tokoh utama Dakaboku) yang melakukan perjalanan ke Swedia, dan kemudian Elma melakukan perjalanan yang sama satu tahun kemudian.</p>

      <h2 class="text-2xl font-semibold text-neutral-200 mt-8 mb-4">Lirik yang Puitis nan Katarsis</h2>

      <p>Lirik-lirik dari Yorushika memang tak terbantahkan dalam kedalaman puitisnya. n-buna sering kali memanfaatkan permainan kata-kata untuk menciptakan dimensi kompleks dalam lagu-lagu Yorushika, menambahkan lapisan emosional yang dalam. Namun, kekuatan sejati dari lirik-lirik mereka bukan hanya terletak pada aspek puitisnya, melainkan juga pada kemampuannya untuk menciptakan pengalaman katarsis bagi pendengar.</p>
      <p>Lirik-lirik lagu mereka tak hanya mengungkapkan keindahan kata-kata, tetapi juga menggambarkan realitas hidup yang bisa dirasakan oleh siapa pun. Hal ini memungkinkan para penggemar untuk merasa terhubung secara emosional dengan karya-karya mereka, menambahkan kedalaman makna pada setiap lagu yang mereka dengarkan.</p>
      <p>Saya akan memberikan sebuah contoh dimana lirik mereka memiliki permainan kata yang cukup puitis bagi saya</p>

      <div class="bg-neutral-800/30 p-6 rounded-lg border border-neutral-700/30">
        <h2 class="text-2xl font-semibold text-neutral-200 mb-4">"Fireworks Beneath my Shoes"</h2>

        <h4 class="text-lg font-semibold text-neutral-200 mb-2">Chorus 1</h4>
        <p class="text-neutral-400 italic">Bunga mekar di bawah sepatuku</p>
        <p class="text-neutral-400 italic">Bunga api yang besar bermekaran</p>
        <p class="text-neutral-400 italic">"Aku akan meninggalkan seluruh perasaanku", itulah pikirku</p>
        <p class="text-neutral-400 italic font-bold  mb-8">Musim panas yang seperti itu pun terlihat</p>

        <h4 class="text-lg font-semibold text-neutral-200 mb-2">Chorus 2</h4>
        <p class="text-neutral-400 italic">Bunga selalu berbunyi di bawahku</p>
        <p class="text-neutral-400 italic">Bunga api yang besar pun berbunyi</p>
        <p class="text-neutral-400 italic">"Suara saja bisa membuatku menangis", itulah pikirku</p>
        <p class="text-neutral-400 italic font-bold mb-8">Musim panas yang seperti itu pun terdengar</p>

        <h4 class="text-lg font-semibold text-neutral-200 mb-2">Chorus 3</h4>
        <p class="text-neutral-400 italic">Bunga mekar di langit musim panas</p>
        <p class="text-neutral-400 italic">Bunga api yang besar pun mekar</p>
        <p class="text-neutral-400 italic">"Aku ingin terus menangis selamanya", itulah pikirku</p>
        <p class="text-neutral-400 italic font-bold">Musim panas yang seperti itu pun menghilang</p>
      </div>

      <p>Coba kalian perhatikan baris akhir tiap chorus yang saya cantumkan di atas.</p>
      <p>Apa yang awalnya <strong class="font-bold">terlihat</strong>, lalu <strong class="font-bold">terdengar</strong>, dan kemudian <strong class="font-bold">menghilang</strong>? Yup, sesuai judulnya, jawabannya <strong class="font-bold">Kembang Api</strong>.</p> 

      <h2 class="text-2xl font-semibold text-neutral-200 mt-8 mb-4">Penutup</h2>

      <p>Masih banyak lirik-lirik dalam lagu Yorushika yang memiliki kesan puitis dan dalam. Saya ingin kalian menemukannya sendiri ketika mendengar karya mereka. Bila ada kesalahan kata, dan bila saya menyinggung perasaan kalian, saya mohon maaf. Sekian dan Terima Kasih!</p>
    `,
  };

  return (
    <section className="min-h-screen bg-neutral-900 pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
            <Book className="text-neutral-400" size={32} />
            {blogPost.title}
          </h1>
          <motion.div className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert max-w-none">
          <div className="space-y-6 text-neutral-300 leading-relaxed tracking-wide" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </motion.div>
      </div>
    </section>
  );
};

export default WritesPage;
