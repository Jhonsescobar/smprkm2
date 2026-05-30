'use client'

import { useState, useEffect } from 'react'

// Student data for all classes
const studentData = {
  'IX-1': [
    'Alden Freda Hutapea', 'Bascelinus Gabriel Samosir', 'Birgitta Clarence Anabel Situmorang',
    'Boy Kevin Vincensius Karo Karo', 'Christian Dimitry Joaquin Purba', 'Daniel Mettiu Krisoli Sihite',
    'Feby Rosari Hutasoit', 'Grace Dellania Daely', 'Grisella Viane Sitanggang', 'Hendrick William Manurung',
    'Intan Hotmaita Solin', 'Jelita Permata Sari Br Sihombing', 'Joel Master Sigalingging',
    'Josua Gabriel Sinaga', 'Nadya Christabel Adora Sinaga', 'Nicolaus Varendra Komkaimu', 'Olivia Sirait',
    'Otto Bil Silaban', 'Paian Halomoan Sijabat', 'Raquel Marito Br. Simanungkalit',
    'Renata Juli Yanti Br Simanjuntak', 'Romualdus Sabastian Turnip', 'Samuel Siboro',
    'Steve Randy Tukunang', 'Tasya Aurelia Purba', 'Theresia Viona Valentine Br Siregar',
    'Vellysa Oktaviani Saragih', 'Wahyu Silaban', 'William Alfegio Saragih', 'Yohana Putri Hutapea',
    'Theresia Madelyn Saragih'
  ],
  'IX-2': [
    'Ayu Aprilia Tamba', 'Caroline Galia Paskah Sitanggang', 'Carolus Hotma Tua Barus',
    'Citra Ayu Agatha Sihite', 'Clinton Armando Simarmata', 'Daniel Simbolon', 'Delta Saputra Zega',
    'Erti Deo Tera Siahaan', 'Felix Hizkia Pandiangan', 'Gabriel Zanetty Purba',
    'Giska Ananda Evelyn Pakpahan', 'Glend Cristhoper Siahaan', 'Glory Pray Hutapea',
    'Gracia Margaret Br Tungkir Silalahi', 'Januari Sinaga', 'Joanna Sisilia Aruan',
    'Jovanka Marito Nainggolan', 'Medica Amanda Putri Sitorus', 'Melvin Buulolo', 'Nadya Natasya Br. Jawak',
    'Nicely Alexa Doane Lumbantobing', 'Nikita Cahaya Theresia Hutagaol', 'Noventhree Siahaan',
    'Rafael Pandi Sagala', 'Reguel Cristona Nainggolan', 'Rendy Sinaga', 'Restu Febrian Sinaga',
    'Revan Cristian Samuel Sihombing', 'Rindu Gracesia Sitorus Pane', 'Steven Saegel Simarmata',
    'Tirza Hana Putri Gultom', 'Tupal Pardamean Sagala'
  ],
  'IX-3': [
    'Agato Genetik Zamili', 'Amel Zebua', 'Brigitta Nauli Br Sinaga', 'Christ Abel Eliora Situngkir',
    'Clara Duma Riris Haloho', 'Daniel Octavianus Siahaan', 'Denada Natalyne Sianipar',
    'Desra Melinda Waty Simatupang', 'Dinda Silitonga', 'Dwi Safa Pinem', 'Fely Cristin Hutagalung',
    'Garly Fransiskus Theo Sitanggang', 'Gilbert Wageri Pasaribu', 'Gracia Uli Asi Br Turnip',
    'Graciella Simbolon', 'Jeremia Christian Simbolon', 'Limanri Oktania Gultom',
    'Melvin Alvin Ricardo Silitonga', 'Natalia Arleta Purba', 'Nehemia N P Nainggolan',
    'Oscarindo Abraham Lincol Samuel Silalahi', 'Palito De Alpacino Siregar', 'Ravael Ferdinand Hutagalung',
    'Reymon Tristan Sijabat', 'Santo Petrus Sihombing', 'Sarah Oktarisa Nababan', 'Theo Eduardo Pinem',
    'Willy Bonaventura Situmorang', 'Yustinus Sihar Syahputra Hutagaol', 'Niko Naek Tua Marbun',
    'Patricia Bella Paskah Siahaan'
  ]
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showRandomResult, setShowRandomResult] = useState(false)
  const [randomResult, setRandomResult] = useState<{ name: string; status: string } | null>(null)
  const [showFinalResult, setShowFinalResult] = useState(false)
  const [showTapToReveal, setShowTapToReveal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [celebrate, setCelebrate] = useState(false)

  // Countdown timer - target: June 2, 2025 at 2:00 PM WIB (Asia/Jakarta timezone)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      setCurrentTime(now)

      // Create target date in WIB (UTC+7)
      const targetYear = 2025
      const targetMonth = 5 // June (0-indexed)
      const targetDay = 2
      const targetHour = 14 // 2 PM
      const targetMinute = 0
      const targetSecond = 0

      // Create date in WIB timezone
      const targetDate = new Date(Date.UTC(targetYear, targetMonth, targetDay, targetHour - 7, targetMinute, targetSecond))

      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setIsAnnouncementOpen(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    // Initial calculation
    calculateTimeLeft()

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  // Search functionality
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim().toLowerCase()

    if (!trimmedQuery) {
      setErrorMessage('Silakan masukkan nama lengkap Anda')
      setShowErrorModal(true)
      return
    }

    setIsSearching(true)
    setSearchResult(null)
    setShowRandomResult(false)
    setShowTapToReveal(false)
    setShowFinalResult(false)

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Find student
    let foundStudent: { name: string; className: string } | null = null

    for (const [className, students] of Object.entries(studentData)) {
      const found = students.find(student => student.toLowerCase() === trimmedQuery)
      if (found) {
        foundStudent = { name: found, className }
        break
      }
    }

    if (!foundStudent) {
      setIsSearching(false)
      setErrorMessage('Masukkan nama dengan benar!')
      setShowErrorModal(true)
      return
    }

    setIsSearching(false)
    setSearchResult(foundStudent)
    setShowRandomResult(true)

    // Random pass/fail animation (simulate lottery)
    const results = [
      { name: foundStudent.name, status: 'LULUS' },
      { name: foundStudent.name, status: 'TIDAK LULUS' },
      { name: foundStudent.name, status: 'LULUS' },
      { name: foundStudent.name, status: 'TIDAK LULUS' },
      { name: foundStudent.name, status: 'LULUS' }
    ]

    let iteration = 0
    const interval = setInterval(() => {
      if (iteration < 15) {
        setRandomResult(results[Math.floor(Math.random() * results.length)])
        iteration++
      } else {
        clearInterval(interval)
        setShowRandomResult(false)
        setShowTapToReveal(true)
        setRandomResult(null)
      }
    }, 150)
  }

  const handleTapToReveal = () => {
    setShowTapToReveal(false)
    setShowFinalResult(true)
    setCelebrate(true)
  }

  const scrollToSection = () => {
    document.getElementById('announcement')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#1A1A1A]">
      {/* Dark gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1500] to-[#0a0a0a] z-0"></div>

      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(244, 197, 66, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 197, 66, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* School badge with neon glow */}
          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-[#F4C542] to-[#FFD95A] flex items-center justify-center animate-neon-glow">
            <span className="text-5xl font-bold text-black">🎓</span>
          </div>

          {/* Main title with neon effect */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight animate-slide-up">
            <span className="block text-[#F4C542] animate-neon-text">PENGUMUMAN</span>
            <span className="block text-white animate-neon-text" style={{ animationDelay: '0.2s' }}>KELULUSAN</span>
          </h1>

          {/* Subtitle */}
          <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl font-bold text-[#F4C542] animate-neon-text">
              SMP SWASTA RK MAKMUR / BUDIMURNI-4
            </p>
            <p className="text-lg text-gray-400">Tahun Ajaran 2025/2026</p>
          </div>

          {/* Countdown */}
          {!isAnnouncementOpen ? (
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                {/* Neon glow behind countdown */}
                <div className="absolute inset-0 bg-[#F4C542]/10 blur-3xl rounded-3xl"></div>

                <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border border-[#F4C542]/20">
                  <p className="text-sm md:text-base text-gray-400 mb-6 font-medium tracking-wider">
                    PENGUMUMAN AKAN DIBUKA DALAM:
                  </p>
                  <div className="grid grid-cols-4 gap-3 md:gap-4">
                    {[
                      { value: timeLeft.days, label: 'HARI' },
                      { value: timeLeft.hours, label: 'JAM' },
                      { value: timeLeft.minutes, label: 'MENIT' },
                      { value: timeLeft.seconds, label: 'DETIK' }
                    ].map((item) => (
                      <div key={item.label} className="relative">
                        <div className="relative bg-gradient-to-br from-[#1a1500] to-[#0a0a0a] rounded-2xl p-4 md:p-5 text-center border border-[#F4C542]/30">
                          <span className="text-3xl md:text-5xl font-black text-[#F4C542] block animate-neon-text" style={{ textShadow: '0 0 15px rgba(244, 197, 66, 0.5)' }}>
                            {String(item.value).padStart(2, '0')}
                          </span>
                          <span className="text-xs md:text-sm font-bold text-gray-500 tracking-wider">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">
                      2 Juni 2025, 14:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={scrollToSection}
              className="animate-slide-up px-10 py-5 bg-gradient-to-r from-[#F4C542] to-[#FFD95A] text-black font-bold text-xl rounded-2xl animate-neon-glow hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0.4s' }}
            >
              LIHAT PENGUMUMAN →
            </button>
          )}
        </div>
      </section>

      {/* Announcement Section */}
      <section id="announcement" className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F4C542] animate-fade-in" style={{ textShadow: '0 0 20px rgba(244, 197, 66, 0.3)' }}>
              CEK HASIL KELULUSAN
            </h2>
            <p className="text-gray-400 animate-fade-in">
              Masukkan nama lengkap Anda untuk melihat hasil
            </p>
          </div>

          {!isAnnouncementOpen ? (
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 text-center border border-[#F4C542]/20 animate-fade-in">
              <div className="text-7xl mb-6">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-[#F4C542]">PENGUMUMAN BELUM DIBUKA</h3>
              <p className="text-gray-400">
                Silakan tunggu hingga 2 Juni 2025, pukul 14:00 WIB
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Search form */}
              <form onSubmit={handleSearch} className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-[#F4C542]/20 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="flex-1 px-6 py-4 rounded-2xl bg-black/40 border border-[#F4C542]/30 focus:outline-none focus:border-[#F4C542] text-lg text-white placeholder-gray-500 transition-all"
                    disabled={isSearching}
                  />
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-[#F4C542] to-[#FFD95A] text-black font-bold rounded-2xl animate-neon-glow hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSearching ? 'MENCARI...' : 'CEK HASIL'}
                  </button>
                </div>
              </form>

              {/* Loading state */}
              {isSearching && (
                <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 text-center border border-[#F4C542]/20 animate-pulse">
                  <div className="text-7xl mb-6 animate-spin">🎰</div>
                  <h3 className="text-2xl font-bold mb-3 text-[#F4C542]">SEDANG MEMERIKSA...</h3>
                  <p className="text-gray-400">
                    Memproses data kelulusan Anda
                  </p>
                </div>
              )}

              {/* Random result animation */}
              {showRandomResult && randomResult && (
                <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 text-center border border-[#F4C542]/20 animate-shake">
                  <div className="text-7xl mb-6">🎲</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{randomResult.name}</h3>
                  <div className={`text-4xl md:text-6xl font-black px-6 py-4 rounded-2xl inline-block ${
                    randomResult.status === 'LULUS' ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-red-500/20 text-red-400 border border-red-500'
                  }`}>
                    {randomResult.status}
                  </div>
                </div>
              )}

              {/* Tap to reveal */}
              {showTapToReveal && (
                <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 text-center border border-[#F4C542]/20 animate-gacha-shake">
                  <div className="text-7xl mb-6 animate-gacha-shake-icon">🎁</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F4C542]">SELAMAT!</h3>
                  <p className="text-gray-400 mb-8 text-lg">
                    Hasil kelulusan Anda sudah siap
                  </p>
                  <button
                    onClick={handleTapToReveal}
                    className="px-12 py-5 bg-gradient-to-r from-[#F4C542] to-[#FFD95A] text-black font-bold text-xl rounded-2xl animate-neon-glow hover:scale-105 transition-all duration-300"
                  >
                    TAP UNTUK MELIHAT HASIL
                  </button>
                </div>
              )}

              {/* Final result */}
              {showFinalResult && searchResult && (
                <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 text-center border-2 border-[#F4C542] animate-slide-up relative overflow-hidden">
                  {celebrate && (
                    <div className="fixed inset-0 pointer-events-none z-50">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-4xl animate-confetti"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `-50px`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 2 + 2}s`
                          }}
                        >
                          {['🎉', '🎊', '✨', '🌟', '🎓'][Math.floor(Math.random() * 5)]}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subtle glow background */}
                  <div className="absolute inset-0 bg-[#F4C542]/5 blur-3xl"></div>

                  <div className="relative">
                    <div className="text-7xl mb-6 animate-bounce">🎊</div>
                    <h3 className="text-xl font-semibold text-[#F4C542] mb-2">
                      {searchResult.className}
                    </h3>
                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-white">
                      {searchResult.name}
                    </h2>
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-black text-4xl md:text-6xl font-black px-8 py-6 rounded-2xl inline-block animate-neon-glow">
                      LULUS
                    </div>
                    <p className="text-gray-300 mt-6 text-lg">
                      Selamat! Anda berhasil lulus dan melanjutkan ke jenjang berikutnya.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      {['🎉', '🎓', '✨', '🌟', '🎊'].map((emoji, i) => (
                        <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 backdrop-blur-xl text-[#F4C542] py-6 mt-auto border-t border-[#F4C542]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-bold">© 2025 SMP SWASTA RK MAKMUR / BUDIMURNI-4</p>
          <p className="text-sm text-gray-500 mt-1">
            Selamat kepada semua siswa yang telah menyelesaikan pendidikan
          </p>
        </div>
      </footer>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowErrorModal(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border-2 border-red-500 animate-scale-up shadow-2xl">
            {/* Error icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-4 animate-pulse">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">NAMA TIDAK DITEMUKAN</h3>
              <p className="text-gray-300 text-lg">{errorMessage}</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        @keyframes scale-up {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes neon-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(244, 197, 66, 0.4), 0 0 30px rgba(244, 197, 66, 0.2);
          }
          50% {
            box-shadow: 0 0 25px rgba(244, 197, 66, 0.6), 0 0 50px rgba(244, 197, 66, 0.4);
          }
        }

        @keyframes neon-text {
          0%, 100% {
            text-shadow: 0 0 10px rgba(244, 197, 66, 0.6), 0 0 20px rgba(244, 197, 66, 0.4);
          }
          50% {
            text-shadow: 0 0 20px rgba(244, 197, 66, 0.8), 0 0 40px rgba(244, 197, 66, 0.6);
          }
        }

        @keyframes gacha-shake {
          0%, 100% {
            transform: rotate(0deg) translateX(0);
          }
          10% {
            transform: rotate(-5deg) translateX(-10px);
          }
          20% {
            transform: rotate(5deg) translateX(10px);
          }
          30% {
            transform: rotate(-5deg) translateX(-10px);
          }
          40% {
            transform: rotate(5deg) translateX(10px);
          }
          50% {
            transform: rotate(-3deg) translateX(-5px);
          }
          60% {
            transform: rotate(3deg) translateX(5px);
          }
          70% {
            transform: rotate(-2deg) translateX(-3px);
          }
          80% {
            transform: rotate(2deg) translateX(3px);
          }
          90% {
            transform: rotate(-1deg) translateX(-1px);
          }
        }

        @keyframes gacha-shake-icon {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-scale-up {
          animation: scale-up 0.6s ease-out;
        }

        .animate-confetti {
          animation: confetti 4s ease-out forwards;
        }

        .animate-neon-glow {
          animation: neon-glow 2s ease-in-out infinite;
        }

        .animate-neon-text {
          animation: neon-text 2s ease-in-out infinite;
        }

        .animate-gacha-shake {
          animation: gacha-shake 2s ease-in-out infinite;
        }

        .animate-gacha-shake-icon {
          animation: gacha-shake-icon 1.5s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #0a0a0a;
        }
      `}</style>
    </div>
  )
}