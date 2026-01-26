import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    es: {
        translation: {
            nav: {
                projects: "Proyectos",
                about: "Sobre Mí",
                skills: "Habilidades",
                experience: "Experiencia",
                contact: "Contacto"
            },
            hero: {
                welcome: "Bienvenido",
                role: "Ingeniero en informática",
                stats: {
                    projects: "Proyectos",
                    commits: "Commits",
                    uptime: "Uptime"
                }
            },
            projects: {
                title: "Proyectos Destacados",
                subtitle: "Últimos desarrollos y módulos",
                viewAll: "Ver todos",
                items: {
                    redpay: {
                        title: "Integración RedPay",
                        type: "Fintech Core"
                    },
                    odoo: {
                        title: "Suite Odoo IA",
                        type: "Módulos Enterprise"
                    },
                    sso: {
                        title: "Keycloak SSO",
                        type: "Seguridad"
                    }
                }
            },
            about: {
                title: "Sobre Mí",
                desc: "Desarrollador full‑stack con más de 5 años de experiencia en el diseño, desarrollo e implementación de servicios RESTful y aplicaciones web escalables para los sectores financiero, minorista y de comercio electrónico.\n\nEspecializado en JavaScript/TypeScript, con experiencia en frameworks como NestJS, Express, Angular y Vue 3. Manejo de Java (Spring Boot, Spring Batch), conocimientos en Python y formación reciente en inteligencia artificial a través del Bootcamp de IA de Platzi.\n\nExperiencia en integración de pasarelas de pago, SSO (Keycloak) y desarrollo de módulos (Odoo) con Python. Herramientas como OpenAI y conocimientos en conceptos básicos de inteligencia artificial, fine-tuning de modelos, bases de datos vectoriales para embeddings y el uso de frameworks como LangChain y n8n.\n\nCompetente en principios SOLID, programación orientada a objetos y patrones de diseño, trabajando bajo metodologías ágiles como Scrum. En constante actualización, integrando IA y vibe coding en mi flujo de trabajo.",
                details: {
                    global: {
                        title: "Experiencia Global",
                        desc: "Proyectos a nivel latinoamericano y países de habla hispana."
                    },
                    fast: {
                        title: "Actualización constante",
                        desc: "Habilidades desarrolladas con IA y vibe coding."
                    }
                }
            },
            skills: {
                title: "Habilidades Técnicas",
                topLanguages: "Lenguajes principales",
                viewFullStack: "Ver stack completo",
                modalTitle: "Stack completo",
                close: "Cerrar",
                appliedIn: {
                    title: "Aplicado en",
                    items: [
                        "Fintech (integración de pagos)",
                        "Retail & eCommerce",
                        "SSO / Identity (Keycloak)",
                        "ERP / Odoo (módulos personalizados)",
                        "APIs REST y servicios escalables",
                        "Automatización (Puppeteer)"
                    ]
                },
                areas: {
                    title: "Áreas",
                    items: [
                        "Arquitectura y diseño de servicios",
                        "Integraciones y middleware",
                        "Optimización y performance",
                        "CI/CD y automatización de despliegues",
                        "Mejora continua con IA y vibe coding"
                    ]
                },
                languages: {
                    title: "Lenguajes",
                    items: ["JavaScript / TypeScript", "Java", "Python", "SQL"]
                },
                frameworks: {
                    title: "Frameworks",
                    items: ["NestJS, Express, Hapi", "Angular, Vue 3", "Spring Boot, Spring Batch", "Odoo, Puppeteer"]
                },
                databases: {
                    title: "Bases de Datos",
                    items: ["MongoDB, PostgreSQL", "MySQL, Microsoft SQL Server"]
                },
                tools: {
                    title: "Herramientas y DevOps",
                    items: ["Git, GitHub, GitLab CI/CD", "Jenkins, Docker", "Postman, DBeaver", "VS Code, IntelliJ"]
                },
                practices: {
                    title: "Buenas Prácticas",
                    items: ["SOLID, POO, Patrones de diseño", "Scrum, CI/CD"]
                }
            },
            softSkills: {
                title: "Habilidades Blandas",
                items: [
                    "Compromiso, proactividad y lógica analítica",
                    "Adaptabilidad y adquisición de nuevos hábitos",
                    "Conocimientos actualizados sobre nuevas tecnologías"
                ]
            },
            certifications: {
                title: "Capacitaciones Online",
                platforms: ["Platzi", "Google", "Udemy", "Telefónica", "HackerRank", "LinkedIn Learning"]
            },
            experience: {
                title: "Experiencia laboral",
                history: "Historial",
                viewAll: "Ver Todo",
                downloadCv: "Descargar CV",
                roles: {
                    entelgy: {
                        role: "Desarrollador Full-Stack",
                        period: "Nov 2025 – Dic 2025",
                        desc: "Migración de proyectos legacy (backend y frontend) a Spring Boot en Subtel, aplicando buenas prácticas de desarrollo establecidas por la institución y asegurando documentación completa y actualizada para mantener la trazabilidad y facilitar el mantenimiento futuro."
                    },
                    junngla: {
                        role: "Desarrollador Full Stack",
                        period: "Junio 2023 - Julio 2025",
                        desc: "Integración de pasarela de pagos RedPay, creando middleware de ecosistema con otras integraciones Blix. Diseño y mantenimiento de API REST con NestJS. Desarrollo de módulos personalizados en Odoo 18 con Python para servicios farmacéuticos con IA. Creación de componentes reutilizables en Vue 3 y sistema visual con Vuetify. Implementación de plugin en Java para Keycloak habilitando SSO entre servicios internos."
                    },
                    indra: {
                        role: "System Engineer",
                        period: "Marzo 2022 - Octubre 2022",
                        desc: "Creación de APIS en Backend bajo framework Java Spring Boot y consumo de procedimientos almacenados. Ingresar a servidor de archivos, extraer y transformar datos mediante el framework de Java Spring Batch. Creación de interface Frontend Angular, instalación de componentes, creación de módulos y consumo de APIS. Aplicación de conceptos y uso de herramientas de DevOps (CI/CD). Metodología de desarrollo ágil Scrum."
                    },
                    fusiona: {
                        role: "Desarrollador de Software",
                        period: "Octubre 2019 - Marzo 2020",
                        desc: "Creación de set de APIS en el framework Hapi para la aplicación Gasconnect y migración de módulos a Angular 9. Backup y creación de arquitectura de bases de datos en MongoDB."
                    },
                    bolsa: {
                        role: "Desarrollador de Software",
                        period: "Abril 2019 - Octubre 2019",
                        desc: "Navegación automática y transformación de código html a pdf con puppeteer y AngularJS. Metodología de desarrollo ágil Scrum."
                    },
                    escuela: {
                        role: "Ingeniero en Informática",
                        period: "Marzo 2016 - Abril 2019",
                        desc: "Taller de robótica conceptos básicos de la programación. Coordinación recursos tecnológicos. Mantención de la red y equipamiento."
                    },
                    tottus: {
                        role: "Analista de Proyectos",
                        period: "Abril 2015 - Agosto 2015",
                        desc: "Documentación y seguimiento de ventas no presenciales, estilización y funcionalidades página web TOTTUS Chile - Perú. Programación de landing page."
                    }
                }
            },
            education: {
                title: "Educación",
                status: {
                    graduated: "Titulado"
                },
                degrees: {
                    engineer: {
                        title: "Ingeniero en informática",
                        institution: "I.P Santo Tomas",
                        period: "2012 - 2015"
                    },
                    technician: {
                        title: "Técnico en plataformas Informáticas",
                        institution: "I.P Santo Tomas",
                        period: "2009 - 2012"
                    },
                    telecom: {
                        title: "Técnico en telecomunicaciones",
                        institution: "Liceo Juan Piamarta",
                        period: "2007 - 2009"
                    }
                }
            },
            contact: {
                title: "¿Listo para trabajar?",
                subtitle: "Construyamos algo increíble juntos.",
                cta: "Contáctame",
                location: "Ubicación",
                modal: {
                    title: "Contáctame",
                    emailPlaceholder: "Tu email",
                    send: "Enviar",
                    close: "Cerrar",
                    successMessage: "¡Gracias por contactarme! Te envié un email de bienvenida y me pondré en contacto contigo a la brevedad."
                }
            },
            mapCard: {
                title: "¡Vamos a programar juntos!",
                description: "Soy un apasionado programador full-stack. Si quieres charlar sobre código, tomar un café virtual o explorar ideas con vibe coding, ¡estoy aquí!"
            },
            autocreativa: {
                title: "Autocreativa",
                description: "Te invito a visitar mi iniciativa: Somos una agencia de productos digitales. Desarrollamos soluciones personalizadas con IA, automatizaciones y tecnología de punta para llevar tu negocio al siguiente nivel.",
                feature1: "Productos Digitales",
                feature2: "Desarrollo con IA",
                feature3: "Capacitaciones Online",
                cta: "Visitar"
            },
            signature: {
                title: "Mi Filosofía",
                intro: "Trabajo bajo una filosofía que me ha permitido entregar proyectos sólidos, eficientes y con un toque único: <strong>Trabajo Remoto y Vibe Coding</strong>.",
                remote: {
                    title: "🌍 <strong>Trabajo Remoto</strong>",
                    desc: "No importa dónde estés, puedo desarrollar, optimizar y entregar soluciones sin límites geográficos. Esto me da la flexibilidad de trabajar de forma estratégica, manteniendo un flujo constante y una comunicación ágil para que todo avance sin fricciones."
                },
                vibe: {
                    title: "💻 <strong>Vibe Coding</strong>",
                    desc: "Para mí, programar es más que escribir líneas de código: es un ambiente, una energía. Mi kit incluye Cursor para acelerar el desarrollo con IA, VS Code y suite de Jetbrains para personalizar cada proyecto y sí… una buena taza de café y música lo-fi que me acompañan hasta en las madrugadas de inspiración. El resultado: código limpio, escalable y pensado para durar."
                },
                promise: {
                    title: "✨ <strong>Mi promesa</strong>",
                    desc: "Cada proyecto lo trato como si fuera propio: cuidando los detalles, optimizando recursos y asegurando que el resultado no solo cumpla, sino que impresione. Aquí no hay excusas, solo compromiso y resultados."
                },
                copyleft: "© Copyleft Nelson Ramos",
                location: "Talca, VII Región del Maule, Chile"
            }
        }
    },
    en: {
        translation: {
            nav: {
                projects: "Projects",
                about: "About Me",
                skills: "Skills",
                experience: "Experience",
                contact: "Contact"
            },
            hero: {
                welcome: "Welcome back",
                role: "Software Engineer",
                stats: {
                    projects: "Projects",
                    commits: "Commits",
                    uptime: "Uptime"
                }
            },
            projects: {
                title: "Featured Work",
                subtitle: "Latest deployments & modules",
                viewAll: "See all",
                items: {
                    redpay: {
                        title: "RedPay Integration",
                        type: "Fintech Core"
                    },
                    odoo: {
                        title: "Odoo AI Suite",
                        type: "Enterprise Modules"
                    },
                    sso: {
                        title: "Keycloak SSO",
                        type: "Security"
                    }
                }
            },
            about: {
                title: "About Me",
                desc: "Full-stack developer with over 5 years of experience in designing, developing, and implementing RESTful services and scalable web applications for the financial, retail, and e-commerce sectors. Specialized in JavaScript/TypeScript, with experience in frameworks such as NestJS, Express, Angular, and Vue 3. Proficient in Java (Spring Boot, Spring Batch), knowledge in Python, and recent training in artificial intelligence through Platzi's AI Bootcamp. Experience integrating payment gateways, SSO (Keycloak) and building modules (Odoo) with Python. Tools like OpenAI and knowledge in basic AI concepts, model fine-tuning, vector databases for embeddings, and the use of frameworks like LangChain and n8n. Competent in SOLID principles, object-oriented programming, and design patterns, working under agile methodologies such as Scrum. Constantly improving, integrating AI and vibe coding into my workflow.",
                details: {
                    global: {
                        title: "Global Experience",
                        desc: "Projects across Latin America and Spanish-speaking countries."
                    },
                    fast: {
                        title: "Continuous improvement",
                        desc: "Skills developed with AI and vibe coding."
                    }
                }
            },
            skills: {
                title: "Technical Skills",
                topLanguages: "Top Languages",
                viewFullStack: "View Full Stack",
                modalTitle: "Full Stack",
                close: "Close",
                appliedIn: {
                    title: "Applied in",
                    items: [
                        "Fintech (payment integrations)",
                        "Retail & eCommerce",
                        "SSO / Identity (Keycloak)",
                        "ERP / Odoo (custom modules)",
                        "REST APIs and scalable services",
                        "Automation (Puppeteer)"
                    ]
                },
                areas: {
                    title: "Areas",
                    items: [
                        "Architecture and service design",
                        "Integrations and middleware",
                        "Optimization and performance",
                        "CI/CD and deployment automation",
                        "Continuous improvement with AI and vibe coding"
                    ]
                },
                languages: {
                    title: "Languages",
                    items: ["JavaScript / TypeScript", "Java", "Python", "SQL"]
                },
                frameworks: {
                    title: "Frameworks",
                    items: ["NestJS, Express, Hapi", "Angular, Vue 3", "Spring Boot, Spring Batch", "Odoo, Puppeteer"]
                },
                databases: {
                    title: "Databases",
                    items: ["MongoDB, PostgreSQL", "MySQL, Microsoft SQL Server"]
                },
                tools: {
                    title: "Tools and DevOps",
                    items: ["Git, GitHub, GitLab CI/CD", "Jenkins, Docker", "Postman, DBeaver", "VS Code, IntelliJ"]
                },
                practices: {
                    title: "Best Practices",
                    items: ["SOLID, OOP, Design Patterns", "Scrum, CI/CD"]
                }
            },
            softSkills: {
                title: "Soft Skills",
                items: [
                    "Commitment, proactivity and analytical logic",
                    "Adaptability and acquisition of new habits",
                    "Updated knowledge about new technologies"
                ]
            },
            certifications: {
                title: "Online Certifications",
                platforms: ["Platzi", "Google", "Udemy", "Telefónica", "HackerRank", "LinkedIn Learning"]
            },
            experience: {
                title: "Work Experience",
                history: "History",
                viewAll: "View All",
                downloadCv: "Download CV",
                roles: {
                    entelgy: {
                        role: "Full-Stack Developer",
                        period: "Nov 2025 – Dec 2025",
                        desc: "Migration of legacy projects (backend and frontend) to Spring Boot at Subtel, applying best development practices established by the institution and ensuring complete and updated documentation to maintain traceability and facilitate future maintenance."
                    },
                    junngla: {
                        role: "Full Stack Developer",
                        period: "June 2023 - July 2025",
                        desc: "RedPay payment gateway integration, creating ecosystem middleware with other Blix integrations. Design and maintenance of REST API with NestJS. Development of custom modules in Odoo 18 with Python for pharmaceutical services with AI. Creation of reusable components in Vue 3 and visual system with Vuetify. Implementation of Java plugin for Keycloak enabling SSO between internal services."
                    },
                    indra: {
                        role: "System Engineer",
                        period: "March 2022 - October 2022",
                        desc: "Creation of Backend APIs under Java Spring Boot framework and consumption of stored procedures. Access to file server, extract and transform data using Java Spring Batch framework. Creation of Angular Frontend interface, component installation, module creation and API consumption. Application of DevOps concepts and tools (CI/CD). Agile Scrum development methodology."
                    },
                    fusiona: {
                        role: "Software Developer",
                        period: "October 2019 - March 2020",
                        desc: "Creation of API set in Hapi framework for Gasconnect application and module migration to Angular 9. Backup and creation of database architecture in MongoDB."
                    },
                    bolsa: {
                        role: "Software Developer",
                        period: "April 2019 - October 2019",
                        desc: "Automatic navigation and transformation of html code to pdf with puppeteer and AngularJS. Agile Scrum development methodology."
                    },
                    escuela: {
                        role: "IT Engineer",
                        period: "March 2016 - April 2019",
                        desc: "Robotics workshop basic programming concepts. Coordination of technological resources. Network and equipment maintenance."
                    },
                    tottus: {
                        role: "Project Analyst",
                        period: "April 2015 - August 2015",
                        desc: "Documentation and tracking of non-face-to-face sales, styling and functionality of TOTTUS Chile - Peru website. Landing page programming."
                    }
                }
            },
            education: {
                title: "Education",
                status: {
                    graduated: "Graduated"
                },
                degrees: {
                    engineer: {
                        title: "Computer Engineer",
                        institution: "I.P Santo Tomas",
                        period: "2012 - 2015"
                    },
                    technician: {
                        title: "Technician in Computer Platforms",
                        institution: "I.P Santo Tomas",
                        period: "2009 - 2012"
                    },
                    telecom: {
                        title: "Telecommunications Technician",
                        institution: "Liceo Juan Piamarta",
                        period: "2007 - 2009"
                    }
                }
            },
            contact: {
                title: "Ready to work?",
                subtitle: "Let's build something amazing together.",
                cta: "Contact Me",
                location: "Location",
                modal: {
                    title: "Contact Me",
                    emailPlaceholder: "Your email",
                    send: "Send",
                    close: "Close",
                    successMessage: "Thanks for contacting me! I sent you a welcome email and will get back to you shortly."
                }
            },
            mapCard: {
                title: "Let's code together!",
                description: "I'm a passionate full-stack programmer. If you want to chat about code, grab a virtual coffee, or explore ideas with vibe coding, I'm here! Location of the Amalfi building."
            },
            autocreativa: {
                title: "Autocreativa",
                description: "I invite you to visit my initiative: We are a digital products agency developing customized solutions with AI, automations, and cutting-edge technology to take your business to the next level.",
                feature1: "Digital Products",
                feature2: "AI-Powered Development",
                feature3: "Online Training",
                cta: "Visit"
            },
            signature: {
                title: "My Philosophy",
                intro: "I work under a philosophy that allows me to deliver solid, efficient projects with a unique touch: <strong>Remote Work and Vibe Coding</strong>.",
                remote: {
                    title: "🌍 <strong>Remote Work</strong>",
                    desc: "No matter where you are, I can develop, optimize, and deliver solutions without geographical limits. This gives me the flexibility to work strategically, maintaining a constant flow and agile communication so that everything moves forward without friction."
                },
                vibe: {
                    title: "💻 <strong>Vibe Coding</strong>",
                    desc: "For me, programming is more than writing lines of code: it's an atmosphere, an energy. My kit includes Cursor to accelerate development with AI, VS Code, and the Jetbrains suite to customize every project, and yes... a good cup of coffee and lo-fi music that accompany me even in the late hours of inspiration. The result: clean, scalable code designed to last."
                },
                promise: {
                    title: "✨ <strong>My Promise</strong>",
                    desc: "I treat every project as if it were my own: taking care of details, optimizing resources, and ensuring the result not only complies but impresses. No excuses here, only commitment and results."
                },
                copyleft: "© Copyleft Nelson Ramos",
                location: "Talca, VII Maule Region, Chile"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
