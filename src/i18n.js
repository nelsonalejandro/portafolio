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
                desc: "Ingeniero en Informática con más de 5 años de trayectoria en el desarrollo de soluciones escalables mediante arquitecturas de microservicios y API REST. Experto en el ecosistema JavaScript (NestJS, Angular, Vue 3) y Java (Spring Boot, Spring Batch), cuenta con sólida experiencia técnica en la integración de pasarelas de pago y la modernización de sistemas legacy. Profesional enfocado en la aplicación de principios SOLID, metodologías ágiles (Scrum) e implementación de soluciones con Inteligencia Artificial.",
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
                        desc: "Ejecutar la migración de proyectos legacy (Backend y Frontend) hacia Spring Boot para Subtel como consultor externo. Asegurar la trazabilidad y el mantenimiento futuro mediante documentación técnica y la aplicación de buenas prácticas institucionales durante el ciclo del proyecto."
                    },
                    junngla: {
                        role: "Desarrollador Full Stack",
                        period: "Junio 2023 - Julio 2025",
                        desc: "Integración de pasarela de pagos RedPay, creando middleware de ecosistema con otras integraciones Blix. Diseño y mantenimiento de API REST con NestJS. Desarrollo de módulos personalizados en Odoo 18 con Python para servicios farmacéuticos con IA. Creación de componentes reutilizables en Vue 3 y sistema visual con Vuetify. Implementación de plugin en Java para Keycloak habilitando SSO entre servicios internos."
                    },
                    indra: {
                        role: "System Engineer",
                        period: "Marzo 2022 - Octubre 2022",
                        desc: "Desarrollar APIs en el Backend utilizando Java Spring Boot y gestionar el consumo de procedimientos almacenados. Implementar procesos ETL (Extracción y Transformación) de datos mediante Java Spring Batch. Diseñar interfaces Frontend en Angular y gestionar el despliegue mediante herramientas DevOps (CI/CD) bajo metodología Scrum."
                    },
                    fusiona: {
                        role: "Desarrollador de Software",
                        period: "Octubre 2019 - Marzo 2020",
                        desc: "Crear un set de APIs utilizando el framework Hapi para la aplicación Gasconnect. Realizar la migración de módulos críticos a Angular 9 y diseñar la arquitectura de bases de datos en MongoDB basada en réplicas."
                    },
                    bolsa: {
                        role: "Desarrollador de Software",
                        period: "Abril 2019 - Octubre 2019",
                        desc: "Implementar herramientas para la navegación automática y transformación de código HTML a PDF utilizando Puppeteer y AngularJS."
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
            book: {
                title: "Economía de la IA",
                description: "Te invito a leer mi libro, diseñado para ayudarte a comprender la IA desde la perspectiva de los programadores que pagamos por herramientas y ecosistemas durante nuestras sesiones de vibecoding.",
                feature1: "Prompt Engineering para programadores",
                feature2: "Agentes autónomos",
                feature3: "Optimización de costos API",
                cta: "Ver Libro"
            },
            cvGenerator: {
                title: "CV MAGIC",
                description: "Herramienta de creacion de curriculum vitae, es una plataforma para armar tu currículum de manera gratuita, la cual te permite capturar información desde fotos usando la cámara de tu equipo, además de importar y exportar datos desde PDFs e imágenes. Gratis y sin cuenta.",
                badge: "v1 Beta",
                feature1: "Asistente con IA para crear tu primer currículum",
                feature2: "Lectura de datos desde la cámara + subida de PDF e imágenes",
                feature3: "Servicio gratuito, sin cuenta de usuario",
                cta: "Probar"
            },
            aseoFacil: {
                title: "Aseo Fácil",
                description: "Aseo Fácil es una plataforma que simplifica la gestión de servicios de limpieza. Diseñada para ofrecer la máxima facilidad junto con IA, brindando a las empresas control y garantizando un servicio de limpieza sin tantas fricciones y transparente.",
                badge: "v1 Beta",
                feature1: "Conversacional app mediante asistencia de IA.",
                feature2: "Pagos mediante transbank, aun en fase de pruebas.",
                feature3: "Agenda de usuario e ingreso de staff de aseo.",
                cta: "Ver Proyecto"
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
                desc: "Computer Engineer with more than 5 years of experience developing scalable solutions through microservices architectures and REST APIs. Expert in the JavaScript ecosystem (NestJS, Angular, Vue 3) and Java (Spring Boot, Spring Batch), with solid technical experience in payment gateway integration and legacy system modernization. Professional focused on applying SOLID principles, agile methodologies (Scrum), and implementing Artificial Intelligence solutions.",
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
                        desc: "Execute the migration of legacy projects (Backend and Frontend) to Spring Boot for Subtel as an external consultant. Ensure traceability and future maintenance through technical documentation and the application of institutional best practices throughout the project cycle."
                    },
                    junngla: {
                        role: "Full Stack Developer",
                        period: "June 2023 - July 2025",
                        desc: "RedPay payment gateway integration, creating ecosystem middleware with other Blix integrations. Design and maintenance of REST API with NestJS. Development of custom modules in Odoo 18 with Python for pharmaceutical services with AI. Creation of reusable components in Vue 3 and visual system with Vuetify. Implementation of Java plugin for Keycloak enabling SSO between internal services."
                    },
                    indra: {
                        role: "System Engineer",
                        period: "March 2022 - October 2022",
                        desc: "Develop Backend APIs using Java Spring Boot and manage the consumption of stored procedures. Implement ETL (Extraction and Transformation) data processes using Java Spring Batch. Design Frontend interfaces in Angular and manage deployment using DevOps tools (CI/CD) under Scrum methodology."
                    },
                    fusiona: {
                        role: "Software Developer",
                        period: "October 2019 - March 2020",
                        desc: "Create a set of APIs using the Hapi framework for the Gasconnect application. Perform the migration of critical modules to Angular 9 and design the replica-based database architecture in MongoDB."
                    },
                    bolsa: {
                        role: "Software Developer",
                        period: "April 2019 - October 2019",
                        desc: "Implement tools for automatic navigation and transformation of HTML code to PDF using Puppeteer and AngularJS."
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
                feature2: "AI Development",
                feature3: "Online Training",
                cta: "Visit"
            },
            book: {
                title: "AI Economy",
                description: "I invite you to read my book, designed to help you understand AI from the perspective of programmers who pay for tools and ecosystems during our vibe coding sessions.",
                feature1: "Prompt Engineering for programmers",
                feature2: "Autonomous Agents",
                feature3: "API Cost Optimization",
                cta: "View Book"
            },
            cvGenerator: {
                title: "CV MAGIC",
                description: "An AI-powered CV builder: it guides you to create your resume and can capture information from photos using your device camera, plus import data from PDFs and images. Free and no account required.",
                badge: "MVP in progress",
                feature1: "AI assistant to create your first resume",
                feature2: "Camera data capture + PDF and image upload",
                feature3: "Free service, no user account",
                cta: "Try it"
            },
            aseoFacil: {
                title: "Aseo Fácil",
                description: "Aseo Fácil is a platform that simplifies the management of cleaning services. Designed to offer maximum ease with AI, providing companies with control and guaranteeing a seamless and transparent cleaning service.",
                badge: "v1 Beta",
                feature1: "Conversational app with AI assistance.",
                feature2: "Payments via Transbank, still in testing phase.",
                feature3: "User agenda and cleaning staff check-in.",
                cta: "View Project"
            },
            signature: {
                title: "My Philosophy",
                intro: "I work under a philosophy that has allowed me to deliver solid, efficient projects with a unique touch: <strong>Remote Work and Vibe Coding</strong>.",
                remote: {
                    title: "🌍 <strong>Remote Work</strong>",
                    desc: "No matter where you are, I can develop, optimize, and deliver solutions without geographical limits. This gives me the flexibility to work strategically, maintaining a constant flow and agile communication so everything moves forward smoothly."
                },
                vibe: {
                    title: "💻 <strong>Vibe Coding</strong>",
                    desc: "For me, coding is more than writing lines of code: it’s an atmosphere, an energy. My kit includes Cursor to speed up development with AI, VS Code, and the JetBrains suite to customize every project — and yes… a good cup of coffee and lo-fi music that keeps me going through late nights. The result: clean, scalable code built to last."
                },
                promise: {
                    title: "✨ <strong>My Promise</strong>",
                    desc: "I treat every project as if it were my own: taking care of details, optimizing resources, and ensuring the result not only meets expectations but impresses. No excuses — only commitment and results."
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
