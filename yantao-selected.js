var yantaoSelectedObj = function (obj, options){
    this.obj = obj;
    this.defaults = {
        //dataLists: ['data-value'],
        valueDataName: 'data-val',
        showScrollBar: false,
        optionsSelector: '.select-options',
        titleSelector: '.select-title-info',
        defaultValue: '30'
    };
    this.options = $.extend({}, this.defaults, options);

    this.optionsObj = this.obj.find(this.options.optionsSelector);

    this.titleObj = this.obj.find(this.options.titleSelector);

    this.init = function (){
        var width = this.obj.width();
        this.optionsObj.css({width: width - 2});

        if(this.options.showScrollBar === false){
            this.optionsObj.css('overflow', 'hidden');
            this.optionsObj.find('ul').width(width + 40);
        }

        this.setDefaultValue();

        // 点击标题.显示和隐藏选项区
        this.obj.find(this.options.titleSelector).on('click', $.proxy(this.showSelected, this));

        $(document).on('click', $.proxy(this.documentClick, this));

        // 点击选项内容
        this.optionsObj.find('li').on('click', $.proxy(this.optionClick, this));
    };

    this.optionClick = function (event){
        var $this = $(event.target);
        this.optionsObj.find('li').removeClass('active');
        $this.addClass('active');
        var val = $this.attr(this.options.valueDataName);
        var text = $this.text();

        this.titleObj.attr(this.options.valueDataName, val);
        this.titleObj.find('.text').text(text);

        this.optionsHide();
    };

    this.documentClick = function (event){
        if($(event.target).parents(this.obj.selector).size() == 0){
            this.optionsHide();
        }
    };

    this.optionsHide = function (){
        this.optionsObj.hide();

        this.titleObj.find('.icon').text('▼')
    };

    this.optionsShow = function (){

        this.optionsObj.show();

        this.titleObj.find('.icon').text('▲')
    };

    // 显示和隐藏选项区域
    this.showSelected = function (){
        if(this.optionsObj.is(':hidden')){
            if(this.optionsObj.attr('data-first-show') != 1){

                var scrollTop = this.optionsObj.attr('data-default-scroll-top');

                scrollTop && this.optionsObj.find('ul').animate({
                    scrollTop: scrollTop
                }, 200);

                this.optionsObj.attr('data-first-show', 1);
            }
            this.optionsShow();
        }else{
            this.optionsHide();
        }
    };

    this.setDefaultValue = function (){
        var obj = this.obj;
        var $this = this;
        $this.optionsObj.find('li').each(function (index){
            if($(this).attr($this.options.valueDataName) == $this.options.defaultValue){
                $this.titleObj.find('.text').html($(this).text());
                $this.titleObj.find('.text').attr($this.options.valueDataName, $(this).attr($this.options.valueDataName));
                $(this).addClass('active');

                $this.optionsObj.attr('data-default-scroll-top', index * $(this).height());

                return false;
            }
        })
    };
};

$.fn.ytSelected = function (options){
    var control = new yantaoSelectedObj(this, options);
    control.init();
};