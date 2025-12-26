import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Snowflake = ({ delay, duration, left, size }: { delay: number; duration: number; left: string; size: number }) => {
  return (
    <div
      className="absolute text-white pointer-events-none will-change-transform"
      style={{
        left,
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0.6 + Math.random() * 0.4,
      }}
    >
      <div className="animate-snowfall">❄</div>
    </div>
  );
};

const InteractiveCharacter = ({ 
  emoji, 
  title, 
  description, 
  gradient 
}: { 
  emoji: string; 
  title: string; 
  description: string; 
  gradient: string;
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="perspective-1000 cursor-pointer"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <Card className={`relative overflow-hidden border-2 border-white/20 backdrop-blur-md bg-white/10 p-8 ${gradient}`}>
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <div className="relative z-10">
          <div className="text-8xl mb-6 animate-float inline-block">{emoji}</div>
          <h4 className="text-3xl font-bold text-white mb-4">{title}</h4>
          <p className="text-white/90 leading-relaxed text-lg">{description}</p>
        </div>
        <div className="absolute -bottom-10 -right-10 text-9xl opacity-5">{emoji}</div>
      </Card>
    </div>
  );
};

const MagicCard = ({ 
  icon, 
  title, 
  description, 
  color,
  delay 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  color: string;
  delay: number;
}) => {
  const [clicks, setClicks] = useState(0);

  return (
    <Card
      onClick={() => setClicks(clicks + 1)}
      className={`group relative overflow-hidden p-8 backdrop-blur-md bg-white/10 border-2 border-white/20 hover:border-${color}-400/50 transition-all duration-300 hover:scale-110 hover:rotate-2 cursor-pointer`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div 
        className="text-7xl mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
        style={{
          transform: clicks > 0 ? `rotate(${clicks * 20}deg) scale(${1 + clicks * 0.1})` : 'none',
        }}
      >
        {icon}
      </div>
      
      <h5 className="text-2xl font-bold text-white mb-3 relative z-10">{title}</h5>
      <p className="text-white/80 relative z-10">{description}</p>
      
      {clicks > 0 && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm animate-bounce">
          {clicks}
        </div>
      )}
    </Card>
  );
};

const Index = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; delay: number; duration: number; left: string; size: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wishes, setWishes] = useState(0);

  useEffect(() => {
    const flakes = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      left: `${Math.random() * 100}%`,
      size: 15 + Math.random() * 25,
    }));
    setSnowflakes(flakes);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxOffset = {
    x: (mousePosition.x - window.innerWidth / 2) * 0.02,
    y: (mousePosition.y - window.innerHeight / 2) * 0.02,
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-purple-900">
      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
        }}
      >
        {snowflakes.map((flake) => (
          <Snowflake 
            key={flake.id} 
            delay={flake.delay} 
            duration={flake.duration} 
            left={flake.left} 
            size={flake.size}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-8 flex justify-between items-center animate-fade-in backdrop-blur-sm">
          <div className="flex items-center gap-3 group">
            <div className="text-5xl animate-float group-hover:rotate-180 transition-transform duration-500">❄️</div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Зимняя Сказка</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            {['О нас', 'Галерея', 'Контакты'].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="text-white/90 hover:text-white transition-all font-semibold relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
        </header>

        <section className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8 animate-fade-in">
              <h2 className="text-6xl md:text-8xl font-black text-white leading-tight">
                Волшебство
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  Нового Года
                </span>
              </h2>
              <p className="text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium">
                Окунитесь в атмосферу интерактивного зимнего волшебства! 
                Наведите курсор на карточки, нажимайте на элементы и чувствуйте магию праздника ✨
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <Button
                  size="lg"
                  onClick={() => setWishes(wishes + 1)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-10 py-8 text-xl shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 hover:rotate-1 relative"
                >
                  <Icon name="Gift" className="mr-3" size={24} />
                  Загадать желание
                  {wishes > 0 && (
                    <span className="ml-3 bg-yellow-400 text-purple-900 rounded-full px-3 py-1 text-sm font-black">
                      {wishes}
                    </span>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-3 border-white text-white hover:bg-white hover:text-purple-900 font-bold px-10 py-8 text-xl backdrop-blur-sm transition-all hover:scale-110 hover:-rotate-1"
                >
                  <Icon name="Sparkles" className="mr-3" size={24} />
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="о нас" className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-5xl md:text-6xl font-black text-white mb-16 text-center animate-fade-in">
              Познакомьтесь с героями
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <InteractiveCharacter
                emoji="🎅"
                title="Дед Мороз"
                description="Добрый волшебник с белой бородой, который дарит радость и исполняет самые заветные желания детей со всего мира. Наведите курсор для 3D эффекта!"
                gradient="hover:shadow-2xl hover:shadow-purple-500/30"
              />
              <InteractiveCharacter
                emoji="👸"
                title="Снегурочка"
                description="Внучка Деда Мороза, прекрасная снежная девушка, которая помогает дедушке развозить подарки и создает праздничное настроение повсюду!"
                gradient="hover:shadow-2xl hover:shadow-blue-500/30"
              />
            </div>
          </div>
        </section>

        <section id="галерея" className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-5xl md:text-6xl font-black text-white mb-16 text-center animate-fade-in">
              Зимние чудеса
              <p className="text-xl text-white/70 mt-4 font-normal">Нажимайте на карточки! 🎯</p>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <MagicCard
                icon="🎄"
                title="Новогодняя ёлка"
                description="Украшенная игрушками и гирляндами"
                color="green"
                delay={0}
              />
              <MagicCard
                icon="🎁"
                title="Подарки"
                description="Для каждого найдется что-то особенное"
                color="purple"
                delay={0.1}
              />
              <MagicCard
                icon="⛷️"
                title="Зимние забавы"
                description="Катание на санках и коньках"
                color="blue"
                delay={0.2}
              />
              <MagicCard
                icon="🏔️"
                title="Снежные горы"
                description="Величественные заснеженные вершины"
                color="cyan"
                delay={0.3}
              />
              <MagicCard
                icon="🦌"
                title="Северные олени"
                description="Верные помощники Деда Мороза"
                color="amber"
                delay={0.4}
              />
              <MagicCard
                icon="✨"
                title="Волшебство"
                description="Сказка становится реальностью"
                color="pink"
                delay={0.5}
              />
            </div>
          </div>
        </section>

        <section id="контакты" className="container mx-auto px-4 py-20 pb-32">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-5xl md:text-6xl font-black text-white mb-12 text-center animate-fade-in">
              Напишите Деду Морозу
            </h3>
            <Card className="p-10 md:p-14 backdrop-blur-md bg-white/10 border-2 border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02]">
              <form className="space-y-6">
                <div className="group">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-6 py-5 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/30 transition-all backdrop-blur-sm text-lg group-hover:border-white/50"
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-6 py-5 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/30 transition-all backdrop-blur-sm text-lg group-hover:border-white/50"
                  />
                </div>
                <div className="group">
                  <textarea
                    placeholder="Ваше желание..."
                    rows={6}
                    className="w-full px-6 py-5 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/30 transition-all resize-none backdrop-blur-sm text-lg group-hover:border-white/50"
                  />
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-black py-7 text-xl shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105"
                >
                  <Icon name="Send" className="mr-3" size={24} />
                  Отправить письмо
                </Button>
              </form>
            </Card>
          </div>
        </section>

        <footer className="border-t border-white/20 backdrop-blur-md bg-white/5">
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/80 text-lg">© 2024 Зимняя Сказка. Все права защищены.</p>
              <div className="flex gap-6">
                {[
                  { icon: 'Facebook', color: 'hover:text-blue-400' },
                  { icon: 'Instagram', color: 'hover:text-pink-400' },
                  { icon: 'Twitter', color: 'hover:text-sky-400' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`text-white/70 ${social.color} transition-all p-3 hover:bg-white/10 rounded-full hover:scale-110`}
                  >
                    <Icon name={social.icon as any} size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
