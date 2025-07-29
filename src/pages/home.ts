import { zero } from '../../zero.js'

// --- 2️⃣ Register Web Component ---
class HomePage extends HTMLElement {
  private tasksView: any

  constructor() {
    super()
    // ❌ Removed Shadow DOM
  }

  connectedCallback() {
    this.render()

    const form = this.querySelector('form')!
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const title = (e.target as HTMLFormElement).task.value.trim()
      if (title) {
        await zero.mutate.task.insert({
          id: crypto.randomUUID(),
          title,
          description: '',
        })
        form.reset()
      }
    })

    this.tasksView = zero.query.task.materialize()

    this.tasksView.addListener((tasks) => {
      const list = this.querySelector('tbody')!
      list.innerHTML = tasks.map((t: any) => `<tr><td class="whitespace-nowrap py-2 text-sm font-medium text-gray-900 sm:pl-0">${t.title}</td></tr>`).join('')
    })
  }

  disconnectedCallback() {
    if (this.tasksView)
      this.tasksView.destroy()
  }

  render() {
    this.innerHTML = `
<form class="flex gap-2 items-end">
  <div>
    <label for="task" class="block text-sm/6 font-medium text-gray-900">Task</label>
    <div class="mt-0 flex gap-2">
      <input id="task" type="task" name="task" placeholder="New Task"
        class="block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        <button type="submit" class="rounded-lg bg-indigo-600 px-5 py-1.5 text-base font-semibold text-white shadow-sm
               hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    Add
  </button>
    </div>
  </div>

</form>
  <div class="mt-0 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="relative min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">

          </tbody>
        </table>
      </div>
    </div>
  </div>


    `
  }
}

customElements.define('home-page', HomePage)
