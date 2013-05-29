/*
 *  Project: jquery-placeholder
 *  Description: jQuery plugin to normalize input placeholders and convert them to labels.
 *  Author: Vinicius Mendes (vbmendes@gmail.com)
 *  License: MIT
 *  Version: 0.1.0
 */

;(function ( $, window, undefined ) {
  var pluginName = 'placeholder',
      document = window.document,
      defaults = {
      };

  function Plugin( element, options ) {
    this.element = $(element);
    this.options = $.extend( {}, defaults, options) ;
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
    var placeholder = this.element.attr('placeholder'),
      $wrapper = $('<span class="placeholder-wrapper"></span>'),
      $label = $('<label class="placeholder-label" for="'+this.element.attr('id')+'">'+placeholder+'</label>'),
      toggleLabel;

    this.element.attr('placeholder', '');

    $wrapper.insertBefore(this.element)
      .append($label, this.element);

    var toggleLabel = function toggleLabel(){
      var $input = $(this);
      setTimeout(function() {
          if (! $input.val()) {
            $wrapper.removeClass('placeholder-filled');
          } else {
            $wrapper.addClass('placeholder-filled');
          }
      }, 0);
    };

    this.element.on('focus', function() {
      $wrapper.addClass('placeholder-focus');
    }).on('blur', function() {
      $wrapper.removeClass('placeholder-focus');
    }).on('keydown', toggleLabel)
      .on('paste', toggleLabel);
  };

  Plugin.prototype.changePlaceholder = function (placeholder) {
    this.element.siblings('label').html(placeholder);
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  };

  $.fn[pluginName+'Change'] = function ( placeholder ) {
    return $(this).data('plugin_' + pluginName).changePlaceholder(placeholder);
  };

}(jQuery, window));
