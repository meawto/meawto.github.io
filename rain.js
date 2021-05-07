function rain() {
    this.i = 0
    this.particles = ''
  
    while (this.i < 150) {
        let randomI = (Math.floor(Math.random() * (12 - 2 + 1) + 2))
        this.i += randomI;
        let randomDelay = (Math.floor(Math.random() * ( 800 - 1 + 1) + 1))
        let randomDuration = (Math.floor(Math.random() * (1 + 20) + 50))

        this.particles += `<div class="rain-particle" style="animation-duration: ${(randomDuration)}0ms; animation-delay: ${randomDelay}ms; left: ${this.i}%"></div>`
    }

    $('#on-load-rain-particles').append(this.particles)
}

rain()