import { HomeButton } from "@/components/ui/HomeButton";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Mail, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

export default function Home() {
  const upcomingMovies = [
    {
      title: "Estreno 1",
      image: "/peli1.jpg?height=300&width=200",
      releaseDate: "15 Jun",
    },
    {
      title: "Estreno 2",
      image: "/peli2.jpg?height=300&width=200",
      releaseDate: "22 Jun",
    },
    {
      title: "Estreno 3",
      image: "/peli3.jpg?height=300&width=200",
      releaseDate: "29 Jun",
    },
    {
      title: "Estreno 4",
      image: "/peli4.jpg?height=300&width=200",
      releaseDate: "6 Jul",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/CINEX2.png"
              alt="CineSystem Logo"
              className="w-10 h-10"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#190329] via-[#2D0329] to-[#420229] bg-clip-text text-transparent">
              CINEPLEX
            </h1>
          </div>
          <nav className="hidden md:block ">
            <ul className="flex space-x-12">
              <li>
                <a
                  href="#home"
                  className="hover:text-[#2D0329] transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#upcoming"
                  className="hover:text-[#2D0329] transition-colors"
                >
                  Próximos estrenos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#2D0329] transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="hover:text-[#2D0329] transition-colors"
                >
                  Nuestra Visión
                </a>
              </li>
            </ul>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <HomeButton variant="ghost" className="md:hidden z-40">
                <Menu className="h-6 w-6" />
              </HomeButton>
            </DropdownMenuTrigger>
            <div className="relative z-30">{/* Contenido del menú */}</div>
          </DropdownMenu>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative h-[80vh] bg-cover bg-center flex items-center overflow-hidden p-4 "
          style={{
            backgroundImage: 'url("/william.jpg?height=700&width=1200")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#190329] via-[#2D0329]  to-[#420229] opacity-70"></div>
          <div className="container mx-[100px] px-4 py-2 z-10 animate-fade-in">
            <h2 className="text-6xl font-bold mb-4 text-white leading-tight">
              Bienvenido a <br />
              CINEPLEX
            </h2>
            <p className="text-xl mb-8 text-white max-w-lg">
              Disfruta de las mejores películas en la comodidad de tu hogar.
            </p>
            <HomeButton className="text-[#2D0329] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg">
              Explorar Catálogo
            </HomeButton>
          </div>
        </section>

        <section id="upcoming" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold mb-12 text-[#2D0329]">
              Próximos estrenos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {upcomingMovies.map((movie, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0 relative">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#190329] to-transparent">
                        <h4 className="text-lg font-semibold text-white">
                          {movie.title}
                        </h4>
                        <p className="text-sm text-white/80">
                          Estreno: {movie.releaseDate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-24 bg-gradient-to-r from-[#190329] via-[#2D0329] to-[#420229] text-white"
        >
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold mb-8 text-center">
              Suscríbete a nuestro boletín
            </h3>
            <div className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow bg-white/10 border-0 text-white placeholder-white/50 focus:ring-2 focus:ring-white"
              />
              <HomeButton className="ml-2 flex items-center text-[#2D0329] hover:bg-gray-100 rounded-full px-6 transition-all duration-300 hover:shadow-lg ">
                Suscribirse <Mail className="ml-2 h-4 w-4" />
              </HomeButton>
            </div>
          </div>
        </section>

        <section id="vision" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold mb-8 text-[#2D0329] text-center">
              Nuestra Visión
            </h3>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl mb-8 text-gray-700">
                En CINEPLEX, nos esforzamos por revolucionar la experiencia
                cinematográfica en el hogar. Nuestra visión es crear un puente
                entre el cine tradicional y la comodidad del hogar, ofreciendo
                una plataforma que no solo transmite películas, sino que crea
                una experiencia inmersiva y social alrededor del séptimo arte.
              </p>
              <p className="text-xl text-gray-700">
                Aspiramos a ser líderes en la innovación tecnológica del
                streaming, manteniendo siempre el espíritu comunitario que hace
                del cine una experiencia única. Con CINEPLEX, el futuro del cine
                está en tu hogar.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12 text-[#2D0329]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img
              src="/CINEX2.png?height=40&width=40"
              alt="CineSystem Logo"
              className="w-8 h-8"
            />
            <p className="font-semibold">© 2024 CINEPLEX</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4">
            <a href="#" className="hover:text-[#420229] transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="hover:text-[#420229] transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-[#420229] transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
