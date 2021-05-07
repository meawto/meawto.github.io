var elemDatetime = document.getElementById('os-datetime')
function OSFunctions() {

    this.session_username
    this.session_avatar = 'https://cdn.discordapp.com/attachments/804066268831154186/838203362335653888/korona.gif'
    this.windowReady

    this.osDateNow = function () {
        let date = new Date()
        let day = date.toLocaleString('default', { weekday: "short" }).slice(0, -1)
        let month = date.toLocaleString('default', { month: 'short' }).slice(0, -1)
        let dayNum = date.getDate()
        let mins = date.toLocaleString('default', { minute: '2-digit' })
        if (mins.length < 2) { mins = 0 + mins }
        let hours = date.toLocaleString('default', { hour: '2-digit' })
        let finalstr = `${day}, ${month} ${dayNum}⠀⠀${hours}:${mins}`
        if ((finalstr != elemDatetime.innerHTML)) {
            elemDatetime.innerHTML = finalstr
        }
    }

    this.saveUsername = function (name) {
        if (name.length <= 1) {
            return this.inputError($('#session-username'))
        }
        if (this.windowReady) {
            this.session_username = name
            $("#on-load").css("animation", "onLoadClose 2s forwards")
            $(".os-grid").css("animation", "gridOnLoad 2s forwards")
            setTimeout(() => {$("#on-load").css("display", "none")}, 1500)
        }
        
        setTimeout(() => {NOTOwb.openWindow('os-config', { a: 'os-config', b: 'os-config-appearance' })}, 1200)
    }

    this.inputError = function(elem) {
        elem.removeClass("input-error")
        void elem.outerWidth()
        elem.addClass("input-error")
    }

    this.checkEntry = function (e, elem) {
        if (e.key == undefined) { return false }

        let k = e.key;

        if (elem.val().length > 16) {
            return location.reload()
        }

        if (!(k.match(/^[A-Za-z ]+$/))) {
            if (elem.val().length >= 16) {
                this.inputError(elem)
            }
            this.inputError(elem)
            return false
        }
    }

    this.checkInputEmpty = function() {
        if ($('#session-username').val().length > 1) {
            $('#btn-session-start').css('top', '1rem')
            $('#btn-session-start').css('opacity', '1')
            $('#btn-session-start').css('cursor', 'pointer')
        } else {
            $('#btn-session-start').css('top', '14rem')
            $('#btn-session-start').css('opacity', '0')
            $('#btn-session-start').css('cursor', 'default')

        }
        setTimeout(this.checkInputEmpty, 200)
    }
}

var NotoOS = new OSFunctions()

$(document).ready(function () {
    setInterval(NotoOS.osDateNow, 1000)

    $('#session-username').attr('maxlength', 16)

    $('#session-username').on('keydown paste change', function(event){
        NotoOS.checkInputEmpty()
        return NotoOS.checkEntry(event, $(this))
    })

    $('#on-load-form').submit((event)=>{
        event.preventDefault()
        NotoOS.saveUsername($('#session-username').val())
    })
})

$(window).load(function () {
    NotoOS.windowReady = true
    $("#on-load").css("animation", "onLoadOpen 3s forwards")
    $('#session-username').css('top', '1rem')
    $('#session-username').css('opacity', '1')
    
    
    $('input[name="notoryu-session-avatar-choice"]').click(function(el) {
        NotoOS.session_avatar = el.target.getAttribute('value')
    })



    // start appearance config

    bgIndex = [...Array(16).keys()]
    bgIndex.forEach(pic => {
        $('#appearance-wallpaper').append(`<label class="wallpaper-choice-item"> <input tabindex="-1" type="radio" name="appearance-wallpaper-choice" value="${pic + 1}"> <img src="./assets/bg/${pic + 1}.jpeg"> </label>`)
    });

    $('input[name="appearance-wallpaper-choice"]').click(function() {
        NOTOConfig.changeWallpaper({ img: $(this).attr('value') })
    })

    NOTOConfig.changeWallpaper({ img: bgIndex[Math.floor(Math.random() * bgIndex.length)] + 1 })

    $('.appearance-item-button').change(function() {
        switch ($(this).data('config-id')) {
            case 1:
                NOTOConfig.changeTheme($(this).find('input').is(":checked"))
                break
            case 2:
                NOTOConfig.changePerformance()
                break
        }
    })

    // end appearance config



    $('#os-desktop').contextmenu(function(event) {
        event.preventDefault()

        if(event.target.id == 'os-desktop') {    
            let desktopSize = [$('#os-desktop').outerWidth(), $('#os-desktop').outerHeight()]
            let menu_position = [event.pageX - this.offsetLeft, event.pageY - this.offsetTop]
            
            if ((menu_position[0] + $('#desktop-context-menu').outerWidth()) > desktopSize[0] - 20) {
                $('#desktop-context-menu').css('left', (desktopSize[0] - $('#desktop-context-menu').outerWidth() - 8))
            } else {
                $('#desktop-context-menu').css('left', menu_position[0] + 12)
            }
            
            if ((menu_position[1] + $('#desktop-context-menu').outerHeight()) > desktopSize[1] - 20) {
                $('#desktop-context-menu').css('top', (desktopSize[1] - $('#desktop-context-menu').outerHeight() - 8))
            } else {
                $('#desktop-context-menu').css('top', menu_position[1] + 12)
            }
            
            $('#desktop-context-menu').css('z-index', '4')
            $('#desktop-context-menu').css('opacity', '1') 
        }
    })

    $(window).click(function(event) {
        $('#desktop-context-menu').css('opacity', '0')
        setTimeout(() => {
            $('#desktop-context-menu').css('z-index', '-1')
        }, 400)
    })

    // block tabindex (tab)
    $(document).keydown( (e) => {
        if( e.key == 'Tab' ) {
            e.preventDefault()
        }
    } );
})