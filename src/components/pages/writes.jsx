import { motion } from "framer-motion";
import { Book } from "lucide-react";

const WritesPage = () => {
  return (
    <section className="min-h-screen bg-neutral-900 pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
            <Book className="text-neutral-400" size={32} />
            YORUSHIKA DAN PENULISAN LIRIKNYA
          </h1>
          <motion.div 
            className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" 
            initial={{ width: 0 }} 
            animate={{ width: "8rem" }} 
            transition={{ duration: 0.8, delay: 0.3 }} 
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="space-y-6 text-neutral-300 leading-relaxed tracking-wide">
            <p>
              Untuk para penikmat setia J-Pop, apabila kalian mendengar nama Yoasobi, maka mungkin nama Yorushika tidak asing di telinga kalian. 
              Siapa yang tidak mengenal dua artist dengan nama bertemakan malam tersebut, kedua grup musik ini telah mencuri hati banyak pendengar 
              dengan karya-karya mereka yang penuh dengan kekuatan emosional.
            </p>

            <div className="bg-neutral-800/30 p-6 rounded-lg border border-neutral-700/30">
              <p className="text-neutral-400 italic">
                Disclaimer: Saya tidak terlalu meng-eksplor banyak band/artist di luar sana dan saya sendiri tidak terlalu mendalami dunia musik.
                Dalam postingan ini, saya mungkin menggunakan gaya penulisan yang sedikit superior mengenai mereka. 
                Mohon maaf jika ada kata-kata saya yang menyinggung perasaan para pembaca.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-neutral-200 mt-8 mb-4">
              Menelusuri Jejak n-buna: Maestro di Balik Yorushika
            </h2>

            <p>
              Mari kita bahas tentang n-buna terlebih dahulu, seorang komposer dan gitaris yang merupakan otak di balik Yorushika. 
              Sebelumnya, n-buna adalah seorang produser vocaloid yang menjadi alasan utama terbentuknya Yorushika.
            </p>

            <p>
             N-buna memegang konsep ide "Art for art's sake" dalam pembuatan karyanya. Baginya, karya yang dibuatnya adalah untuk seni itu sendiri, tanpa mempedulikan ketenaran atau apresiasi dari orang lain.
            </p>

            <p>
                N-buna sudah mulai berkarya sejak masa remajanya, dengan karya pertamanya berjudul "Alice to Trust" yang dirilis di platform Nico Nico Douga pada tanggal 2 Maret 2012. Keluarga n-buna juga memiliki latar belakang musikal yang kuat, dengan kakak perempuannya yang memainkan drum, adik perempuannya yang memainkan piano, ibunya yang memainkan seruling, kakak laki-lakinya yang memainkan gitar elektrik, dan kakeknya yang memainkan gitar akustik.

            </p>

            <h2 className="text-2xl font-semibold text-neutral-200 mt-8 mb-4">
                Karya Literatur Sebagai Inspirasi
            </h2>

            <p>
                Mari kita jelajahi bagaimana n-buna memanfaatkan karya sastra sebagai inspirasi dalam menciptakan lagu-lagu Yorushika. 
                Pendekatan yang diambil n-buna terbilang unik jika dibandingkan dengan sejumlah band atau artis J-Pop lainnya. 
                Dalam karyanya, n-buna seringkali mengadopsi elemen-elemen dari karya literatur sebagai konsep dasar dalam pembuatan lagu-lagu Yorushika.
            </p>

            <p>
                Sebagai contoh, lagu "Fireworks Beneath My Shoes" dari album "The Summer Grass is Getting in My Way" menampilkan pengaruh dari karya sastra "The Nighthawk Star", sebuah cerita pendek yang ditulis oleh Kenji Miyazawa. Masih banyak lagu-lagu Yorushika yang n-buna buat dengan referensi literatur seperti lagu sebelumnya.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-200 mt-8 mb-4"> 
                Konsep Album
            </h2>

            <p>
                Jika kalian menggemari karya literatur dan genre J-Pop, saya akan sangat merekomendasikan kalian mendengarkan karya-karya mereka. 
                Karakteristik lore dalam lagu-lagu Yorushika dapat dijelaskan secara singkat dengan tema "Pertemuan dan Perpisahan" atau"Kematian dan Reinkarnasi".
            </p>

            <p>
                N-buna sering kali mengaitkan karyanya dengan karyanya yang lain, menciptakan hubungan yang melankolis antara mereka. 
                Hampir seluruh lagu Yorushika memiliki hubungan parallel, bahkan beberapa fans berteori bahwa lagu-lagu Yorushika yang sekarang terhubung dengan lagu-lagu vocaloid yang di buat n-buna dahulu sebelum terbentuknya Yorushika.
            </p>

            <p>
                Sebagai contoh, album mereka Dakaboku dan Elma memiliki keterhubungan yang sangat kental. Pada dasarnya, ceritanya adalah tentang Amy (tokoh utama Dakaboku) yang melakukan perjalanan ke Swedia, dan kemudian Elma melakukan perjalanan yang sama satu tahun kemudian.
            </p>
            



            {/* Continue with the rest of the content sections */}
            
            <h2 className="text-2xl font-semibold text-neutral-200 mt-8 mb-4">
              Lirik yang Puitis nan Katarsis
            </h2>

            <div className="bg-neutral-800/20 p-6 rounded-lg border border-neutral-700/30 my-6">
              <h3 className="text-xl text-neutral-200 mb-4">"Fireworks Beneath my Shoes"</h3>
              <div className="space-y-6">
                {['Chorus 1', 'Chorus 2', 'Chorus 3'].map((chorus, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-neutral-400 font-medium">{chorus}</h4>
                    <p className="text-neutral-300 italic pl-4 border-l-2 border-neutral-700">
                      {
                      chorus === 'Chorus 1' && (
                        <>
                          Bunga mekar di bawah sepatuku<br />
                          Bunga api yang besar bermekaran<br />
                          "Aku akan meninggalkan seluruh perasaanku", itulah pikirku<br />
                          Musim panas yang seperti itu pun terlihat
                        </>
                      )}
                      {
                        chorus === 'Chorus 2' && (
                            <>
                                Bunga selalu berbunyi di bawahku<br />  
                                Bunga api yang besar pun berbunyi<br />
                                "Suara saja bisa membuatku menangis", itulah pikirku<br />
                                Musim panas yang seperti itu pun terdengar
                            </>
                        )
                      }
                      {
                        chorus === 'Chorus 3' && (
                            <>
                                Bunga mekar di langit musim panas<br />
                                Bunga api yang besar pun mekar<br />
                                "Aku ingin terus menangis selamanya", itulah pikirku<br />
                                Musim panas yang seperti itu pun menghilang
                            </>
                        )
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-neutral-400 italic pl-4 border-l-2 border-neutral-700">
                        Coba kalian perhatikan baris akhir tiap chorus yang saya cantumkan di atas.
                        <span className="text-neutral-300">{" "}Apa yang awalnya terlihat, lalu terdengar, dan kemudian menghilang?{" "}</span>
                        Yup, sesuai judulnya, jawabannya <span className="text-neutral-200">Kembang Api</span>.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-200 mt-8 mb-4">
              Penutup
            </h2>   

            <p className="text-neutral-400">
              Masih banyak lirik-lirik dalam lagu Yorushika yang memiliki kesan puitis dan dalam. 
              Saya ingin kalian menemukannya sendiri ketika mendengar karya mereka.
            </p>

            <p className="text-neutral-400">
              Bila ada kesalahan kata, dan bila saya menyinggung perasaan kalian, saya mohon maaf. Sekian dan Terima Kasih!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WritesPage;
