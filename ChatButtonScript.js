jQuery(document).ready(function($){
    $('form').on('submit', function(e){
      e.preventDefault();
      
      var container = $(this).parent(),
          number = container.find('p').length;
      
      if(number < 3)
        text = 'Форма отправлена';
      if(number == 3)
        text = 'Не надоело еще кликать?';
      if(number == 4)
        text = 'Может хватит?'
      if(number == 5)
        text = 'Вы же уже поняли, что все работает';
      if(number == 6)
        text = 'Все, это был последний раз';
      if(number == 7)
        text = 'Я не шучу, хватит!'
      if(number == 8)
        text = 'Выкл.'
      if(number > 8)
        return false;
      
      container.find('h2').before('<p>' + text + '</p>');
    });
  });