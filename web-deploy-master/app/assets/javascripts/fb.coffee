ObserveJS.bind 'FB', class
  root: document.createElement('div')
  @::root.id = 'fb-root'

  loaded: =>
    if !document.body.contains(@root)
      document.body.appendChild(@root)

    if FB?
      FB.XFBML.parse()
    else
      @initialize()

  initialize: =>

    script = document.getElementsByTagName('script')[0]
    js = document.createElement('script')
    js.id = 'facebook-jssdk'
    js.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.11&appId=2032953576972996"
    script.parentNode.insertBefore(js, script)
