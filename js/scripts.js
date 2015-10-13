'use strict';

$(document).ready(function(){
    var verificaMenuFixo = function (h){
        if(h > 0){
            $(".content-topo").addClass("scrolling");
        }else{
            $(".content-topo").removeClass("scrolling");
        }
    }

    $(document).scroll(function(){
        var h = $(this).scrollTop();

        verificaMenuFixo(h);

        // if(scrollingHeight>320){
        //     $('.navbar-header').addClass('fixed');
        //     $('.conteudo').addClass('conteudo-scrolling');
        // }else{
        //     $('.navbar-header').removeClass('fixed');
        //     $('.conteudo').removeClass('conteudo-scrolling');
        // }
    });

    $('.navbar-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('open');
    });

    /* CUSTOMIZANDO E STARTANDO O CAROUSEL DO BOOTSTRAP
    *  Funcao criada por Danio Batista de Souza, 11/12/2014.
    */

    //Startando o Carousel
    $('.carousel').each(function(index, el) {
        var intervalo = $(this).data('interval');

        $(this).carousel({
            interval: intervalo
        });
    });

    /* Para ter mais de um item em um carousel add o attr "data-carousel-qnt
    *  ATENCAO!!! Caso seja apenas 1 item NAO add este atributo, por default já é um item
    */
    $('[data-carousel-qnt] .item').each(function(){
      var next = $(this).next();
      var qntItens = $(this).parents('.carousel').data('carousel-qnt');
      var qtde = parseInt(qntItens);
      var qtde = qtde -2;

      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (var i=0;i < qtde;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });

    // DEFININDO OS PAGERS
    /* Para a geracao automatica dos pagers, vc precisará adicionar o attr data-carousel-pager no elemento que recebe
    * a classe carousel com um valor igual ao id da ol que será seu pager.
    * Ex: <div class="carousel" data-carousel-pager="#pager">
    *       <!--Pagers-->
    *       <ol class="carousel-indicators" id="pager"></ol>
    *
    *       <!--Conteudo do carousel-->
    *       <div class="carousel-inner"> . . . </div>
    *     </div>
    */
    $('.carousel[data-carousel-pager]').each(function(index, el) {
        var pagerAlvo = $(this).data('carousel-pager');
        var eu = $(this).attr('id');

        $(this).find('.item').each(function(index, el) {
            var esteItem = $(this).index();
            $(""+pagerAlvo+"").append('<li data-target="#'+eu+'" data-slide-to="'+esteItem+'">');
        });

    });

    /* Definindo os next(s) e prev(s)
    *  Para que os botoes de "next" e "prev" funcionem, vc deverá add o attr data-carousel
    *  com o valor do tipo de botao (next  ou prev), e tbm add o attr data-alvo com o valor igual
    *  ao id do carousel q receberá o evento do next/prev.
    *  Ex: <a href="#" data-carousel="next" data-alvo="#myCarousel" title="next"></a>
    */
    $('[data-carousel="next"]').click(function(event) {
        event.preventDefault();
        var pai = $(this).data('alvo');
        $(''+pai+'').carousel('next');
    });

    $('[data-carousel="prev"]').click(function(event) {
        event.preventDefault();
        var pai = $(this).data('alvo');
        $(''+pai+'').carousel('prev');
    });

    $('#carousel-servicos').on('slide.bs.carousel', function (event) {
        $(this).find('.item').each(function(index, el) {
            $(this).removeClass('carousel-servico-prev').removeClass('carousel-servico-next');
        });

        switch(event.direction){
            case 'right':
                // programação para evento next
                // criar class carousel-servico-next
                $(this).find('.active').prev('.item').addClass('carousel-servico-next');
                break;
            case 'left':
                // programação para evento prev
                // criar class carousel-servico-prev
                $(this).find('.active').next('.item').addClass('carousel-servico-prev');

                break;
            default:
                console.log('carousel donts event');
                break;
        }
    });

    $(".carousel").on("swipeleft",function(){
        event.preventDefault();
        $(this).carousel('prev');
    });

    $(".carousel").on("swiperight",function(){
        event.preventDefault();
        $(this).carousel('next');
    });

    // LIKE BOX=======================================================>
    setTimeout(function(){
        $(".fb-likebox").each(function(index, el) {
            var fanPage = $(this).data('href').replace('https://www.facebook.com/','');
            if(fanPage == 'teste'){
                fanPage = "gv8website?fref=ts";
            }
            var fbLibebox = '<iframe src="http://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2F'+fanPage+'&amp;width=770px&amp;height=180&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';

            $(this).html(fbLibebox);
        });
    }, 600);


    /*==========================================================================
    * Funcao Gera Iframe
    * Criado por Danilo Batista de Souza
    * 31/01/2014
    * Adicione o atributo data-iframe-src="" na tag q vc queira q o iframe seja gerado
    * Neste atributo devera ter o link do iframe, e pronto!!!
    * Ex: <div data-iframe-src="http://www.gv8.com.br"></div>
    * modificado por carlos, adicionado atributos altura e largura pra iframe e config
    * padroes pra iframe
    ===========================================================================*/
    setTimeout(function(){
        $('[data-iframe-src]').each(function(){
          var src = $(this).attr('data-iframe-src');
          var width = $(this).attr('data-iframe-width');
          var height = $(this).attr('data-iframe-height');
          $('<iframe allowtransparency="true" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" ></iframe>').attr('src', src).attr('width', width).attr('height', height).appendTo(this);
        });
    }, 600);



    $('[data-thumbnail-youtube]').each(function(){
        var data = $(this).data('thumbnail-youtube');
        var youtube_video_id = data.replace('https://www.youtube.com/watch?v=', '').replace('http://www.youtube.com/watch?v=', '');

        var thumbnail_youtube = 'https://img.youtube.com/vi/'+youtube_video_id+'/0.jpg';

        $(this).find('img').attr('src', thumbnail_youtube);
    });

    setTimeout(function(){
        $('[data-youtube-src]').each(function(){
            var youtube_video_id = $(this).data('youtube-src').replace('https://www.youtube.com/watch?v=', '').replace('http://www.youtube.com/watch?v=', '');

            var iframe_width = $(this).data('youtube-width');
            var iframe_height = $(this).data('youtube-height');
            // https://www.youtube.com/embed/wq0mbynj4_k

            $('<iframe width="854" height="480" src="https://www.youtube.com/embed/'+youtube_video_id+'" frameborder="0" allowfullscreen></iframe>').attr('width', iframe_width).attr('height', iframe_height).appendTo(this);
        });
    }, 500);



    $('[data-change-modal]').on('click', function(event){
        event.preventDefault();
        var youtube_video_id = $(this).data('thumbnail-youtube').replace('https://www.youtube.com/watch?v=', '').replace('http://www.youtube.com/watch?v=', '');

        var e = '<iframe width="100%" height="480" src="https://www.youtube.com/embed/'+youtube_video_id+'" frameborder="0" allowfullscreen=""></iframe>';

        $('.video-modal').html(e);
        //$('<iframe width="854" height="480" src="https://www.youtube.com/embed/'+youtube_video_id+'" frameborder="0" allowfullscreen></iframe>').attr('width', iframe_width).attr('height', iframe_height).appendTo(this);
        console.log(e);
    });
});