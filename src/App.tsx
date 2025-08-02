import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, Scissors, Menu, X, Facebook, Instagram } from 'lucide-react';

// Simple Map Component
const Map = () => {
  return (
    <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4008.1145714369195!2d17.6079086!3d59.8481888!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465fcc0b316bcfb5%3A0x27d526f9ebe3a01b!2sSalong%20Victoria%20AB%20Herrfris%C3%B6r!5e0!3m2!1ssv!2sse!4v1751466574981!5m2!1ssv!2sse"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Salong Victoria AB Location"
      />
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      name: "Herrklippning",
      description: "Klassisk och modern herrklippning",
      price: "",
      image: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Skäggvård",
      description: "Professionell skäggtrimning och styling",
      price: "",
      image: "https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Traditionell Rakning",
      description: "Klassisk rakning med rakkniv och varmt handduk",
      price: "",
      image: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Styling & Vård",
      description: "Komplett styling för speciella tillfällen",
      price: "",
      image: "https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-amber-600/20">
        <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-600 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-wider">
                  SALONG VICTORIA AB
                </h1>
                <p className="text-xs text-amber-600 uppercase tracking-widest font-medium">
                  Herrfrisör
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('hem')}
                className="text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium"
              >
                Hem
              </button>
              <button
                onClick={() => scrollToSection('tjanster')}
                className="text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium"
              >
                Tjänster
              </button>
              <button
                onClick={() => scrollToSection('om-oss')}
                className="text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium"
              >
                Om Oss
              </button>
              <button
                onClick={() => scrollToSection('kontakt')}
                className="text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium"
              >
                Kontakt
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-white hover:text-amber-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-amber-600/20">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('hem')}
                  className="text-left text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium py-2"
                >
                  Hem
                </button>
                <button
                  onClick={() => scrollToSection('tjanster')}
                  className="text-left text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium py-2"
                >
                  Tjänster
                </button>
                <button
                  onClick={() => scrollToSection('om-oss')}
                  className="text-left text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium py-2"
                >
                  Om Oss
                </button>
                <button
                  onClick={() => scrollToSection('kontakt')}
                  className="text-left text-white hover:text-amber-600 transition-colors uppercase tracking-wide text-sm font-medium py-2"
                >
                  Kontakt
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hem" className="relative min-h-screen flex items-center justify-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-full md:max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-wider">
            PROFESSIONELL
            <span className="block text-amber-600 font-black mt-2">HERRFRISÖR</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Traditionell frisörkonst möter modern stil i hjärtat av Uppsala
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:018262162"
              className="w-full sm:w-auto bg-amber-600 text-black px-8 py-4 font-bold hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center uppercase tracking-wide"
            >
              <Phone className="w-5 h-5 mr-2" />
              Boka Tid Nu
            </a>
            <button
              onClick={() => scrollToSection('tjanster')}
              className="w-full sm:w-auto border-2 border-amber-600 text-amber-600 px-8 py-4 font-bold hover:bg-amber-600 hover:text-black transition-all duration-300 uppercase tracking-wide"
            >
              Våra Tjänster
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="tjanster" className="py-16 sm:py-20 bg-gray-900">
        <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-widest">
              Våra Tjänster
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
              Expertis inom herrfrisyr med över 10 års erfarenhet
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative overflow-hidden bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg">
                <div
                  className="h-48 sm:h-56 lg:h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 uppercase tracking-widest">
                    {service.name}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-amber-600 font-bold text-lg tracking-wide">
                    {service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="om-oss" className="py-16 sm:py-20 bg-black">
        <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-widest leading-tight">
                Om Salong Victoria AB
              </h2>
              <div className="w-24 sm:w-32 h-1 bg-amber-600 mb-6"></div>
              <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed font-light">
                Salong Victoria AB Herrfrisör är en etablerad frisörsalong i Uppsala som har betjänat kunder i över 10 år.
                Vi specialiserar oss på herrfrisyr och erbjuder en bred palette av tjänster från klassiska klippningar till moderna stilar.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-light">
                Vår passion är att få varje kund att känna sig välvårdad och självsäker. Vi använder endast högkvalitativa produkter
                och de senaste teknikerna för att säkerställa bästa resultat.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-2">10+</div>
                  <div className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Års Erfarenhet</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-2">100+</div>
                  <div className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Nöjda Kunder</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 mb-2">4.5★+</div>
                  <div className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Betyg</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 uppercase tracking-widest">Öppettider</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300 uppercase tracking-wide text-sm font-medium">Måndag - Fredag</span>
                  <span className="text-white font-semibold">10:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300 uppercase tracking-wide text-sm font-medium">Lördag</span>
                  <span className="text-white font-semibold">10:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="text-gray-300 uppercase tracking-wide text-sm font-medium">Söndag</span>
                  <span className="text-white font-semibold">Stängt</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-light">Bokning rekommenderas</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-light">Drop-in välkomnas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 sm:py-20 bg-gray-900">
        <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-widest">
              Kontakt
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
              Boka din tid idag eller kom förbi för drop-in service
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-black p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 uppercase tracking-widest">
                  Kontaktinformation
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white uppercase tracking-wide text-sm">Telefon</p>
                      <a href="tel:018262162" className="text-amber-600 hover:text-amber-500 transition-colors text-lg">
                        018-26 21 62
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white uppercase tracking-wide text-sm">Alternativ Telefon</p>
                      <a href="tel:0737134008" className="text-amber-600 hover:text-amber-500 transition-colors text-lg">
                        073-713 40 08
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white uppercase tracking-wide text-sm">Adress</p>
                      <p className="text-gray-300 font-light">
                        Ekeby Bruk 6c<br />
                        752 63 Uppsala<br />
                        Sverige
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Facebook className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white uppercase tracking-wide text-sm">Sociala Medier</p>
                      <a href="https://www.facebook.com/p/Salong-Victoria-100063697323815/" className="text-amber-600 hover:text-amber-500 transition-colors font-light">
                        Följ oss på Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-96 lg:h-full min-h-[400px] bg-gray-800 rounded-lg relative">
              <Map />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-amber-600 text-black p-6 sm:p-8 inline-block rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 uppercase tracking-widest">Redo att boka?</h3>
              <p className="mb-6 text-base sm:text-lg font-light">Ring oss idag för att boka din tid</p>
              <a href="tel:018262162" className="bg-black text-amber-600 px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center uppercase tracking-wide rounded">
                <Phone className="w-5 h-5 mr-2" />
                Ring Nu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 sm:py-12 border-t border-amber-600/20">
        <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">
                    Salong Victoria AB
                  </h3>
                  <p className="text-amber-600 text-sm uppercase tracking-widest font-medium">Herrfrisör</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm font-light">
                Din professionella frisörsalong i Uppsala med över 10 års erfarenhet.
              </p>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-white uppercase tracking-widest">
                Kontakt
              </h4>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm font-light flex items-center">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  073-713 40 08
                </p>
                <p className="text-gray-300 text-sm font-light flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  Ekeby Bruk 6c, 752 63 Uppsala
                </p>
                <p className="text-gray-300 text-sm font-light flex items-center">
                  <Facebook className="w-4 h-4 mr-2 flex-shrink-0" />
                  Facebook
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-white uppercase tracking-widest">
                Öppettider
              </h4>
              <div className="space-y-2 text-gray-300 text-sm font-light">
                <p>Måndag - Fredag: 10:00 - 19:00</p>
                <p>Lördag: 10:00 - 17:00</p>
                <p>Söndag: Stängt</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm font-light">
              © 2025 Salong Victoria AB Herrfrisör. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;