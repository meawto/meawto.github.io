function OSwindowConfig() {

    $('input[name="os-wallpaper-choice"]').click(function() {
        NOTOConfig.changeWallpaper({ img: $(this).attr('value'), color: ($(this).data("color") ? $(this).data("color") : 0) })
    })

    this.changeWallpaper = function(data) {
        let img = data.img

        $('.os-grid').css('background-image', `url("${img}")`)

        $('.container-desktop').css('opacity', '0')
        setTimeout(()=>{
            $('.container-desktop').css('background-image', `url("${img}")`)
            if (data.color == 'white') {
                $('#os-taskbar').css('background-color', 'var(--taskbar-v2)')
                $('#os-taskbar .tb-glow').css('color', 'var(--taskbar-black-text)')

                // $('#os-dock').css('background-color', 'var(--dock-v2)')
                $('#os-dock').css('box-shadow', 'var(--dock-shadow-v2)')
                $('#os-dock .os-dock-button').css('background-color', 'var(--dock-btn-v2)')
            } else {
                $('#os-taskbar').css('background-color', 'var(--taskbar-v1)')
                $('#os-taskbar .tb-glow').css('color', 'var(--color-name)')

                // $('#os-dock').css('background-color', 'var(--dock-v1)')
                $('#os-dock').css('box-shadow', 'var(--dock-shadow-v1)')
                $('#os-dock .os-dock-button').css('background-color', 'var(--dock-btn-v1)')
            }
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
        }, 200)
    }
    
    $(".context-menu-window").click(function(el) {
        NOTOwb.openWindow($(this).data("window-name"), { a: 'os-config', b: 'os-config-wallpaper' })
    })

    $('.config-choice-item').click(function() {
        NOTOConfig.openConfig({ hide: 'os-config-choice', show: $(this).data("config-name") })
    })

    $(".os-config-menu").click(function() {
        // NOTOwb.openWindow($(this).data("window-name"))
        NOTOConfig.openConfig({ hide: $(this).data("config-name"), show: 'os-config-choice'})
    }) 

}

var NOTOConfig = new OSwindowConfig()