function OSwindowConfig() {

    this.changeWallpaper = function(data) {
        let img = data.img

        $('.os-grid').css('background-image', `url("${img}")`)

        $('.container-desktop').css('opacity', '0')
        setTimeout(()=>{
            $('.container-desktop').css('background-image', `url("${img}")`)

            setTimeout(()=>{
                $('.container-desktop').css('opacity', '1')
            }, 500)
        }, 800)
    }

    
    this.openConfig = function(data) {
        setTimeout(()=>{
            $(`#${data.hide}`).css('animation', '')
            $(`#${data.show}`).css('animation', '')
            void $(`#${data.hide}`).outerHeight()
            void $(`#${data.show}`).outerHeight()
            $(`#${data.hide}`).css('animation', 'hideConfig 800ms forwards')
            $(`#${data.show}`).css('animation', 'showConfig 800ms forwards')
        }, 50)
    }
    
    $(".context-menu-window").click(function() {
        NOTOwb.openWindow($(this).data("window-name"), { a: 'os-config', b: 'os-config-appearance' })
    })

    $('.config-choice-item').click(function() {
        theChoice = $(this).data("config-name")
        if (theChoice) {
            $('#config-choice-title').css('opacity', '1')
            $('.config-choice-title-overlay').css('display', 'none')
            NOTOConfig.openConfig({ hide: 'os-config-choice', show: theChoice })
        }
    })

    $(".os-config-menu").click(function() {
        // NOTOwb.openWindow($(this).data("window-name"))

        $('#config-choice-title').css('opacity', '0')
        $('.config-choice-title-overlay').css('display', 'block')
        NOTOConfig.openConfig({ hide: $(this).data("config-name"), show: 'os-config-choice'})
    })

    $('.appearance-choice-item').click(function() {
        elems = $(this).data("appearance-choice").split(';')

        $(this).css('background-color', 'var(--main-color1)')
        $('.appearance-choice-item').not(this).css('background-color', 'var(--window-v1)')

        $(`#${elems[0]}`).css('display', 'grid')
        $(`#${elems[1]}`).css('display', 'none')
    })

}

var NOTOConfig = new OSwindowConfig()