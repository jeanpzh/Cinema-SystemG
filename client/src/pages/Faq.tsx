/*
Instalar las bibliotecas:
npm install lucide-react
npm install @radix-ui/react-accordion

npx shadcn@latest init
npx shadcn@latest add accordion
*/

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Film, Popcorn, Star } from "lucide-react";

import { getPreguntasFrecuentes } from "@/api/preguntas_frecuentes";
import { useEffect, useState } from "react";
import { PreguntaFrecuente } from "@/constants/table";

export default function Faq() {
  const [faqs, setFaqs] = useState<PreguntaFrecuente[]>([
    {
      id: "1",
      pregunta: "",
      respuesta: "",
    },
  ]);
  useEffect(() => {
    getPreguntasFrecuentes().then((res) => {
      setFaqs(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#3E0229] to-black text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-black bg-opacity-60 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Star className="w-20 h-20 text-yellow-400 animate-pulse" />
          </div>
          <Film className="w-24 h-24 mx-auto mb-6 text-pink-400" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-white">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-pink-200">
            Todo lo que necesitas saber sobre CinePurpura
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-to-r from-[#3E0229] to-black rounded-lg overflow-hidden border border-pink-500"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-pink-400 transition-colors px-6 py-4">
                <div className="flex items-center">
                  <Popcorn className="w-6 h-6 mr-2" />
                  {faq.pregunta}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-pink-200 px-6 py-4 bg-black bg-opacity-50">
                {faq.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <footer className="mt-12 text-center text-white">
        <p className="mb-2">
          ¿Tienes más preguntas? Contáctanos en info@cineplex.com
        </p>
        <div className="flex justify-center space-x-4">
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
        </div>
      </footer>
    </div>
  );
}
