import AOS from "aos"

AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
})

class ParticleSystem {
    constructor() {
        this.container = document.getElementById("particles-container")
        this.particles = []
        this.init()
    }

    init() {
        this.createParticles()
        this.animate()
        this.handleResize()
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div")
            particle.className = "particle"

            const size = Math.random() * 4 + 2
            const x = Math.random() * window.innerWidth
            const y = Math.random() * window.innerHeight
            const opacity = Math.random() * 0.5 + 0.1

            particle.style.width = `${size}px`
            particle.style.height = `${size}px`
            particle.style.left = `${x}px`
            particle.style.top = `${y}px`
            particle.style.opacity = opacity
            particle.style.animationDelay = `${Math.random() * 6}s`
            particle.style.animationDuration = `${Math.random() * 4 + 4}s`

            this.container.appendChild(particle)
            this.particles.push({
                element: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: size,
            })
        }
    }

    animate() {
        this.particles.forEach((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy

            if (particle.x < 0) particle.x = window.innerWidth
            if (particle.x > window.innerWidth) particle.x = 0
            if (particle.y < 0) particle.y = window.innerHeight
            if (particle.y > window.innerHeight) particle.y = 0

            particle.element.style.left = `${particle.x}px`
            particle.element.style.top = `${particle.y}px`
        })

        requestAnimationFrame(() => this.animate())
    }

    handleResize() {
        window.addEventListener("resize", () => {
            this.container.innerHTML = ""
            this.particles = []
            this.createParticles()
        })
    }
}

class NavbarController {
    constructor() {
        this.navbar = document.querySelector(".glass-nav")
        this.init()
    }

    init() {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add("scrolled")
            } else {
                this.navbar.classList.remove("scrolled")
            }
        })
    }
}


class SmoothScroll {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.getAttribute("href"))
                if (target) {
                    const offsetTop = target.offsetTop - 80
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    })
                }
            })
        })
    }
}


class InteractiveElements {
    constructor() {
        this.init()
    }

    init() {
        this.addHoverEffects()
        this.addClickEffects()
        this.addScrollAnimations()
    }

    addHoverEffects() {
        document.querySelectorAll(".award-card").forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "translateY(-10px) scale(1.02)"
            })

            card.addEventListener("mouseleave", () => {
                card.style.transform = "translateY(0) scale(1)"
            })
        })


        document.querySelectorAll(".gallery-item").forEach((item) => {
            item.addEventListener("mouseenter", () => {
                const img = item.querySelector("img")
                if (img) {
                    img.style.transform = "scale(1.1)"
                }
            })

            item.addEventListener("mouseleave", () => {
                const img = item.querySelector("img")
                if (img) {
                    img.style.transform = "scale(1)"
                }
            })
        })
    }

    addClickEffects() {
        document.querySelectorAll(".btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const ripple = document.createElement("span")
                const rect = button.getBoundingClientRect()
                const size = Math.max(rect.width, rect.height)
                const x = e.clientX - rect.left - size / 2
                const y = e.clientY - rect.top - size / 2

                ripple.style.width = ripple.style.height = size + "px"
                ripple.style.left = x + "px"
                ripple.style.top = y + "px"
                ripple.classList.add("ripple")

                button.appendChild(ripple)

                setTimeout(() => {
                    ripple.remove()
                }, 600)
            })
        })
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated")
                }
            })
        }, observerOptions)

        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observer.observe(el)
        })

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const underline = entry.target.querySelector(".title-underline")
                    if (underline) {
                        underline.style.transform = "scaleX(1)"
                        underline.style.transition = "transform 0.8s ease"
                    }
                }
            })
        }, observerOptions)

        document.querySelectorAll(".section-title").forEach((title) => {
            titleObserver.observe(title)
        })
    }
}

class ParallaxController {
    constructor() {
        this.init()
    }

    init() {
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset
            const parallaxElements = document.querySelectorAll(".hero-image")

            parallaxElements.forEach((element) => {
                const speed = 0.5
                element.style.transform = `translateY(${scrolled * speed}px)`
            })
        })
    }
}

class LoadingController {
    constructor() {
        this.init()
    }

    init() {
        window.addEventListener("load", () => {
            document.body.classList.add("loaded")

            setTimeout(() => {
                document.querySelectorAll(".title-line").forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = "1"
                        line.style.transform = "translateY(0)"
                    }, index * 200)
                })
            }, 500)
        })
    }
}

class MobileMenuController {
    constructor() {
        this.init()
    }

    init() {
        const navbarToggler = document.querySelector(".navbar-toggler")
        const navbarCollapse = document.querySelector(".navbar-collapse")

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener("click", () => {
                navbarCollapse.classList.toggle("show")
            })

            document.querySelectorAll(".nav-link").forEach((link) => {
                link.addEventListener("click", () => {
                    navbarCollapse.classList.remove("show")
                })
            })
        }
    }
}

class PerformanceOptimizer {
    constructor() {
        this.init()
    }

    init() {
        this.lazyLoadImages()

        this.debounceScrollEvents()
    }

    lazyLoadImages() {
        const images = document.querySelectorAll("img[data-src]")
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.src = img.dataset.src
                    img.classList.remove("lazy")
                    imageObserver.unobserve(img)
                }
            })
        })

        images.forEach((img) => imageObserver.observe(img))
    }

    debounceScrollEvents() {
        let ticking = false

        const updateScrollEffects = () => {
            ticking = false
        }

        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects)
                ticking = true
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem()
    new NavbarController()
    new SmoothScroll()
    new InteractiveElements()
    new ParallaxController()
    new LoadingController()
    new MobileMenuController()
    new PerformanceOptimizer()
})

const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".custom-cursor")
    if (!cursor) {
        const newCursor = document.createElement("div")
        newCursor.className = "custom-cursor"
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transition: transform 0.1s ease;
        `
        document.body.appendChild(newCursor)
    }

    const cursorElement = document.querySelector(".custom-cursor")
    if (cursorElement) {
        cursorElement.style.left = e.clientX - 10 + "px"
        cursorElement.style.top = e.clientY - 10 + "px"
    }
})

document.querySelectorAll("a, button, .award-card, .gallery-item").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        const cursor = document.querySelector(".custom-cursor")
        if (cursor) {
            cursor.style.transform = "scale(1.5)"
            cursor.style.opacity = "1"
        }
    })

    element.addEventListener("mouseleave", () => {
        const cursor = document.querySelector(".custom-cursor")
        if (cursor) {
            cursor.style.transform = "scale(1)"
            cursor.style.opacity = "0.7"
        }
    })
})

class ConfettiSystem {
    constructor() {
        this.container = document.getElementById("confetti-container")
        this.colors = ["#ffd700", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]
    }

    createConfetti(count = 100) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement("div")
            confetti.className = "confetti"

            const color = this.colors[Math.floor(Math.random() * this.colors.length)]
            const size = Math.random() * 8 + 4
            const left = Math.random() * 100
            const animationDuration = Math.random() * 2 + 2
            const animationDelay = Math.random() * 2

            confetti.style.backgroundColor = color
            confetti.style.width = `${size}px`
            confetti.style.height = `${size}px`
            confetti.style.left = `${left}%`
            confetti.style.animationDuration = `${animationDuration}s`
            confetti.style.animationDelay = `${animationDelay}s`

            if (Math.random() > 0.5) {
                confetti.style.borderRadius = "50%"
            }

            this.container.appendChild(confetti)

            setTimeout(
                () => {
                    confetti.remove()
                },
                (animationDuration + animationDelay) * 1000,
            )
        }
    }

    burst() {
        this.createConfetti(150)

        setTimeout(() => this.createConfetti(100), 500)
        setTimeout(() => this.createConfetti(80), 1000)
        setTimeout(() => this.createConfetti(60), 1500)
    }
}

class TimelineController {
    constructor() {
        this.init()
    }

    init() {
        this.observeTimelineItems()
        this.addTimelineInteractions()
    }

    observeTimelineItems() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in")

                    const timelineContent = entry.target.querySelector(".timeline-content")
                    if (timelineContent) {
                        setTimeout(() => {
                            timelineContent.style.transform = "translateY(0)"
                            timelineContent.style.opacity = "1"
                        }, 200)
                    }
                }
            })
        }, observerOptions)

        document.querySelectorAll(".timeline-item").forEach((item) => {
            observer.observe(item)

            const content = item.querySelector(".timeline-content")
            if (content) {
                content.style.transform = "translateY(30px)"
                content.style.opacity = "0"
                content.style.transition = "all 0.6s ease"
            }
        })
    }

    addTimelineInteractions() {
        document.querySelectorAll(".timeline-content").forEach((content) => {
            content.addEventListener("mouseenter", () => {
                const image = content.querySelector(".timeline-image img")
                if (image) {
                    image.style.transform = "scale(1.05) rotate(2deg)"
                }
            })

            content.addEventListener("mouseleave", () => {
                const image = content.querySelector(".timeline-image img")
                if (image) {
                    image.style.transform = "scale(1) rotate(0deg)"
                }
            })
        })
    }
}

class OfficerCardsController {
    constructor() {
        this.init()
    }

    init() {
        this.addHoverEffects()
        this.addClickEffects()
    }

    addHoverEffects() {
        document.querySelectorAll(".officer-card").forEach((card) => {
            card.addEventListener("mouseenter", () => {
                const image = card.querySelector(".officer-image")
                if (image) {
                    image.style.transform = "scale(1.1) rotate(5deg)"
                }
            })

            card.addEventListener("mouseleave", () => {
                const image = card.querySelector(".officer-image")
                if (image) {
                    image.style.transform = "scale(1) rotate(0deg)"
                }
            })
        })
    }

    addClickEffects() {
        document.querySelectorAll(".officer-card").forEach((card) => {
            card.addEventListener("click", () => {
                card.style.transform = "scale(0.95)"
                setTimeout(() => {
                    card.style.transform = "translateY(-10px) scale(1.02)"
                }, 150)
            })
        })
    }
}

// Global celebration function
window.triggerCelebration = () => {
    const confettiSystem = new ConfettiSystem()
    confettiSystem.burst()

    // Add celebration sound effect (optional)
    // You can add an audio element here if needed

    // Animate the button
    const btn = document.querySelector(".celebration-btn")
    btn.style.transform = "scale(0.9)"
    setTimeout(() => {
        btn.style.transform = "translateY(-3px) scale(1.05)"
    }, 150)

    // Show thank you message animation
    const appreciationTitle = document.querySelector(".appreciation-title")
    appreciationTitle.style.animation = "glow 0.5s ease-in-out 3"
}

// Enhanced scroll progress indicator
class ScrollProgressIndicator {
    constructor() {
        this.createIndicator()
        this.updateProgress()
    }

    createIndicator() {
        const indicator = document.createElement("div")
        indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: var(--primary-gradient);
      z-index: 9999;
      transition: width 0.1s ease;
    `
        document.body.appendChild(indicator)
        this.indicator = indicator
    }

    updateProgress() {
        window.addEventListener("scroll", () => {
            const scrollTop = window.pageYOffset
            const docHeight = document.body.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            this.indicator.style.width = scrollPercent + "%"
        })
    }
}

// Initialize new controllers
document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem()
    new NavbarController()
    new SmoothScroll()
    new InteractiveElements()
    new ParallaxController()
    new LoadingController()
    new MobileMenuController()
    new PerformanceOptimizer()
    new TimelineController()
    new OfficerCardsController()
    new ScrollProgressIndicator()
})

// Add floating elements animation
class FloatingElements {
    constructor() {
        this.createFloatingElements()
    }

    createFloatingElements() {
        const elements = ["💫", "⭐", "🎉", "🏆", "🎊"]

        elements.forEach((emoji, index) => {
            const element = document.createElement("div")
            element.innerHTML = emoji
            element.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
        animation: float-around 15s linear infinite;
        animation-delay: ${index * 3}s;
      `

            element.style.left = Math.random() * 100 + "%"
            element.style.top = Math.random() * 100 + "%"

            document.body.appendChild(element)
        })
    }
}

// Add floating elements CSS
const floatingStyle = document.createElement("style")
floatingStyle.textContent = `
  @keyframes float-around {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(100px, -100px) rotate(90deg);
    }
    50% {
      transform: translate(-50px, -200px) rotate(180deg);
    }
    75% {
      transform: translate(-150px, -50px) rotate(270deg);
    }
    100% {
      transform: translate(0, 0) rotate(360deg);
    }
  }
`
document.head.appendChild(floatingStyle)

// Initialize floating elements
document.addEventListener("DOMContentLoaded", () => {
    new FloatingElements()
})

// Future Leaders Image Carousel
class FutureLeadersCarousel {
    constructor() {
        this.images = document.querySelectorAll(".future-image")
        this.currentIndex = 0
        this.init()
    }

    init() {
        if (this.images.length > 0) {
            this.startCarousel()
            this.observeSection()
        }
    }

    startCarousel() {
        setInterval(() => {
            this.images[this.currentIndex].classList.remove("active")
            this.currentIndex = (this.currentIndex + 1) % this.images.length
            this.images[this.currentIndex].classList.add("active")
        }, 4000) // Change image every 4 seconds
    }

    observeSection() {
        const section = document.getElementById("future-leaders")
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.triggerTextAnimations()
                    }
                })
            }, {
                threshold: 0.3,
            },
        )

        observer.observe(section)
    }

    triggerTextAnimations() {
        // Trigger staggered animations for text elements
        const textContainer = document.querySelector(".future-text-container")
        if (textContainer) {
            textContainer.style.animationPlayState = "running"
        }

        // Animate requirement items with stagger
        const requirementItems = document.querySelectorAll(".requirement-item")
        requirementItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = "translateX(0)"
                item.style.opacity = "1"
            }, index * 200)
        })

        // Animate position cards
        const positionCards = document.querySelectorAll(".position-card")
        positionCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = "translateY(0) scale(1)"
                card.style.opacity = "1"
            }, index * 150)
        })

        // Animate step items
        const stepItems = document.querySelectorAll(".step-item")
        stepItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = "translateX(0)"
                item.style.opacity = "1"
            }, index * 200)
        })
    }
}

// Application Form Handler
class ApplicationHandler {
    constructor() {
        this.init()
    }

    init() {
        const applyBtn = document.querySelector(".apply-btn")
        const infoBtn = document.querySelector(".info-btn")

        if (applyBtn) {
            applyBtn.addEventListener("click", this.handleApplyClick.bind(this))
        }

        if (infoBtn) {
            infoBtn.addEventListener("click", this.handleInfoClick.bind(this))
        }
    }

    handleApplyClick(e) {
        e.preventDefault()

        // Create modal or redirect to application form
        this.showApplicationModal()
    }

    handleInfoClick(e) {
        e.preventDefault()

        // Show information modal
        this.showInfoModal()
    }

    showApplicationModal() {
        // Create a simple modal for demonstration
        const modal = document.createElement("div")
        modal.innerHTML = `
      <div class="modal-overlay" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      ">
        <div class="modal-content" style="
          background: white;
          padding: 2rem;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          position: relative;
        ">
          <button class="close-modal" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          ">&times;</button>
          <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Application Form</h3>
          <p>The application period will open soon! Stay tuned for announcements.</p>
          <p><strong>Expected Opening:</strong> March 2025</p>
          <div style="margin-top: 2rem;">
            <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
              Got it!
            </button>
          </div>
        </div>
      </div>
    `

        document.body.appendChild(modal)

        // Close modal when clicking outside or close button
        modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("close-modal")) {
                modal.remove()
            }
        })
    }

    showInfoModal() {
        const modal = document.createElement("div")
        modal.innerHTML = `
      <div class="modal-overlay" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      ">
        <div class="modal-content" style="
          background: white;
          padding: 2rem;
          border-radius: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        ">
          <button class="close-modal" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          ">&times;</button>
          <h3 style="color: var(--primary-color); margin-bottom: 1rem;">More Information</h3>
          <div style="text-align: left;">
            <h5>Benefits of Being an SBO Officer:</h5>
            <ul>
              <li>Leadership development opportunities</li>
              <li>Networking with faculty and administration</li>
              <li>Certificate of recognition</li>
              <li>Priority in scholarship applications</li>
              <li>Experience in event management</li>
            </ul>

            <h5 style="margin-top: 1.5rem;">Term Duration:</h5>
            <p>One academic year (June 2025 - May 2026)</p>

            <h5 style="margin-top: 1.5rem;">Training Provided:</h5>
            <ul>
              <li>Leadership and management skills</li>
              <li>Public speaking and communication</li>
              <li>Event planning and coordination</li>
              <li>Financial management basics</li>
            </ul>
          </div>
          <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
              Close
            </button>
          </div>
        </div>
      </div>
    `

        document.body.appendChild(modal)

        modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("close-modal")) {
                modal.remove()
            }
        })
    }
}

// Parallax effect for future leaders section
class FutureLeadersParallax {
    constructor() {
        this.init()
    }

    init() {
        window.addEventListener("scroll", this.handleScroll.bind(this))
    }

    handleScroll() {
        const section = document.getElementById("future-leaders")
        if (!section) return

        const rect = section.getBoundingClientRect()
        const scrolled = window.pageYOffset

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const imageContainer = section.querySelector(".future-image-container")
            if (imageContainer) {
                const speed = 0.3
                const yPos = -(scrolled * speed)
                imageContainer.style.transform = `translateY(${yPos}px)`
            }
        }
    }
}

// Initialize new controllers
document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem()
    new NavbarController()
    new SmoothScroll()
    new InteractiveElements()
    new ParallaxController()
    new LoadingController()
    new MobileMenuController()
    new PerformanceOptimizer()
    new TimelineController()
    new OfficerCardsController()
    new ScrollProgressIndicator()
    new FutureLeadersCarousel()
    new ApplicationHandler()
    new FutureLeadersParallax()
})

// Add typing effect for the future leaders title
class TypingEffect {
    constructor() {
        this.init()
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.startTyping()
                    }
                })
            }, {
                threshold: 0.5
            },
        )

        const section = document.getElementById("future-leaders")
        if (section) {
            observer.observe(section)
        }
    }

    startTyping() {
        const words = document.querySelectorAll(".title-word")
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animation = "slideUpWord 0.8s ease forwards"
            }, index * 300)
        })
    }
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
    new TypingEffect()
})
// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all animations and interactions
    initParticleBackground()
    initScrollAnimations()
    initNavbarEffects()
    initSmoothScrolling()
    initLoadingScreen()
    initInteractiveElements()
})

// Particle Background
function initParticleBackground() {
    const background = document.getElementById("particles-background")
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
        createParticle(background)
    }

    // Mouse interaction
    document.addEventListener("mousemove", (e) => {
        const particles = document.querySelectorAll(".particle")
        const mouseX = e.clientX
        const mouseY = e.clientY

        particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect()
            const particleX = rect.left + rect.width / 2
            const particleY = rect.top + rect.height / 2

            const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2))

            if (distance < 100) {
                const angle = Math.atan2(mouseY - particleY, mouseX - particleX)
                const force = (100 - distance) / 100
                const moveX = Math.cos(angle) * force * 20
                const moveY = Math.sin(angle) * force * 20

                particle.style.transform = `translate(${moveX}px, ${moveY}px)`
            } else {
                particle.style.transform = "translate(0, 0)"
            }
        })
    })
}

function createParticle(container) {
    const particle = document.createElement("div")
    particle.className = "particle"

    const size = Math.random() * 10 + 5
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight
    const animationDuration = Math.random() * 3 + 3

    particle.style.width = size + "px"
    particle.style.height = size + "px"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.animationDuration = animationDuration + "s"
    particle.style.animationDelay = Math.random() * 2 + "s"

    container.appendChild(particle)

    // Recreate particle when animation ends
    setTimeout(
        () => {
            if (particle.parentNode) {
                particle.remove()
                createParticle(container)
            }
        },
        (animationDuration + 2) * 1000,
    )
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target
                const delay = element.dataset.delay || 0

                setTimeout(() => {
                    element.classList.add("animated")
                }, delay)

                observer.unobserve(element)
            }
        })
    }, observerOptions)

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el)
    })
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector(".glass-nav")

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled")
        } else {
            navbar.classList.remove("scrolled")
        }
    })
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))

            if (target) {
                const offsetTop = target.offsetTop - 80

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })
}

// Loading Screen
function initLoadingScreen() {
    // Create loading screen
    const loading = document.createElement("div")
    loading.className = "loading"
    loading.innerHTML = '<div class="spinner"></div>'
    document.body.appendChild(loading)

    // Hide loading screen after page load
    window.addEventListener("load", () => {
        setTimeout(() => {
            loading.classList.add("fade-out")
            setTimeout(() => {
                loading.remove()
            }, 500)
        }, 1000)
    })
}

// Interactive Elements
function initInteractiveElements() {
    // Gallery hover effects
    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item) => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.05) rotate(2deg)"
        })

        item.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1) rotate(0deg)"
        })
    })

    // Appreciation cards interactive effects
    const appreciationCards = document.querySelectorAll(".appreciation-card")
    appreciationCards.forEach((card) => {
        card.addEventListener("mouseenter", function() {
            // Add ripple effect
            const ripple = document.createElement("div")
            ripple.style.position = "absolute"
            ripple.style.borderRadius = "50%"
            ripple.style.background = "rgba(255, 107, 107, 0.3)"
            ripple.style.transform = "scale(0)"
            ripple.style.animation = "ripple 0.6s linear"
            ripple.style.left = "50%"
            ripple.style.top = "50%"
            ripple.style.width = "20px"
            ripple.style.height = "20px"
            ripple.style.marginLeft = "-10px"
            ripple.style.marginTop = "-10px"

            this.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 600)
        })
    })

    // Add ripple animation CSS
    const style = document.createElement("style")
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
    document.head.appendChild(style)

    // Button hover effects
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button) => {
        button.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-2px)"
            this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)"
        })

        button.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)"
            this.style.boxShadow = ""
        })
    })
}

// Parallax Effect
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-section")

    parallaxElements.forEach((element) => {
        const speed = 0.5
        element.style.transform = `translateY(${scrolled * speed}px)`
    })
})

// Dynamic Text Animation
function initTextAnimations() {
    const textElements = document.querySelectorAll(".hero-title, .section-title")

    textElements.forEach((element) => {
        const text = element.textContent
        element.textContent = ""

        text.split("").forEach((char, index) => {
            const span = document.createElement("span")
            span.textContent = char === " " ? "\u00A0" : char
            span.style.animationDelay = `${index * 0.1}s`
            span.style.display = "inline-block"
            span.style.opacity = "0"
            span.style.animation = "fadeInChar 0.5s ease forwards"
            element.appendChild(span)
        })
    })
}

// Add character animation CSS
const charAnimationStyle = document.createElement("style")
charAnimationStyle.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(charAnimationStyle)

// Initialize text animations when page loads
window.addEventListener("load", initTextAnimations)

// Resize handler for responsive particles
window.addEventListener("resize", () => {
    // Recreate particles on resize
    const background = document.getElementById("particles-background")
    const particles = background.querySelectorAll(".particle")
    particles.forEach((particle) => particle.remove())

    setTimeout(() => {
        initParticleBackground()
    }, 100)
})

// Performance optimization
let ticking = false

function updateAnimations() {
    // Update any continuous animations here
    ticking = false
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations)
        ticking = true
    }
}

// Throttle scroll events
window.addEventListener("scroll", requestTick)
