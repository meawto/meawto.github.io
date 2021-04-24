function OSwindowConfig() {

    this.changeWallpaper = function(data) {
        const imgConfig = {
            1: 'left bottom', 
            2: 'center center',
            3: 'center center',
            4: 'center bottom',
            5: 'center center',
            6: 'center bottom',
            7: 'left 76%',
            8: 'left bottom',
            9: 'left center',
            10: '40% 40%',
            11: 'right bottom',
            12: 'right bottom',
            13: 'right bottom',
            14: 'right bottom',
            15: 'right bottom',
            16: 'left bottom',
        }

        // background: url('../assets/bg/1.jpeg') no-repeat left bottom;
        // ./assets/bg/${pic + 1}.jpeg

        $('.os-grid').css('background-image', `url("./assets/bg/${data.img}.jpeg")`)
        $('.os-grid').css('background-position', imgConfig[data.img])

        $('.container-desktop').css('opacity', '0')
        setTimeout(()=>{
            $('.container-desktop').css('background-image', `url("./assets/bg/${data.img}.jpeg")`)
            $('.container-desktop').css('background-position', imgConfig[data.img])

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