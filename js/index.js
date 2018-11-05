/* global $ */
var $containers = $('.container')

$(window).on('load popstate', function (event) {
  // Restore dynamically loaded content, or load
  // the initial content
  var state = event.originalEvent.state || {}

  $containers.each(function () {
    $(this).load(state[this.id] || this.dataset.src)
  })
})

$containers.on('click', 'a', function (event) {
  var $container = $(event.delegateTarget)
  var state = $.extend({}, window.history.state)

  // Push the updated state to the history
  state[event.delegateTarget.id] = this.href
  window.history.pushState(state, document.title)
  $container.load(this.href)
  event.preventDefault()
})
