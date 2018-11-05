/* global $ */
var $containers = $('.container')

$(window).on('load popstate', function (event) {
  // Restore dynamically loaded content, or load
  // the initial content
  var state = event.originalEvent.state || {}
  console.log('Pop state:', state)

  $containers.each(function () {
    $(this).load(state[this.id] || this.dataset.src)
  })
})

$containers.on('click', 'a', function (event) {
  var $container = $(event.delegateTarget)
  var currentState = $.extend({}, window.history.state)

  // Push the updated state to the history
  currentState[event.delegateTarget.id] = this.pathname
  console.log('Push state:', currentState)

  window.history.pushState(currentState, document.title)
  $container.load(this.pathname)
  event.preventDefault()
})
