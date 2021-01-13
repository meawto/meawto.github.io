function OsWindowBehavior() {

    this.windowsJquery = ["#music-player", "#notoryu-app"]
    this.desktopSize = document.getElementById('os-desktop')

    // remove top 1s
    document.querySelectorAll('.os-window').forEach(item => {
        item.addEventListener('mousedown', () => {
            item.style.transition = 'opacity 400ms, filter 400ms, box-shadow 200ms, transform 100ms'
        })
    })

    // load jquery window draggable
    this.windowsJquery.forEach(window => {
        $(window).draggable({
            containment: "parent",
            cursor: "crosshair",
            cancel: '.iframe-overlay, .chat-input',
            start: function() {
                $(this).css("transform", "scale(1.02)")
                $(this).css("opacity", "0.8")
                $(".iframe-overlay").css("display", "block")
            },
            stop: function() {
                $(this).css("transform", "scale(1)")
                $(this).css("opacity", "1")
                $(".iframe-overlay").css("display", "none")
            }
        })
        $(window).css("top", this.desktopSize.offsetHeight)
    })

    // JQUERY Z INDEX ON FOCUS
    $(".os-window").mousedown(function() {
        $(".os-window").not(this).css("z-index", "1")
        $(".os-window").not(this).css("filter", "grayscale(1)")
        $(".os-window").not(this).css("box-shadow", "none")
        $(".os-window").not(this).css("transform", "scale(0.98)")
        $(".os-window .iframe-container .iframe-overlay").not(this).css("display", "block")

        $(this).css("z-index", "2")
        $(this).css("filter", "grayscale(0)")
        $(this).css("box-shadow", "0 10px 30px var(--window-shadow-v1)")
        $(this).css("transform", "scale(1)")
        $(this).children(".iframe-container").children(".iframe-overlay").css("display", "none")
    })

    // window control
    $(".closeWindowSPAN, .os-dock-button").click(function() {
        NOTOwb.openWindow($(this).data("window-name"))
    })
    // $(".os-dock-button").click(function() {
    //     NOTOwb.openWindow($(this).data("window-name"))
    // })


    this.openWindow = function(name) {
        let osWindow = document.getElementById(name)

        if (!(osWindow.style.opacity == '1')) {

            osWindow.style.left = (this.desktopSize.offsetWidth / 2 - osWindow.offsetWidth / 2) + 'px'
            osWindow.style.top = (this.desktopSize.offsetHeight / 2 - osWindow.offsetHeight / 2) + 'px'

            setTimeout(() => { osWindow.style.opacity = '1' }, 400)
        } else {
            if (osWindow.style.zIndex == '1') {
                // $(".os-window").css("z-index", "1")
                // $(".os-window").css("filter", "grayscale(1)")

                // osWindow.style.zIndex = '2'
                // osWindow.style.filter = 'grayscale(0)'
                osWindow.style.animation = ''
                void osWindow.offsetHeight
                osWindow.style.animation = 'showWindow 400ms'
            } else {
                this.closeWindow(name)
            }
        }



        $(".os-window").css("z-index", "1")
        $(".os-window").css("filter", "grayscale(1)")
        $(".os-window").css("box-shadow", "none")
        $(".os-window").css("transform", "scale(0.98)")
        $(".iframe-overlay").css("display", "block")


        osWindow.style.zIndex = '2'
        osWindow.style.filter = 'grayscale(0)'
        osWindow.style.boxShadow = '0 10px 30px var(--window-shadow-v1)'
        osWindow.style.transform = 'scale(1)'
        try {
            osWindow.querySelector('.iframe-container .iframe-overlay').style.display = "none"
        } catch {}
    }


    this.closeWindow = function(name) {
        let osWindow = document.getElementById(name)

        osWindow.style.transition = 'opacity 400ms, top 1s ease, filter 400ms, box-shadow 200ms, transform 100ms'
        osWindow.style.opacity = '0'
        osWindow.style.top = this.desktopSize.offsetHeight + 'px'
    }
}

let NOTOwb = new OsWindowBehavior()

// $(window).load(function() {
// })