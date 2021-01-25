function OSwindowConfig() {

    $('input[name="os-wallpaper-choice"]').click(function() {

        let img = $(this).attr('value')

        $('.os-grid').css('background-image', `url("${img}")`)

        $('.container-desktop').css('opacity', '0')
        setTimeout(()=>{
            $('.container-desktop').css('background-image', `url("${img}")`)
            setTimeout(()=>{
                $('.container-desktop').css('opacity', '1')
            }, 500)
        }, 800)
    })

    $('.config-choice-item').click(function() {
        NOTOConfig.openConfig($(this).data("config-name"))
        // console.log($(this).data("config-name"))
    })

    this.openConfig = function(name) {
        setTimeout(()=>{
            $('#os-config-choice').css('animation', 'hideConfig 600ms forwards')
            $(`#${name}`).css('animation', 'showConfig 600ms forwards')
        }, 400)
    }

}

var NOTOConfig = new OSwindowConfig()