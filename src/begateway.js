(function () {
  "use strict";
    
  function receiveMessage(event) {
    if (event.data.url) {
      setTimeout(function(){ document.location = event.data.url; }, 500);
    };
    return false;
  }

  window.addEventListener("message", receiveMessage, false);
  
  var BeGateway = function (options) {
    if (!options.url) {
      return false;
    };
    
    this.url = options.url;
    this.styles = options.style;
    this.type = options.type;
    this.anchor = options.id;
    this.iframeDivId = 'beGatewayForm';

    if (options.size) {
      this.size = options.size;
    } else {
      this.size = { height: 480, width: 320 };  
    };
  };

  BeGateway.prototype.isMobile = function () {
    if ( navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Windows Phone/i) ) {
      return true;
    } else {
      return false;
    }
  }

  BeGateway.prototype.prepareIframe = function (url) {
    var iframeDiv = document.createElement("div");
    iframeDiv.setAttribute("id", this.iframeDivId);
    iframeDiv.style.display = "none";

    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", url);
    iframe.setAttribute("frameborder", "0");
    iframe.style.display = "block";
    iframe.style.margin = "auto";

    if (this.size) {
      iframe.style.width = this.size.width + "px";
      iframe.style.height = this.size.height + "px";
    };

    iframeDiv.appendChild(iframe);

    if (this.anchor && document.getElementById(this.anchor)) {
      document.getElementById(this.anchor).appendChild(iframeDiv);
    } else {
      document.body.appendChild(iframeDiv);
    };

    var styles = this.styles;
    var size = this.size;

    iframe.onload = function() {
      iframe.contentWindow.postMessage({ css: styles }, "*");
      if ($('#closeWindow').size() == 0) {
        $('.ui-dialog').prepend("<a href='#' id='closeWindow'></div>");
        $("a#closeWindow").css("left", size.width);

        $('a#closeWindow').click(function() {
          $('#dialogWindow').dialog('close');
        });

      };
    };
    return iframe;
  }

  BeGateway.prototype.buildOverlayForm = function (url) {
    var linkId = '#' + this.anchor;
    var size = this.size;
    var that = this;
    var dialogId = "dialogWindow";

    var emptyDiv = document.createElement('div');
    emptyDiv.setAttribute("id", dialogId);
    document.body.appendChild(emptyDiv);
    
    var reg = new RegExp('([http|https].+\/)checkout')
    var path =  reg.exec(this.url)[1];
    var cssPath = path + 'stylesheets/jquery-ui.min.css'
    $('body').append('<link rel="stylesheet" href="' + cssPath + '">');

    $(linkId).click(function(event) {
      event.preventDefault();

      if (that.isMobile()) {
        window.open(that.url);
        return false;
      }

      $('#' + dialogId).dialog({
        modal: true,
        width: size.width + 10,
        height: size.height + 30,
        show: {
          effect: "fadeIn"
        },
        hide: {
          effect: "fadeOut"
        },
        open: function () {
          if ($('#' + dialogId).children('iframe').size() == 0) {
            document.getElementById(dialogId).appendChild(that.prepareIframe(url + "&iframe=overlay"));
          };
        }
      });
    });
  };

  BeGateway.prototype.buildInlineForm = function(url) {
    url = url + "&iframe=inline";

    this.prepareIframe(url);
    $('#' + this.iframeDivId).show();
  }

  BeGateway.prototype.buildForm = function () {
    if (options.style) {
      this.styles = options.style;
    };

    if (this.type == 'overlay') {
      this.buildOverlayForm(this.url);
      return false;
    };

    if (this.type == 'inline') {
      this.buildInlineForm(this.url);
      return false;
    };
  };

  window.BeGateway = BeGateway;
}());
