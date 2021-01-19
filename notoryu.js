const choices = [ 
    [ ['oi'], ['oi'] ],
    [ ['meaw, você pode comentar sobre você?'], 
    ['me reconheça como meawto. tenho {data aqui (ainda vou colocar tá bom)} anos atualmente. Sou brasileiro e vivo no interior de São Paulo',
        'comecei meus estudos como desenvolvedor no final de 2018 e minha atuação como designer começou no final de 2015, estou gostando muito de estudar para melhorar cada vez mais meus conhecimentos e minhas habilidades',
        'os meus estudos sérios começaram na metade de 2019, quando entrei para a escola técnica estadual. me considero muito criativo e, sempre que consigo, me dedico ao máximo nos meus estudos e projetos',
        'gosto muito de gatinhos, chuva, sorvete, frio, climas nublados, café e principalmente da noite. Um dos seus principais desejos é morar sozinho, conseguir se manter e comprar carros para dirigir de madrugada ou quando houver chuva'] ],
    [ ['e a sua experiência?', 'você já trabalhou na área de desenvolvimento?'], 
        ['completei um curso Técnico em Informática para Internet na ETEC, e fui um dos melhores alunos. também completei um estágio na secretaria da saúde na minha cidade, onde me destaquei com algorítmos que me ajudaram (e muito) nas minhas tarefas',
        'sobre sua segunda pergunta: ainda não'] ],
    [ ['quais são seus conhecimentos?', 'me refiro as coisas que você atualmente estuda sobre e/ou tem experiência para trabalhar'],
    ['basicamente:\n- Adobe (Photoshop, Premiere e After Effects);\n- Office (Word, Outlook, Teams e Excel);\n- Informática (Montagem e manutenção de computadores, detecção e correção de problemas nos computadores e instalação e configuração de redes e softwares);\n- desenvolvedor (front-end, back-end, servidor e banco de dados);',
        'e as linguagens de desenvolvimento:\nhtml, css, javascript (também uso nodejs), php, python e mysql', 'pretendo começar a trabalhar com frameworks, principalmente react. sim, eu não uso frameworks para criar meus trabalhos. o belo motivo que tenho é porque amo digitar, mas conheço bem o poder dos frameworks e por isso pretendo dominá-los'] ],
        [ ['meaw, você prefere café com açúcar ou sem?'], ['então... eu prefiro com açúcar, mas minha preferência é com pouco açúcar para sentir melhor o gosto do café'], ['hm', 'tá bom'] ],
    [ ['216158'], ['esse é bom', 'emoji aqui'] ]
]

const chat = $('#chat-data')
let span = $('#input-user-message div')


function MessageInfo(info) {
    this.elemChoice = info.elem
    this.messageList = choices[info.elem.data('choice-id')]
    this.message = ''
    this.status = true
    this.fullMessage = this.messageList[0][0]
    this.renderMessage()


    this.sendMessage = function(data) {
        let username = data.username
        let avatar = data.avatar
        let message = ((data.username == 'meaw') ? this.messageList[1][0] : data.message)
        let that = this

        let msgContainer = `<div class="message-wrapper-container"><div class="message-container"><img class="mc-user-avatar" src="${avatar}"><div class="mc-user-info"><span>${username}</span><span>${message}</span></div></div>`


        if (username == 'meaw') {
            let randomTimer = (Math.floor(Math.random() * (1200 - 600 + 1) + 600))
            $('#meaw-is-typing').css('opacity', '1')
            setTimeout(()=>{
                that.scrollChatBottom()
                chat.append($(msgContainer))
            $('#meaw-is-typing').css('opacity', '0')
                that.messageList[1].shift()
    
                if (that.messageList[1][0]) {
                    setTimeout(()=> {
                        that.sendMessage({username: 'meaw', avatar: './assets/avatar.jpg'})
                    }, randomTimer)
                } else {
                    that.finishChoice()
                }
            }, timer = (that.messageList[1][0].length*20 > 1000) ? that.messageList[1][0].length*20 : 1000)

        } else {
            this.scrollChatBottom(1)
            chat.append($(msgContainer))
            
            this.messageList[0].shift()
    
            if (this.messageList[0][0]) {
                return true
            } else {
                return false
            }
        }
    }

    this.finishChoice = function(data) {
        setTimeout(()=>{
            $('.chat-choices-container').css('opacity', '1')
            $('.chat-choices-container').css('z-index', '6')
            $('.chat-choices-container').css('width', '100%')
            $('#input-blinking-cursor').removeClass("input-blinking-cursor-anim")
            $('#input-blinking-cursor').css('opacity', '0')
        }, 400)
    }


    this.scrollChatBottom = function(x) {

        let n1 = $("#chat-data").scrollTop()
        let n2 = $("#chat-data")[0].scrollHeight - $("#chat-data")[0].offsetHeight
    
        if (n1 == n2 || x) {
            $("#chat-data").stop().animate({ scrollTop: $("#chat-data")[0].scrollHeight }, 500)
        } else {
            $('#new-messages').css('opacity', '1')
        }
        // console.log(n1, n2)
    }
    
    
    // SCROLL BOTTOM ALERT
    this.checkBottomScroll = function() {
        let n1 = $("#chat-data").scrollTop()
        let n2 = $("#chat-data")[0].scrollHeight - $("#chat-data")[0].offsetHeight
        
        if (n1 == n2) {
            // console.log('ativou 2')
            $('#new-messages').css('opacity', '0')
        }
    }

}


MessageInfo.prototype.renderMessage = function() {
    let that = this
    let typingDelay = (Math.floor(Math.random() * (70 - 30 + 1) + 30))

    this.fullMessage = this.messageList[0][0]

    if (!(this.message === this.fullMessage)) {
        this.message = this.fullMessage.substring(0, this.message.length + 1)
        span.html(this.message)
        $('#input-blinking-cursor').removeClass("input-blinking-cursor-anim")
        setTimeout(()=> {
            that.renderMessage()
        }, typingDelay)
    } else {
        setTimeout(()=>{
            span.html('')
            that.elemChoice.remove()
            if (that.sendMessage({username: NotoOS.session_username, avatar: NotoOS.session_avatar, message: that.message})) {
                that.message = ''
                $('#input-blinking-cursor').addClass("input-blinking-cursor-anim")
                setTimeout(()=> {
                    that.renderMessage()
                }, 1200)
            } else {
                $('#input-blinking-cursor').addClass("input-blinking-cursor-anim")
                setTimeout(()=>{
                    that.sendMessage({username: 'meaw', avatar: './assets/avatar.jpg'})
                }, timer = (that.message.length*50 > 1400) ? that.message.length*50 : 1400)
            }
        }, 400)
    }
}




$(".chat-choices").click(function() {
    $('.chat-choices-container').css('opacity', '0')
    $('.chat-choices-container').css('z-index', '4')
    $('.chat-choices-container').css('width', '0')

    $('#input-blinking-cursor').css('opacity', '1')

    setTimeout(()=>{
        var Notoryu = new MessageInfo({elem: $(this)})

        $("#chat-data").on('scroll', ()=>{
            // console.log('ativou 1')
            Notoryu.checkBottomScroll()
        })

        $('#new-messages').click(()=>{
            Notoryu.scrollChatBottom(1)
        })
    }, 1000)
    
})

