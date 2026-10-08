import { useEffect, useState, type ComponentType } from "react";
import {
  SiApplemusic,
  SiInstagram,
  SiSpotify,
  SiWhatsapp,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import {
  ArrowRightIcon,
  Clock3Icon,
  ImageIcon,
  MapPinIcon,
  MessageCircleIcon,
  Music2Icon,
  PhoneIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import "./App.css";

const PHONE_DISPLAY = "+1 (437) 971-1761";
const PHONE_LINK = "tel:+14379711761";
const WHATSAPP_LINK =
  "https://wa.me/14379711761?text=%E0%A8%B5%E0%A8%BE%E0%A8%B9%E0%A8%BF%E0%A8%97%E0%A9%81%E0%A8%B0%E0%A9%82%E0%A8%9C%E0%A9%80%E0%A8%95%E0%A8%BE%E0%A8%96%E0%A8%BC%E0%A8%BE%E0%A8%B2%E0%A8%B8%E0%A8%BE%E0%A8%B5%E0%A8%BE%E0%A8%B9%E0%A8%BF%E0%A8%97%E0%A9%81%E0%A8%B0%E0%A9%82%E0%A8%9C%E0%A9%80%E0%A8%95%E0%A9%80%E0%A8%AB%E0%A8%BC%E0%A8%A4%E0%A8%B9%E0%A8%BF%20%E0%A8%AD%E0%A8%BE%E0%A8%88%20%E0%A8%B8%E0%A8%BE%E0%A8%B9%E0%A8%BF%E0%A8%AC%20%E0%A8%9C%E0%A9%80%E0%A5%A4%0A%0A%E0%A8%AE%E0%A9%88%E0%A8%82%20%E0%A8%97%E0%A9%81%E0%A8%B0%E0%A8%AE%E0%A8%A4%E0%A8%BF%20%E0%A8%95%E0%A8%B2%E0%A8%BE%E0%A8%B8%E0%A8%BE%E0%A8%82%20%E0%A8%AC%E0%A8%BE%E0%A8%B0%E0%A9%87%20%E0%A8%9C%E0%A8%BE%E0%A8%A3%E0%A8%A8%E0%A8%BE%20%E0%A8%9A%E0%A8%BE%E0%A8%B9%E0%A9%81%E0%A9%B0%E0%A8%A6%E0%A8%BE%20%E0%A8%B9%E0%A8%BE%E0%A8%82%20%E0%A8%9C%E0%A9%80";
const MAPS_LINK = "https://maps.app.goo.gl/eJyyMec76BuqGWi5A";

const programs = [
  {
    name: "Taus",
    description:
      "Discover the deep, expressive voice of this traditional bowed Tanti Saaz.",
    image: "/taus.jpg",
  },
  {
    name: "Dilruba",
    description:
      "Develop melody, technique, and musical expression on the Dilruba.",
    image: "/dilruba.jpg",
  },
  {
    name: "Rabab",
    description:
      "Connect with the warm, resonant sound and tradition of the Rabab.",
    image: "/rabab.jpg",
  },
  {
    name: "Jori",
    description:
      "Build a strong rhythmic foundation through focused Jori instruction.",
    image: "/jori.jpg",
  },
  {
    name: "Tabla",
    description:
      "Learn essential rhythms, technique, and accompaniment on the Tabla.",
    image: "/tabla.jpg",
  },
  {
    name: "Gurbani Santhya",
    description:
      "Grow in confidence through careful Gurbani pronunciation and recitation.",
    image: "/gurbani-santhya.jpg",
  },
  {
    name: "Gurmat Maryada",
    description:
      "Learn foundational practices and values with clarity and care.",
    image: "/gurmat-maryada.jpg",
  },
] as const;

const studentVideos = [
  {
    title: "Group learning session",
    video: "/video1.mp4",
    poster: "/video1-poster.jpg",
    description:
      "ਹਉ ਵੰਞਾ ਕੁਰਬਾਣੁ ਸਾਈ ਆਪਣੇ ॥ --- ਸਾਹਿਬਜਾਦੇ ਅਕੈਡਮੀਂ ਦੇ ਵਿਦਿਆਰਥੀ ਪਾਤਸ਼ਾਹ ਜੀਆਂ ਬਖਸ਼ੇ ਖਾਸ ਰੂਪ ਬਾਣਾ ਬਾਣੀ ਪਾਤਸ਼ਾਹ ਜੀਆਂ ਕੇ ਆਪਣੇ ਸਾਜਾਂ ਰਾਗਾਂ ਨਾਲ ਗੁਰਮਤਿ ਕੀਰਤਨ ਨੂੰ ਧਾਰਨ ਕਰ ਰਹੇ ਨੇ ਜੀ",
  },
  {
    title: "Learning shabad notation",
    video: "/video2.mp4",
    poster: "/video2-poster.jpg",
    description:
      "ਆਖਾ ਜੀਵਾ ਵਿਸਰੈ ਮਰਿ ਜਾਉ ॥ ---- ਆਓ ਜੀ ਮਹਾਰਾਜ ਜੀ ਕੀ ਬਾਣੀ, ਬਾਣੇ, ਸਾਜਾਂ ਅਤੇ ਗੁਰਮਤਿ ਸੰਗੀਤ ਨਾਲ ਜੁੜੀਏ 🙏🏻",
  },
  {
    title: "Taus & Dilruba class",
    video: "/video4.mp4",
    poster: "/video4-poster.jpg",
    description:
      "ਸਾਹਿਬਜ਼ਾਦੇ ਅਕੈਡਮੀ ਦੇ ਸਿੰਘਾ ਦੀ ਕਲਾਸ | ਗੁਰਮਤਿ ਕੀਰਤਨ ਕਲਾਸਾਂ ਲਈ DM ਜਾਂ +1(437) 971-1761 ਤੇ ਸੰਪਰਕ ਕਰੋ",
  },
  {
    title: "Taus practice session",
    video: "/video6.mp4",
    poster: "/video6-poster.jpg",
    description: "ਰਾਗ ਮਲਾਰ practice",
  },
  {
    title: "Practicing new shabad",
    video: "/video3.mp4",
    poster: "/video3-poster.jpg",
    description: "ਮੂ ਲਾਲਨ ਸਿਉ ਪ੍ਰੀਤਿ ਬਨੀ ॥",
  },

  {
    title: "Parkash Purab samagam",
    video: "/video5.mp4",
    poster: "/video5-poster.jpg",
    description:
      "ਸਾਹਿਬਜਾਦੇ ਅਕੈਡਮੀਂ ਵੱਲੋ ਸ਼ਹਿਨਸ਼ਾਹ ਦਾਤਾਰ ਸ੍ਰਿਸ਼ਟੀ ਦੇ ਰਚਣਹਾਰ ਦਾਤਾਰ ਜੀ ਆਪ ਨਾਰਾਇਣ ਕਲਾਧਾਰ ਚਕ੍ਰਵਰਤੀ ਸਮਰਾਟ ਸਤਿਗੁਰੂ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਪਾਤਸ਼ਾਹ ਜੀਆਂ ਕੇ ਪ੍ਰਗਟ ਦਿਹਾੜਿਆਂ ਨੂੰ ਸਮਰਪਿਤ ਸਮਾਗਮ ਉਲੀਕੇ ਗਏ ਜਿਸ ਵਿੱਚ ਅਕੈਡਮੀਂ ਦੇ ਬੱਚਿਆ ਨੇ ਸਤਿਗੁਰਾਂ ਜੀ ਕੇ ਹੁਕਮ ਅਨੁਸਾਰ ਨੇ ਹਾਜਰੀਆਂ ਭਰੀਆਂ",
  },

  {
    title: "Gurmat Saanjh",
    video: "/video7.mp4",
    poster: "/video7-poster.jpg",
    description:
      "ਗੁਰਮਤਿ ਦੀਆਂ ਸਾਂਝਾ ਸਾਹਿਬਜ਼ਾਦੇ ਅਕੈਡਮੀ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ | ਭਾਈ ਬਹੁਲਿਵਲੀਨ ਸਿੰਘ ਜੀ (ਅਕਾਲੀ ਜਥਾ)",
  },
  {
    title: "Academy students performing",
    video: "/video8.mp4",
    poster: "/video8-poster.jpg",
    description: `ਸਾਹਿਬਜ਼ਾਦੇ ਅਕੈਡਮੀ ਦੇ ਸਿੰਘਾ ਦੀ ਰਾਗ ਮਲਾਰ ਹਾਜਰੀ ਮਹਾਰਾਜ ਜੀਆਂ ਕੇ ਪਿਆਰੇ ਸਾਜਾ ਨਾਲ
ਭਾਈ ਸੁਖਮਨਪ੍ਰੀਤ ਸਿੰਘ, ਭਾਈ ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਅਤੇ ਭਾਈ ਗੁਰਕੀਰਤ ਸਿੰਘ | ਉਸਤਾਦ: ਭਾਈ ਬਹੁਲਿਵਲੀਨ ਸਿੰਘ ਜੀ (ਅਕਾਲੀ ਜਥਾ)`,
  },
];

type SimpleIcon = ComponentType<{
  size?: number | string;
  title?: string;
  color?: string;
}>;

const socialLinks: Array<{
  name: string;
  label: string;
  href: string;
  icon: SimpleIcon;
  color: string;
}> = [
  {
    name: "Instagram",
    label: "Student reels & updates",
    href: "https://www.instagram.com/sahibzaade_academy_ca/",
    icon: SiInstagram,
    color: "#E4405F",
  },
  {
    name: "YouTube",
    label: "Watch our recordings",
    href: "https://www.youtube.com/@bhaibahulivleensinghjee",
    icon: SiYoutube,
    color: "#FF0000",
  },
  {
    name: "Apple Music",
    label: "Listen on Apple Music",
    href: "https://music.apple.com/ca/artist/akaali-jatha-bhai-bahulivleen-singh-jee/1884177671",
    icon: SiApplemusic,
    color: "#FA243C",
  },
  {
    name: "Spotify",
    label: "Listen on Spotify",
    href: "https://open.spotify.com/artist/0M9vd7YVucNOSHvymadVGp",
    icon: SiSpotify,
    color: "#1DB954",
  },
];

function AssetImage({
  src,
  alt,
  label,
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="asset-frame">
      {!missing && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setMissing(true)}
        />
      )}
      {missing && (
        <div
          className="asset-placeholder"
          aria-label={`${label} image placeholder`}
        >
          <ImageIcon aria-hidden="true" />
          <span>{label}</span>
          <small>Add {src}</small>
        </div>
      )}
    </div>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <a
      className={cn("brand", footer && "brand--footer")}
      href="#top"
      aria-label="Sahibzaade Academy home"
    >
      {!logoMissing && (
        <img
          className="brand__logo"
          src="/logo.png"
          alt=""
          width="802"
          height="802"
          decoding="async"
          onError={() => setLogoMissing(true)}
        />
      )}
      {logoMissing && (
        <span className="brand__mark" aria-hidden="true">
          <Music2Icon />
        </span>
      )}
      <span>Sahibzaade Academy</span>
    </a>
  );
}

function StudentVideo({
  title,
  description,
  video,
  poster,
}: {
  title: string;
  description?: string;
  video: string;
  poster: string;
}) {
  return (
    <Card className="video-card">
      <CardContent className="video-card__content">
        <div className="video-frame">
          <video
            className="video-frame__media"
            controls
            preload="none"
            poster={poster}
            aria-label={title}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-lg">
          {description || "Learning in progress"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#programs">What we teach</a>
          <a href="#students">Students</a>
          <a href="#follow">Follow</a>
          <a href="#visit">Visit</a>
        </nav>
        <a
          className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircleIcon data-icon="inline-start" />
          Message us
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <Badge variant="secondary">
              <SparklesIcon data-icon="inline-start" />
              In-person classes in Brampton
            </Badge>
            <h1>Learn the Tradition of Gurmat Kirtan</h1>

            <p className="hero-gurmukhi">
              ਘਰਿ ਘਰਿ ਬਾਬਾ ਗਾਵੀਐ ਵਜਨਿ ਤਾਲ ਮ੍ਰਿਦੰਗੁ ਰਬਾਬਾ ॥
            </p>
            <p>
              Sahibzaade Academy provides a space to learn Gurmat Kirtan,
              traditional Tanti Saaz, and Gurbani Santhya. Our goal is to help
              students develop their skills while connecting with the rich
              musical heritage of Gurbani.
            </p>
            <div className="hero-actions">
              <a
                className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
              >
                <SiWhatsapp data-icon="inline-start" aria-hidden="true" />
                Message us
              </a>
              <a
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full"
                )}
                href={PHONE_LINK}
              >
                <PhoneIcon data-icon="inline-start" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <div className="hero-notes" aria-label="Class information">
              <span>
                <UsersRoundIcon aria-hidden="true" />
                Everyone is welcome
              </span>
              <span>
                <Clock3Icon aria-hidden="true" />
                Contact us for current timings
              </span>
            </div>
          </div>

          <Card className="hero-visual" aria-label="Academy image placeholder">
            <CardContent className="hero-visual__content">
              <AssetImage
                src="/dilruba.jpg"
                alt="Students learning Gurmat Kirtan at Sahibzaade Academy"
                label="Academy hero photo"
                priority
              />
              <div className="hero-visual__note">
                <Music2Icon aria-hidden="true" />
                <span>
                  <strong>Listen. Learn. Grow.</strong>
                  <small>Rooted in the tradition of Gurbani</small>
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="ticker" aria-label="Academy offerings">
          <span>Tanti Saaz</span>
          <i aria-hidden="true" />
          <span>Gurmat Kirtan</span>
          <i aria-hidden="true" />
          <span>Gurbani Santhya</span>
          <i aria-hidden="true" />
          <span>Gurmat Maryada</span>
        </section>

        <section id="programs" className="section reveal">
          <div className="section-heading">
            <Badge variant="outline">What we teach</Badge>
            <h2>Find your path into the tradition</h2>
            <p>
              Learn through attentive, in-person guidance at Toshakhana in
              Brampton.
            </p>
          </div>

          <div className="program-grid">
            {programs.map((program) => (
              <Card key={program.name} className="program-card">
                <AssetImage
                  src={program.image}
                  alt={`${program.name} instruction at Sahibzaade Academy`}
                  label={program.name}
                />
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="students" className="section student-section reveal">
          <div className="section-heading section-heading--row">
            <div>
              <Badge variant="secondary">Learning together</Badge>
              <h2>See our students in practice</h2>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                ਆਓ ਗੁਰਮਤਿ ਕੀਰਤਨ ਨਾਲ ਪਾਤਸ਼ਾਹ ਜੀਆਂ ਕੇ ਬਖਸ਼ੇ ਸਾਜਾਂ ਨਾਲ ਆਪ ਵੀ ਜੁੜੀਏ
                ਆਪਣੇ ਬੱਚਿਆਂ ਨੂੰ ਵੀ ਜੋੜੀਏ ਜੀ
              </p>
            </div>
            <a
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full"
              )}
              href="https://www.instagram.com/sahibzaade_academy_ca/"
              target="_blank"
              rel="noreferrer"
            >
              <SiInstagram data-icon="inline-start" aria-hidden="true" />
              More on Instagram
            </a>
          </div>

          <Carousel
            opts={{ align: "start", loop: false }}
            className="video-carousel"
          >
            <CarouselContent>
              {studentVideos.map((item) => (
                <CarouselItem
                  key={item.video}
                  className="basis-[88%] sm:basis-[62%] md:basis-[46%] lg:basis-[30%]"
                >
                  <StudentVideo {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-control carousel-control--previous" />
            <CarouselNext className="carousel-control carousel-control--next" />
          </Carousel>
        </section>

        {/*
          Instructor section — uncomment when the approved portrait and biography
          are ready.

          <section id="instructor" className="section reveal">
            <div className="section-heading">
              <Badge variant="outline">Your teacher</Badge>
              <h2>Guided by Bhai Bahulivleen Singh Ji Akaali Jatha</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace
                this paragraph with the approved instructor biography.
              </p>
            </div>
          </section>
        */}

        <section id="follow" className="section reveal">
          <div className="section-heading">
            <Badge variant="outline">Listen & follow</Badge>
            <h2>Stay connected beyond the classroom</h2>
            <p>
              Follow student progress and listen to recordings by Akaali Jatha
              Bhai Bahulivleen Singh Jee.
            </p>
          </div>

          <div className="social-grid">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  key={social.name}
                  className="social-link"
                >
                  <Card className="social-card">
                    <CardHeader>
                      <span className="social-icon">
                        <Icon size={25} title="" color={social.color} />
                      </span>
                      <CardTitle>{social.name}</CardTitle>
                      <CardDescription>{social.label}</CardDescription>
                      <CardAction>
                        <ArrowRightIcon aria-hidden="true" />
                      </CardAction>
                    </CardHeader>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        <section id="visit" className="section visit-section reveal">
          <Card className="visit-card">
            <CardContent className="visit-card__content">
              <div className="visit-copy">
                <Badge variant="secondary">Classes are ongoing</Badge>
                <h2>Come learn with us in Brampton</h2>
                <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                  ਆਓ ਗੁਰਮਤਿ ਕੀਰਤਨ ਨਾਲ ਪਾਤਸ਼ਾਹ ਜੀਆਂ ਕੇ ਬਖਸ਼ੇ ਸਾਜਾਂ ਨਾਲ ਆਪ ਵੀ
                  ਜੁੜੀਏ ਆਪਣੇ ਬੱਚਿਆਂ ਨੂੰ ਵੀ ਜੋੜੀਏ ਜੀ
                </p>
              </div>
              <Separator className="visit-separator" />
              <div className="visit-details">
                <div>
                  <span className="detail-icon">
                    <MapPinIcon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Toshakhana</strong>
                    <span style={{ fontSize: "1.1rem" }}>
                      6151 Mayfield Rd, Unit 114–115
                      <br />
                      Brampton, ON L6P 4R9
                    </span>
                  </span>
                </div>
                <div>
                  <span className="detail-icon">
                    <PhoneIcon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{PHONE_DISPLAY}</strong>
                  </span>
                </div>
              </div>
              <div className="visit-actions">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full"
                  nativeButton={false}
                  render={
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" />
                  }
                >
                  <SiWhatsapp data-icon="inline-start" aria-hidden="true" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="visit-directions rounded-full"
                  nativeButton={false}
                  render={
                    <a href={MAPS_LINK} target="_blank" rel="noreferrer" />
                  }
                >
                  <MapPinIcon data-icon="inline-start" />
                  Get directions
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="site-footer">
        <Brand footer />
        <p>Teaching Gurbani Santhya · Gurmat Kirtan · Gurmat Maryada</p>
        <p>© {new Date().getFullYear()} Sahibzaade Academy</p>
      </footer>

      <div className="mobile-contact" aria-label="Quick contact">
        <a
          className={buttonVariants({ size: "lg" })}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
        >
          <SiWhatsapp data-icon="inline-start" aria-hidden="true" />
          Message
        </a>
        <a
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href={PHONE_LINK}
        >
          <PhoneIcon data-icon="inline-start" />
          Call
        </a>
      </div>
    </div>
  );
}

export default App;
