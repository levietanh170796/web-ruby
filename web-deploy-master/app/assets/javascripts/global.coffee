jQuery(document).on 'turbolinks:load', ->
  details = $('#details')
  count = details.find('.count > span')

  recount = -> count.text details.find('.nested-fields').size()

  details.on 'cocoon:before-insert', (e, el_to_add) ->
    el_to_add.fadeIn(1000)

  details.on 'cocoon:after-insert', (e, added_el) ->
    added_el.effect('highlight', {}, 500)
    recount()

  details.on 'cocoon:before-remove', (e, el_to_remove) ->
    $(this).data('remove-timeout', 1000)
    el_to_remove.fadeOut(1000)

  details.on 'cocoon:after-remove', (e, removed_el) ->
    recount()
