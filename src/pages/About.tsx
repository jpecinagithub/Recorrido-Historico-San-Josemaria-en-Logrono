import sanJosemariaAbout from '@/assets/san-josemaria-about.jpg';

const About = () => {
  return (
    <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start mb-10">
          <div className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-primary/20 flex-shrink-0">
            <img 
              src={sanJosemariaAbout} 
              alt="San Josemaría Escrivá de Balaguer" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              San Josemaría Escrivá
            </h1>
            <p className="text-lg text-primary font-medium mb-4">
              Logroño, 1915–1925
            </p>
            <p className="text-muted-foreground leading-relaxed">
              San Josemaría vivió una etapa fundamental de su juventud 
              en Logroño, donde experimentó los primeros "barruntos" de su vocación.
            </p>
          </div>
        </div>

        {/* App Introduction */}
        <div className="mt-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 sm:p-8 border border-primary/20">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 text-center">
            Sobre esta aplicación
          </h2>
          <p className="leading-relaxed text-center text-muted-foreground">
            Esta aplicación te invita a recorrer los lugares de Logroño relacionados con 
            la vida de San Josemaría. Explora el <strong>mapa interactivo</strong> para 
            visitar los puntos de interés, descubre el <strong>álbum fotográfico</strong> con 
            imágenes de la época, y pon a prueba tus conocimientos en el <strong>trivial</strong>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
