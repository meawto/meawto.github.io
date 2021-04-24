function OsWindowBehavior() {

    this.windowsJquery = ["#music-player", "#notoryu-app", "#noto-browser", "#os-config"]
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
            containment: "#os-desktop",
            cursor: "crosshair",
            cancel: '.iframe-overlay, .chat-input, .closeWindowSPAN, #chat-data, #os-config-wallpaper, .os-config-grid, .window-controls-name, .os-config-menu',
            start: function() {
                $(this).css("transform", "scale(1.02)")
                $(this).css("opacity", "0.8")
                $(".iframe-overlay").css("display", "block")
            },
            stop: function() {
                $(this).css("transform", "scale(1)")
                $(this).css("opacity", "1")
                $(this).children(".iframe-container").children(".iframe-overlay").css("display", "none")
            }
        })
        $(window).css("top", this.desktopSize.offsetHeight)
    })

    // JQUERY Z INDEX ON FOCUS
    $(".os-window").mousedown(function() {
        $(".os-window").not(this).css("z-index", "1")
        // $(".os-window").not(this).css("filter", "grayscale(1)")
        $(".os-window").not(this).css("box-shadow", "none")
        $(".os-window").not(this).css("transform", "scale(0.98)")
        $(".os-window .iframe-container .iframe-overlay").not(this).css("display", "block")

        $('.os-dock-button').css("background-color", "var(--dock-btn-v1)")


        $('#os-dock').find(`[data-window-name='${$(this).attr("id")}']`).css("background-color", "var(--dock-btn-v2)")

        $(this).css("z-index", "2")
        $(this).css("filter", "grayscale(0)")
        $(this).css("box-shadow", "0 10px 30px var(--window-shadow-v1)")
        $(this).css("transform", "scale(1)")
        $(this).children(".iframe-container").children(".iframe-overlay").css("display", "none")
    })

    // window control
    $(".closeWindowSPAN, .os-dock-button").click(function(el) {
        NOTOwb.openWindow($(this).data("window-name"), 0, $(this))
    })


    this.openWindow = function(name, behavior = 0, btn = undefined) {
        let osWindow = document.getElementById(name)

        if (osWindow == undefined) {
            return alert('oi entao to com preguiça de fazer uma mensagem melhor. queria dizer que este aplicativo nao esta funcionando ainda ta bom tente outro')
        }
        
        if (behavior) {
            if (behavior.a == 'os-config') {
                $('#os-config-choice').css('animation', 'hideConfig 600ms forwards')
                $(`#${behavior.b}`).css('animation', 'showConfig 600ms forwards')
            }
        }

        $('.os-dock-button').css("background-color", "var(--dock-btn-v1)")

        if (!(osWindow.style.opacity == '1')) {

            osWindow.style.left = (this.desktopSize.offsetWidth / 2 - osWindow.offsetWidth / 2) + 'px'
            osWindow.style.top = (this.desktopSize.offsetHeight / 2 - osWindow.offsetHeight / 2) + 'px'

            if (btn && btn.attr('class') == 'os-dock-button') {
                btn.css("border-bottom", "0.2rem solid white")
                btn.css("background-color", "var(--dock-btn-v2)")
            }

            setTimeout(() => { osWindow.style.opacity = '1' }, 400)
        } else {
            if (osWindow.style.zIndex == '1') {
                osWindow.style.animation = ''
                void osWindow.offsetHeight
                osWindow.style.animation = 'showWindow 400ms'
                if (btn) {
                    btn.css("background-color", "var(--dock-btn-v2)")
                    btn.css("border-bottom", "0.2rem solid white")
                }
            } else {
                this.closeWindow(name)
                if (btn && btn.attr('class') == 'os-dock-button') {
                    btn.css("border-bottom", "0.2rem solid transparent")
                    btn.css("background-color", "var(--dock-btn-v1)")
                }
            }
        }



        $(".os-window").css("z-index", "1")
        // $(".os-window").css("filter", "grayscale(1)")
        $(".os-window").css("box-shadow", "none")
        $(".os-window").css("transform", "scale(0.98)")
        $(".iframe-overlay").css("display", "block")


        osWindow.style.zIndex = '2'
        // osWindow.style.filter = 'grayscale(0)'
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


        $('#os-dock').find(`[data-window-name='${name}']`).css("border-bottom", "0.2rem solid transparent")
    }
}

let NOTOwb = new OsWindowBehavior()