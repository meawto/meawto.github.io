var elemDatetime = document.getElementById('os-datetime')
function InitialFunctions() {

    this.session_username
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
        this.session_username = name
        if (this.windowReady) {
            $("#on-load").css("opacity", "0")
            $(".os-grid").css("animation", "gridOnLoad 2s forwards")
            setTimeout(() => {$("#on-load").css("display", "none")}, 1500)
        }
    }

    this.inputError = function(elem) {
        elem.removeClass("input-error")
        void elem.outerWidth()
        elem.addClass("input-error")
    }

    this.checkEntry = function (e, elem) {
        if (e.key == undefined) { 
            return false
        }

        let k = e.key;

        if (k == 'Enter') {
            this.saveUsername(elem.val())
            e.preventDefault()
        }

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
        } else {
            $('#btn-session-start').css('top', '14rem')
            $('#btn-session-start').css('opacity', '0')
        }
        setTimeout(this.checkInputEmpty, 200)
    }
}

var NotoOS = new InitialFunctions()

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
})