import './style.css'


const jsonData = JSON.stringify({ 'test': 'test1' })

const getData = new Promise((resolve, reject) => {
  setTimeout(() => {
    let condition = true;
    if (condition) {
      resolve(jsonData)
    } else {
      reject(new Error('Error retrieving data'))
    }
  }, 1000)
})

async function data() {
  try {
    let test = await getData

    return test
  } catch (e) {
    console.log('error fetching data', e)
  }
}

let test;
try {
  test = await getData
} catch (e) {
  console.log('error fetching data', e)
}

console.log(test, await data())
function deleteItem(deleteButton, wrapperElement, container) {
  deleteButton.addEventListener('click', () => {
    const allNodes = document.querySelectorAll('.Item')
    wrapperElement.innerHTML = ''

    Array.from(allNodes).filter(item => {
      if (item.id !== container.id) {
        wrapperElement.appendChild(item)
      }
    })
  })
}

function editBlur(e) {
  newChild.innerText = e.target.value
  editInput.innerText = e.target.value


  handleEditing({ checkbox, label, editInput, newChild })
}

function handleEditing({ checkbox, label, editInput, newChild }) {
  checkbox.isEditing = !checkbox.isEditing

  if (checkbox.isEditing) {
    label.replaceChild(editInput, newChild)
  } else {
    label.replaceChild(newChild, editInput)
  }

}

function handleCheckbox({ checkbox, strikethrough, editButton, label, newChild }) {
  checkbox.addEventListener('change', (e) => {
    checkbox.isCompleted = !checkbox.isCompleted

    if (checkbox.isCompleted) {
      label.replaceChild(strikethrough, newChild)
      strikethrough.innerHTML = newChild.innerText
      strikethrough.style = "flex-grow:1;"
      editButton.disabled = true
    } else {
      label.replaceChild(newChild, strikethrough)
      editButton.disabled = false
    }
  })
}

function input(element, wrapperElement, buttonElement) {

  function updateValue(value) {

    const container = document.createElement('div')
    container.id = Date.now()
    container.className = "Item"
    container.style = "display: flex;"

    const label = document.createElement('label')
    label.isEditing = false
    label.style = "display: flex; flex-grow: 1; align-items: center; cursor: pointer;"

    container.appendChild(label)

    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.isCompleted = false

    const newChild = document.createElement('div')
    newChild.innerHTML = value
    newChild.style = "flex-grow:1;"

    label.appendChild(checkbox)
    label.appendChild(newChild)

    const editButton = document.createElement('button')
    editButton.innerHTML = '✏️'
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '⌫'

    container.appendChild(editButton)
    container.appendChild(deleteButton)

    wrapperElement.appendChild(container)

    // Reset the input after we add something
    element.value = ''


    const strikethrough = document.createElement('s')
    handleCheckbox({ checkbox, strikethrough, editButton, label, newChild })

    const editInput = document.createElement('input')
    editInput.value = value
    editInput.type = "text"

    editButton.addEventListener('click', (e) => {
      handleEditing({ checkbox, label, editInput, newChild })
    })

    editInput.addEventListener('blur', editBlur)
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        editInput.removeEventListener('blur', editBlur)
        newChild.innerText = e.target.value
        editInput.innerText = e.target.value
        handleEditing({ checkbox, label, editInput, newChild })
      }
    })

    deleteItem(deleteButton, wrapperElement, container)
  }

  let invalid = false;
  buttonElement.addEventListener('click', () => {
    updateValue(element.value)
  })

  element.addEventListener('change', (e) => {
    buttonElement.disabled = e.target.value.trim() < 1
  })

  element.addEventListener('keydown', (e) => {
    const value = e.target.value.trim()
    if (e.key === 'Enter') {
      const parent = document.querySelector('.TopContainer')
      const validElement = document.createElement('div')
      validElement.setAttribute('class', 'invalid')
      validElement.innerHTML = 'Todo must contain at least 1 no space character.'

      if (value.length <= 0 && !invalid) {
        invalid = true
        parent.appendChild(validElement)
      } else if (value.length > 0) {
        invalid = false
        updateValue(value)
        parent.removeChild(document.querySelector('.invalid'))
      }

    }
  })

}



document.querySelector('#app').innerHTML = `
  <form class="Container">
    <div class="TopContainer">
      <input name="mainInput" type="text" class="MainInput" placeholder="Add a Todo" />
      <button type="button" class="MainButton">Add Todo</button>
    </div>
    <div class="MainWrapper"></div>
  </form>
`


input(document.querySelector('.MainInput'), document.querySelector('.MainWrapper'), document.querySelector('.MainButton'))

const form = document.querySelector('.Container')
const data1 = new FormData(form);
data1.append('name', JSON.stringify({ isCompleted: true, isEditing: false, id: 1, name: 'name' }))
console.log(Object.fromEntries(data1))


