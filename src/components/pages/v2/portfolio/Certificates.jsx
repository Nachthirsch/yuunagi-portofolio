/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { HiCode, HiOutlineCloudUpload, HiOutlineMap } from "react-icons/hi";
import { PiNetworkLight } from "react-icons/pi";
import { SiCanva } from "react-icons/si";

const SectionHeader = ({ subtitle, title, highlightedWord }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center mb-32 relative">
      <div className="absolute -top-12 left-1/2 w-32 h-32 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-full blur-3xl transform -translate-x-1/2" />
      <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block transform hover:skew-x-12 transition-transform duration-300">{subtitle}</span>
      <h2 className="text-5xl font-light text-neutral-800 mb-6">
        {title} <span className="font-semibold relative inline-block transform hover:rotate-[10deg] transition-transform duration-300">{highlightedWord}</span>
      </h2>
      <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent transform hover:scale-x-150 transition-transform duration-300" />
    </motion.div>
  );
};

const CertificateCard = ({ cert, index }) => {
  // Calculate weird positions and transforms
  const getRandomRotation = () => {
    const baseRotation = index % 2 === 0 ? 5 : -5;
    return baseRotation + Math.sin(index) * 3;
  };

  const getRandomTransform = () => {
    const xOffset = Math.sin(index * 0.8) * 20;
    const yOffset = Math.cos(index * 1.2) * 15;
    const rotation = getRandomRotation();
    const scale = 1 + Math.sin(index * 0.5) * 0.05;
    return `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg) scale(${scale})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: getRandomRotation() * 2 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: getRandomRotation(),
        transition: {
          delay: index * 0.15,
          duration: 1,
          type: "spring",
          stiffness: 70,
        },
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.4 },
      }}
      style={{ transform: getRandomTransform() }}
      className={`group relative w-full hover:z-10 ${index % 3 === 0 ? "md:translate-x-8" : index % 3 === 1 ? "-md:translate-x-8" : "md:translate-y-12"} ${index % 4 === 0 ? "lg:col-span-2" : index % 5 === 0 ? "lg:row-span-2" : ""}`}
    >
      {/* Weird Background Elements */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 blur-2xl transform rotate-45" />
        <div className={`absolute -inset-6 bg-gradient-to-br ${cert.color} opacity-5 blur-3xl transform -rotate-12`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_100%)] opacity-70" />
      </div>

      <div
        className={`relative bg-white/90 backdrop-blur-sm rounded-lg p-6 
                    border border-neutral-100 hover:border-neutral-200
                    transition-all duration-500 flex flex-col
                    hover:shadow-[0_0_25px_rgba(0,0,0,0.05)]
                    min-h-[240px] transform perspective-1000
                    group-hover:[transform-style:preserve-3d]
                    group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]`}
      >
        {/* Floating Decorative Elements */}

        {/* Animated Category Tag */}
        <div className="flex items-center gap-3 mb-4 transform group-hover:-skew-x-6 transition-transform duration-500">
          <div className={`h-[2px] flex-grow bg-gradient-to-r ${cert.color} opacity-30 transform origin-left group-hover:scale-x-110 transition-transform duration-700`} />
          <span className="text-xs font-medium text-neutral-500 whitespace-nowrap transform group-hover:scale-105 transition-transform duration-500">{cert.category}</span>
          <div className={`h-[2px] flex-grow bg-gradient-to-l ${cert.color} opacity-30 transform origin-right group-hover:scale-x-110 transition-transform duration-700`} />
        </div>

        {/* Content with Hover Effects */}
        <div className="flex-1 transform group-hover:translate-z-10">
          <h3 className="text-lg font-medium text-neutral-800 mb-3 line-clamp-2 transform group-hover:translate-x-1 transition-transform duration-500">{cert.title}</h3>
          <p className="text-sm text-neutral-600 mb-1 transform group-hover:-translate-x-1 transition-transform duration-500 delay-75">{cert.issuer}</p>
          <p className="text-xs text-neutral-400 transform group-hover:translate-x-1 transition-transform duration-500 delay-150">{cert.date}</p>
        </div>

        {/* Animated Credential Link */}
        {cert.credential && (
          <motion.a
            href={cert.credential}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm
                     text-neutral-500 hover:text-neutral-800 transition-colors
                     relative z-10 transform group-hover:translate-x-2 transition-transform duration-700"
            whileHover={{ x: 8, y: -2 }}
          >
            View Credential
            <ExternalLink size={14} className="transform group-hover:rotate-45 transition-transform duration-500" />
          </motion.a>
        )}

        {/* Abstract Corner Decorations */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${cert.color} opacity-10 transform rotate-45 translate-x-6 -translate-y-6`} />
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
          <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tl ${cert.color} opacity-10 transform -rotate-45 -translate-x-6 translate-y-6`} />
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const certificates = [
    {
      title: "IT BootCamp Software Development",
      issuer: "Fakultas Teknik & Informatik Universitas Bina Sarana Indonesia",
      date: "June 2023",
      icon: HiCode,
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      credential: "https://says.bsi.ac.id/e_sertifikat_lykan-MzE3MTE1MTExNTU=.html",
    },
    {
      title: "Network Security",
      issuer: "Cisco Networking Academy",
      date: "Jan 2024",
      icon: PiNetworkLight,
      category: "Networking",
      color: "from-green-500 to-emerald-500",
      credential: "https://lykan.bsi.ac.id/sertifikat_lsp/network/17210529.pdf",
    },
    {
      title: "AWS Academy Graduate - AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2024",
      icon: HiOutlineCloudUpload,
      category: "Cloud",
      color: "from-orange-500 to-amber-500",
      credential: "https://www.credly.com/badges/bebc1612-fc72-4fbc-bbee-8aaa305733b1/linked_in_profile",
    },
    {
      title: "AWS Academy Graduate - AWS Academy Cloud Architecting",
      issuer: "Amazon Web Services (AWS)",
      date: "Mar 2024",
      icon: HiOutlineCloudUpload,
      category: "Cloud",
      color: "from-orange-500 to-amber-500",
      credential: "https://www.credly.com/badges/c1b8558f-9439-41af-8802-211d248924f9/linked_in_profile",
    },
    {
      title: "Web Development Fundamentals",
      issuer: "IBM",
      date: "Oct 2024",
      icon: HiCode,
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      credential: "https://www.credly.com/badges/30014ae2-6bea-4169-ac48-334afe722250/linked_in_profile",
    },
    {
      title: "Fullstack Development: Membuat Weather App with Hacktiv8",
      issuer: "Udemy",
      date: "Oct 2024",
      icon: HiCode,
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      credential: "https://www.linkedin.com/in/handra-putratama-tanjung/details/certifications/1729663108791/single-media-viewer/?profileId=ACoAADfROqcBdgHN9POm8lFkj1bxhQBA6PbhaSE",
    },
    {
      title: "Pelatihan Pengolahan Pemuktakhiran Data Geospasial dan Muatan",
      issuer: "Badan Pusat Statistik",
      date: "Apr 2022",
      icon: HiOutlineMap,
      category: "GIS",
      color: "from-purple-500 to-violet-500",
      credential: "https://drive.google.com/file/d/1deOnGdrgQg1ZIjpOh2AJnQfXsA_4MCnV/view?usp=sharing",
    },
    {
      title: "Pelatihan dan pendampingan Pembuatan Konten Produk Berbasis Teknologi Tepat Guna dengan Apilkasi Canva untuk Pemasaran Secara Digital bagi KWT Pancasona",
      issuer: "PPM UBSI",
      date: "Jul 2024",
      icon: SiCanva,
      category: "Design",
      color: "from-pink-500 to-rose-500",
      credential: "https://drive.google.com/file/d/1ddzVFaYc4hPPXh-W7tMdgLuiPKpNb6t7/view?usp=sharing",
    },
    {
      title: "ReactJS for Front-end Website Developer",
      issuer: "Hacktiv8",
      date: "Dec 2024",
      category: "Development",
      color: "from-blue-500 to-cyan-500",
      icon: HiCode,
      credential: "https://media.licdn.com/dms/image/v2/D562DAQHePggYbWlqoA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1737448452738?e=1738818000&v=beta&t=t-ZuoMQbsO2fJd4svUjT08tnuoT-P36bUU0cy2-ncT0",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader subtitle="Achievements" title="Badges &" highlightedWord="Certifications" />

        {/* Chaotic Background Elements */}
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-blue-50/20 to-transparent rounded-full blur-3xl transform -translate-y-1/2 rotate-12 animate-pulse" />
            <div className="absolute -bottom-20 right-1/3 w-[800px] h-[800px] bg-gradient-to-tl from-purple-50/20 to-transparent rounded-full blur-3xl transform translate-y-1/2 -rotate-12 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-50/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>

          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 relative">
            {certificates.map((cert, index) => (
              <CertificateCard key={index} cert={cert} index={index} />
            ))}
          </div>

          {/* Abstract Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neutral-200/30 to-transparent transform -rotate-3" />
            <div className="absolute bottom-1/3 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-neutral-200/30 to-transparent transform rotate-3" />
            <div className="absolute left-1/4 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-neutral-200/30 to-transparent transform -rotate-12" />
            <div className="absolute right-1/4 bottom-0 w-[2px] h-full bg-gradient-to-t from-transparent via-neutral-200/30 to-transparent transform rotate-12" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
