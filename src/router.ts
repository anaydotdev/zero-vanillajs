// router.ts

type RouteLoader = () => Promise<string> | string
export class Router {
  routes: Record<string, RouteLoader> = {}

  register(path: string, loader: RouteLoader) {
    this.routes[path] = loader
  }

  navigate(path: string) {
    history.pushState({}, '', path)
    this.updateView()
  }

  async updateView() {
    const loader = this.routes[location.pathname] || this.routes['/']
    let componentTag: string
    if (typeof loader === 'function') {
      componentTag = await loader()
    }
    else {
      componentTag = loader
    }

    const outlet = document.querySelector('#app')
    if (outlet)
      outlet.innerHTML = `<${componentTag}></${componentTag}>`
  }

  listen() {
    window.addEventListener('popstate', () => this.updateView())
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.hasAttribute('data-link')) {
        e.preventDefault()
        this.navigate(target.getAttribute('href')!)
      }
    })
    this.updateView()
  }
}
