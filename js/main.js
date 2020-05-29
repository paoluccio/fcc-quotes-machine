$(function() {

  const $quoteBox = $('#quote-box');
  const $spinner = $('.spinner');
  const $codedBy = $('.coded-by');
  const quotesEndpoint = 'https://favqs.com/api/qotd';
  const twitterUrl = 'https://twitter.com/intent/tweet';
  const twitterParams = '?text=';

  function populateData(response) {
    $('#text').text(`${response.quote.body}`);
    $('#author').text(`-- ${response.quote.author}`);
    if (response.quote.tags.length) {
      let tags = response.quote.tags;
      tags = tags.map(tag => tag[0].toUpperCase() + tag.slice(1))
      $('#category').text(tags.join(', '));
    }
  }

  function getTwitterLink(response) {
    const twitterEndpoint = `${twitterUrl}${twitterParams}${response.quote.body} --${response.quote.author}`;
    $('#tweet-quote').attr('href', twitterEndpoint);
  }

  function renderQuote() {
    $quoteBox.fadeIn(300);
    $codedBy.fadeIn(300);
  }

  function requestQuote() {
    $quoteBox.fadeOut(50);
    $.getJSON(quotesEndpoint, response => {
      populateData(response);
      getTwitterLink(response);
      renderQuote();
    }).fail(() => {
      alert('There has been an error with getting data from the server. Try again later!');
    })
  }

  const bg = new Image();
  bg.src = 'img/wheat-min.jpeg';
  bg.onload = () => {
    $spinner.fadeOut(300);
    document.body.style.backgroundImage = `url(${bg.src})`;
    // Request the first quote when the background image is fully loaded
    requestQuote();
  };

  //  Get more quotes
  $('#new-quote').on('click', requestQuote);

});